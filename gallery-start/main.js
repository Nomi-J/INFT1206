const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'pic1.jpg': 'Closeup of a blue human eye',
    'pic2.jpg': 'A beautiful landscape',
    'pic3.jpg': 'A cute puppy',
    'pic4.jpg': 'A city skyline at night',
    'pic5.jpg': 'A serene beach'
  };
/* Looping through images */
for (const filename of imageFilenames) {

    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${filename}`);
    newImage.setAttribute('alt', imageAltTexts[filename]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', () => {
      displayedImg.src = `images/${filename}`;
      displayedImg.alt = imageAltTexts[filename];
    });
  }

/* Wiring up the Darken/Lighten button */
thumbBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      const displayedImg = document.querySelector('.displayed-img');
      displayedImg.setAttribute('src', event.target.getAttribute('src'));
      displayedImg.setAttribute('alt', event.target.getAttribute('alt'));
    }
  });

// Add click event listener for darken/lighten button
  btn.addEventListener('click', () => {
    const currentClass = btn.getAttribute('class');
    if (currentClass === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
  });