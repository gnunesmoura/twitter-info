
const humanArrayToString = (array) => {
  if (Array.isArray(array)) {
    return array.map(item => ` ${item}`).toString();
  }
  throw TypeError('array parameter must be of type Array');
};

module.exports = {
  humanArrayToString,
};
