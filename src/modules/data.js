export default class {
  constructor(options = {}) {
    this.data = [];
    this.fps = options.fps || 15;
    this.frames;
    this.state = 0; //全データ読み込みで1
  }
  setFrames(frames) {
    this.frames = frames;
  }
  pushData(data) {
    Array.prototype.push.apply(this.data, data);
  }
  complete() {
    this.state = 1;
  }
}