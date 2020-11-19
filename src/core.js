import loader from "./modules/loader";

export default class {
  constructor() {
    this.load({
      'dir': './Jsons',
    });
  }
  load(options) {
    new loader(this, options);
  }
}