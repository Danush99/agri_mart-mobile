import React, { useState,useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import DropDownPicker from "react-native-dropdown-picker"
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import {useForm, Controller} from 'react-hook-form';
import { dataJson,locations } from "./Registration_data/data";

export default function FarmerRegister1({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })


  const { handleSubmit, control } = useForm();
  const [date, setDate] = useState('09-10-2021');

  const [district, setDistrict] = useState(locations.districts);
  const [distOpen, setdistOpen] = useState(false);
  const [DistValue, setDistValue] = useState(null);
  const onDistOpen = useCallback(() => {
    setdivOpen(false);
  }, []);

  const [division, setDivision] = useState([]);
  const [divtOpen, setdivOpen] = useState(false);
  const [divValue, setdivValue] = useState(null);
  const ondivOpen = useCallback(() => {
    setdistOpen(false);
  }, []);

  const [company, setComapny] = useState([
    { label: "UET", value: "uet1" },
    { label: "aET", value: "uet2" },
    { label: "bET", value: "uet3" },
    { label: "cET", value: "uet4" },
    { label: "eET", value: "uet5" },
    { label: "fET", value: "uet6" },
    { label: "gET", value: "uet7" },
  ]);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);

  const onSignUpPressed = () => {
    
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError || nameError) {
    //   setName({ ...name, error: nameError })
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    // "RegisterScreen2"
    //   return
    // }
    navigation.navigate('FarmerRegister2')
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'RegisterScreen2' }],
    // })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <Controller
        name="Fname"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        style={styles.inputfields}
        name="Lname"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        name="Distric"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownCompany}>
            <DropDownPicker
              style={styles.dropdown}
              open={distOpen}
              value={DistValue} //companyValue
              items={district}
              setOpen={setdistOpen}
              setValue={setDistValue}
              setItems={setDistrict}
              placeholder="Select District"
              placeholderStyle={styles.placeholderStyles}
              activityIndicatorColor="#5188E3"
              searchable={true}
              searchPlaceholder="Search your District here"
              onOpen={onDistOpen}
              onChangeValue={onChange}
               zIndex={1000}
              zIndexInverse={3000}
            />
          </View>
        )}
      />

      <Controller
        name="Devision"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownCompany}>
            <DropDownPicker
              style={styles.dropdown}
              open={divtOpen}
              value={divValue} //companyValue
              items={division}
              setOpen={setdivOpen}
              setValue={setdivValue}
              setItems={setDivision}
              placeholder="Select Division"
              placeholderStyle={styles.placeholderStyles}
              activityIndicatorColor="#5188E3"
              searchable={true}
              searchPlaceholder="Search your Division here"
              onOpen={ondivOpen}
              onChangeValue={onChange}
               zIndex={1000}
              zIndexInverse={3000}
            />
          </View>
        )}
      />



      {/* <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      /> */}
      

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next Page
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
  placeholderStyles: {
    color: "#706e6e",
    fontSize: 15,
  },
  dropdownCompany: {
    width: '100%',
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "#5c5958",
    height: 60,
  },
  inputfields: {
    marginTop: 10,
    marginBottom:0,
  }
})
