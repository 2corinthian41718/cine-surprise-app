/**
 * CineSurprise - Random Movie Suggestion App
 * Author: No Coder Praveen
 * Description: A web application that suggests random movies with details and dynamic UI
 */

// API Configuration
const API_KEY = 'a69ab82e8031d25dbe9a024c2ee0f356'; // TMDB API Key
const OMDB_API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=5c901442'; // OMDB API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Movie trivia data
const MOVIE_TRIVIA = [
    "The Matrix (1999) used approximately 12,000 thousand pieces of ammunition during filming.",
    "The Lion King (1994) was originally titled 'King of the Jungle' before they realized lions don't live in jungles.",
    "The iconic scene in Raiders of the Lost Ark where Indy shoots the swordsman was improvised due to Harrison Ford having food poisoning.",
    "The Pixar lamp and ball were the first computer animated short film, titled 'Luxo Jr.' (1986).",
    "The Lord of the Rings trilogy took eight years to make.",
    "The movie 'Titanic' cost more to make than the actual Titanic ship.",
    "The famous 'Wilhelm scream' sound effect has been used in over 400 films and TV series.",
    "Samuel L. Jackson requested a purple lightsaber in Star Wars so he could find himself in battle scenes.",
    "The original Psycho (1960) was the first American film to show a toilet flushing.",
    "E.T.'s face was modeled after poet Carl Sandburg, Albert Einstein, and a pug dog.",
    "Rajinikanth's 'Enthiran' (2010) was the most expensive Indian film at the time of its release.",
    "The iconic song 'Roja Janeman' from Roja (1992) was recorded in just one take by A.R. Rahman.",
    "Kamal Haasan spent nearly three years developing the ten different looks for 'Dasavatharam' (2008).",
    "The famous fight scene in 'Baahubali' took 120 days to shoot.",
    "'Sivaji' (2007) was the first Indian film to use the Swing-Shift process for its songs.",
    "Mani Ratnam's 'Nayakan' (1987) is listed in Time Magazine's 100 best films of all time.",
    "The climax scene of 'Indian' (1996) took 40 days to shoot due to Kamal Haasan's complex makeup.",
    "A.R. Rahman composed the entire soundtrack of 'Roja' (1992) in just 10 days."
];

// Color configuration for background effects
const COLOR_CONFIG = {
    mixFactor: 0.85,
    minBrightness: 200,
    saturationBoost: 1.3
};

// Food pairing data
const FOOD_PAIRINGS = {
    action: [
        {
            name: "Loaded Nachos",
            image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800",
            cuisine: "Mexican-American",
            ingredients: "Tortilla chips, cheese, ground beef, jalapeños, guacamole, sour cream, tomatoes",
            reason: "The bold, spicy flavors match the movie's high-energy action sequences",
            orderFrom: ["Uber Eats", "DoorDash", "Grubhub"]
        },
        {
            name: "Spicy Chicken 65",
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800",
            cuisine: "South Indian",
            ingredients: "Chicken, red chilies, curry leaves, ginger-garlic paste, yogurt, spices",
            reason: "This fiery dish perfectly complements action-packed sequences",
            orderFrom: ["Swiggy", "Zomato", "Local Indian Restaurants"]
        }
    ],
    drama: [
        {
            name: "Masala Dosa Platter",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800",
            cuisine: "South Indian",
            ingredients: "Rice batter, potatoes, onions, mustard seeds, curry leaves, coconut chutney, sambar",
            reason: "A comforting classic that pairs well with emotional storytelling",
            orderFrom: ["Swiggy", "Zomato", "Local South Indian Restaurants"]
        },
        {
            name: "Butter Chicken with Naan",
            image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800",
            cuisine: "North Indian",
            ingredients: "Chicken, tomatoes, cream, butter, spices, tandoori naan",
            reason: "Rich and indulgent flavors to complement dramatic moments",
            orderFrom: ["Swiggy", "Zomato", "Local Indian Restaurants"]
        }
    ],
    comedy: [
        {
            name: "Mumbai Chaat Platter",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
            cuisine: "Indian Street Food",
            ingredients: "Pani puri, bhel puri, sev puri, dahi puri, assorted chutneys",
            reason: "Fun, interactive street food perfect for light-hearted entertainment",
            orderFrom: ["Swiggy", "Zomato", "Local Chaat Centers"]
        },
        {
            name: "Pav Bhaji",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800",
            cuisine: "Maharashtra Street Food",
            ingredients: "Mixed vegetables, butter, pav bread, spices, onions, lemon",
            reason: "Casual, delicious comfort food for a fun movie experience",
            orderFrom: ["Swiggy", "Zomato", "Local Street Food Vendors"]
        }
    ],
    horror: [
        {
            name: "Andhra Style Chicken Curry",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
            cuisine: "South Indian",
            ingredients: "Chicken, red chilies, curry leaves, coconut, spices",
            reason: "Intensely spicy dish that matches the movie's heat",
            orderFrom: ["Swiggy", "Zomato", "Local Andhra Restaurants"]
        },
        {
            name: "Chettinad Fish Curry",
            image: "https://images.unsplash.com/photo-1626132647523-66d3a8c7f04c?w=800",
            cuisine: "Tamil Nadu",
            ingredients: "Fish, tamarind, red chilies, curry leaves, coconut, spices",
            reason: "Bold, aromatic flavors that complement intense scenes",
            orderFrom: ["Swiggy", "Zomato", "Local Tamil Restaurants"]
        }
    ]
};

