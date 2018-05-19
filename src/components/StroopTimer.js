import React from 'react';
import { Animated, View, Easing } from 'react-native';

export default class StroopTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedWidthValue: new Animated.Value(100)
    };

    this.interpolatedWidth = this.state.animatedWidthValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    });

    this.getAnimation = this.getAnimation.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.restartAnimation = this.restartAnimation.bind(this);
    this.onEndHandler = this.onEndHandler.bind(this);
  }

  componentDidMount() {
    this.widthAnimation = this.getAnimation();
  }

  getAnimation(seconds) {
    return Animated.timing(
      this.state.animatedWidthValue,
      {
        toValue: 0,
        duration: seconds * 1000,
        easing: Easing.linear
      }
    );
  }

  startAnimation(seconds) {
    this.widthAnimation = this.getAnimation(seconds);
    this.widthAnimation.start(this.onEndHandler);
  }

  stopAnimation() {
    this.widthAnimation.stop();
    this.state.animatedWidthValue.setValue(100);
  }

  restartAnimation() {
    this.widthAnimation.stop();
    this.state.animatedWidthValue.setValue(100);
    return this.widthAnimation.start(this.onEndHandler);
  }

  onEndHandler(params) {
    if (params.finished) {
      this.state.animatedWidthValue.setValue(100);
      this.props.endGame();
    }
  }

  render() {
    return (
      <View style={{borderWidth: 5, borderColor: 'black', width: 250, height: 25}}>
        <Animated.View style={{height: '100%', backgroundColor: 'green', width: this.interpolatedWidth}}/>
      </View>
    );
  }
}