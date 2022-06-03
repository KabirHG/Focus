class Text {
  constructor(text, x, y, alignX, alignY, size) {
    this.text = text;
    this.x = x;
    this.y = y;    
    this.alignX = alignX;
    this.alignY = alignY;
    this.size = size;
  }

  update() {
    
  }

  displayWithStroke() {
    textStyle(BOLD);
    textSize(this.size);
    textAlign(this.alignX, this.alignY);
    cursor(HAND);
    fill(0, 200, 255);
    stroke(0, 200, 255);
    fill(0);
    text(this.text, this.x, this.y);
  }
  
  display() {
    textStyle(BOLD);
    textSize(this.size);
    textAlign(this.alignX, this.alignY);
    cursor(ARROW);
    fill(0);
    stroke("#FFFFFF");
    text(this.text, this.x, this.y);
  }
}