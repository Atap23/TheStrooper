import { AsyncStorage } from 'react-native';

const Utils = {};
const AVAILABLE_COLORS = ['azul', 'rojo', 'verde', 'marron', 'negro', 'gris', 'morado', 'naranja', 'rosa'];

const COLOR_MAP = {
  azul: '#0232fe',
  rojo: '#fe3200',
  verde: '#00ca02',
  marron: '#7f0402',
  negro: '#333333',
  gris: '#979498',
  morado: '#972ffe',
  naranja: '#fe7600',
  rosa: '#fe64ff'
};

Utils.getRandomColor = getRandomColor;
Utils.getRandomInt = getRandomInt;
Utils.getRandomColorNotIn = getRandomColorNotIn;
Utils.getColorFromName = getColorFromName;
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

function getColorFromName(colorName) {
  return COLOR_MAP[colorName];
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
    let answer = false;

    if (_magicNumber === x) {
      borderColor = text;
      answer = true;
    }

    _buttons.push({
      text,
      answer,
      borderColor,
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