import { fps_to_ms } from "../utilities/utilities";
export default class {
  constructor(core, options) {
    this.Core = core;

    this.aData;
    this.timer;
    
    this.state = 0; //再生中: 1 停止中: 0
    this.frame = 0;
    this.interval = fps_to_ms(15);
    this.timer_lasttime;
  }
  play(eventId) {
    if(this.state === 1) return;
    if(!this.aData || this.aData.id !== eventId) {
      this.aData = this.Core.DataManager.get(eventId);
      this.frame = 0;
    }
    this.timer = requestAnimationFrame(this.playTimer.bind(this));
    this.state = 1;
  }
  stop() {
    if(this.state === 0) return;
    this.clearPlayTimer();
    this.frame = 0;
    this.state = 0;
  }
  pause() {
    if(this.state === 0) return;
    this.clearPlayTimer();
    this.state = 0;
  }
  playTimer(t) {
    this.timer = requestAnimationFrame(this.playTimer.bind(this));

    let time = this.interval;
    if (this.timer_lasttime) time = t - this.timer_lasttime;
    if (this.interval > time) return false;

    this.Core.selector.setAttribute("src", this.aData.data.data[this.frame].d);
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
    if (this.frame >= this.aData.data.frames) {
      this.frame = 0;
    }
  }
}