// DOM Elements
const getMovieBtn = document.getElementById('getMovieBtn');
const movieContainer = document.getElementById('movieContainer');
const loader = document.getElementById('loader');
const errorElement = document.getElementById('error');
const tickerContent = document.querySelector('.ticker-content');

// Movie elements
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieRating = document.getElementById('movieRating');
const movieYear = document.getElementById('movieYear');
const moviePlot = document.getElementById('moviePlot');
const movieCast = document.getElementById('movieCast');
const streamingPlatforms = document.getElementById('streamingPlatforms');
const movieLanguage = document.getElementById('movieLanguage');
const movieGenres = document.getElementById('movieGenres');
const imdbRating = document.getElementById('imdbRating');
const videoContainer = document.getElementById('videoContainer');
const similarMovies = document.getElementById('similarMovies');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const carouselNext = document.querySelector('.carousel-btn.next');

// Color extraction setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Store current movie info
let currentMovie = null;

// Initialize movie trivia
function initializeMovieTrivia() {
    const trivia = MOVIE_TRIVIA.map(text => `<span class="ticker-item">🎬 ${text}</span>`).join('');
    tickerContent.innerHTML = trivia + trivia; // Duplicate for seamless loop
}

// Validate API Keys
function validateAPIKeys() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
        showError('Please add your TMDB API key in script.js');
        return false;
    }
    return true;
}

// Get random movie
async function getRandomMovie() {
    try {
        if (!validateAPIKeys()) return;

        showLoader();
        hideError();
        hideMovieContainer();

        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&certification_country=US&certification.lte=PG-13`;
        
        // Get total pages
        const response = await fetch(url);
        const data = await response.json();
        const totalPages = Math.min(data.total_pages, 500);
        
        // Get random page
        const randomPage = Math.floor(Math.random() * totalPages) + 1;
        const moviesResponse = await fetch(`${url}&page=${randomPage}`);
        const moviesData = await moviesResponse.json();

        // Get random movie
        const randomIndex = Math.floor(Math.random() * moviesData.results.length);
        const movie = moviesData.results[randomIndex];

        // Additional check for adult content
        if (movie.adult) {
            console.log('Adult content detected, fetching new movie...');
            return getRandomMovie();
        }

        // Get all movie details
        const [movieDetails, credits, watchProviders, videos, externalIds] = await Promise.all([
            getMovieDetails(movie.id),
            getMovieCredits(movie.id),
            getWatchProviders(movie.id),
            getMovieVideos(movie.id),
            getExternalIds(movie.id)
        ]);

        // Get IMDB rating
        let imdbData = null;
        if (externalIds.imdb_id) {
            imdbData = await getIMDBRating(externalIds.imdb_id);
        }

        // Get similar movies with adult content filter
        const similarMoviesData = await getSimilarMovies(movie.id);

        // Store the current movie
        currentMovie = movieDetails;

        // Update UI
        updateMovieUI(movieDetails, credits, watchProviders, videos, imdbData);
        updateSimilarMovies(similarMoviesData.filter(m => !m.adult));
        updateFoodPairing(movieDetails);
        
        hideLoader();
        showMovieContainer();
    } catch (error) {
        console.error('Error fetching movie:', error);
        showError('Something went wrong. Please try again.');
        hideLoader();
    }
}

// API helper functions
async function getMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.json();
}

async function getMovieCredits(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.json();
}

async function getWatchProviders(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
    return response.json();
}

async function getMovieVideos(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    return response.json();
}

async function getExternalIds(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/external_ids?api_key=${API_KEY}`);
    return response.json();
}

