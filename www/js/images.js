// images.ts
// import Images from '../img/game/background/background.png';

function importAll(r) {
  return r.keys().map(r);
}

const Images = importAll(require.context('../img/game', true, /\.(png|jpe?g|svg)$/));

const keyList = [];
function _iterate(obj, stack) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === 'object') {
        _iterate(obj[property], stack + '.' + property);
      } else {
        const keys = {};
        keys[property] = obj[property];
        keyList.push(keys);
      }
    }
  }
  return keyList;
}
console.log(Images, 'Images2')
let x = {}
Images.forEach(image => {
  let splits = image.split('/');
  let lastSplit = splits[splits.length - 1].split('.')[0];
  x[lastSplit] = image;
});
// let x = Object.assign(..._iterate(Images, ''));
console.log(x, 'Images3')
export default x;
