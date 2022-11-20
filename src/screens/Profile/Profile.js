// import React from 'react'
// import Background from '../../components/Background'
// import Logo from '../../components/Logo'
// import Header from '../../components/Header'
// import Paragraph from '../../components/Paragraph'
// import Button from '../../components/Button'
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {Modal,StyleSheet,Dimensions,ScrollView,ImageBackground,Platform,View,Image,TouchableOpacity,FlatList,Pressable,ToastAndroid,RefreshControl,} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker'
//import { Button } from "../../components/Button";
import { Button,Avatar} from 'react-native-paper'
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { ItemCard } from '../../Styles/AppStyles';
import { SetProfilePicture,getUserProfile } from '../../helpers/UserProperties';
import { TextInput } from "react-native-gesture-handler";
import MarketPlaceServices from "../../services/MarketPlaceServices";
import { useLogin } from '../../context/LoginProvider'
import * as ImagePicker from 'expo-image-picker';
import AuthServices from "../../services/AuthServices";
import FarmerServices from "../../services/FarmerServices";
import BuyerServices from "../../services/BuyerServices";
import {useForm, Controller} from 'react-hook-form';
import MarketButton from "../../components/MarketButton";


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const InitProfile = {"_id": "","firstname": "", "lastname": "","birthday": "","nic_number": "","phone_number":"","crop": "","address": "","officer": "","approval": "","district": "","division": "","postal_Code": "", "proPicUrl": "https://firebasestorage.googleapis.com/v0/b/agri-mart-pid11.appspot.com/o/profilePictures%2FDefault%20profile%20picture.jpg?alt=media&token=9787b121-f2ad-4c18-bc19-03dcc5f99e48"}
const wait = (timeout) => {return new Promise(resolve => setTimeout(resolve, timeout));}

