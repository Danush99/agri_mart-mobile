import React, { useState,useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import {useForm, Controller} from 'react-hook-form';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import AuthServices from "../services/AuthServices";
import { useLogin } from '../context/LoginProvider';

export default function LoginScreen({ navigation,route }) {
  const { setIsLoggedIn, setUser, setProfile } = useLogin();
  const { handleSubmit, control } = useForm();
  const [errors, setErrors] = useState({ email: '', password: ''})
  const [IsSubmit, setIsSubmit] = useState(false);
  const [FromValues, setFromValues] = useState();
  const [InvalidFarmer, setInvalidFarmer] = useState(false);

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
      AuthServices.LoginUser(FromValues)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        setProfile(res.profile);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log("backend error : ",err)
        if(err.NotApprove){
          setInvalidFarmer(true)
        }else{
          handleBackendErrors(err.message)
        }

      });
      setIsSubmit(false);
  }
  },[IsSubmit,FromValues]);

  const onSubmit = (data) => {
    console.log("submited")
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
    console.log("error",err)
    setErrors(err)
    if(anyErrors){
      return
    }else{
      const allData = Object.assign({}, data, {mobile:true});
      setFromValues(allData)
      setIsSubmit(true)
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back</Header>
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
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            returnKeyType="done"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={!!errors.password}
            errorText={errors.password}
          />
        )}
      />

      {InvalidFarmer?(<View><Text style={styles.err}>Your account is not verified yet !</Text></View>):null}

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Log in
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('StartScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.green,
  },
  err:{
    left: 0,
    marginBottom:10,
    color: 'red',
  }
})
