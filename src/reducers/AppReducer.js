import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';

import Utils from '../Utils';

const initialState = {
  gameStarted: false,
  testPromise: null,
  points: 0,
  level: 1,
  maxPoints: 0,
  maxLevel: 1,
  progressBarValue: 0,
  buttons: [
    {
      text: 'THE',
      borderColor: Utils.getRandomColor(),
      textColor: Utils.getRandomColor()
    },
    {
      text: 'STROOP',
      borderColor: Utils.getRandomColor(),
      textColor: Utils.getRandomColor()
    },
    {
      text: 'GAME',
      borderColor: Utils.getRandomColor(),
      textColor: Utils.getRandomColor()
    }
  ]
};

const AppReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'START_GAME':
      return startGame(state);
    case 'CHECK_ANSWER':
      return checkAnswer(state, action);
    case 'PROGRESS':
      return progress(state, action);
    case 'END_GAME':
      return endGame(state, action);
    case 'LOAD_MAX_POINTS':
      loadMaxPoints(state, action).then((e) => store.dispatch({ type: 'MAX_POINTS_RECEIVED', maxLevel: e.maxLevel, maxPoints: e.maxPoints}));
      return state;
    case 'MAX_POINTS_RECEIVED':
      return maxPointsReceived(state, action);
    case 'MAX_POINTS_SAVED':
      return maxPointsSaved(state, action);
    default:
      return state;
  }


};

function startGame(state) {
  return Object.assign({}, state, { gameStarted: true, progressBarValue: 0, buttons: _createButtons() });
}

function checkAnswer(state, action) {
  let selectedButton = state.buttons[action.selectedButton];
  let correctAnswer = selectedButton.text === selectedButton.textColor;
  let level = correctAnswer ? (state.level + 1) : state.level;
  let points = correctAnswer ? (state.points + 100) : (state.points - 150);
  let buttons = correctAnswer ? _createButtons() : state.buttons;
  let progressBarValue = correctAnswer ? 0 : state.progressBarValue;

  return Object.assign({}, state, { level, points, buttons, progressBarValue });
}

function progress(state, action) {
  return Object.assign({}, state, { progressBarValue: action.value + state.progressBarValue });
}

function endGame(state) {
  if (state.points > state.maxPoints && state.level > state.maxLevel) {
    saveMaxPoints(state.points, state.level).then(() =>{ store.dispatch({ type: 'MAX_POINTS_SAVED', maxPoints: state.points, maxLevel: state.level})});
  }

  return Object.assign({}, state, { gameStarted: false, progressBarValue: 0, level: 1, points: 0, buttons: initialState.buttons });
}

function _createButtons() {
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

async function saveMaxPoints(points, level) {
  let maxLevel = await AsyncStorage.setItem('@StroopGame:MaxLevel', level.toString());
  let maxPoints = await AsyncStorage.setItem('@StroopGame:MaxPoints', points.toString());

  return { maxLevel, maxPoints };
}

async function loadMaxPoints() {
  let maxLevel = await AsyncStorage.getItem('@StroopGame:MaxLevel');
  let maxPoints = await AsyncStorage.getItem('@StroopGame:MaxPoints');

  return { maxLevel, maxPoints };
}

function maxPointsReceived(state, action) {
  return Object.assign({}, state, { maxLevel: parseInt(action.maxLevel), maxPoints: parseInt(action.maxPoints) });
}

function maxPointsSaved(state, action) {
  return Object.assign({}, state, { maxLevel: action.maxLevel, maxPoints: action.maxPoints });
}

let store = createStore(AppReducer);
export default store;