const Utils = {};
const AVAILABLE_COLORS = ['blue', 'red', 'green', 'brown', 'black', 'gray', 'violet'];

Utils.getRandomColor = getRandomColor;
Utils.getRandomInt = getRandomInt;
Utils.getRandomColorNotIn = getRandomColorNotIn;
Utils.millisecondsToSeconds = millisecondsToSeconds;

function getRandomColor() {
  return AVAILABLE_COLORS[getRandomInt(0, AVAILABLE_COLORS.length - 1)];
}

function getRandomColorNotIn(colors) {
  let newColor = getRandomColor();
  while (colors.indexOf(newColor) > -1) {
    newColor = getRandomColor();
  }

  return newColor;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function millisecondsToSeconds(milliseconds) {
  return ((milliseconds % 60000) / 1000);
}

export default Utils;