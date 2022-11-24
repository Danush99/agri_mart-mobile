import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {Modal,StyleSheet,Dimensions,ScrollView,ImageBackground,Platform,View,Image,TouchableOpacity,FlatList,Pressable,ToastAndroid,RefreshControl,} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { TextInput } from "react-native-gesture-handler";
import {useForm, Controller} from 'react-hook-form';
import MarketButton from "../../components/MarketButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { UpdateItemImg } from '../../helpers/UserProperties';
import * as ImagePicker from 'expo-image-picker';
import AuthServices from "../../services/AuthServices";
import FarmerServices from "../../services/FarmerServices";
import BuyerServices from "../../services/BuyerServices";


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const nullObject = {
    name:"",
    Desc:"",
    bid:"",
    bidPeriod:"",
    price:"",
    category:"",
    availableAmount:"",
    unit:"",
    img:"",
}

export default function ItemCRUD(props) {
    const { navigation, route } = props;
    const item = route.params?.item;
    const farmerID = route.params?._id;
    const IsUpdate = route.params?.IsUpdate;
    const IsBiding = (IsUpdate)?(item.bid=="1"?true:false) :false
    console.log("IsBiding",IsBiding)
    var d=0
    var h=0
    const { handleSubmit, control } = useForm();
    const [CrudItem, setCrudItem] = useState(IsUpdate?item:nullObject);
    const [IsBid, setIsBid] = useState(IsBiding);
    const [IsDirectB, setIsDirectB] = useState(false);
    const [BidDays, setBidDays] = useState();
    CrudItem["bidPeriod"] = Math.ceil(CrudItem.bidPeriod/(60*60*24))
    //     if(IsUpdate){
    //         console.log("Item:: ",CrudItem)
    //         const postedDate = new Date(item.postedDate);
    //         const now = new Date();
    //         const diffTime = Math.ceil(Math.abs(now - now)/1000);
    //         const nowBidPeriod = item.bidPeriod-diffTime
    //         if(IsBiding){
    //             d = Math.floor(nowBidPeriod/(24*60*60))
    //             setBidDays(d)
    //             console.log("dates",d)
    //         }else{
    //             setBidDays(0)
    //         }
    //     }
    // }, [IsBid]);



    const onSubmit = (data) => {
        console.log("adding item: ",data)
        const BlobArray = [blob1,blob2,blob3]
        const ImgPathArray = [imageUri1,imageUri2,imageUri3]
        FarmerServices.AddItem(data,IsBid,farmerID)
        .then((res) => {
            if(res.success){
                console.log(res.message);
                if(!(blob1==null&&blob2==null&&blob3==null)){
                    UpdateItemImg(ImgPathArray,BlobArray,res.NewItem._id)
                }
            }else{
                console.log(res.message);
            }
          })
          .catch((err) => {
            console.log("backend error : ",err)
          });
        console.log("Submitted")
        navigation.navigate("MiniMarket",{farmerID})
    };

    const onDelete = () => {
        FarmerServices.DeleteItem(item._id)
        .then((res) => {
            console.log(res.message)
          })
          .catch((err) => {
            console.log("backend error : ",err)
          });
        console.log("Submitted")
        navigation.navigate("MiniMarket",{farmerID})
    };

    const onUpdate = (data) => {
        console.log("update items: ",data)
        const BlobArray = [blob1,blob2,blob3]
        const ImgPathArray = [imageUri1,imageUri2,imageUri3]
        FarmerServices.UpdateItem(data,item._id,IsBiding)
        .then((res) => {
            if(res.success){
                console.log(res.message);
                if(!(blob1==null&&blob2==null&&blob3==null)){
                    console.log("there are images to upload",ImgPathArray)
                    UpdateItemImg(ImgPathArray,BlobArray,item._id)
                }
            }else{
                console.log(res.message);
            }
          })
          .catch((err) => {
            console.log("backend error : ",err)
          });
        console.log("Submitted")
        const IsUpdated =true
        navigation.navigate("MiniMarket",{farmerID,IsUpdated})

    };

      //gallery pick
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri1, setImageUri1] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const [imageUri3, setImageUri3] = useState(null);
  const [blob1, setblob1] = useState();
  const [blob2, setblob2] = useState();
  const [blob3, setblob3] = useState();

  
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
  }, [IsBiding]);

  const pick = async (img_id) => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
      });

      if (!result.cancelled) {
        if(img_id=="1"){
            setImageUri1(result.uri);
            const response = await fetch(result.uri)
            const blob = await response.blob()
            setblob1(blob)
        }else if(img_id=="2"){
            setImageUri2(result.uri);
            const response = await fetch(result.uri)
            const blob = await response.blob()
            setblob3(blob)
        }else if(img_id=="3"){
            setImageUri3(result.uri)
            const response = await fetch(result.uri)
            const blob = await response.blob()
            setblob2(blob)
        }
      }
  }

  const removeImage = (img_id) => {
    if(img_id=="1"){
        setImageUri1(null);
        setblob1(null);
    }else if(img_id=="2"){
        setImageUri2(null);
        setblob2(null);
    }else if(img_id=="3"){
        setImageUri3(null);
        setblob3(null);
    }
    setToastMsg('Image Removed');
  }

  const changeProPic = async () => {
    // setModalVisible(!modalVisible)
    // const response = await fetch(imageUri)
    // const blob = await response.blob()
    // SetProfilePicture({uri:imageUri},blob,userType,typeId)
  };
  //----end of gallery pick



    return(
        <ScrollView>
        <View style={styles.centeredView}>
        <View style={styles.AccountmodalView}>

          <View>
            <Text style={styles.modalHead}>Edit Item Details</Text>
          </View>

            {!IsUpdate?
                <>
            <View style={styles.mainInfoContainer}>
                <Text style={styles.AccDetail}>Bidding</Text>
                <BouncyCheckbox
                size={25}
                fillColor="#000000"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#000000" }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={IsBid}
                onPress={()=>{{setIsBid(!IsBid),setIsDirectB(false)}}}
                disableBuiltInState
                />
            </View>
    
            <View style={styles.mainInfoContainer}>
                <Text style={styles.AccDetail}>Direct buying</Text>
                <BouncyCheckbox
                size={25}
                fillColor="#000000"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#000000" }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={IsDirectB}
                onPress={()=>{setIsDirectB(!IsDirectB),setIsBid(false)}}
                disableBuiltInState
                />
            </View>
                </>:null
            }


            <Controller
            name="name"
            defaultValue={CrudItem.name}
            control={control}
            render={({ field: { onChange, value } }) => (

              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>Item name</Text>
              <View style={styles.inputDetails}>
              <TextInput
                style={styles.inputDetails}
                //selection={{start:0}}
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                />
              </View>
              </View>

            )}
            />

            <Controller
            name="Desc"
            defaultValue={CrudItem.Desc}
            control={control}
            render={({ field: { onChange, value } }) => (
                <View style={styles.mainInfoContainer}>
                <Text style={styles.AccDetail}>Item Description</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="Description"
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={onChange}
                    value={value}
                    />
                </View>
                </View>
            )}
            />

            {IsBid?
                <>
                <Controller
                name="bidPeriodD"
                defaultValue={CrudItem.bidPeriod}
                control={control}
                render={({ field: { onChange, value } }) => (
                <View style={styles.mainInfoContainer}>
                <Text style={styles.AccDetail}>Bid expired in days</Text>
                    <View style={styles.inputDetails}>
                        <TextInput
                        style={styles.inputDetails}
                        placeholder="days"
                        onChangeText={onChange}
                        value={value}
                        />
                    </View>
                </View>
    
                )}
                />
                </>:null
            }

            {!IsBid?
          <Controller
            name="price"
            defaultValue={CrudItem.price}
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>Price</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="unit price"
                    onChangeText={onChange}
                    value={value}
                    />
                </View>
              </View>
            )}
            />:
            <Controller
            name="price"
            defaultValue={CrudItem.price}
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>Bidding starting price</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="starting unit price"
                    onChangeText={onChange}
                    value={value}
                    />
                </View>
              </View>
            )}
            />
            }

            <Controller
            name="category"
            defaultValue={CrudItem.category}
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>category</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="category"
                    onChangeText={onChange}
                    value={value}
                    />
                </View>
              </View>
            )}
            />

            <Controller
            name="availableAmount"
            defaultValue={CrudItem.availableAmount}
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>Available amount{"("}{"kg"}{")"}</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="Available amount"
                    onChangeText={onChange}
                    value={value}
                    />
                </View>
              </View>
            )}
            />

            <Controller
            name="unit"
            defaultValue={CrudItem.unit}
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.mainInfoContainer}>
              <Text style={styles.AccDetail}>Unit</Text>
                <View style={styles.inputDetails}>
                    <TextInput
                    style={styles.inputDetails}
                    placeholder="Unit"
                    onChangeText={onChange}
                    value={value}
                    />
                </View>               
              </View>
            )}
            />

        
        <>
            <View style={styles.mainInfoContainer}>
                <TouchableOpacity style={{borderColor:"black",borderWidth:1}} onPress={() =>{pick("1")}} onLongPress={()=>{removeImage("1")}}>
                <Image
                    //source={{ uri: Images.ProfilePicture }}
                    source={{ uri: (imageUri1?imageUri1:CrudItem.img[0]) }}
                    style={styles.avatar}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor:"black",borderWidth:1}} onPress={() =>{pick("2")} } onLongPress={()=>{removeImage("2")}}>
                <Image
                    //source={{ uri: Images.ProfilePicture }}
                    source={{ uri: (imageUri2?imageUri2:CrudItem.img[1]) }}
                    style={styles.avatar}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor:"black",borderWidth:1}} onPress={() =>{pick("3")}} onLongPress={()=>{removeImage("3")}}>
                <Image
                    //source={{ uri: Images.ProfilePicture }}
                    source={{ uri: (imageUri3?imageUri3:CrudItem.img[2]) }}
                    style={styles.avatar}
                />
                </TouchableOpacity>
            </View>
            <Text >Press a square to add the image</Text>
            <Text >Long press a square to remove the image</Text>
        </>


        {IsUpdate?
        <>
            <MarketButton
              buttonName="Update Item"
              onPress={handleSubmit(onUpdate)}
            />
            <MarketButton
              buttonName="Delete Item"
              btColor="red"
              onPress={handleSubmit(onDelete)}
            />
        </>:
            <MarketButton
            buttonName="Add Item"
            onPress={handleSubmit(onSubmit)}
            />
        }




        </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
        borderWidth: 1
    },
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
      width:"90%",
      height:50,
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
      margin: 30,
      marginTop:90,
      width:"90%",
      height:"90%",
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
      marginRight:0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      
    },
    inputDetails:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft:15
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