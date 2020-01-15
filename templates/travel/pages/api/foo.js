const functions = require('firebase-functions');
const fs = require('fs');
const path = require('path');
var https = require("https");
var url = require('url');

// travelData is the sample data that we use to demo filtering on the frontend.
const src = path.join(path.dirname(__filename), 'travel-data.json');
const travelData = JSON.parse(fs.readFileSync(src, 'utf8'));

/**
 * cors is HTTP middleware that sets an AMP-specific cross origin resource
 * sharing HTTP header on our response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next HTTP handler to execute.
 */
function cors(req, res, next) {
  const port = process.env.NODE_ENV === 'production'
    ? null
    : new url.URL(req.query.__amp_source_origin).port;

  const host = process.env.NODE_ENV === 'production'
    ? `https://${req.hostname}`
    : `http://${req.hostname}:${port}`;

  res.header('amp-access-control-allow-source-origin', host);

  next();
}

/**
 * Convert a value to an array.
 *
 * The value is coerced to an array, in the case that the provided value is
 * null, undefined or an empty string, an empty array is returned.
 * @param  {*} val - any value.
 * @returns {array} an array.
 */
function convertToArray(val) {
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
 * @param {Array} travelData - Array of objects containing the travel data to
 * filter.
 * @param {Array} cities - Array of strings containing city names.
 * @return {Array} The selected cities.
 */
function selectedCities(travelData, cities) {
  var selected = [];
  travelData.activities.forEach((data) => {
    const isSelected = cities.includes(data.location.city);

    // check if the city already exists in our cities array
    var existsIdx = -1;
    selected.forEach((city, idx) => {
      if (city.name === data.location.city) {
        existsIdx = idx;
      }
    });

    const city = travelData.cities.find((city) => city.name === data.location.city);

    // if it doesn't exist already, add it
    if (existsIdx === -1) {
      selected.push({
        img: city ? city.img : '',
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
 * sortResults checks to see if the value is one of the parameters we
 * know how to sort by.
 *
 * @param {String} val - The value to check.
 * @param {Array} results - Array of object to sort.
 * @return {Array} The sorted results.
 */
function sortResults(val, results) {
  const sortPopularity = (a, b) => {
    if (a.reviews.count < b.reviews.count) {
      return 1;
    } else if (a.reviews.count > b.reviews.count) {
      return -1;
    }
    return 0;
  };

  const sortRating = (a, b) => {
    if (a.reviews.averageRating.value < b.reviews.averageRating.value) {
      return 1;
    } else if (a.reviews.averageRating.value > b.reviews.averageRating.value) {
      return -1;
    }

    return sortPopularity(a, b);
  };

  const sortPrice = (a, b) => {
    if (a.price.value > b.price.value) {
      return 1;
    } else if (a.price.value < b.price.value) {
      return -1;
    }

    return sortRating(a, b);
  };

  const sortNew = (a, b) => {
    if (!a.flags.new && b.flags.new) {
      return 1;
    } else if (a.flags.new && !b.flags.new) {
      return -1;
    }

    return sortRating(a, b);
  };

  switch (val.toLowerCase()) {
    case "popularity-desc":
      return results.slice().sort(sortPopularity);

    case "rating-desc":
      return results.slice().sort(sortRating);

    case "age-asc":
      return results.slice().sort(sortNew);

    case "price-asc":
      return results.slice().sort(sortPrice);

    default:
      return results;
  }
}

/**
 * Search handles the search and filtering functionality.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
exports.search = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    req.query.cities = convertToArray(req.query.cities);
    req.query.maxPrice = req.query.maxPrice || 0;
    req.query.types = convertToArray(req.query.types);

    // Not sure how to handle these yet...
    // const departureDate = req.query.departure;
    // const returnDate = req.query.return;

    // Mock data points representing price distribution.
    var priceData = [
      0,
      0,
      34.091,
      40.909,
      53.409,
      73.864,
      65.909,
      28.409,
      9.091,
      31.818,
      100,
      94.318,
      56.818,
      46.023,
      37.5,
      0,
      0
    ];

    var results = filter(travelData.activities, req.query);

    results = sortResults(req.query.sort, results);
    var cities = selectedCities(travelData, req.query.cities);

    const stats = {
      cities: cities,
      allCities: !req.query.cities.length || cities.every((city) => !req.query.cities.includes(city.name)),
      price: {
        graph: {
          pathData: getSVGGraphPathData(priceData, 800, 100),
          width: 800,
          height: 100
        },
        average: {
          min: 30.0,
          max: 100
        },
      },
      location: req.query.query || 'mexico',
      resultCount: results.length,
      startDate: {
        raw: '2017-06-07',
        formatted: 'June 7',
      },
      endDate: {
        raw: '2017-06-30',
        formatted: 'June 30',
      },
    };

    const sendResponse = function () {
      res.json({items: [{
        stats: stats,
        results: results,
      }]})
    };

    if (req.query.delay) {
      setTimeout(sendResponse, parseInt(req.query.delay, 10));
    } else {
      sendResponse();
    }
  })
});

/**
 * getSVGGraphPath data converts an array of numbers to valid SVG graph path
 * data.
 *
 * @param {Array} data - The data to convert to SVG graph path format.
 * @param {Integer} width - The width of the SVG.
 * @param {Integer} height - The height of the SVG.
 * @return {String} The string representing the SVG path.
 */
function getSVGGraphPathData(data, width, height) {
  var max = Math.max.apply(null, data);

  var width = 800;
  var height = 100;
  var scaleH = width / (data.length - 1)
  var scaleV = height / max;

  var factor = 0.25;

  var commands = [`m0,${applyScaleV(data[0])}`];

  function round(val) {
    return Math.round(val * 1000) / 1000;
  }

  function applyScaleH(val) {
    return round(val * scaleH);
  }

  function applyScaleV(val) {
    return round(100 - val * scaleV);
  }

  for (let i = 0, max = data.length - 1; i < max; i++) {
    current = data[i];
    next = data[i + 1];

    let x = (i + 0.5);
    let y = current + (next - current) * 0.5

    let sX = (i + (0.5 - factor));
    let sY = current + (next - current) * (0.5 - factor);

    commands.push(`S${applyScaleH(sX)} ${applyScaleV(sY)},${applyScaleH(x)} ${applyScaleV(y)}`);
  }

  var finalY = data[data.length - 1];
  commands.push(`S${width} ${applyScaleV(finalY)},${width} ${applyScaleV(finalY)}`);

  return commands.join(' ');
};

/**
 * onRequest handles the interaction with the Google Maps API.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
exports.places = functions.https.onRequest((req, res) => {
  const options = {
    hostname: 'maps.googleapis.com',
    path: '/maps/api/place/autocomplete/json?key=' +
      'AIzaSyBDsTXH8OfdfCLMm_EJ5AAQyb71xPlos8Y' +
      '&' + (url.parse(req.url).query || ''),
  };

  let data = '';
  https.get(options, (response) => {
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.end(`{"items": [${data}]}`);
    });
  }).on('error', (err) => {
    res.statusCode = 500;
    res.end();
  });
});
