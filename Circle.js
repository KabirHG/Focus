class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.maxDiameter = 30;
    this.diameter = 0;
    this.xSpeed = random(speeds);
    this.ySpeed = random(speeds);
    this.color = color(random(palette));
    this.spawned = false;
  }
  
  spawn() {
    this.diameter++;
    if(this.diameter === this.maxDiameter) {
      this.spawned = true;    
    }
  }

  update() {
    
    if(!this.spawned) {
      this.spawn();
      
    } else {
      if(gameState === GameState.STARTED) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x > width || this.x < 0) {
          this.xSpeed *= -1;
        }

        if(this.y > height || this.y < 0) {
          this.ySpeed *= -1;
        }
      }
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}