// Typing Effect for Hero Section
const typedTextSpan = document.querySelector(".typed-word");
const textArray = ["Developer.", "IT Enthusiast.", "Problem Solver.", "Tech Innovator."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Modal Logic
function openModal(title, desc, images) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    
    const imgContainer = document.getElementById('modalImgContainer');
    imgContainer.innerHTML = ''; // clear previous images
    
    // Ensure images is an array
    let imgArray = Array.isArray(images) ? images : [images];
    
    imgArray.forEach(src => {
        let img = document.createElement('img');
        img.src = src;
        img.alt = title;
        imgContainer.appendChild(img);
    });
    
    // Hide or show navigation buttons based on image count
    const prevBtn = document.getElementById('modalPrevBtn');
    const nextBtn = document.getElementById('modalNextBtn');
    
    if (imgArray.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    
    document.getElementById('projectModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function scrollModal(direction) {
    const container = document.getElementById('modalImgContainer');
    // Scroll by the width of the container
    const scrollAmount = container.clientWidth;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    let modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Function to download the existing CV PDF file
function downloadCV() {
    const pdfPath = encodeURI('file ni/Mark Bryan Delos Santos.pdf');
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'Mark Bryan Delos Santos.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
