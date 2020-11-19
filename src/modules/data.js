export default class {
  constructor(options = {}) {
    this.data = [];
    this.fps = options.fps || 15;
    this.frames;
  }
  setFrames(frames) {
    this.frames = frames;
  }
  pushData(data) {
    Array.prototype.push.apply(this.data, data);
  }
}