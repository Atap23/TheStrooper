import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import StroopButton from "./StroopButton";
import StroopHeader from "./StroopHeader";
import ProgressBarAnimated from 'react-native-progress-bar-animated';


export default class  extends Component {
  constructor(props) {
    super(props);
    this.setProgressBarInterval = this.setProgressBarInterval.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.props.loadGame();
  }

  checkAnswer(selectedButton) {
    if (this.props.gameStarted) {
      this.props.checkAnswer(selectedButton);
    }
  }

  setProgressBarInterval() {
    let myThis = this;

    if (!myThis.props.gameStarted) {
      let myInterval = setInterval(() => {
        myThis.props.progress();

        //TODO: Necesitaria poder parar este interval desde el reducer cuando el numero de vidas llega a 0. ¿Como?
        if (myThis.props.progressBarValue === 100 || !myThis.props.gameStarted) {
          clearInterval(myInterval);
          myThis.props.endGame();
        }
      }, 100);
      myThis.props.startGame();
    } else {
      myThis.props.endGame();
      myThis.props.startGame();
    }
  }

  render() {
    return (
      <View style={{display: 'flex', height: '100%'}}>
        <StroopHeader
          level={this.props.level}
          points={this.props.points}
          maxLevel={this.props.maxLevel}
          maxPoints={this.props.maxPoints}
          lives={this.props.lives}
        />
        <View style={{height: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
          <ProgressBarAnimated
            borderColor="black"
            barAnimationDuration={100}
            borderWidth={3}
            borderRadius={10}
            height={20}
            width={250}
            value={this.props.progressBarValue}
            backgroundColor="#6CC644"
            backgroundColorOnComplete="#6CC644"
            style={{backgroundColor: 'black'}}
            onComplete={this.props.endGame}
          />
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
            onPress={this.setProgressBarInterval}
            backgroundColor="white"
            paddingTop={5}
            paddingBottom={5}
            height={60}
            width="50%"
            borderWidth={5}
            text="COMENZAR JUEGO"
            borderColor="black"
            textColor="black"/>
        </View>
      </View>
    )
  }
}