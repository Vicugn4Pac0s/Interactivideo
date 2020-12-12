import observer from "./modules/observer";
import loader from "./modules/loader";

export default class {
  constructor(selector, options = {}) {
    this.selector = document.getElementById(selector);
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
      default:
        console.log("Error");
    }
  }
  load(options) {
    new loader(this, options);
  }
}
