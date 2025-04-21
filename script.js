let timeLeft;
let timerId;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode-btn');

// To-do list functionality
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Initialize timer with default 25 minutes
function initializeTimer(minutes) {
    timeLeft = minutes * 60;
    updateDisplay();
}

// Update the time display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                // Play a sound or show notification when timer ends
                alert('Time is up!');
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    const activeMode = document.querySelector('.mode-btn.active');
    const minutes = parseInt(activeMode.dataset.time);
    initializeTimer(minutes);
}

// Switch between modes
function switchMode(event) {
    const button = event.target;
    if (!button.classList.contains('active')) {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Remove all mode classes from body
        document.body.classList.remove('work-mode', 'short-break', 'long-break');
        
        // Add appropriate mode class based on button text
        if (button.textContent === 'Work Mode') {
            document.body.classList.add('work-mode');
        } else if (button.textContent === 'Short Break') {
            document.body.classList.add('short-break');
        } else if (button.textContent === 'Long Break') {
            document.body.classList.add('long-break');
        }
        
        // Reset timer with new time
        const minutes = parseInt(button.dataset.time);
        initializeTimer(minutes);
    }
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeButtons.forEach(button => button.addEventListener('click', switchMode));

// Add task when clicking the Add button
addTaskButton.addEventListener('click', addTask);

// Add task when pressing Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize timer on page load
initializeTimer(25);

// Initialize with work mode
document.body.classList.add('work-mode');

// Peter Thiel quotes
const quotes = [
    "The best entrepreneurs know this: every great business is built around a secret that's hidden from the outside.",
    "Competition is for losers. If you want to create and capture lasting value, look to build a monopoly.",
    "The most valuable businesses of coming decades will be built by entrepreneurs who seek to empower people rather than try to make them obsolete.",
    "The most unhelpful question you can ask is: how can I make money? The most helpful question is: what valuable company is nobody building?",
    "The best projects are likely to be overlooked, not trumpeted by a crowd; the best problems to work on are often the ones nobody else even tries to solve.",
    "Brilliant thinking is rare, but courage is in even shorter supply than genius.",
    "The most important thing to do is to focus on the future. If you are working on something that you think will be successful in 10 years, others are probably not working on it.",
    "The best entrepreneurs know this: every great business is built around a secret that's hidden from the outside.",
    "The most valuable companies in the future won't ask what problems can be solved with computers alone. Instead, they'll ask: how can computers help humans solve hard problems?",
    "The best entrepreneurs know this: every great business is built around a secret that's hidden from the outside."
];

// Get the quote element
const quoteText = document.querySelector('.quote-text');

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update the quote
function updateQuote() {
    const today = new Date();
    const lastUpdate = localStorage.getItem('lastQuoteUpdate');
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate) : null;
    
    // Check if we need to update the quote (new day or first time)
    if (!lastUpdateDate || today.getDate() !== lastUpdateDate.getDate()) {
        const newQuote = getRandomQuote();
        quoteText.textContent = newQuote;
        localStorage.setItem('lastQuoteUpdate', today.toISOString());
        localStorage.setItem('currentQuote', newQuote);
    } else {
        // Use the stored quote
        quoteText.textContent = localStorage.getItem('currentQuote');
    }
}

// Initialize the quote
updateQuote();

// Set up a daily check for quote updates
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        updateQuote();
    }
}, 60000); // Check every minute

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteButton);
        
        taskList.appendChild(taskItem);
        taskInput.value = '';
        
        // Add event listeners
        checkbox.addEventListener('change', () => {
            taskItem.classList.toggle('completed', checkbox.checked);
        });
        
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
        });
    }
} 