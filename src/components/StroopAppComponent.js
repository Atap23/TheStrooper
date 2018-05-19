import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import StroopTimer from './StroopTimer'
import StroopButton from './StroopButton';
import StroopHeader from './StroopHeader';
import StroopLogin from './StroopLogin'


export default class StroopAppComponent extends Component {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.startGame();
    this.refs.progressBarComponent.startAnimation(5, () => this.props.endGame());
  }

  componentDidMount() {
    this.props.loadGame();
  }

  checkAnswer(selectedButton) {
    let myThis = this;

    if (this.props.gameStarted) {
      this.props.checkAnswer(selectedButton);
    }

    setTimeout(() => {
      if (myThis.props.lives) {
        myThis.refs.progressBarComponent.restartAnimation();
      } else {
        myThis.props.endGame();
        myThis.refs.progressBarComponent.stopAnimation();
      }
    })
  }

  render() {
    return (this.props.screen === 'login') ? <StroopLogin changeScreen={this.props.changeScreen}/> : this.renderBoard();
  }

  renderBoard() {
    return <View style={{display: 'flex', height: '100%'}}>
      <StroopHeader
        level={this.props.level}
        points={this.props.points}
        maxLevel={this.props.maxLevel}
        maxPoints={this.props.maxPoints}
        lives={this.props.lives}
      />
      <View style={{height: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
        <StroopTimer ref="progressBarComponent" endGame={this.props.endGame}/>
      </View>
      <View style={{paddingLeft: 15, paddingRight: 15, height: '50%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <StroopButton
          onPress={() => { this.checkAnswer(0)}}
          disabled={!this.props.gameStarted}
          backgroundColor="white"
          height="33%"
          width="30%"
          borderWidth={5}
          text={this.props.buttons[0].text}
          borderColor={this.props.buttons[0].borderColor}
          textColor={this.props.buttons[0].textColor}/>
        <StroopButton
          onPress={() => { this.checkAnswer(1)}}
          disabled={!this.props.gameStarted}
          backgroundColor="white"
          height="33%"
          width="30%"
          borderWidth={5}
          text={this.props.buttons[1].text}
          borderColor={this.props.buttons[1].borderColor}
          textColor={this.props.buttons[1].textColor}/>
        <StroopButton
          onPress={() => { this.checkAnswer(2)}}
          disabled={!this.props.gameStarted}
          backgroundColor="white"
          height="33%"
          width="30%"
          borderWidth={5}
          text={this.props.buttons[2].text}
          borderColor={this.props.buttons[2].borderColor}
          textColor={this.props.buttons[2].textColor}/>
      </View>
      <View style={{height: '20%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <StroopButton
          onPress={this.startGame}
          disabled={this.props.gameStarted}
          backgroundColor="white"
          paddingTop={5}
          paddingBottom={5}
          height={60}
          width="50%"
          borderWidth={5}
          text="EMPEZAR"
          borderColor="black"
          textColor="black"/>
      </View>
    </View>
  }
}