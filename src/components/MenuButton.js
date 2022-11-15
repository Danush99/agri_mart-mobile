import React from "react";
import { TouchableHighlight, Image, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function MenuButton(props) {
  const { title, onPress, source } = props;

  return (
    <TouchableHighlight onPress={onPress} style={styles.btnClickContain} underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btnIcon: {
    height: 25,
    width: 25
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  }
});