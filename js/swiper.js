"use strict";
const dots = document.querySelectorAll(".dot-item");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let currentIndex = 0;
let dotLength = dots.length;
// .setAttribute("disabled", "");
function updateDot() {
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add("dot-active");
        }
        else {
            dot.classList.remove("dot-active");
        }
    });
}
if (currentIndex === 0) {
    prevBtn.setAttribute("disabled", "");
}
function nextReview() {
    prevBtn.removeAttribute("disabled");
    if (nextBtn.hasAttribute("disabled")) {
        currentIndex = dotLength - 1;
        return;
    }
    if (currentIndex === dotLength - 1) {
        nextBtn.setAttribute("disabled", "");
        return;
    }
    currentIndex++;
    updateDot();
}
function prevReview() {
    nextBtn.removeAttribute("disabled");
    if (prevBtn.hasAttribute("disabled")) {
        currentIndex = 0;
        return;
    }
    if (currentIndex === 0) {
        prevBtn.setAttribute("disabled", "");
        return;
    }
    currentIndex--;
    updateDot();
}
nextBtn.addEventListener("click", nextReview);
prevBtn.addEventListener("click", prevReview);
// fetching articles
