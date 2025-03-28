// 1. Initial Variables
const customName = document.querySelector('#customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Helper function to get random value from an array
function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 2. Raw Text Strings
const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in wonder. Before they could :insertz:, they saw a :insertx: approaching. Bob saw the whole thing, but was not surprised — :inserty: weighs 300 pounds, and it was a hot day.';

const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// 3. Event Listener and Result Function
randomize.addEventListener('click', result);

function result() {
    // Create a new story each time
    let newStory = storyText;

    // Get random items from arrays
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    // Replace placeholders with random items
    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

    // Custom name replacement
    if (customName.value !== '') {
        newStory = newStory.replace('Bob', customName.value);
    }

    // UK conversion
    if (document.querySelector('#uk').checked) {
        // Convert 300 pounds to stones (1 stone = 14 pounds)
        const weight = Math.round(300 / 14) + ' stone';
        
        // Convert 94 fahrenheit to celsius ((F - 32) * 5/9)
        const temperature = Math.round((94 - 32) * 5/9) + ' centigrade';

        newStory = newStory.replace('94 fahrenheit', temperature);
        newStory = newStory.replace('300 pounds', weight);
    }

    // Display the story
    story.textContent = newStory;
}