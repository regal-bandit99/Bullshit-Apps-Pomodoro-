// Initial timer values
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;

// Format time to display properly
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Update the display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('seconds').textContent = formatTime(seconds);
}

// Add at the top with your other initializations
const startSound = new Audio('./public/disco-fever-254485.mp3')
const endSound = new Audio('./public/space-trip-1979-video-game-soundtrack-electronic-instrumental-154872.mp3')
startSound.volume = 0.5
endSound.volume = 0.5

// Start the timer
function startTimer() {
    // Prevent multiple timers
    if (timerId) return;

    // Play start sound and stop it after 10 seconds
    startSound.play().catch(err => console.log('Audio play failed:', err));
    setTimeout(() => {
        startSound.pause();
        startSound.currentTime = 0;  // Reset sound to beginning
    }, 10000);  // 10 seconds in milliseconds
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        // Timer complete
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            endSound.play().catch(err => console.log('Audio play failed:', err));
            alert('Pomodoro complete! Take a break!');
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
}

// Add these new functions
function setWorkMode() {
    timeLeft = 25 * 60; // 25 minutes
    updateDisplay();
}

function setRestMode() {
    timeLeft = 5 * 60;  // 5 minutes
    updateDisplay();
} 