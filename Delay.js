class Delay {
  constructor(seconds, callback) {
    this.executed = false;
    this.timeStarted = millis();
    this.callback = callback;
    this.seconds = seconds;
  }

  process() {
      if(millis() - this.timeStarted > this.seconds * 1000) {
      if(!this.executed) {
        this.executed = true;
        this.callback();
      }
    }
  }
}