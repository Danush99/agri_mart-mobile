import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useLogin } from '../../context/LoginProvider'

import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox} from "react-native";
import {PaddyFieldTargetProductivity2022,PaddyFieldProgressProductivity2022,PaddyBarchartData,Effectiveness2021,Effectiveness2022} from '../../data/DashboardFixData'
import Chart3_Bar from '../../components/Charts/chart3_Bar'
import Chart5_comBar from '../../components/Charts/Chart5_compBar'


export default function Dashboard({ navigation }) {
  const { user } = useLogin();
  const [UserID, setUserID] = useState(user._id);
  const [TypeId, setTypeId] = useState(user.typeId);
  const [UserType, setUserType] = useState(user.userType);

  const [isCommon, setIsCommon] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
        <Image style={{width: 100,height: 40}} source={require("../../assets/LogoHeader.png")} />
      </View>
      ),
      headerRight: () => (
      <View>
          <Image
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/agri-mart-pid11.appspot.com/o/profilePictures%2FDefault%20profile%20picture%20green.png?alt=media&token=388b1552-9aca-451a-ab99-0e9a11985627',
            }}
            style={{ width: 45, height: 45, borderRadius: 30,marginRight:15 }}
          />
      </View>
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.FilterButtonsContainer}>
        <Pressable onPress={() => setIsCommon(true)}>
          <Text style={[ styles.FilterButtons,isCommon && styles.FilterButtonsSelected, ]}>Common Data</Text>
        </Pressable>
        <Pressable onPress={() => setIsCommon(false)}>
          <Text style={[ styles.FilterButtons,!isCommon && styles.FilterButtonsSelected, ]}>App Data</Text>
        </Pressable>
      </View>
      
      {isCommon?
      <View>
        <Chart5_comBar
        myData={[PaddyFieldTargetProductivity2022,PaddyFieldProgressProductivity2022]}
        title="Paddyfield Progress VS Target Productivity in 2022"
        height=""
        lp={70}
        range={[0.5,90000]}
        noComp={2}
        topics={["Target","Progress"]}
        />
        <Chart3_Bar
        myData={PaddyBarchartData}
        title="No of reservoirs in relevant areas"
        height={450}
        />
        <Chart5_comBar
        myData={[Effectiveness2021,Effectiveness2022]}
        title="Effectiveness of usage of reservoirs 2021 and 2022"
        height=""
        lp={90}
        range={[0,110]}
        noComp={2}
        topics={["2021","2022"]}
        />
      </View>:null
      }

      {isCommon?null:
      <View>
        <Text>App Data</Text>
        
      </View>
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  FilterButtons:{
    marginLeft: 15,
  },
  FilterButtonsSelected:{
    color: "#25B70E",
    textDecorationLine: 'underline',
    marginLeft: 15
  },
  FilterButtonsContainer:{
    marginLeft:6,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  MainContainer:{
    backgroundColor: 'white',
    flex: 1
},
})