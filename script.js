const memeImg = document.querySelector('.meme-img');
const loader = document.querySelector('.loader');

const showLoadingSpinner = () => {
  loader.hidden = false;
  memeImg.style.visibility = "hidden";
};

const removeLoadingSpinner = () => {
  if (loader.hidden === false) {
    loader.hidden = true;
    memeImg.style.visibility = "visible";
  }
};

const API_URL = "https://meme-api.com/gimme";

const getMeme = async () => {
  showLoadingSpinner();
  try {
    const response = await fetch(API_URL);
    const { url } = await response.json();

    const { width, height } = await getImageSize(url);

    console.log("Width:", width);
    console.log("Height:", height);

    if (width > 700 || height > 700) {
      const scaledWidth = width > 1500 ? width / 3 : width / 2;
      const scaledHeight = height > 1500 ? height / 3 : height / 2;
      memeImg.style.backgroundImage = `url(${url})`;
      memeImg.style.width = `${scaledWidth}px`;
      memeImg.style.height = `${scaledHeight}px`;   
    } else {
      memeImg.style.backgroundImage = `url(${url})`;
      memeImg.style.width = `${width}px`;
      memeImg.style.height = `${height}px`;
    }

    removeLoadingSpinner();
  } catch (e) {
    console.log(e);
  }
};

const getImageSize = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({ width, height });
    };

    img.onerror = function () {
      reject("Failed to load image");
    };

    img.src = url;
  });
};

document.querySelector('.btn-generate').addEventListener("click", () => {
  getMeme();
});

getMeme();
