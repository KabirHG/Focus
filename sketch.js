let d
let found = 0; //-1, 0, 1
let gameState = GameState.LOADING;
let roundStartTime;
let focusPoint;
let interval = 10;
let circles = [];
let currentTime;
let cta;
let tryagain;
let badfocus;
let goodjob;
let motivationq;
let motivationa

function resetGame() {
  gameState = GameState.LOADING;
  currentTime = millis();
  fpCurrentTime = millis();
  cursor(ARROW);
  circles.length = 0;
  focusPoint.reset();
  found = 0;
  roundStartTime = millis();
  d.addDelay(fpDelay, () => {
    startGame();
  });
}

function setup() {
  createCanvas(scrWidth, scrHeight);  
  focusPoint = new FocusPoint();
  d = new DelayManager();
  
  // Text assets
  cta = new Text("Click here to check out Guide to ADHD.",
                width/2, height/2 + 50, CENTER, CENTER, 20);
  
  tryagain = new Text("Try again?", width/2, height/2 + 100,CENTER, CENTER, 20);
  
  badfocus = new Text("Your focus sucks!", width/2, height/2, CENTER, CENTER, 30);
  
  goodjob = new Text("You have great focus!", width/2, height/2, CENTER, CENTER, 30);
  
  motivationq = new Text("Still struggle with motivation?", width/2, height/2 + 50,
                         CENTER, CENTER, 16);
  
  motivationa = new Text("Check out the latest Dr. K's Guide", width/2, height/2 + 100,
                         CENTER, CENTER, 16);
  
  timer = new Text(gameDuration.toString(),50, 50,
                  LEFT, CENTER, 30);
  
  resetGame();
}

function draw() {
  background("#FFFFFF");
  focusPoint.display();  
  if(gameState === GameState.STARTED) {
    focusPoint.move();
    for(let i = 0; i< circles.length; i++) {
      circles[i].update();
      circles[i].display();
    }
    addNewCircle();
    reduceInterval();
  }
  else if(gameState === GameState.ENDED) {
    for(let i = 0; i< circles.length; i++) {
      circles[i].update();
      circles[i].display();
    }
    if(found === 0) {   
      fill(0);
      textAlign(CENTER, CENTER);
      text("Click on the original ball.", width/2, height/2);
    }
    else if(found === 1) {
      focusPoint.show();
      if (isMouseInsideText(motivationa.text, motivationa.x - textWidth(motivationa.text)/2, motivationa.y)) {
        goodjob.display();
        motivationq.display();
        motivationa.displayWithStroke();
      } else {
        goodjob.display();
        motivationq.display();
        motivationa.display();
      }
    }
    else if(found === -1) {
      focusPoint.show();
      if (isMouseInsideText(cta.text, cta.x - textWidth(cta.text)/2, cta.y)) {
        cta.displayWithStroke();
        tryagain.display();
        badfocus.display();
      } else if (isMouseInsideText(tryagain.text,
                                   tryagain.x - textWidth(tryagain.text)/2,
                                   tryagain.y)) {
        tryagain.displayWithStroke();
        cta.display();
        badfocus.display();
      } else {
        tryagain.display();
        cta.display();
        badfocus.display();
      }     
    }
  }
  else if (gameState === GameState.LOADING) {
    focusPoint.showText();
  }
  updateTimer();
  d.processDelays();
}

function mouseClicked() {
  if(gameState === GameState.ENDED) {
    if(found === 0) {
      const distance = dist(focusPoint.x, focusPoint.y, mouseX, mouseY);
      if(distance < focusPoint.diameter/2)
        found = 1;
      else
         found = -1;
    } else if (found === -1) {
        if(isMouseInsideText(cta, width/2 - textWidth(cta)/2, height/2 + 50)) {
          fill("blue");
          window.open("https://www.healthygamer.gg/about/guide", "_blank");     
      } else if(isMouseInsideText(tryagain, width/2 - textWidth(tryagain)/2, height/2 + 100)) {
        resetGame();
      }
    } else if(found === 1) {
      if(isMouseInsideText(motivationa, width/2 - textWidth(motivationa)/2, height/2 + 100)) {
          fill("blue");
          window.open("https://www.healthygamer.gg/about/guide", "_blank");     
      }
    }
  }
}

function startGame() {
  gameState = GameState.STARTED;
  roundStartTime = millis();
  d.addDelay(gameDuration, () => {
    gameState = GameState.ENDED;
  });
}

function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();

  return mouseX > messageX && mouseX < messageX + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;
}

function addNewCircle() {
  if(gameState === GameState.STARTED) {
    if (millis() - currentTime > interval*1000) {
      currentTime = millis();
      circles.push(new Circle());
    }
  }
}

function updateTimer() {
  if(gameState === GameState.STARTED) {  
  let timeRemaining = (millis() - roundStartTime)/1000;
  let rounded = Math.round((gameDuration - timeRemaining) * 10) / 10;
  timer.text = rounded;
  }
  else if(gameState === GameState.ENDED) {
    timer.text = "0";
  }
  
  else if(gameState === GameState.LOADING) {
    timer.text = gameDuration.toString();
  }
  timer.display();
}

function reduceInterval() {
  if (interval >= minimumInterval) {
    interval -= timeDamping;
  }
}