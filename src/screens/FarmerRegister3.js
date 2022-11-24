import React, { useState,useEffect } from "react";
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
import AuthServices from "../services/AuthServices";
import client from '../services/client';
import { useLogin } from '../context/LoginProvider';




export default function FarmerRegister3({ navigation,route }) {

  const { handleSubmit, control } = useForm();
  const { formID, formdata,allErrors,preValues } = route.params;
  const [errors, setErrors] = useState(allErrors)
  const [IsSubmit, setIsSubmit] = useState(false);
  const [FromValues, setFromValues] = useState();
  const { setIsLoggedIn, setUser } = useLogin();


  useEffect(() => {
    setErrors(allErrors)
  }, [allErrors]);

  const handleBackendErrors = (errors) => {
    var allErrorsObject={}
    var valueObject={}
    for(let x=0;x<errors.length;x++){
      var errObjet = errors[x]
      var labelN = errObjet.path[0]
      var errMsg = String(errObjet.message)
      allErrorsObject[labelN]=errMsg
      valueObject[labelN]=errObjet.context.value
    }
    navigation.navigate('FarmerRegister1',{allErrors:allErrorsObject,preValues:FromValues})
  }


  useEffect(() => {
    if (IsSubmit) {
      console.log("formValues",FromValues)
      AuthServices.RegisterFarmer(FromValues)
      .then((msg) => {
        console.log(msg);
        navigation.navigate("LoginScreen")
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
    const allData = Object.assign({}, formdata, data);
    setErrors(err)
    if(anyErrors){
      return
    }else{
      setFromValues(allData)
      setIsSubmit(true)
    }
  };


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <Controller
        name="email"
        defaultValue={preValues["email"]}
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
      {errors["email"]=="" ? null:(<View><Text style={styles.err}>{errors["email"]}</Text></View>)}

      <Controller
        name="password1"
        defaultValue={preValues["password1"]}
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
      {errors["password1"]=="" ? null:(<View><Text style={styles.err}>{errors["password1"]}</Text></View>)}

      <Controller
        name="password2"
        defaultValue={preValues["password2"]}
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
      {errors["password2"]=="" ? null:(<View><Text style={styles.err}>{errors["password2"]}</Text></View>)}

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
  }
})
