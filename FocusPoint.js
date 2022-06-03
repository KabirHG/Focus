class FocusPoint {
  constructor() {    
    this.x = width/2;
    this.y = height/2;
    this.diameter = 30;
    this.color = this.color = color(random(palette));
    this.text = "Keep an eye on this ball.";
    this.xSpeed = random(speeds);
    this.ySpeed = random(speeds);
    this.showing = false;
  }
  
  showText() {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y + 50);
  }
  
  move() {
    if(gameState === GameState.STARTED) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if(this.x > width || this.x < 0) {
        this.xSpeed *= -1;
      }

      if(this.y > height || this.y < 0) {
        this.ySpeed *= -1;
      }
    } else if(gameState === GameState.LOADING) {
      this.x = width/2;
      this.y = height/2;
    }
  }

  display() {
    if(!this.showing) {
      fill(this.color);
    } else {
      fill("red");
    }
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
    
  
  show() {
    this.showing = true;
  }
  
  reset() {
    this.x = width/2;
    this.y = height/2;
    this.diameter = 30;
    this.color = this.color = color(random(palette));
    this.text = "Keep an eye on this ball.";
    this.xSpeed = random([-5, -2, 2, 5]);
    this.ySpeed = random([-5, -2, 2, 5]);
    this.showing = false;
  }
}