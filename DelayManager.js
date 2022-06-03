class DelayManager {
  constructor() {
    this.delays = [];
  }

  addDelay(seconds, callback) {
    this.delays.push(new Delay(seconds, callback));
  }
  
  processDelays() {
    for(let i = 0; i < this.delays.length; i++) {
      this.delays[i].process();
    }
  }
}