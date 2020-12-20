import observer from "./modules/observer";
import dataManager from "./modules/data-manager";
import loader from "./modules/loader";
import player from "./modules/player";

export default class {
  constructor(selector, options = {}) {
    this.selector = document.getElementById(selector);
    this.DataManager = new dataManager();
    this.Player = new player(this, {});
    this.Observer = new observer();
  }
  on(eventType, callback) {
    switch (eventType) {
      case "loadStart":
        this.Observer.on("loadStart", callback.bind(this));
        break;
      case "loadEnd":
        this.Observer.on("loadEnd", callback.bind(this));
        break;
      case "play":
        this.Observer.on("play", callback.bind(this));
        break;
      case "stop":
        this.Observer.on("stop", callback.bind(this));
        break;
      case "end":
        this.Observer.on("end", callback.bind(this));
        break;
      default:
        console.log("Error");
    }
  }
  load(options) {
    new loader(this, options);
  }
  play(eventId) {
    this.Player.play(eventId);
  }
  stop() {
    this.Player.stop();
  }
  pause() {
    this.Player.pause();
  }
}
