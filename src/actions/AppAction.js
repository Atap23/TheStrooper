import { connect } from 'react-redux';

import StroopApp from '../components/AppComponent';


const mapStateToProps = (state) => {
  return ({
    gameStarted: state.gameStarted,
    points: state.points,
    level: state.level,
    maxLevel: state.maxLevel,
    maxPoints: state.maxPoints,
    progressBarValue: state.progressBarValue,
    buttons: state.buttons
  });
};

const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch(startGame()),
  checkAnswer: (selectedButton) => dispatch(checkAnswer(selectedButton)),
  endGame: () => dispatch(endGame()),
  progress: () => dispatch(progress()),
  loadMaxPoints: () => dispatch(loadMaxPoints())
});

const startGame = () => {
  return { type: 'START_GAME' };
};

const checkAnswer = (selectedButton) => {
  return { type: 'CHECK_ANSWER', selectedButton};
};

const endGame = () => {
  return { type: 'END_GAME' };
};

const progress = () => {
  return { type: 'PROGRESS', value: 1 };
};

const loadMaxPoints = () => {
  return { type: 'LOAD_MAX_POINTS' };
};

export default connect(mapStateToProps, mapDispatchToProps)(StroopApp);