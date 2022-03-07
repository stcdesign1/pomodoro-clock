
// - bug - when I start/pause or start/reset fast the timer breaks, change setInterval to date Object

const start = document.querySelector('.button__start-stop');
const reset = document.querySelector('.button__reset');
const breakUp = document.querySelector('.js-break-up');
const breakDown = document.querySelector('.js-break-down');
const sessionUp = document.querySelector('.js-session-up');
const sessionDown = document.querySelector('.js-session-down');
const sound = document.querySelector('.beep');
const displaySeconds1 = document.querySelector('.time-seconds-js--1');
const displaySeconds2 = document.querySelector('.time-seconds-js--2');
const displayMinutes1 = document.querySelector('.time-minutes-js--1');
const displayMinutes2 = document.querySelector('.time-minutes-js--2');
const breakLength = document.querySelector('.break-length');
const sessionLength = document.querySelector('.session-length');
const startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16">                  
<path id="play_cr" class="cls-1" d="M358,43l5-3-5-3v6Zm2-11a8,8,0,1,0,8,8A8.009,8.009,0,0,0,360,32Zm0,14a6,6,0,1,1,6-6A6,6,0,0,1,360,46Z" transform="translate(-352 -32)"/>
</svg>
Start`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16">
<path id="pause_cr" class="cls-1" d="M488,32a8,8,0,1,0,8,8A8.009,8.009,0,0,0,488,32Zm0,14a6,6,0,1,1,6-6A6,6,0,0,1,488,46Zm-3-3h2V37h-2v6Zm4,0h2V37h-2v6Z" transform="translate(-480 -32)"/>
</svg>Pause`;

function PomodoroTimer() {
    this.sessionDefault = 25;
    this.minutes = this.sessionDefault;
    this.seconds = this.minutes * 60;
    this.breakDefault = 5;
    this.breakMinutes = this.breakDefault;
    this.breakSeconds = this.breakMinutes * 60;
    this.paused = true;
    this.reset = false;
    this.startCounter = 0;
    this.breakCounter = 1;
    this.breakStarted = false;
}

// session countdown timer
PomodoroTimer.prototype.countdown = function() { 
    this.reset = false;
    var timer;

    // check if session is active, i.e. if break hasn't started
    if (this.breakStarted == false) {
        this.startCounter++;
        if (this.startCounter % 2 == 0) {
            this.paused = true;
            start.innerHTML = startIcon;
        } else {
            this.paused = false;
            start.innerHTML = pauseIcon;
        }

        // play sound when session timer reaches zero
        timer = setInterval(() => {
            if (this.seconds == 0) {
                sound.play();
            }

            // decrement session time and change session time on screen, call break timer at 0
            if (this.seconds > 0 && this.paused == false && this.reset == false) {
                this.seconds--;
                this.minutes = Math.floor(this.seconds / 60);
                this.displayTime(this.minutes, (this.seconds % 60));
            } else if (this.minutes == 0 && this.paused == false) {
                this.minutes = this.sessionDefault;
                this.seconds = this.minutes * 60;
                this.breakStarted = true;
                this.breakCounter--;
                this.breakCountdown();
                clearInterval(timer);
            } else {
                clearInterval(timer);
            }
        }, 1000);
    } 
 };

// change session and break time values on screen
PomodoroTimer.prototype.displayTime = function(minutes, seconds) {
    if (minutes < 10 && seconds < 10) {
        displayMinutes1.innerHTML = '0';
        displayMinutes2.innerHTML = `${minutes}`;
        displaySeconds1.innerHTML = '0';
        displaySeconds2.innerHTML = `${seconds}`;
        console.log(`0${minutes} : 0${seconds}`);
     } else if (minutes < 10) {
        displayMinutes1.innerHTML = '0';
        displayMinutes2.innerHTML = `${minutes}`;
        displaySeconds1.innerHTML = `${seconds}`.charAt(0);
        displaySeconds2.innerHTML = `${seconds}`.charAt(1);
        console.log(`0${minutes} : ${seconds}`);
     } else if ((seconds) < 10) {
        displayMinutes1.innerHTML = `${minutes}`.charAt(0);
        displayMinutes2.innerHTML = `${minutes}`.charAt(1);
        displaySeconds1.innerHTML = '0';
        displaySeconds2.innerHTML = `${seconds}`;
        console.log(`${minutes} : 0${seconds}`);
     } else {
        displayMinutes1.innerHTML = `${minutes}`.charAt(0);
        displayMinutes2.innerHTML = `${minutes}`.charAt(1);
        displaySeconds1.innerHTML = `${seconds}`.charAt(0);
        displaySeconds2.innerHTML = `${seconds}`.charAt(1);
        console.log(`${minutes} : ${seconds}`);
     }
}

