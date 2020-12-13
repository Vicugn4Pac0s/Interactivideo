import observer from "./modules/observer";
import dataManager from "./modules/data-manager";
import loader from "./modules/loader";
import player from "./modules/player";

export default class {
  constructor(selector, options = {}) {
    this.selector = document.getElementById(selector);
    this.DataManager = new dataManager();
    this.Player = new player();
    this.Observer = new observer();

    let self = this;
    self.on('loadEnd', function(e){
      console.log( self.DataManager.get('movie01') );
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
}