async function getIMDBRating(imdbId) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch IMDB rating');
        return response.json();
    } catch (error) {
        console.error('Error fetching IMDB rating:', error);
        return null;
    }
}

// Color extraction functions
function getAverageColor(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < imageData.length; i += 16) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
    }

    return {
        r: Math.floor(r / count),
        g: Math.floor(g / count),
        b: Math.floor(b / count)
    };
}

function createMildColor(color) {
    let { r, g, b } = color;
    
    const avg = (r + g + b) / 3;
    r = Math.floor(r + (r - avg) * COLOR_CONFIG.saturationBoost);
    g = Math.floor(g + (g - avg) * COLOR_CONFIG.saturationBoost);
    b = Math.floor(b + (b - avg) * COLOR_CONFIG.saturationBoost);

    r = Math.floor(r * (1 - COLOR_CONFIG.mixFactor) + 255 * COLOR_CONFIG.mixFactor);
    g = Math.floor(g * (1 - COLOR_CONFIG.mixFactor) + 255 * COLOR_CONFIG.mixFactor);
    b = Math.floor(b * (1 - COLOR_CONFIG.mixFactor) + 255 * COLOR_CONFIG.mixFactor);

    return {
        r: Math.max(r, COLOR_CONFIG.minBrightness),
        g: Math.max(g, COLOR_CONFIG.minBrightness),
        b: Math.max(b, COLOR_CONFIG.minBrightness)
    };
}

function updateBackgroundColor(color) {
    const { r, g, b } = color;
    const rgbaColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
    document.body.style.backgroundColor = rgbaColor;
    document.body.style.backgroundImage = `linear-gradient(45deg, rgba(${r}, ${g}, ${b}, 0.2), rgba(${r}, ${g}, ${b}, 0.4))`;
}

// UI update functions
function updateMovieUI(movie, credits, watchProviders, videos, imdbData) {
    // Update poster and extract color
    const posterUrl = movie.poster_path 
        ? `${POSTER_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450.png?text=No+Poster+Available';
    
    // Create a new image element for color extraction
    const posterImg = new Image();
    posterImg.crossOrigin = "Anonymous";
    posterImg.src = posterUrl;
    
    posterImg.onload = function() {
        const avgColor = getAverageColor(posterImg);
        const mildColor = createMildColor(avgColor);
        updateBackgroundColor(mildColor);
        
        // Update the visible poster after color extraction
        moviePoster.src = posterUrl;
    };
    
    // Update title with animation
    movieTitle.style.opacity = '0';
    setTimeout(() => {
        movieTitle.textContent = movie.title;
        movieTitle.style.opacity = '1';
    }, 300);

    // Update movie details
    movieYear.textContent = new Date(movie.release_date).getFullYear();
    movieLanguage.textContent = new Intl.DisplayNames(['en'], { type: 'language' }).of(movie.original_language.toUpperCase());
    movieGenres.textContent = movie.genres.map(genre => genre.name).join(', ');
    movieRating.textContent = `★ ${movie.vote_average.toFixed(1)}/10`;
    imdbRating.textContent = (imdbData && imdbData.imdbRating !== "N/A") ? `★ ${imdbData.imdbRating}/10` : 'N/A';
    moviePlot.textContent = movie.overview || 'No plot description available.';
    movieCast.textContent = credits.cast.slice(0, 5).map(actor => actor.name).join(', ') || 'Cast information not available.';

    // Update video and streaming info
    updateVideoPlayer(videos);
    updateStreamingPlatforms(watchProviders);

    // Add food pairing update
    updateFoodPairing(movie);
}

function updateVideoPlayer(videos) {
    videoContainer.innerHTML = '';
    
    if (videos.results && videos.results.length > 0) {
        const video = videos.results.find(v => v.type === "Trailer") || 
                     videos.results.find(v => v.type === "Teaser") || 
                     videos.results[0];
        
        if (video) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${video.key}`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        } else {
            videoContainer.textContent = 'No trailer available';
        }
    } else {
        videoContainer.textContent = 'No trailer available';
    }
}

