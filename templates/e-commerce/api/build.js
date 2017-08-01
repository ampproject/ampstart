const fs = require('fs');
const path = require('path');

const currentWorkingDirectory = path.dirname(process.argv[1]);
const totalProducts = 12;
const titles = {
  'gloves': {
    'name': 'Pointer gloves',
    'description': 'Fingerless with lightweight construction'
  },
  'cap': {
    'name': 'Farringdon cap',
    'description': 'Water resistant and breathable'
  },
  'bike1': {
    'name': 'Highland',
    'description': 'Timeless style in Reynolds 531 tubing'
  },
  'bike2': {
    'name': 'Estuary',
    'description': 'Relaxed geometry for comfortable commuting'
  },
  'bike3': {
    'name': 'Beacon',
    'description': 'Full carbon frameset, designed to climb'
  },
  'bike4':{
    'name': 'Herne Hill',
    'description': 'Built for the track, at home on the street'
  },
  'bike5': {
    'name': 'Pennine',
    'description': 'Full-featured tourer for long-distance rides'
  }
};
const titleListing = [
  titles.bike1, titles.bike2, titles.bike3, titles.gloves, titles.cap, titles.gloves, titles.cap, titles.gloves, titles.cap, titles.gloves, titles.cap, titles.bike4
];
const minPrice = 400;
const maxPrice = 999;
const imagesFolder = '/img/e-commerce/product/';
const imagePrefix = 'product-';
const imageExtension = '.jpg';
const totalImages = 12;
let currentImage = 1;
const categories = ['mens', 'womens', 'kids'];
const products = {
  items: []
};
const productCategories = {
  mens: [],
  womens: [],
  kids: []
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

function saveProducts() {
  let fileName =
      `${currentWorkingDirectory}/${highToLowName}-all-${outputFile}`;
  products.items.sort(highToLow);
  fs.writeFileSync(fileName, JSON.stringify(products, null, '\t'));

  products.items.sort(lowToHigh);
  fileName = `${currentWorkingDirectory}/${lowToHighName}-all-${outputFile}`;
  fs.writeFileSync(fileName, JSON.stringify(products, null, '\t'));
}

function saveCategories() {
  products.items.forEach((product) => {
    productCategories[product.category].push(product);
  });

  categories.forEach((categoryName) => {
    productCategories[categoryName].sort(highToLow);
    let data = {items: productCategories[categoryName]};

    let fileName = `${currentWorkingDirectory}/${
                                                 highToLowName
                                               }-${categoryName}-${outputFile}`;
    fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'));

    productCategories[categoryName].sort(lowToHigh);
    data = {items: productCategories[categoryName]};

    fileName = `${currentWorkingDirectory}/${lowToHighName}-${
                                                              categoryName
                                                            }-${outputFile}`;
    fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'));
  });
}

function generateProducts() {
  for (let i = 0; i < totalProducts; i++) {
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
