const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTime1 = document.getElementById('current-time');
const duration1 = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name:'music1',
        displayName:"Tumhare Hi Rahenge Hum",
        artist:"by Sachin-Jigar, Varun Jain, Shilpa Rao, and Amitabh Bhattacharya"
    },
    {
        name:'music2',
        displayName:"Chuttamalle (From) 'Devara Part'",
        artist:"by Shilpa Rao, Anirudh Ravichander, and Ramajogayya Sastry"
    },
    {
        name:'music3',
        displayName:"Meet",
        artist:"by Sachin-Jigar, and Arijit Singh"
    },
    {
        name:'music4',
        displayName:"Apna Bana Le",
        artist:"by Sachin-Jigar, Arijit Singh, and Amitabh Bhattacharya"
    },
    {
        name:'music5',
        displayName:"Pasoori",
        artist:"by Shae Gill, and Ali Sethi"
    },
    {
        name:'music6',
        displayName:"Heroine",
        artist:"by R Jay Kang, Neelkamal Singh, and Arun Bihari"
    },
    {
        name:'music7',
        displayName:"Palang Sagwan Ke",
        artist:"by Khesari Lal Yadav, Chhote Baba, and Indu Sonali"
    },
    {
        name:'music8',
        displayName:"Millionaire",
        artist:"by Yo Yo Honey Singh"
    },
    {
        name:'music9',
        displayName:"Desi Kalakaar",
        artist:"by Yo Yo Honey Singh"
    },
    {
        name:'music10',
        displayName:"Big Dawgs",
        artist:"by Hanumankind, and Kalmi"
    }
]

// Check if playing
let isPlaying = false;

//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','pause')
    music.play()
}

//Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','play')
    music.pause()
}

//play or pause Event Listener
playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));


//update Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpeg`;
}

// Current Song
let songIndex = 0;

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - select first song
loadSong(songs[songIndex])

//update progrees bar & time
function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        //update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // calculate display or duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }

        //Delay switching Element to avoid NaN
        if(durationSeconds){
            duration1.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Display or current Time
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTime1.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//set Progress bar 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}


//Event Listners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);

//this is optional

// List of colors to cycle through
const colors = ['#0BDA51','#AA88AA','#317873','#FF004F','#00FFBF', '#667F8F', '#0085A3', '#926AA0', '#827283', '#007FFF','#324AB2','#CCCCFF'];

// Variable to keep track of the current color index
let currentColorIndex = 0;

// Get references to the DOM elements
const musicCard = document.getElementById('musicCard');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

// Function to change the background color
function changeBackgroundColor() {
    // Update the color index to the next one in the list
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    // Set the background color of the card
    musicCard.style.backgroundColor = colors[currentColorIndex];
}

// Add event listeners to the buttons
next.addEventListener('click', () => {
    // Logic to play the next song can go here
    changeBackgroundColor(); // Change the card's background color
});

prev.addEventListener('click', () => {
    // Logic to play the previous song can go here
    changeBackgroundColor(); // Change the card's background color
});

