import Exponent from 'exponent';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements'

let _ = require('underscore')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barWeight: '45',
      weight:    '225'
    }
  }

  getPlates = () => {
    var bar             = parseInt(this.state.barWeight);
    var weight          = parseInt(this.state.weight);
    var remainingWeight = weight - bar;
    var availablePlates = [45, 25, 10, 5, 2.5]
    var platePairs      = [];

    // Invalid weight errors                                                    {{{
    // ----------------------------------------------------------------------------
    if ((weight % 5) != 0) {
      Alert.alert('Oops!', "Your weights must be fancier than mine, because I can't figure out that math.")
      return -1
    }

    if (remainingWeight == 0) {
      platePairs.push("Just use the bar for now. It'll go up soon.")
    }

    if (remainingWeight < 0) {
      platePairs.push("I don't think there's an easy way to load " + remainingWeight + " on the bar.")
    }

    // }}}

    while (remainingWeight > 0) {
      lookingFor      = remainingWeight / 2;
      plate           = _.max(_.filter(availablePlates, function(n) { return n <= lookingFor; }))
      remainingWeight = remainingWeight - plate*2;

      platePairs.push(plate);
    }

    this.setState({totalPlates: platePairs.join(', ')})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Barbell Math
        </Text>

        <FormLabel>Bar Weight</FormLabel>
        <FormInput
          style={{height: 40}}
          onChangeText={(barWeight) => this.setState({barWeight})}
          value={this.state.barWeight}
        />

        <FormLabel>Weight</FormLabel>
        <FormInput
          style={{height: 40}}
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}
        />
        <Button
          title='MATH' 
          backgroundColor='#4CAF50'
          onPress={this.getPlates.bind(this)} />

        {this.state.totalPlates &&
          <Text style={styles.resultText}>
            {'\n'}{'\n'}
            On each side, you'll need to load:
          </Text>
        }
        <Text style={styles.plates}>
          {'\n'}{'\n'}
          {this.state.totalPlates}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'Futura'
  },
  resultText: {
    fontSize:   20,
    textAlign: 'center',
    fontFamily: 'Futura'
  },
  plates: {
    fontSize:   25,
    textAlign: 'center',
    fontFamily: 'Futura'
  }
});

Exponent.registerRootComponent(App);
