const words = ["Software Engineer", "Researcher"];
const typewriter = document.getElementById("typewriter");

let wordIndex = 0;
let charIndex = 0;
let currentWord = '';
let isDeleting = false;

function typeEffect() {
    currentWord = words[wordIndex]; // FIXED: was currentword
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    typewriter.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 40 : 100;

    // FIXED: currentWord.length (not Length)
    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200; // wait before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        speed = 500; // wait before typing next
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// Blur loading effect
const bg = document.querySelector('.bg');
let load = 0;

function blurring() {
    load++;
    if (load > 99) return;
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    requestAnimationFrame(blurring);
}
function scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
blurring();


// Skills Progress Bar Animation
function animateSkills() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Trigger animation when skills section is visible
function handleScrollAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillsRect = skillsSection.getBoundingClientRect();
    
    if (skillsRect.top < window.innerHeight * 0.8) {
        animateSkills();
        window.removeEventListener('scroll', handleScrollAnimation);
    }
}

// Add scroll listener
window.addEventListener('scroll', handleScrollAnimation);

// Also trigger on page load if already visible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(handleScrollAnimation, 500);
    });
} else {
    setTimeout(handleScrollAnimation, 500);
}


// Dark mode toggle functionality
const themeToggle = document.querySelector('nav ul li.right i');
const html = document.documentElement;
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function initTheme(){
    if(isDarkMode){
        html.classList.add('dark-mode');
        themeToggle.className = 'fa-solid fa-sun';
    } else {
        html.classList.remove('dark-mode');
        themeToggle.className = 'fa-solid fa-moon';
    }
}

function toggleTheme(){
    isDarkMode = !isDarkMode;
    html.classList.toggle('dark-mode');

    if (isDarkMode){
        themeToggle.className = 'fa-solid fa-sun';
        localStorage.setItem = ('darkMode','true')
    }
    else{
        themeToggle.className = 'fa-solid fa-moon';
        localStorage.removeItem('darkMode');
    }

}

themeToggle.addEventListener('click',toggleTheme);

// Initialize theme on page load
initTheme();