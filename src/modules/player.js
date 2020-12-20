import { fps_to_ms } from "../utilities/utilities";
export default class {
  constructor(core, options) {
    this.Core = core;

    this.ａData;

    this.timer;
    
    this.frame = 0;
    this.interval = fps_to_ms(15);
    this.timer_lasttime;
  }
  play(event) {
    this.ａData = this.Core.DataManager.get(event);
    this.timer = requestAnimationFrame(this.playTimer.bind(this));
  }
  stop() {
    this.clearPlayTimer();
    this.frame = 0;
  }
  pause() {
    this.clearPlayTimer();
  }
  playTimer(t) {
    this.timer = requestAnimationFrame(this.playTimer.bind(this));

    let time = this.interval;
    if (this.timer_lasttime) time = t - this.timer_lasttime;
    if (this.interval > time) return false;

    this.Core.selector.setAttribute("src", this.ａData.data.data[this.frame].d);
    this.frameIncrement();
    this.timer_lasttime = t;
  }
  clearPlayTimer() {
    if (!this.timer) return false;

    cancelAnimationFrame(this.timer);
    this.timer_lasttime = null;
  }
  frameIncrement() {
    this.frame++;
    if (this.frame >= this.ａData.data.frames) {
      this.frame = 0;
    }
  }
}
