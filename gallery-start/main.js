
// Declare an array of image filenames
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Declare an object with alternative text for each image
const alts = {
  'pic1.jpg': 'Closeup of a blue human eye',
  'pic2.jpg': 'Rock formation',
  'pic3.jpg': 'Purple and white flowers',
  'pic4.jpg': 'Ancient Egyptian wall painting',
  'pic5.jpg': 'Butterfly on a leaf'
};

// Get references to DOM elements
const displayedImg = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

// Looping through images
for (const image of images) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', alts[image]);
  thumbBar.appendChild(newImage);
  
  // Add click event listener to each thumbnail
  newImage.addEventListener('click', () => {
    displayedImg.src = `images/${image}`;
    displayedImg.alt = alts[image];
  });
}

// Add click event listener to the button
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