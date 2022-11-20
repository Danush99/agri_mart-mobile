import React from 'react';
import { TouchableHighlight, Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function MarketButton ({buttonName,btColor, ...props} ) {
    return (
      <TouchableHighlight activeOpacity={0.9} underlayColor="#DDDDDD" onPress={props.onPress}>
        <View style={[styles.container,{borderColor: (btColor?btColor:'#2cd18a') }]}>
          <Text style={[styles.text,{color: (btColor?btColor:'#2cd18a')}]}>{buttonName}</Text>
        </View>
      </TouchableHighlight>
    );
}

MarketButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    // height: 50,
    // width: 270,
    height: 50,
    width: 200,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#2cd18a'
  },
  text: {
    fontSize: 14,
    color: '#2cd18a'
  }
});