import React, { useState,useCallback,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import NextIcon from '../components/NextIcon'
import DropDownPicker from "react-native-dropdown-picker"
import { theme } from '../core/theme'
import DateField from 'react-native-datefield';
import { districs_data,division_data } from "./Registration_data/selectionData";
import {useForm, Controller} from 'react-hook-form';


export default function FarmerRegister2({ navigation,route }) {

  const { handleSubmit, control } = useForm();
  const { formID, formdata,allErrors,preValues } = route.params;
  const [distOpen, setdistOpen] = useState(false);
  const [division, setDivision] = useState(division_data[formdata.District]);
  const [divtOpen, setdivOpen] = useState(false);
  const [divValue, setdivValue] = useState(null);
  const ondivOpen = useCallback(() => {
    setdistOpen(false);
  }, []);

  const [errors, setErrors] = useState(allErrors)

  useEffect(() => {
    setErrors(allErrors)
  }, [allErrors]);

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
      const allData = Object.assign({}, formdata, data);
      if(allErrors){
        navigation.navigate('FarmerRegister3', { formID: 1,formdata: allData,allErrors:allErrors,preValues:preValues})
      }else{
        navigation.navigate('FarmerRegister3', { formID: 2,formdata: allData,allErrors:false,preValues:false})
      }
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>


      <Controller
        name="division"
        defaultValue={preValues["division"]}
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
              zIndexInverse={50000}
            />
          </View>
        )}
      />
      {errors["division"]=="" ? null:(<View><Text style={styles.err}>{errors["division"]}</Text></View>)}

      <Controller
        name="nic_number"
        defaultValue={preValues["nic_number"]}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="NIC Number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors["nic_number"]=="" ? null:(<View><Text style={styles.err}>{errors["nic_number"]}</Text></View>)}

      <Controller
        name="address"
        defaultValue={preValues["address"]}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Farm address"
            onChangeText={onChange}
            numberOfLines={3}
            multiline={true}
            value={value}
          />
        )}
      />
      {errors["address"]=="" ? null:(<View><Text style={styles.err}>{errors["address"]}</Text></View>)}

      <Controller
        name="postal_Code"
        defaultValue={preValues["postal_Code"]}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Postal Code"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors["postal_Code"]=="" ? null:(<View><Text style={styles.err}>{errors["postal_Code"]}</Text></View>)}


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
  dropdownCompany: {
    width: '100%',
    marginBottom:0,
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
