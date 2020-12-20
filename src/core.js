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

    let self = this;
    self.on('loadEnd', function(e){

    });
  }
  on(eventType, callback) {
    switch (eventType) {
      case "loadStart":
        this.Observer.on("loadStart", callback.bind(this));
        break;
      case "loadEnd":
        this.Observer.on("loadEnd", callback.bind(this));
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
