import axios from 'axios';
import data from "./data";

export default class {
  constructor(core, options) {
    let self = this;
    self.Core = core;
    self.dir = options.dir;
    self.filePaths = [];
    self.current = 0;
    
    self.Data = new data();
    self.Core.DataManager.register(options.eventId, self.Data);

    axios(self.dir + '/dolphin.json').then(function(res) {
      self.setFilePaths(res.data.files);
      self.Data.setFrames(res.data.frames)
      self.loadData();
      // オブザーバーLOADSTARTイベント
      self.Core.Observer.trigger('loadStart', {});
    });
  }
  setFilePaths(files) {
    for(let i=0;i<files; i++) {
      this.filePaths.push(this.dir + '/data0' + (i+1) + '.json');
    }
  }
  loadData() {
    let self = this;
    axios(self.filePaths[self.current]).then(function(res) {
      self.Data.pushData(res.data);
      if( !self.filePaths[self.current + 1] ) {
        // オブザーバーLOADENDイベント
        self.Core.Observer.trigger('loadEnd', {});
        return false;
      }
      self.current++;
      self.loadData();
    });
  }
}