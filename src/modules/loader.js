import axios from 'axios';
import data from "./data";

export default class {
  constructor() {
    let self = this;
    self.filePaths = [];
    self.current = 0;
    self.Data = new data();

    axios('./Jsons/dolphin.json').then(function(res) {
      self.setFilePaths(res.data.files);
      self.Data.setFrames(res.data.frames)
      self.loadData();
      // オブザーバーLOADSTARTイベント
    });
  }
  setFilePaths(files) {
    for(let i=0;i<files; i++) {
      this.filePaths.push('./Jsons/data0' + (i+1) + '.json');
    }
  }
  loadData() {
    let self = this;
    axios(self.filePaths[self.current]).then(function(res) {
      self.Data.pushData(res.data);
      if( !self.filePaths[self.current + 1] ) {
        console.log('これで終わり');
        // オブザーバーLOADENDイベント
        return false;
      }
      self.current++;
      self.loadData();
    });
  }
}