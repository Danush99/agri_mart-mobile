import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>AgriMart</Header>
      <Paragraph>
        What you plant today you will harvest tomorrow
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('FarmerRegister1',{allErrors:false,preValues:false})}
      >
        Sign Up As a Farmer
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('BuyerRegister')}
      >
        Sign Up As a Buyer
      </Button>
    </Background>
  )
}