function updateStreamingPlatforms(watchProviders) {
    streamingPlatforms.innerHTML = '';
    
    if (watchProviders.results && watchProviders.results.US) {
        const providers = watchProviders.results.US.flatrate || [];
        if (providers.length > 0) {
            providers.forEach(provider => {
                const badge = document.createElement('span');
                badge.className = 'platform-badge';
                badge.textContent = provider.provider_name;
                streamingPlatforms.appendChild(badge);
            });
        } else {
            streamingPlatforms.textContent = 'No streaming information available.';
        }
    } else {
        streamingPlatforms.textContent = 'No streaming information available.';
    }
}

// Similar movies functions
async function getSimilarMovies(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&include_adult=false`);
        const data = await response.json();
        return data.results.slice(0, 10).filter(movie => !movie.adult);
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return [];
    }
}

function updateSimilarMovies(movies) {
    similarMovies.innerHTML = '';
    movies.forEach(movie => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${movie.poster_path ? POSTER_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300'}" 
                 alt="${movie.title}">
            <div class="carousel-item-info">
                <h4>${movie.title}</h4>
                <span>${new Date(movie.release_date).getFullYear()}</span>
            </div>
        `;
        item.addEventListener('click', () => loadMovie(movie.id));
        similarMovies.appendChild(item);
    });
}

// Carousel navigation
let scrollAmount = 0;
carouselNext.addEventListener('click', () => {
    scrollAmount += 220;
    similarMovies.scrollLeft = scrollAmount;
});

carouselPrev.addEventListener('click', () => {
    scrollAmount -= 220;
    similarMovies.scrollLeft = scrollAmount;
});

// UI Helper Functions
function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError(message) {
    errorElement.querySelector('p').textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
}

function showMovieContainer() {
    movieContainer.classList.remove('hidden');
}

function hideMovieContainer() {
    movieContainer.classList.add('hidden');
}

// Event Listeners
getMovieBtn.addEventListener('click', () => {
    console.log('Fetching new random movie...');
    getRandomMovie();
});

function updateFoodPairing(movie) {
    try {
        const foodPairingSection = document.querySelector('.food-pairing');
        if (!foodPairingSection) return;

        const primaryGenre = movie.genres[0]?.name.toLowerCase() || 'drama';
        
        // Map movie genre to food pairing category
        let foodCategory = 'drama'; // default
        if (primaryGenre.includes('action') || primaryGenre.includes('adventure')) {
            foodCategory = 'action';
        } else if (primaryGenre.includes('comedy')) {
            foodCategory = 'comedy';
        } else if (primaryGenre.includes('horror') || primaryGenre.includes('thriller')) {
            foodCategory = 'horror';
        }

        // Get random food pairing from the category
        const foodOptions = FOOD_PAIRINGS[foodCategory];
        if (!foodOptions || foodOptions.length === 0) {
            console.error('No food options found for category:', foodCategory);
            return;
        }

        const foodPairing = foodOptions[Math.floor(Math.random() * foodOptions.length)];

        // Update the UI with error handling for image
        const foodImage = document.getElementById('foodImage');
        if (!foodImage) return;

        foodImage.onerror = function() {
            this.src = 'https://via.placeholder.com/800x600?text=Food+Image+Not+Available';
        };
        foodImage.src = foodPairing.image;

        const foodName = document.getElementById('foodName');
        const foodCuisine = document.getElementById('foodCuisine');
        const foodIngredients = document.getElementById('foodIngredients');
        const foodPairingReason = document.getElementById('foodPairingReason');
        const orderPlatforms = document.getElementById('orderPlatforms');

        if (foodName) foodName.textContent = foodPairing.name;
        if (foodCuisine) foodCuisine.textContent = `Cuisine: ${foodPairing.cuisine}`;
        if (foodIngredients) foodIngredients.textContent = `Ingredients: ${foodPairing.ingredients}`;
        if (foodPairingReason) foodPairingReason.textContent = foodPairing.reason;
        if (orderPlatforms) {
            orderPlatforms.innerHTML = foodPairing.orderFrom.map(platform => 
                `<span class="order-platform">${platform}</span>`
            ).join('');
        }

        foodPairingSection.classList.remove('hidden');
    } catch (error) {
        console.error('Error updating food pairing:', error);
    }
}

// Initialize the app
console.log('Initializing CineSurprise...');
initializeMovieTrivia();
getRandomMovie(); 