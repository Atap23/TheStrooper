import { connect } from 'react-redux';
import StroopApp from '../components/StroopAppComponent';
import {
  startGame,
  checkAnswer,
  endGame,
  loadGame,
  changeScreen,
  badAnswer
} from '../redux/modules/StroopApp';


const mapStateToProps = (state) => {
  return ({
    gameStarted: state.gameStarted,
    screen: state.screen,
    actualSeconds: state.actualSeconds,
    points: state.points,
    level: state.level,
    maxLevel: state.maxLevel,
    maxPoints: state.maxPoints,
    buttons: state.buttons,
    lives: state.lives
  });
};

const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch(startGame()),
  checkAnswer: (selectedButton, time) => dispatch(checkAnswer(selectedButton, time)),
  badAnswer: (time) => dispatch(badAnswer(time)),
  endGame: () => dispatch(endGame()),
  loadGame: () => dispatch(loadGame()),
  changeScreen: (screen) => dispatch(changeScreen(screen))
});


export default connect(mapStateToProps, mapDispatchToProps)(StroopApp);