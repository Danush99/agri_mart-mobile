import React, { useLayoutEffect, useRef, useState } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox} from "react-native";
import {PaddyFieldTargetProductivity2022,PaddyFieldProgressProductivity2022,PaddyBarchartData,Effectiveness2021,Effectiveness2022} from '../../data/DashboardFixData'
import Chart3_Bar from '../../components/Charts/chart3_Bar'
import Chart5_comBar from '../../components/Charts/Chart5_compBar'


export default function Dashboard({ navigation }) {

  const [isCommon, setIsCommon] = useState(true);

  return (
    <ScrollView style={styles.container}>
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
  }
})