// reset countdown timer
PomodoroTimer.prototype.resetBtn = function() {
    this.reset = true;
    this.paused = true;
    this.minutes = this.sessionDefault;
    this.seconds = this.minutes * 60;
    this.breakMinutes = this.breakDefault;
    this.breakSeconds = this.breakMinutes * 60;
    this.startCounter = 0;
    this.breakCounter = 1;
    this.breakStarted = false;

    // reset all numbers displayed on screen to their default values
    displayMinutes1.innerHTML = '2';
    displayMinutes2.innerHTML = '5';
    displaySeconds1.innerHTML = '0';
    displaySeconds2.innerHTML = '0';
    breakLength.innerHTML = '5min';
    sessionLength.innerHTML = '25min';

    // reset start button text if paused
    start.innerHTML = startIcon;
}

// break countdown timer
PomodoroTimer.prototype.breakCountdown = function() {
    console.log(this)
    if (this.breakStarted) {
        this.breakCounter++;
        if (this.breakCounter % 2 == 0) {
            this.paused = true;
            start.innerHTML = startIcon;
        } else {
            this.paused = false;
            start.innerHTML = pauseIcon;
        }

        // play sound when break timer reaches zero
        var timer = setInterval(() => {
            if (this.breakSeconds == 0 && this.paused == false && this.reset == false) {
                sound.play();
            }

            // decrement break time and change break time on screen, call session timer at 0
            if (this.breakSeconds > 0 && this.paused == false && this.reset == false) {
                this.breakSeconds--;
                this.breakMinutes = Math.floor(this.breakSeconds / 60);
                this.displayTime(this.breakMinutes, this.breakSeconds % 60);
            } else if (this.breakSeconds == 0 && this.paused == false) {
                this.breakStarted = false;
                this.breakMinutes = this.breakDefault;
                this.breakSeconds = this.breakMinutes * 60;
                this.startCounter = 0;
                this.breakCounter = 1;
                this.countdown();
                clearInterval(timer);
            } else {
                clearInterval(timer);
            }
            
        }, 1000);
    }
    
}

PomodoroTimer.prototype.increaseBreak = function() {
    if (this.paused == true && this.breakSeconds < 3600) {
        this.breakSeconds = this.breakSeconds + 60;
        this.breakMinutes = Math.floor(session.breakSeconds / 60);
        breakLength.innerHTML = `${this.breakMinutes}min`;

        if (this.breakStarted == true) {
            this.displaySessionAndBreakLength(this.breakMinutes);
        }
    }
}

PomodoroTimer.prototype.decreaseBreak = function() {
    if (this.paused == true && this.breakSeconds > 59) {
        this.breakSeconds = this.breakSeconds - 60;
        this.breakMinutes = Math.floor(session.breakSeconds / 60);
        breakLength.innerHTML = `${this.breakMinutes}min`;

        if (this.breakStarted == true) {
            this.displaySessionAndBreakLength(this.breakMinutes);
        }
    }
}

PomodoroTimer.prototype.increaseSession = function() {
    if (this.paused == true && this.seconds < 3600) {
        this.seconds = this.seconds + 60;
        this.minutes = Math.floor(this.seconds / 60);
        sessionLength.innerHTML = `${this.minutes}min`;
        
        if (this.breakStarted == false) {
            this.displaySessionAndBreakLength(this.minutes);
        }  
    }
}

PomodoroTimer.prototype.decreaseSession = function() {
    if (this.paused == true && this.seconds > 59) {
        this.seconds = this.seconds - 60;
        this.minutes = Math.floor(this.seconds / 60);
        sessionLength.innerHTML = `${this.minutes}min`;

        if (this.breakStarted == false) {
            this.displaySessionAndBreakLength(this.minutes);
        }
    }
}

PomodoroTimer.prototype.displaySessionAndBreakLength = function(minutes) {
    if (minutes < 10) {
        displayMinutes1.innerHTML = '0';
        displayMinutes2.innerHTML = `${minutes}`;
    } else {
        displayMinutes1.innerHTML = `${minutes}`.charAt(0);
        displayMinutes2.innerHTML = `${minutes}`.charAt(1);
    }
}

var session = new PomodoroTimer();


// =======================
// EVENT LISTENERS
// =======================

start.addEventListener('click', session.countdown.bind(session));
start.addEventListener('click', session.breakCountdown.bind(session));
reset.addEventListener('click', session.resetBtn.bind(session));
sessionUp.addEventListener('click', session.increaseSession.bind(session));
sessionDown.addEventListener('click', session.decreaseSession.bind(session));
breakUp.addEventListener('click', session.increaseBreak.bind(session));
breakDown.addEventListener('click', session.decreaseBreak.bind(session));



