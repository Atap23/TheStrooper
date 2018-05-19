import Utils from '../../Utils';
import store from '../configureStore';

const START_GAME = 'START_GAME';
const CHANGE_SCREEN = 'CHANGE_SCREEN';
const CHECK_ANSWER = 'CHECK_ANSWER';
const BAD_ANSWER = 'BAD_ANSWER';
const END_GAME = 'END_GAME';
const LOAD_GAME = 'LOAD_GAME';
const LOAD_GAME_DONE = 'LOAD_GAME_DONE';
const SAVE_GAME_DONE = 'SAVE_GAME_DONE';

const GAME_OBJECT_STORAGE = '@StroopGame:SavedGame';

const initialState = {
  gameStarted: false,
  screen: 'login',
  testPromise: null,
  initialSeconds: 10,
  actualSeconds: 10,
  points: 0,
  level: 1,
  maxPoints: 0,
  maxLevel: 1,
  lives: 3,
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

export function checkAnswer(selectedButton, time) {
  return { type: CHECK_ANSWER, selectedButton, time };
}

export function endGame() {
  return { type: END_GAME };
}

export function loadGame() {
  return { type: LOAD_GAME };
}

export function changeScreen(screen) {
  return { type: CHANGE_SCREEN, screen };
}
export function badAnswer(time) {
  return { type: BAD_ANSWER, time };
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case START_GAME:
      return Object.assign({}, state, { gameStarted: true, buttons: Utils.createButtons() });
    case CHANGE_SCREEN:
      return Object.assign({}, state, { screen: action.screen });
    case CHECK_ANSWER:
      return checkAnswerHandler(state, action);
    case BAD_ANSWER:
      return badAnswerHandler(state, action);
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
    let time = action.time ? action.time : 0.1;
    let correctAnswer = selectedButton.text === selectedButton.textColor;
    let newStateObject = {
      level: correctAnswer ? (state.level + 1) : state.level,
      points: correctAnswer ? (state.points + parseInt((10 * time).toFixed(0))) : state.level * (state.points - parseInt((100 / time).toFixed(0))),
      buttons: correctAnswer ? Utils.createButtons() : state.buttons,
      lives: correctAnswer ? state.lives : state.lives - 1
    };

    switch(newStateObject.level) {
      case 10:
        newStateObject.actualSeconds = 8;
        break;
      case 15:
        newStateObject.actualSeconds = 6;
        break;
      case 20:
        newStateObject.actualSeconds = 4;
        break;
      case 30:
        newStateObject.actualSeconds = 2;
        break;
      case 50:
        newStateObject.actualSeconds = 1;
        break;
    }


    return Object.assign({}, state, newStateObject);
  }

  function badAnswerHandler(state, action) {
    let newStateObject = {
      points: (state.points - parseInt((100 / action.time).toFixed(0)) ),
      lives: state.lives - 1
    };

    return Object.assign({}, state, newStateObject);
  }

  function endGameHandler(state) {
    if (state.points > state.maxPoints) {
      Utils.saveGame(state.points, state.level, GAME_OBJECT_STORAGE).then(() =>{ store.dispatch({ type: SAVE_GAME_DONE, maxPoints: state.points, maxLevel: state.level})});
    }

    return Object.assign({}, state, { gameStarted: false, level: 1, points: 0, lives: 3, buttons: initialState.buttons });
  }

  function loadGameDoneHandler(state, action) {
    let savedGame = JSON.parse(action.gameObject);
    return Object.assign({}, state, { maxLevel: parseInt(savedGame.maxLevel), maxPoints: parseInt(savedGame.maxPoints) });
  }

  function saveGameDoneHandler(state, action) {
    return Object.assign({}, state, { maxLevel: action.maxLevel, maxPoints: action.maxPoints });
  }
}