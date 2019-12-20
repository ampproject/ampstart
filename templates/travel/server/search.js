/*
Return a list of activities, with the following query paramters:
  maxPrice=<number>
  query=<query-text>
  cities[]=<city-name> (zero or more)
  types[]=<type-name> (zero or more)
  sort=<sort> (one of: popularity-desc, rating-desc, age-asc, price-asc)
*/
module.exports = (req, res) => {
  let data = [
    {
      stats: {
        cities: [
          {img: 'la-paz', name: 'La Paz', isSelected: false},
          {img: 'cancun', name: 'Cancún', isSelected: false},
          {img: 'mexico-city', name: 'Mexico City', isSelected: false},
          {img: 'oaxaca', name: 'Oaxaca', isSelected: false},
          {img: 'tijuana', name: 'Tijuana', isSelected: false},
        ],
        allCities: true,
        price: {
          graph: {
            pathData:
              'm0,100 S12.5 100,25 100 S62.5 91.477,75 82.955 S112.5 64.204,125 62.5 S162.5 55.966,175 52.841 S212.5 41.477,225 36.364 S262.5 28.125,275 30.113 S312.5 43.466,325 52.841 S362.5 76.421,375 81.25 S412.5 85.227,425 79.546 S462.5 51.137,475 34.091 S512.5 1.421,525 2.841 S562.5 15.057,575 24.432 S612.5 45.881,625 48.579 S662.5 56.108,675 58.239 S712.5 71.875,725 81.25 S762.5 100,775 100 S800 100,800 100',
            width: 800,
            height: 100,
          },
          average: {min: 30, max: 100},
        },
        location: 'mexico',
        resultCount: 21,
        startDate: {raw: '2017-06-07', formatted: 'June 7'},
        endDate: {raw: '2017-06-30', formatted: 'June 30'},
      },
      results: [
        {
          id: '4',
          name: 'Surf Day. Board and Wetsuits Included in Price!',
          img: 'surf-day',
          price: {value: 100, currency: 'USD'},
          location: {city: 'Oaxaca', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 241,
          },
          flags: {liked: false, new: false},
          types: ['active', 'water'],
        },
        {
          id: '19',
          name: 'Enjoy a Traditional Dinner... In the Sky!',
          img: 'dinner-in-sky',
          price: {value: 256, currency: 'USD'},
          location: {city: 'Tijuana', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 3, range: [true, true, true]},
            count: 145,
          },
          flags: {liked: false, new: true},
          types: ['tours', 'culture', 'food', 'drinks', 'danger'],
        },
        {
          id: '20',
          name: 'Swim with dolphins',
          img: 'swim-with-dolphins',
          price: {value: 315, currency: 'USD'},
          location: {city: 'Tijuana', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 134,
          },
          flags: {liked: false, new: false},
          types: ['nature', 'active', 'water'],
        },
        {
          id: '13',
          name: 'Ride a Motorcycle along the Coast',
          img: 'motorcycle-coast',
          price: {value: 245, currency: 'USD'},
          location: {city: 'Tijuana', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 122,
          },
          flags: {liked: false, new: false},
          types: ['tours'],
        },
        {
          id: '5',
          name: 'Parque Zoologico',
          img: 'parque-zoologico',
          price: {value: 20, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 104,
          },
          flags: {liked: false, new: false},
          types: ['tours', 'nature'],
        },
        {
          id: '18',
          name: 'Learn Photography While Exploring the City',
          img: 'learn-photography',
          price: {value: 89, currency: 'USD'},
          location: {city: 'La Paz', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 99,
          },
          flags: {liked: false, new: false},
          types: ['tours', 'culture'],
        },
        {
          id: '15',
          name: 'Taste Authentic Tapas',
          img: 'authentic-tapas',
          price: {value: 79, currency: 'USD'},
          location: {city: 'Cancún', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 3, range: [true, true, true]},
            count: 78,
          },
          flags: {liked: false, new: true},
          types: ['nightlife', 'culture', 'food', 'drinks'],
        },
        {
          id: '7',
          name: 'Top Fashion Spots with Instagram Blogger',
          img: 'top-fashion-instagram',
          price: {value: 45, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 66,
          },
          flags: {liked: false, new: false},
          types: ['fashion', 'artistic'],
        },
        {
          id: '10',
          name: 'Run Through Mexico City with an Olympian',
          img: 'run-through-mexico',
          price: {value: 149, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 56,
          },
          flags: {liked: false, new: false},
          types: ['active', 'tours', 'nature'],
        },
        {
          id: '11',
          name: "Discover Oaxaca's Electronic Music Scene with a Top DJ",
          img: 'discover-electronic-scene',
          price: {value: 113, currency: 'USD'},
          location: {city: 'Oaxaca', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 42,
          },
          flags: {liked: false, new: true},
          types: ['music', 'nightlife', 'culture'],
        },
        {
          id: '17',
          name: 'Go Golfing with a Local Pro',
          img: 'golfing-with-pro',
          price: {value: 129, currency: 'USD'},
          location: {city: 'La Paz', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 3, range: [true, true, true]},
            count: 37,
          },
          flags: {liked: false, new: false},
          types: ['tours', 'culture', 'active', 'nature'],
        },
        {
          id: '0',
          name: 'Sail Around the Eastern Mexican Coast',
          img: 'sail-around-coast',
          price: {value: 92, currency: 'USD'},
          location: {city: 'La Paz', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 4, range: [true, true, true, true]},
            count: 34,
          },
          flags: {liked: false, new: false},
          types: ['active', 'tours', 'water', 'nature'],
        },
        {
          id: '16',
          name: 'Skateboard Around the City',
          img: 'skateboard-around-city',
          price: {value: 49, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 17,
          },
          flags: {liked: false, new: true},
          types: ['tours', 'culture', 'active'],
        },
        {
          id: '9',
          name: 'Bake Traditional Sweet Bread',
          img: 'bake-traditional-sweet-bread',
          price: {value: 46, currency: 'USD'},
          location: {city: 'La Paz', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 3, range: [true, true, true]},
            count: 13,
          },
          flags: {liked: false, new: true},
          types: ['food', 'culture'],
        },
        {
          id: '1',
          name: 'A Tour of the Beaches of Cancún with a Local',
          img: 'tour-beaches-cancun',
          price: {value: 70, currency: 'USD'},
          location: {city: 'Cancún', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 12,
          },
          flags: {liked: false, new: true},
          types: ['active', 'tours', 'water', 'nature'],
        },
        {
          id: '8',
          name: 'Mexican Meat Market',
          img: 'mexican-meat-market',
          price: {value: 19, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 2, range: [true, true]},
            count: 11,
          },
          flags: {liked: false, new: false},
          types: ['food'],
        },
        {
          id: '14',
          name: 'Bike Around an Active Volcano',
          img: 'bike-around-volcano',
          price: {value: 34, currency: 'USD'},
          location: {city: 'Cancún', lat: 0, lng: 0},
          reviews: {averageRating: {value: 1}, count: 2},
          flags: {liked: false, new: false},
          types: ['tours', 'danger'],
        },
        {
          id: '6',
          name: 'The Best Coffee in Mexico. Free Coffee for 2 hours',
          img: 'best-coffee-mexico',
          price: {value: 5, currency: 'USD'},
          location: {city: 'Tijuana', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 5, range: [true, true, true, true, true]},
            count: 2,
          },
          flags: {liked: true, new: true},
          types: ['food', 'drinks'],
        },
        {
          id: '3',
          name: 'Beer Excursion of Mexico City',
          img: 'beer-excursion-mexico-city',
          price: {value: 40, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {
            averageRating: {value: 3, range: [true, true, true]},
            count: 1,
          },
          flags: {liked: true, new: true},
          types: ['bus', 'tours', 'food', 'drinks'],
        },
        {
          id: '12',
          name: 'View the National Museum with an Archeologist',
          img: 'national-museum-archeologist',
          price: {value: 79, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {averageRating: {value: 0, range: []}, count: 0},
          flags: {liked: false, new: true},
          types: ['culture', 'tours'],
        },
        {
          id: '2',
          name: 'Roads of the City',
          img: 'roads-of-city',
          price: {value: 199, currency: 'USD'},
          location: {city: 'Mexico City', lat: 0, lng: 0},
          reviews: {averageRating: {value: 0, range: []}, count: 0},
          flags: {liked: false, new: true},
          types: ['tours', 'nightlife'],
        },
      ],
    },
  ];

  if (req.query.venue && req.query.venue != 'null') {
    data = data.filter(concert =>
      concert.venue.toLowerCase().includes(req.query.venue.toLowerCase())
    );
  }

  res.json({items: data, query: req.query});
};
