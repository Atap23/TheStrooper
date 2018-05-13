import { AsyncStorage } from 'react-native';
import Utils from '../../Utils';
import store from '../configureStore';

const START_GAME = 'START_GAME';
const CHECK_ANSWER = 'CHECK_ANSWER';
const PROGRESS = 'PROGRESS';
const END_GAME = 'END_GAME';
const LOAD_GAME = 'LOAD_GAME';
const LOAD_GAME_DONE = 'LOAD_GAME_DONE';
const SAVE_GAME_DONE = 'SAVE_GAME_DONE';

const GAME_OBJECT_STORAGE = '@StroopGame:SavedGame';

const initialState = {
  gameStarted: false,
  testPromise: null,
  points: 0,
  level: 1,
  maxPoints: 0,
  maxLevel: 1,
  lives: 3,
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

export function startGame() {
  return { type: START_GAME };
}

export function checkAnswer(selectedButton) {
  return { type: CHECK_ANSWER, selectedButton };
}

export function endGame() {
  return { type: END_GAME };
}

export function progress() {
  return { type: PROGRESS, value: 1 };
}

export function loadGame() {
  return { type: LOAD_GAME };
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case START_GAME:
      return Object.assign({}, state, { gameStarted: true, progressBarValue: 0, buttons: Utils.createButtons() });
    case CHECK_ANSWER:
      return checkAnswerHandler(state, action);
    case PROGRESS:
      return Object.assign({}, state, { progressBarValue: action.value + state.progressBarValue });
    case END_GAME:
      return endGameHandler(state, action);
    case LOAD_GAME:
      Utils.loadGame(GAME_OBJECT_STORAGE).then((e) => store.dispatch({ type: LOAD_GAME_DONE, gameObject: e}));
      return state;
    case LOAD_GAME_DONE:
      return loadGameDoneHandler(state, action);
    case SAVE_GAME_DONE:
      return saveGameDoneHandler(state, action);
    default:
      return state;
  }

  function checkAnswerHandler(state, action) {
    let selectedButton = state.buttons[action.selectedButton];
    let correctAnswer = selectedButton.text === selectedButton.textColor;
    let newStateObject = {
      level: correctAnswer ? (state.level + 1) : state.level,
      points: correctAnswer ? (state.points + 100) : (state.points - 5),
      buttons: correctAnswer ? Utils.createButtons() : state.buttons,
      progressBarValue: correctAnswer ? 0 : state.progressBarValue,
      lives: correctAnswer ? state.lives : state.lives - 1
    };

    //TODO: En vez de calcular el nuevo objeto, buscar una manera de lanzar la accion END_GAME y así evitar logica repetida.
    if (!newStateObject.lives) {
      newStateObject.level = initialState.level;
      newStateObject.points = initialState.points;
      newStateObject.buttons = initialState.buttons;
      newStateObject.progressBarValue = initialState.progressBarValue;
      newStateObject.lives = initialState.lives;
      newStateObject.gameStarted = false;
    }

    return Object.assign({}, state, newStateObject);
  }

  function endGameHandler(state) {
    if (state.points > state.maxPoints && state.level > state.maxLevel) {
      Utils.saveGame(state.points, state.level, GAME_OBJECT_STORAGE).then(() =>{ store.dispatch({ type: SAVE_GAME_DONE, maxPoints: state.points, maxLevel: state.level})});
    }

    return Object.assign({}, state, { gameStarted: false, progressBarValue: 0, level: 1, points: 0, buttons: initialState.buttons });
  }

  function loadGameDoneHandler(state, action) {
    let savedGame = JSON.parse(action.gameObject);
    return Object.assign({}, state, { maxLevel: parseInt(savedGame.maxLevel), maxPoints: parseInt(savedGame.maxPoints) });
  }

  function saveGameDoneHandler(state, action) {
    return Object.assign({}, state, { maxLevel: action.maxLevel, maxPoints: action.maxPoints });
  }
}