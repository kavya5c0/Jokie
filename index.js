let jokes = []; // Array to store fetched jokes
let currentJokeIndex = -1; // Index of the current joke being displayed
let savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || []; // Array to store saved jokes
let likedJokes = JSON.parse(localStorage.getItem('likedJokes')) || []; // Array to store liked jokes

// Event listener for "Get Joke" button click
document.getElementById('getJokeBtn').addEventListener('click', getJoke);

// Event listener for "Save Joke" button click
document.getElementById('saveJokeBtn').addEventListener('click', saveJoke);

// Event listener for "Like Joke" button click
document.getElementById('likeJokeBtn').addEventListener('click', likeJoke);

// Event listener for "Previous Joke" button click
document.getElementById('previousJokeBtn').addEventListener('click', previousJoke);

// Event listener for "Next Joke" button click
document.getElementById('nextJokeBtn').addEventListener('click', nextJoke);

// Function to fetch jokes from the API
async function fetchJokes() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        jokes.push(data.value);
        currentJokeIndex = jokes.length - 1;
    } catch (error) {
        console.error('Error fetching jokes:', error);
    }
}

// Function to display the joke at the current index
function displayJoke() {
    if (jokes.length === 0) {
        alert('No jokes available. Please try again later.');
        return;
    }
    const jokeElement = document.getElementById('joke');
    jokeElement.textContent = jokes[currentJokeIndex];
}

// Function to save the current joke to favorites
function saveJoke() {
    if (currentJokeIndex !== -1) {
        const savedJoke = jokes[currentJokeIndex];
        savedJokes.push(savedJoke);
        localStorage.setItem('savedJokes', JSON.stringify(savedJokes));
        displaySavedJokes();
    }
}

// Function to like the current joke
function likeJoke() {
    if (currentJokeIndex !== -1) {
        const likedJoke = jokes[currentJokeIndex];
        likedJokes.push(likedJoke);
        localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
        displayLikedJokes();
    }
}

// Function to display the previous joke
function previousJoke() {
    if (currentJokeIndex > 0) {
        currentJokeIndex--;
        displayJoke();
    }
}

// Function to display the next joke
function nextJoke() {
    if (currentJokeIndex < jokes.length - 1) {
        currentJokeIndex++;
        displayJoke();
    } else {
        fetchJokes().then(displayJoke);
    }
}

// Function to display saved jokes
function displaySavedJokes() {
    const savedJokesList = document.getElementById('savedJokesList');
    savedJokesList.innerHTML = '';
    savedJokes.forEach(joke => {
        const li = document.createElement('li');
        li.textContent = joke;
        savedJokesList.appendChild(li);
    });
}

// Function to display liked jokes
function displayLikedJokes() {
    const likedJokesList = document.getElementById('likedJokesList');
    likedJokesList.innerHTML = '';
    likedJokes.forEach(joke => {
        const li = document.createElement('li');
        li.textContent = joke;
        likedJokesList.appendChild(li);
    });
}

// Function to fetch a joke and display it
async function getJoke() {
    await fetchJokes();
    displayJoke();
}

// Initial fetch of a joke on page load
getJoke();

// Display saved jokes and liked jokes on page load
displaySavedJokes();
displayLikedJokes();
