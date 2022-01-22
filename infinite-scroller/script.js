const count = 10;
const apiKey = 'KN9bgQwu5tqyW9knAbxDNqaNle4CmiJSI2JVUYRkvls';
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let readOnly = false;
let imageLoadedCount = 0;
let totalImages = 0;
function imageLoaded(e) {
  imageLoadedCount++;
  if (imageLoadedCount === totalImages) {
    readOnly = true;
    loader.hidden = true;
  }
}
function displayPhotos() {
  imageLoadedCount = 0;
  totalImages = photosArray.length;
  console.log('totalImages', totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank'
    });

    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description
    });
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.description);
    img.setAttribute('title', photo.description);
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get the data from the API
async function getPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    );
    photosArray = await response.json();
    displayPhotos();

    console.log(photosArray);
    return data;
  } catch (error) {}
}
//   Check to see if scroll near bottom of page
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readOnly
  ) {
    readOnly = false;
    getPhotos();
  }
});

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display the data
getPhotos();
