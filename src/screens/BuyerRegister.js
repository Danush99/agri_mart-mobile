import React, { useState,useEffect } from "react";
import { View, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
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
import AuthServices from "../services/AuthServices";
import client from '../services/client';



export default function BuyerRegister({ navigation }) {

  const { handleSubmit, control } = useForm();
  const [errors, setErrors] = useState({ lastname:'',firstname:'',email: '', password1: '',password2:'',phone_number:''})
  const [IsSubmit, setIsSubmit] = useState(false);
  const [FromValues, setFromValues] = useState();

  const handleBackendErrors = (errors) => {
    console.log("error : ",errors);
    var allErrorsObject={}
    for(let x=0;x<errors.length;x++){
      var errObjet = errors[x]
      var labelN = errObjet.path[0]
      var errMsg = String(errObjet.message)
      allErrorsObject[labelN]=errMsg
    }
    console.log("allErrorsObject : ",allErrorsObject)
    setErrors(allErrorsObject)
  }
  
  useEffect(() => {
    if (IsSubmit) {
      console.log("Before back end: ",FromValues)
      AuthServices.RegisterBuyer(FromValues)
      .then((msg) => {
        console.log(msg);
      })
      .catch((err) => {
        handleBackendErrors(err.message)
      });
      setIsSubmit(false);
  }
  },[IsSubmit,FromValues]);


  const onSubmit = (data) => {
    var anyErrors=false;
    const err = Object.fromEntries(Object.entries(data).map(([key,val]) => {
      if(val==null || val==""){
        anyErrors = true
        return [key,"This input field can't be empty."]
      }else{
        return [key,""]
      }
    })
    )
    setErrors(err)
    if(anyErrors){
      return
    }else{
      setFromValues(data)
      setIsSubmit(true)
    }
  };

  return (
    <ScrollView style={styles.container}>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <Controller
        name="firstname"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First name"
            onChangeText={onChange}
            value={value}
            error={!!errors.firstname}
            errorText={errors.firstname}
          />
        )}
      />

      <Controller
        style={styles.inputfields}
        name="lastname"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            onChangeText={onChange}
            value={value}
            error={!!errors.lastname}
            errorText={errors.lastname}
          />
        )}
      />

    <Controller
        name="phone_number"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Phone Number"
            onChangeText={onChange}
            value={value}
            error={!!errors.phone_number}
            errorText={errors.phone_number}
          />
        )}
      />

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
            error={!!errors.email}
            errorText={errors.email}
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
            error={!!errors.password1}
            errorText={errors.password1}
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
            error={!!errors.password2}
            errorText={errors.password2}
          />
        )}
      />

      <Button
        mode="contained"
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
    </ScrollView>
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
  },
  err:{
    left: 0,
    marginBottom:10,
    color: 'red',
  },  
  infoItemContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
  },
})
