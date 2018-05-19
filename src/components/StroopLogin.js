import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import StroopButton from "./StroopButton";


export default class StroopLogin extends Component {
  constructor(props) {
    super(props);
    this.changeScreenToBoard.bind(this);
  }

  changeScreenToBoard() {
    this.props.changeScreen('board');
  }

  render() {
    return (
      <View style={{display: 'flex', height: '100%'}}>
        <View style={{display: 'flex', height: '40%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 40}}>The Strooper</Text>
        </View>
        <View style={{display: 'flex', height: '30%', paddingLeft: 30, paddingRight: 30}}>
          <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>El objetivo del juego consiste en pulsar el cuadrado cuyo texto se corresponda con su color.</Text>
          <Text style={{color: 'black', fontSize: 16, textAlign: 'center', marginTop: 20}}>Por ejemplo: Pulsar el cuadrado de color rojo cuyo texto es azul... Es una mala opción :)</Text>
          <Text style={{color: 'black', fontSize: 16, textAlign: 'center', marginTop: 20}}>Por último, tienes 3 vidas. Si te equivocas pierdes una vida, y si las pierdes todas... GAME OVER</Text>
        </View>
        <View />
        <View style={{display: 'flex', height: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <StroopButton
            onPress={() => this.changeScreenToBoard()}
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