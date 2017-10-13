/*
 * Builds a collection of products and writes JSON files sorted by price and
 * category.
 */

const fs = require('fs');
const path = require('path');

const currentWorkingDirectory = path.dirname(process.argv[1]);
const totalProducts = 10;
const titles = {
  'saddle': {
    'name': 'Leather Saddle',
    'description': 'Firm, yet comfortable for long leisurely rides.'
  },
  'sprocket': {
    'name': 'Sprocket Set',
    'description': 'Steel, designed for long lasting stability.'
  },
  'fixie': {
    'name': 'Fixie Blue',
    'description': 'Designed to get you there.'
  },
  'chain': {
    'name': 'Chain set',
    'description': 'Silver alloy construction for durability.'
  },
  'frame': {
    'name': 'Road Bike',
    'description': 'Built with lightweight aluminum for speed.'
  },
  'red': {
    'name': 'Red Cruiser',
    'description': 'Smooth ride for enjoyable cruising.'
  },
  'wheel': {
    'name': 'Wheel Set',
    'description': 'Ride Sally, ride.'
  },
  'handles': {
    'name': 'Horn Handles',
    'description': 'Grippingly durable and stylish.'
  },
  'brakes': {
    'name': 'Caliper Brakes',
    'description': 'Fits most wheel sizes and designed to last long.'
  },
  'speed16': {
    'name': '16-Speed',
    'description': 'Smooth shifting through all gears for city riding.'
  }
};
const titleListing = [
  titles.sprocket, titles.fixie, titles.chain, titles.saddle, titles.speed16, titles.red, titles.handles, titles.brakes, titles.frame, titles.wheel
];


const minPrice = 400;
const maxPrice = 999;
const imagesFolder = '/img/e-commerce/product/';
const imagePrefix = 'product-';
const imageExtension = '.jpg';
const totalImages = 10;
let currentImage = 1;
const categories = ['bikes', 'accessories', 'components'];
const products = {
  items: []
};
const productCategories = {
  bikes: [],
  accessories: [],
  components: []
};

const outputFile = 'products.json';
const highToLowName = 'high-low';
const lowToHighName = 'low-high';
let tempData;
let pageNumber = 0;

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomPrice() {
  return Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
}

function getNextImage() {
  const imageUrl =  imagesFolder + imagePrefix + currentImage + imageExtension;
  currentImage++;
  if (currentImage > totalImages) {
    currentImage = 1;
  }
  return imageUrl;
}

function highToLow(productA, productB) {
  if (productA.price < productB.price) {
    return 1;
  } else if (productA.price > productB.price) {
    return -1;
  }
  return 0;
}

function lowToHigh(productA, productB) {
  if (productA.price < productB.price) {
    return -1;
  } else if (productA.price > productB.price) {
    return 1;
  }
  return 0;
}

function writeFile(sortName, sortFunction, products, categoryName = 'all') {
  products.sort(sortFunction);
  let data = {items: products};

  let fileName = `${currentWorkingDirectory}/${sortName}-${categoryName}-${outputFile}`;
  fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'));
}

function saveProducts() {
  writeFile(highToLowName, highToLow, products.items);
  writeFile(lowToHighName, lowToHigh, products.items);
}

function saveCategories() {
  products.items.forEach((product) => {
    productCategories[product.category].push(product);
  });

  categories.forEach((categoryName) => {
    writeFile(highToLowName, highToLow, productCategories[categoryName],
        categoryName);
    writeFile(lowToHighName, lowToHigh, productCategories[categoryName],
        categoryName);
  });
}

function generateProducts() {
  for (let i = 0; i < totalProducts; i++) {
    console.log(i + ": ", titleListing[i]);
    products.items.push({
      name: titleListing[i].name,
      description: titleListing[i].description,
      price: getRandomPrice(),
      image: getNextImage(),
      category: getRandomCategory()
    });
  }
}

function init() {
  generateProducts();
  saveProducts();
  saveCategories();
}

init();
