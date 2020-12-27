import axios from 'axios';
import data from "./data";
import { convert_zeroPadding } from "../utilities/utilities";

export default class {
  constructor(core, options) {
    let self = this;
    self.Core = core;
    self.eventId = options.eventId;
    self.dir = options.dir;
    self.filePaths = [];
    self.current = 0;
    
    self.Data = new data();
    self.Core.DataManager.register(self.eventId, self.Data);

    axios(self.dir + '/settings.json').then(function(res) {
      self.setFilePaths(res.data.files);
      self.Data.setFrames(res.data.frames)
      self.loadData();
      self.Core.Observer.trigger('loadStart', { eventId: self.eventId }); // オブザーバーLOADSTARTイベント
    });

    if(self.Core.options.autoplay) self.autoPlay(); //自動再生
    
  }
  setFilePaths(files) {
    for(let i=0;i<files; i++) {
      this.filePaths.push(this.dir + '/data' + convert_zeroPadding(i+1) + '.json');
    }
  }
  loadData() {
    let self = this;
    axios(self.filePaths[self.current]).then(function(res) {
      self.Data.pushData(res.data);
      if( !self.filePaths[self.current + 1] ) {
        self.Data.complete();
        self.Core.Observer.trigger('loadEnd', { eventId: self.eventId }); // オブザーバーLOADENDイベント
        return false;
      }
      self.current++;
      self.loadData();
    });
  }
  autoPlay() {
    let self = this
    self.Core.on('loadEnd', function(e) {
      if(e.eventId !== self.eventId) return;
      self.Core.play(self.eventId);
    });
  }
}