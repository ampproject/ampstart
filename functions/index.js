const functions = require('firebase-functions');
const fs = require('fs');


// travelData is the sample data that we use to demo filtering on the frontend.
const travelData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

/**
 * cors is HTTP middleware that sets an AMP-specific cross origin resource
 * sharing HTTP header on our response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP resonse object.
 * @param {Function} next - The next HTTP handler to execute.
 */
function cors(req, res, next) {
  const host = process.env.NODE_ENV === 'production'
    ? `https://${req.hostname}`
    : `http://${req.hostname}:5000`

  res.header('amp-access-control-allow-source-origin', host);

  next();
}

/**
 * Cast a value to an array.
 *
 * The value is coerced to an array, in the case that the provided value is
 * null, undefined or an empty string, an empty array is returned.

 * @param  {any} val - any value.
 * @returns {array} an array.
 */
function castArray(val) {
  if (Array.isArray(val)) {
    return val;
  }

  if (val === undefined || val === '' || val === null) {
    return [];
  }

  return [val];
}

/**
 * filter returns the travel data that matches the given query.
 *
 * @param {Array} data - Array of objects containing the travel data to
 * filter.
 * @param {Object} query - An HTTP request query object.
 * @return {Array} - An array of travelData objects.
 */
function filter(data, query) {
  var results = [];
  var push = true;

  // omit every result that doesn't pass _every_ filter
  data.forEach((val) => {
    var push = true;

    // if we fail a filter condition, then don't push
    // check if we're over the max price
    if (query.maxPrice > 0) {
      if (val.price.value > query.maxPrice) {
        push = false;
      }
    }

    // check if the city is included
    if (query.cities.length > 0) {
      if (!query.cities.includes(val.location.city)) {
        push = false;
      }
    }

    // check if the type is anywhere to be found
    var found = false;
    if (query.types.length > 0) {
      query.types.forEach((type) => {
        if (val.types.includes(type)) found = true;
      });
    } else {
      // assume it's found if there's no `query.types` on the request
      found = true;
    }
    if (!found) {
      push = false;
    }

    // if we found something, then push it to the results array
    if (push) {
      results.push(val);
    }
  });

  return results;
}

/**
 * Checks to see if any the given cities exist in our travel data,
 * returning all the ones that are.
 *
 * @param {Array} data - Array of objects containing the travel data to
 * filter.
 * @param {Array} cities - Array of strings containing city names.
 * @return {Array} The selected cities.
 */
function selectedCities(travelData, cities) {
  var selected = [];
  travelData.forEach((data) => {
    const isSelected = cities.includes(data.location.city);

    // check if the city already exists in our cities array
    var existsIdx = -1;
    selected.forEach((city, idx) => {
      if (city.name === data.location.city) {
        existsIdx = idx;
      }
    });

    // if it doesn't exist already, add it
    if (existsIdx === -1) {
      selected.push({
        name: data.location.city,
        isSelected: isSelected,
      });
    // otherwise update the existing entry only if it's currently false,
    // otherwise we could overwrite a previous match
    } else {
      if (!selected[existsIdx].isSelected) {
        selected[existsIdx].isSelected = isSelected;
      }
    }
  });

  return selected;
}

/**
 * Search handles the search and filtering functionality.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
exports.search = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    req.query.cities = castArray(req.query.cities);
    req.query.maxPrice = req.query.maxPrice || 0;
    req.query.types = castArray(req.query.types);

    var results = filter(travelData, req.query);
    var cities = selectedCities(travelData, req.query.cities);

    const stats = {
      cities: cities,
      allCities: !req.query.cities.length || cities.every((city) => !req.query.cities.includes(city.name)),
      price: {
        graph: {
          width: 800,
          height: 100
        },
        average: {
          min: 30.0,
          max: 100
        },
      },
      location: 'Mexico',
      resultCount: results.length,
    };

    // The entire api response is wrapped in an `items` array in order to
    // make amp-list mustache template rendering more flexible.
    res.json({items: [{
      stats: stats,
      results: results,
    }]});
  });
});
