import React, { useState,useCallback,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native'
//import { Text } from 'react-native-paper'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import NextIcon from '../components/NextIcon'
//import validate from '../helpers/validate'
import DropDownPicker from "react-native-dropdown-picker"
import { theme } from '../core/theme'
import {useForm, Controller} from 'react-hook-form';
import { districs_data,division_data } from "./Registration_data/selectionData";

export default function FarmerRegister1({ navigation }) {

  const { handleSubmit, control } = useForm();
  const [district, setDistrict] = useState(districs_data);
  const [distOpen, setdistOpen] = useState(false);
  const [divtOpen, setdivOpen] = useState(false);
  const [DistValue, setDistValue] = useState(null);
  const onDistOpen = useCallback(() => {
    setdivOpen(false);
  }, []);

  const [errors, setErrors] = useState({ firstname: '', lastname: '',Distric:'',phone_number:'' })

  const onSubmit = (data) => {
    var anyerrors=false;
    const err = Object.fromEntries(Object.entries(data).map(([key,val]) => {
      if(val==null || val==""){
        anyerrors = true
        return [key,"This input field can't be empty."]
      }else{
        return [key,""]
      }
    })
    )
    setErrors(err)
    if(anyerrors){
      return
    }else{
      console.log("data ",data)
      navigation.navigate('FarmerRegister2', { formID: 1,formdata: data,})
    }
  };

  return (
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
          />
        )}
      />
      {errors["phone_number"]=="" ? null:(<View><Text style={styles.err}>{errors["phone_number"]}</Text></View>)}

      <Controller
        name="District"
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
               zIndex={10000}
              zIndexInverse={3000}
            />
          </View>
        )}
      />
      {errors["Distric"]=="" ? null:(<View><Text style={styles.err}>{errors["Distric"]}</Text></View>)}

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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
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
  },
  nextPage: {
    width: '50%',
    marginLeft: 150,
    height: 50,
  },
  err:{
    left: 0,
    marginBottom:10,
    color: 'red',
  }
})
