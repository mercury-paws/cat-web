import { renderCatArticle } from "./blog.js";
const dots = document.querySelectorAll(".dot-item") as NodeListOf<HTMLElement>;
const nextBtn = document.getElementById("nextBtn") as HTMLElement;
const prevBtn = document.getElementById("prevBtn")as HTMLElement;
let currentIndex = 0;
let dotLength = dots.length;

function updateDot() {
  dots.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.add("dot-active");
    } else {
      dot.classList.remove("dot-active");
    }
  });
}


function nextReview() {
    prevBtn.removeAttribute("disabled");

    if (nextBtn.hasAttribute("disabled")) {
        currentIndex = dotLength-1
        return;
    }
    if (currentIndex === dotLength-1) {
    nextBtn.setAttribute("disabled", "");
        return
    }
  currentIndex++;
  
  updateDot();
  renderCatArticle(currentIndex+1)
}

function prevReview() {
    nextBtn.removeAttribute("disabled");
    
   if (prevBtn.hasAttribute("disabled")) {
       currentIndex = 0;
        return;
    }
    if (currentIndex === 0) {
    prevBtn.setAttribute("disabled", "");
        return
    }
    currentIndex--;
  updateDot();
  renderCatArticle(currentIndex+1)
}

nextBtn.addEventListener("click", nextReview);
prevBtn.addEventListener("click", prevReview);

