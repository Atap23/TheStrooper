import { AsyncStorage } from 'react-native';

const Utils = {};
const AVAILABLE_COLORS = ['blue', 'red', 'green', 'brown', 'black', 'gray', 'violet'];

Utils.getRandomColor = getRandomColor;
Utils.getRandomInt = getRandomInt;
Utils.getRandomColorNotIn = getRandomColorNotIn;
Utils.millisecondsToSeconds = millisecondsToSeconds;
Utils.createButtons = createButtons;
Utils.loadGame = loadGame;
Utils.saveGame = saveGame;

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

function createButtons() {
  let _buttons = [];
  let _magicNumber = Utils.getRandomInt(0, 2);
  let selectedColors = [];
  for (let x = 0; x < 3; x++) {
    selectedColors.push(Utils.getRandomColorNotIn(selectedColors));
    let text = selectedColors[x];
    let borderColor = Utils.getRandomColorNotIn(selectedColors);

    if (_magicNumber === x) {
      borderColor = text;
    }

    _buttons.push({
      text: text,
      borderColor: borderColor,
      textColor: borderColor
    })
  }

  return _buttons;
}

async function loadGame(storageName) {
  return await AsyncStorage.getItem(storageName);
}

async function saveGame(points, level, storageName) {
  let gameObject = {
    maxLevel: level.toString(),
    maxPoints: points.toString()
  };

  return await AsyncStorage.setItem(storageName, JSON.stringify(gameObject));
}

export default Utils;