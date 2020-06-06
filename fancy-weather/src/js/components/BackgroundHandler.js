// https://unsplash.com/documentation

const API_KEY = '4EHFU1PJFteXWJSH7FYI_K2SIpSD4_u7kSG2ddVq_Z8';
const REQUEST_URL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature+summer&client_id=${API_KEY}`;

async function getImageURL() {
  const response = await fetch(REQUEST_URL);
  const { urls: { regular } } = await response.json();
  return regular;
}

async function setBackgroundImage() {
  try {
    const backgroundImageURL = await getImageURL();
    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageURL;
    backgroundImage.addEventListener('load', () => {
      document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,1) 7%, rgba(0,0,0,0.4) 27%), url(${backgroundImage.src})`;
    });
  } catch (error) {
    document.body.style.backgroundImage = 'linear-gradient(0deg, rgba(0,0,0,1) 7%, rgba(0,0,0,0.4) 27%), url("https://images.unsplash.com/photo-1421284621639-884f4129b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")';
  }
}

export default {
  setBackgroundImage,
};
