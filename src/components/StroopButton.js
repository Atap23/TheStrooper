import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

const StroopButton = function(props) {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      disabled={props.disabled}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        paddingBottom: props.paddingBottom,
        paddingTop: props.paddingTop,
        borderRadius: 5,
        padding: 5,
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'}}>
        <Text style={{
          color: props.textColor,
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold'}}>
          {props.text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default StroopButton;