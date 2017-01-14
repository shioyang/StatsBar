export class Video {
  snippet: any;
  statistics: any;

  constructor(json: any) {
    let arr = ['snippet', 'statistics'];
    arr.forEach(val => {
      if (json[val]) {
        this[val] = json[val];
      }
    }, this);
  }
}
