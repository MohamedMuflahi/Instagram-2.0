import React from 'react';
import { StyleSheet, View,Text,Slider} from 'react-native';
// import {Slider} from '@miblanchard/react-native-slider';

export default ({ value, name, minimum, maximum, step = 1, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name.toUpperCase()}</Text>
    <Slider
      style={styles.slider}
      value={value}
      minimumValue={minimum}
      maximumValue={maximum}
      step={step}
      onValueChange={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingLeft: 20,
    marginVertical: 10,
    borderRadius: 2,
    borderWidth: 0.1,
  },
  text: { textAlign: 'center' },
  slider: { width: 300 },
});
