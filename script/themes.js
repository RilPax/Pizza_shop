const lightBtn = document.querySelector('.button-type-light');
const darkBtn = document.querySelector('.button-type-dark');
const autoMode = document.querySelector('.button-type-auto');

const root = document.documentElement; 

function setLightTheme() {
    root.classList.add('light-mode');
    root.classList.remove('dark-mode');
}

function setDarkTheme() {
    root.classList.add('dark-mode');
    root.classList.remove('light-mode');
}


function setAutoTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}


function setupAutoThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', setAutoTheme); 
}


lightBtn.addEventListener('click', () => {
    setLightTheme();
    lightBtn.classList.add('active');
    darkBtn.classList.remove('active');
    autoMode.classList.remove('active');
});

darkBtn.addEventListener('click', () => {
    setDarkTheme();
    darkBtn.classList.add('active');
    lightBtn.classList.remove('active');
    autoMode.classList.remove('active');
});

autoMode.addEventListener('click', () => {
    setAutoTheme();
    setupAutoThemeListener();
    autoMode.classList.add('active');
    lightBtn.classList.remove('active');
    darkBtn.classList.remove('active');
});


setAutoTheme();