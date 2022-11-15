import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import DateField from 'react-native-datefield';
import {useForm, Controller} from 'react-hook-form';


export default function FarmerRegister3({ navigation,route }) {

  const { handleSubmit, control } = useForm();
  const { formID, formdata } = route.params;
  const onSubmit = (data) => {
    allData = Object.assign({}, formdata, data);
    console.log(allData, "data");
    navigation.navigate('Dashboard', { formID: 1,formdata: allData,})
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
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Dashboard' }],
  //   })
  // }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        name="password1"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            returnKeyType="done"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      <Controller
        name="password2"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirmation Password"
            returnKeyType="done"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />

      <Button
        mode="contained"
        //onPress={onSignUpPressed}
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Sign Up
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
