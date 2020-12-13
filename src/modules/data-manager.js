export default class {
  constructor() {
    this.data = [];
  }
  register(eventId, data) {
    this.data.push({
      'id': eventId,
      'data': data
    });
  }
  get(eventId) {
    return this.data.find(function(value){
      return value.id === eventId;
  });
  }
}