import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import NextIcon from '../components/NextIcon'
import { theme } from '../core/theme'
import DateField from 'react-native-datefield';
import {useForm, Controller} from 'react-hook-form';


export default function FarmerRegister2({ navigation,route }) {

  const { handleSubmit, control } = useForm();
  const { formID, formdata } = route.params;
  const onSubmit = (data) => {
    allData = Object.assign({}, formdata, data);
    console.log(allData, "data");
    navigation.navigate('FarmerRegister3', { formID: 2,formdata: allData,})
  };

  // const onSignUpPressed = () => {
  //   const nameError = nameValidator(name.value)
  //   const emailError = emailValidator(email.value)
  //   const passwordError = passwordValidator(password.value)
  //   if (emailError || passwordError || nameError) {
  //     setName({ ...name, error: nameError })
  //     setEmail({ ...email, error: emailError })
  //     setPassword({ ...password, error: passwordError })
  //     return
  //   }
  //   navigation.navigate('FarmerRegister3')
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'FarmerRegister3' }],
  //   })
  // }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <Controller
        name="NIC_number"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="NIC Number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="Phone_Number"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Phone Number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="Address"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="Postal_Code"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Postal Code"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        style={styles.nextPage}
      >
        Next Page
      <NextIcon />
      </Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  nextPage: {
    marginTop: 24,
    width: '50%',
    height: 50,
  }
})
