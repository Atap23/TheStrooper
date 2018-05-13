import { connect } from 'react-redux';
import StroopApp from '../components/StroopAppComponent';
import {
  startGame,
  checkAnswer,
  endGame,
  progress,
  loadGame
} from '../redux/modules/StroopBoard';


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
  loadGame: () => dispatch(loadGame())
});


export default connect(mapStateToProps, mapDispatchToProps)(StroopApp);