// Select elements from the HTML
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Function to return a random value from an array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Define the story template and insert arrays
const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ["Wacky startup employee", "Local politician", "Overzealous dog walker"];
const insertY = ["the abandoned warehouse", "the moon", "the bottom of the ocean"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Add event listener to the generate button
randomize.addEventListener('click', result);

// Function to generate and display the story
function result() {
  // Start with the original story text
  let newStory = storyText;

  // Select random items from each array
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // Replace placeholders with random selections
  newStory = newStory.replace(/:insertx:/g, xItem); // :insertx: appears twice, so use global replace
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

  // Replace 'Bob' with custom name if provided
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace(/Bob/g, name);
  }

  // Convert to UK units if UK radio button is selected
  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + ' stone';          // 300 pounds to stone (1 stone = 14 pounds)
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade'; // 94°F to Celsius
    newStory = newStory.replace('300 pounds', weight);
    newStory = newStory.replace('94 fahrenheit', temperature);
  }

  // Display the story and make it visible
  story.textContent = newStory;
  story.style.visibility = 'visible';
}