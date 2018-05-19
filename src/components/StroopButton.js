import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';
import Utils from '../Utils'

const StroopButton = function(props) {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      disabled={props.disabled}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{
        borderWidth: props.borderWidth,
        borderColor: Utils.getColorFromName(props.borderColor),
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
          color: Utils.getColorFromName(props.textColor),
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold'}}>
          {props.text.toUpperCase()}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default StroopButton;