export default function Profile({ navigation }) {
  const { user } = useLogin();
  const [UserID, setUserID] = useState(user._id);
  const [TypeId, setTypeId] = useState(user.typeId);
  const [UserType, setUserType] = useState(user.userType);

  const { setIsLoggedIn, setUser } = useLogin();

  const [Profile, setProfile] = useState(InitProfile);
  const [proPicUrl, setproPicUrl] = useState();
  const [Birthday, setBirthday] = useState();
  const { handleSubmit, control } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [AccountmodalVisible, setAccountModalVisible] = useState(false);
  const [date, setDate] = useState(new Date())
  const [changeProData, setChangeProData] = useState(false);
  const [UpdateData, setUpdateData] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    AuthServices.GetUserProfile({UserType ,TypeId})
    .then((res) => {
      console.log("user profile data: ",res)
      if(res.success){
        setProfile(res.user)
        setproPicUrl(res.user.proPicUrl)
        setBirthday(res.user.birthday.substring(0, 10))
        console.log("User profile getting is success:: ",res.user);
      }else{
        console.log("backend error : ",res.message)
      }
    })
    .catch((err) => {
      console.log("backend error : ",err)
    });
  }, []);
  
  //gallery pick
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const setToastMsg = msg => {
      ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const permisionFunction = async () => {

      const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log(imagePermission.status);

      setGalleryPermission(imagePermission.status === 'granted');

      if (imagePermission.status !== 'granted') {
          setToastMsg('Permission for media access needed.');
      }
  }

  useEffect(() => {
      permisionFunction();
  }, []);

  const pick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
      });

      if (!result.cancelled) {
          setImageUri(result.uri);
      }
  }

  const removeImage = () => {
      setImageUri(null);
      setToastMsg('Image Removed');
  }

  const changeProPic = async () => {
    setModalVisible(!modalVisible)
    const response = await fetch(imageUri)
    const blob = await response.blob()
    SetProfilePicture({uri:imageUri},blob,UserType,TypeId)
  };
  //----end of gallery pick


  const LogOut=()=>{
    console.log("Logging out...")
    setUser(null)
    setIsLoggedIn(false)
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  const EditAccountDetails=()=>{
    setAccountModalVisible(!AccountmodalVisible)
  }

  //--edit acount details
  const onSubmit = async (data) => {
    setAccountModalVisible(!AccountmodalVisible)
    const allData = Object.assign({}, Profile, data);
    setChangeProData(true)
    setUpdateData(allData)
  };

  useEffect(() => {
    if(changeProData&&UpdateData){
      AuthServices.UpdateProfile(UpdateData)
      .then((res) => {
        if(res.success){
          setProfile(res.user)
          setBirthday(res.user.birthday.substring(0, 10))
          console.log("User profile updating is success:: ",res.user);
        }else{
          console.log("backend error : ",res.message)
        }
      })
      .catch((err) => {
        console.log("backend error : ",err)
      });
      setChangeProData(false)
    }
  }, [UpdateData,changeProData]);

  return (
    <ScrollView contentContainerStyle={{backgroundColor: theme.COLORS.WHITE }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
    >
      <Block style={styles.profileCard}>

        <Block middle style={styles.avatarContainer}>


          {/* Model for change Account details */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={AccountmodalVisible}
            onRequestClose={() => {
              setAccountModalVisible(!AccountmodalVisible);
            }}
          >
            <View style={styles.centeredView}>
            <View style={styles.AccountmodalView}>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setAccountModalVisible(false)}
              >
              <MaterialCommunityIcons name="close" size={30} />
              </Pressable>

              <View>
                <Text style={styles.modalHead}>Edit Profile Details</Text>
              </View>
              
              {/* <Controller
                name="birthday"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (

                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.detail}>Birthday</Text>
                  <DatePicker date={date} onDateChange={onChange} mode="date" />
                  </View>

                )}
                /> */}

                <Controller
                name="firstname"
                defaultValue={Profile.firstname}
                control={control}
                render={({ field: { onChange, value } }) => (

                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.AccDetail}>First name</Text>
                  <TextInput
                      placeholder="First name"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>

                )}
                />

                <Controller
                name="lastname"
                defaultValue={Profile.lastname}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.AccDetail}>Last name</Text>
                  <TextInput
                      placeholder="Last name"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                />

              <Controller
                name="crop"
                defaultValue={Profile.crop}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.AccDetail}>Crops you grow</Text>
                  <TextInput
                      placeholder="Crops you grow"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                />

              <Controller
                name="address"
                defaultValue={Profile.address}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.AccDetail}>Address</Text>
                  <TextInput
                      placeholder="Address"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                />

              <Controller
                name="postal_Code"
                defaultValue={Profile.postal_Code}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.mainInfoContainer}>
                  <Text style={styles.AccDetail}>Postal code</Text>
                  <TextInput
                      placeholder="Postal code"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                />

                <MarketButton
                  buttonName="Confirm"
                  onPress={handleSubmit(onSubmit)}
                />


            </View>
            </View>
          </Modal>


          {/* Model For Change profile picture */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
            >
              <View style={styles.centeredView}>
              <View style={styles.modalView}>

                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                  <MaterialCommunityIcons name="close" size={30} />
                  </Pressable>

                <View>
                {imageUri?
                <View style={[styles.innerContainer]}>
                    <Avatar.Image
                        size={70}
                        color="#25B70E"
                        style={[styles.submitAvatar]}
                        source={{ uri: imageUri }}
                    />
                </View>:null
                }

                  <View style={[styles.buttonContainer]}>
                      {imageUri?
                      <Button
                      mode='contained'
                      color="#25B70E"
                      style={{marginTop:10}}
                      dark={true}
                      onPress={() => changeProPic()}
                      >
                        Set Profile Picture
                      </Button>:
                      <Button
                          mode='contained'
                          color="#25B70E"
                          style={{marginTop:10}}
                          onPress={pick}
                      >
                          Pick Image
                      </Button>
                      }
                      <Button
                          mode='contained'
                          color="#25B70E"
                          style={{marginTop:10}}
                          onPress={() => removeImage()}
                      >
                          Remove Image
                      </Button>
                  </View>
                </View>

              </View>
              </View>
          </Modal>


        <TouchableOpacity onPress={() =>{setModalVisible(true)}}>
        <Image
            //source={{ uri: Images.ProfilePicture }}
            source={{ uri: proPicUrl }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        </Block>

        <Block style={styles.info}>

          <Block
            space="evenly"
            style={{ marginTop: 5, paddingBottom: 24 }}
          >
          </Block>

          {/* <Block row space="between">
            <Block middle>
              <Text
                bold
                size={18}
                color="#525F7F"
                style={{ marginBottom: 4 }}
              >
                5
              </Text>
              <Text size={12} color={argonTheme.COLORS.TEXT}>Orders</Text>
            </Block>
            <Block middle>
              <Text
                bold
                color="#525F7F"
                size={18}
                style={{ marginBottom: 4 }}
              >
                1
              </Text>
              <Text size={12} color={argonTheme.COLORS.TEXT}>Biddings</Text>
            </Block>
            <Block middle>
              <Text
                bold
                color="#525F7F"
                size={18}
                style={{ marginBottom: 4 }}
              >
                4
              </Text>
              <Text size={12} color={argonTheme.COLORS.TEXT}>Direct</Text>
            </Block>
            </Block> */}

        </Block>

        <Block flex>
          <Block middle style={styles.nameInfo}>
            <Text bold size={28} color="#32325D">
             {Profile.firstname} {Profile.lastname}
            </Text>
            <View >
            <Text size={16} color="#32325D" style={{ marginTop: 10,fontStyle: 'italic' }}>
              {UserType=="buyer"?"'Stay home and shop online'":"'Don't find customers for your product. Find products for your customers'"}
            </Text>
            </View>
          </Block>

          <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
            <Block style={styles.divider} />
          </Block>



          <Block left>

            <View style={styles.itemDetails}>
              <Text bold size={20} color="#32325D" style={{textDecorationLine: 'underline'}}>Your Bio Data</Text>
              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Birthday             </Text>
              <Text  style={styles.detailValue}>{Birthday}</Text>
              </View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>NIC Number      </Text>
              <Text style={styles.detailValue}>{Profile.nic_number}</Text>
              </View>

              
              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Mobile                </Text>
              <Text style={styles.detailValue}>{Profile.phone_number}</Text>
              </View>

              {UserType=="buyer"?
              null
              :  
              <View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Crop                    </Text>
              <Text style={styles.detailValue}>{Profile.crop}</Text>
              </View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Farm Adress      </Text>
              <Text style={styles.detailValue}>{Profile.address}</Text>
              </View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>District                </Text>
              <Text style={styles.detailValue}>{Profile.district}</Text>
              </View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Division               </Text>
              <Text style={styles.detailValue}>{Profile.division}</Text>
              </View>

              <View style={styles.mainInfoContainer}>
              <Text style={styles.bDetail}>Postal Code       </Text>
              <Text style={styles.detailValue}>{Profile.postal_Code}</Text>
              </View>

              </View>
              }

            </View>

          <View style={styles.options}>
            <Pressable
                onPress={() => EditAccountDetails()}
                >
                <View style={styles.mainInfoContainer}>
                <MaterialCommunityIcons style={styles.LogOutButton} name="account-edit" size={30} />
                <Text style={styles.LogoutText} >Edit Account Details</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => LogOut()}
                >
                <View style={styles.mainInfoContainer}>
                <MaterialCommunityIcons style={styles.LogOutButton} name="logout" size={30} />
                <Text style={styles.LogoutText} >LogOut</Text>
                </View>
            </Pressable>
          </View>


          </Block>
          
        </Block>

 
      </Block>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    //position: "relative",
    //padding: theme.SIZES.BASE,
    //marginHorizontal: theme.SIZES.BASE,
    padding:2,
    marginHorizontal: 2,
    marginTop: 80,
    //borderTopLeftRadius: 6,
    //borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  submitAvatar:{
    width: 70,
    height: 70,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:"80%",
    height:"40%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  AccountmodalView: {
    margin: 20,
    width:"90%",
    height:"70%",
    borderWidth:2,
    borderColor:"#48e15a",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose:{
    alignSelf: 'flex-end',
    //alignItems:"right",
    marginTop: 3,
    paddingRight: 5,
    position: 'absolute', // add if dont work with above
  },
  mainInfoContainer:{
    marginLeft:0,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },
  itemDetails:{
    marginLeft:30,
    marginBottom:30,
  },
  modalHead:{
    fontWeight: 'bold',
    fontSize:20,
    textDecorationLine: 'underline',
  },
  detail:{
    fontWeight: 'bold'
  },
  AccDetail:{
    fontWeight: 'bold',
    marginTop:5,
    marginRight:7
  },
  detailValue:{
    
  },
  LogoutText:{
    marginTop:5,
    marginLeft:5
  },
  bDetail:{
    fontWeight: 'bold'
  },
  LogOutButton:{

  },
  options:{
    marginLeft:5
  }
});


