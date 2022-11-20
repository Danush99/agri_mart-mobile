import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "galio-framework";

import argonTheme from "../constants/Theme";

export default function ProButton({ small, shadowless, children, color, style, ...props }) {
  const colorStyle = color && argonTheme.COLORS[color.toUpperCase()];
  const buttonStyles = [styles.smallButton,{ backgroundColor: colorStyle },styles.shadow,{...style}];
  return (
    <Button
    style={buttonStyles}
    shadowless
    textStyle={{ fontSize: 12, fontWeight: '700' }}
    {...props}
  >
    {children}
  </Button>
  )
}

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

