import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

const StroopHeader = function(props) {
  return (
    <View style={{height: '15%', display: 'flex', paddingLeft: 15, paddingRight: 15}}>
      <View style={{height: '40%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Nivel: {props.level}</Text>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Puntuacion: {props.points}</Text>
      </View>
      <View style={{height: '40%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Nivel Max: {props.maxLevel}</Text>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Puntuacion Max: {props.maxPoints}</Text>
      </View>
      <View style={{height: '20%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Vidas: {props.lives}</Text>
      </View>
    </View>
  );
};

export default StroopHeader;