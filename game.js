document.addEventListener("DOMContentLoaded", function () {
  let score = 0;
  let mistakeCounter = 0;
  const MAX_MISTAKES = 3; 
  let gameActive = true; // A flag to indicate if the game is active or stopped
  const scoreElement = document.getElementById("scoreValue");
  const circle = document.getElementById("circle");
  const circleArea = document.getElementById("popupCircle");
  var popup = document.getElementById("myPopup");
  const shifts = ["Left Click", "Right Click"];

 

  function generateFlowerParticle() {
    const flower = document.createElement("span");
    flower.classList.add("flower-particle");
    flower.innerHTML = "🌸"; // You can use any flower emoji or image here
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);
    flower.style.left = `${randomX}px`;
    flower.style.top = `${randomY}px`;
    document.body.appendChild(flower);
  
    // Remove the flower after a short delay
    setTimeout(() => {
      flower.remove();
    }, 50000);
  }


  function generateDangerParticle() {
    const danger = document.createElement("span");
    danger.classList.add("danger-particle");
    danger.innerHTML = "❗"; // You can use any danger image or emoji here
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);
    danger.style.left = `${randomX}px`;
    danger.style.top = `${randomY}px`;
    document.body.appendChild(danger);
  
    // Remove the danger particle after a short delay
    setTimeout(() => {
      danger.remove();
    }, 50000);
  }

  
  function updateScore(points) {
    if (!gameActive) return;  // Do not update the score if the game is stopped

    score += points;
    scoreElement.textContent = score;
    if (score >= 500) {
      gameActive = false; // Stop the game
      popup.innerHTML = "You are Win";
      // Trigger flower particles
    for (let i = 0; i < 50; i++) { // Adjust the number of particles as needed
      generateFlowerParticle();
    }

    setTimeout(function () {
      popup.innerHTML = ""; // Clear the popup after some time
    }, 50000);
      popup.style.backgroundColor = "gold";
      popup.style.width = "250px";
      popup.style.height = "50px";
      popup.style.textAlign = "center";
      popup.style.fontSize = "24px";
      popup.style.boxShadow = "2px 2px 20px #E0FFFF";
      popup.style.padding = "5px 5px";
      popup.style.color = "white";

      setTime(function () {
        popup.innerHTML = "You are Win";
        // Trigger flower particles
    for (let i = 0; i < 50; i++) { // Adjust the number of particles as needed
      generateFlowerParticle();
    }

    setTimeout(function () {
      popup.innerHTML = ""; // Clear the popup after some time
    }, 50000);
        popup.style.backgroundColor = "glod";
        popup.style.width = "250px";
        popup.style.height = "50px";
        popup.style.textAlign = "center";
        popup.style.fontSize = "24px";
        popup.style.boxShadow = "2px 2px 20px #E0FFFF";
        popup.style.padding = "5px 5px";
        popup.style.color = "white";
      }, 50000);

    }

    // Check for consecutive mistakes
    if (points === -10) {
      mistakeCounter++;
      if (mistakeCounter >= MAX_MISTAKES) {
        // If the number of mistakes exceeds the limit, stop the game
        gameActive = false;

        popup.innerHTML = "Your Game Is Over";

         // Trigger danger image particles
      for (let i = 0; i < 50; i++) { // Adjust the number of particles as needed
        generateDangerParticle();
      }

      score = 0;
      mistakeCounter = 0;
      setTimeout(function () {
        popup.innerHTML = ""; // Clear the popup after some time
      }, 50000);

        popup.style.backgroundColor = "#DC143C";
        popup.style.width = "250px";
        popup.style.height = "50px";
        popup.style.textAlign = "center";
        popup.style.fontSize = "24px";
        popup.style.boxShadow = "2px 2px 20px #E0FFFF";
        popup.style.padding = "5px 5px";
        popup.style.color = "white";

        score = 0;
        mistakeCounter = 0;
        setTime(function () {
          popup.innerHTML = "Your Game Is Over";


           // Trigger danger image particles
          for (let i = 0; i < 50; i++) { // Adjust the number of particles as needed
            generateDangerParticle();
          }

        score = 0;
        mistakeCounter = 0;
        setTimeout(function () {
            popup.innerHTML = ""; // Clear the popup after some time
        }, 50000);

          popup.style.backgroundColor = "#DC143C";
          popup.style.width = "250px";
          popup.style.height = "50px";
          popup.style.textAlign = "center";
          popup.style.fontSize = "24px";
          popup.style.boxShadow = "2px 2px 20px #E0FFFF";
          popup.style.padding = "5px 5px";
          popup.style.color = "white";
        }, 50000);
      }
    } else {
      mistakeCounter = 0;
    }
    
  }
  

  function showRandomShift() {
    if (!gameActive) return; // Do not show the shift if the game is stopped

    const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
    circle.textContent = randomShift;
  }
  

  function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  function handleClick(event) {
    if (!gameActive) return; // Do not handle click if the game is stopped
    const clickedShift = event.target.textContent.trim();
    const currentShift = circle.textContent.trim();
    if (clickedShift === currentShift){
      if (clickedShift === "Left Click") {
        updateScore(10);
      } else {
        updateScore(-10);
      }
    
    // Set random hex color as background
    circle.style.backgroundColor = getRandomHexColor();
     // Zoom out by reducing the scale to 0.8 (adjust as needed)
    circle.style.transform = "scale(0.9) slow";

    }
    showRandomShift();
  }

  function handleMouseUp() {
    // Zoom in by restoring the original scale (1.0)
    circle.style.transform = "scale(0.9) slow";
  }

  function handleContextMenu(event) {
    if (!gameActive) return; // Do not handle right-click if the game is stopped
    event.preventDefault(); // Prevent the default context menu from showing up
    const clickedShift = event.target.textContent;
    const currentShift = circle.textContent;
    if (clickedShift === currentShift){
      if (clickedShift === "Right Click") {
        updateScore(10);
      } else {
        updateScore(-10);
      }
    }
    showRandomShift();
  }
  circle.addEventListener("click", handleClick);
  circle.addEventListener("contextmenu", handleContextMenu);
  circle.addEventListener("mousedown", function () {
    if (!gameActive) return; // Do not handle mousedown if the game is stopped
    handleMouseUp(); // In case mouseup event was missed
    circle.addEventListener("mouseup", handleMouseUp);
  });
  showRandomShift();

  
function getRandomPosition() {
  if (!gameActive) return; /// Do not reposition the circle if the game is stopped

  let circleAreaHeight = circleArea.clientHeight;
  let circleAreaWidth = circleArea.clientWidth;
  let circleWidth = circle.clientWidth;
  let circleHeight = circle.clientHeight;

  let maxRandomX = circleAreaWidth - circleWidth;
  let maxRandomY = circleAreaHeight - circleHeight;

  let randomX = Math.floor(Math.random() * maxRandomX);
  let randomY = Math.floor(Math.random() * maxRandomY);

  randomX = Math.min(randomX, maxRandomX);
  randomY = Math.min(randomY, maxRandomY);

  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;
}

// setInterval("getRandomPosition", 2000);
circle.addEventListener("click", getRandomPosition);
circle.addEventListener("contextmenu", getRandomPosition);


});

function playButton(){
  return location.reload();
};

