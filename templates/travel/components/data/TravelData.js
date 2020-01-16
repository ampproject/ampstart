export default function TravelData() {
  return {
    travel: {
      data: {
        types: [
          {text: 'Active', value: 'active', icon: {run: true}},
          {text: 'Artistic', value: 'artistic', icon: {paintbrush: true}},
          {text: 'Drinks', value: 'drinks', icon: {cocktail: true}},
          {text: 'Fashion', value: 'fashion', icon: {jacket: true}},
          {text: 'Food', value: 'food', icon: {cutlery: true}},
          {text: 'Music', value: 'music', icon: {guitar: true}},
          {text: 'Nature', value: 'nature', icon: {pine: true}},
          {text: 'Nightlife', value: 'nightlife', icon: {moon: true}},
          {text: 'Tours', value: 'tours', icon: {bus: true}},
          {text: 'Water', value: 'water', icon: {boat: true}},
        ],
      },
      'head-tag': {
        title: 'Travel Template',
        'canonical-path': 'templates/travel/travel.amp',
        extensions: ['amp-list', 'amp-bind'],
        templates: ['amp-mustache'],
        'css-path': 'templates/travel/travel.css',
        'font-stylesheets': ['https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'],
      },
      partials: {
        hero: {
          images: [
            {
              src: '../../img/travel/hero-2.jpg',
            },
            {
              src: '../../img/travel/hero-3.jpg',
            },
            {
              src: '../../img/travel/hero-1.jpg',
            },
          ],
        },
        featured: {
          'image-col-1': {
            'overlay-color': 'travel-featured-color-blue',
            width: 336,
            height: 507,
            src: 'new-york',
            name: 'New York',
            'adventure-number': '379 adventures',
          },
          'image-col-2-top': {
            'overlay-color': 'travel-featured-color-cyan',
            width: 264,
            height: 246,
            src: 'barcelona',
            name: 'Barcelona',
            'adventure-number': '68 adventures',
          },
          'image-col-2-bottom': {
            'overlay-color': 'travel-featured-color-orange',
            width: 264,
            height: 264,
            src: 'paris',
            name: 'Paris',
            'adventure-number': '221 adventures',
          },
          'image-col-3-top': {
            'overlay-color': 'travel-featured-color-purple',
            width: 276,
            height: 207,
            src: 'tokyo',
            name: 'Tokyo',
            'adventure-number': '500+ adventures',
          },
          'image-col-3-bottom': {
            'overlay-color': 'travel-featured-color-cornflower',
            width: 264,
            height: 286,
            src: 'chicago',
            name: 'Chicago',
            'adventure-number': '143 adventures',
          },
          'image-col-4': {
            'overlay-color': 'travel-featured-color-teal',
            width: 312,
            height: 507,
            src: 'reykjavik',
            name: 'Reykjavik',
            'adventure-number': '87 adventures',
          },
        },
        popular: {
          adventures: [
            {
              'layout-classes': ['travel-popular-tilt-right'],
              href: '#',
              width: 346,
              height: 200,
              src: '../../img/travel/activity/surf-day.jpg',
              src2x: '../../img/travel/activity/surf-day@2x.jpg',
              text: 'Surf Day. Board and Wetsuits Included in Price!',
              price: '100',
              reviews: '241 Reviews',
              place: 'Oaxaca',
              new: false,
            },
            {
              'layout-classes': ['travel-results-result relative'],
              href: '#',
              width: 346,
              height: 200,
              src: '../../img/travel/activity/discover-electronic-scene.jpg',
              src2x: '../../img/travel/activity/discover-electronic-scene@2x.jpg',
              text: "Discover Oaxaca's Electronic Music Scene with a Top DJ",
              price: '113',
              reviews: '42 Reviews',
              place: 'Oaxaca',
              new: true,
            },
            {
              'layout-classes': ['travel-popular-tilt-left'],
              href: '#',
              width: 346,
              height: 200,
              src: '../../../img/travel/activity/skateboard-around-city.jpg',
              src2x: '../../../img/travel/activity/skateboard-around-city@2x.jpg',
              text: 'Skateboard Around the City',
              price: '92',
              reviews: '17 Reviews',
              place: 'Mexico City',
              new: false,
            },
          ],
        },
      },
      'apply-button-props': [
        {
          key: 'ui_reset',
          value: 'false',
        },
        {
          key: 'ui_filterPane',
          value: 'false',
        },
        {
          key: 'query_query',
          value: 'fields_query',
        },
        {
          key: 'fields_query_edited',
          value: 'false',
        },
        {
          key: 'query_departure',
          value: 'fields_departure',
        },
        {
          key: 'fields_departure_edited',
          value: 'false',
        },
        {
          key: 'query_return',
          value: 'fields_return',
        },
        {
          key: 'fields_return_edited',
          value: 'false',
        },
        {
          key: 'query_maxPrice',
          value: 'fields_maxPrice',
        },
        {
          key: 'fields_maxPrice_edited',
          value: 'false',
        },
        {
          key: 'query_city',
          value: 'fields_city',
        },
        {
          key: 'fields_city_edited',
          value: 'false',
        },
        {
          key: 'query_type',
          value: 'fields_type',
        },
        {
          key: 'fields_type_edited',
          value: 'false',
        },
        {
          key: 'query_sort',
          value: 'fields_sort',
        },
        {
          key: 'fields_sort_edited',
          value: 'false',
        },
      ],
    },
  };
}
