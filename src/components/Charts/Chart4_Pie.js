import * as React from 'react';
import { Text, View,Dimensions,StyleSheet,Button} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 5,
    //backgroundColor: "#e26a00",
    //decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "5",
        strokeWidth: "1",
        stroke: "white"
    },
    //strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    //propsForVerticalLabels: 10,
    //propsForHorizontalLabels: 10
};

const dataPie = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];


export default function Chart1_Line({navigation}) {
    return (
    <View>
    <PieChart
    data={dataPie}
    width={340}
    height={220}
    chartConfig={chartConfig}
    accessor={"population"}
    backgroundColor={"#1E2923"}
    paddingLeft={"15"}
    center={[0, 0]}
    //absolute
    style={styles.PieStyle}
    />
    <Button
    title='Switch to Other graph'
    //onPress={() => navigation.navigate('Chart1')}
    onPress={() => navigation.navigate('https://drive.google.com/file/d/1_bWYpdjjdl7tfJPyimfD415jsjRG45QV/view')}
    />
    </View>
)}

const styles = StyleSheet.create({
    chartStyle:{
        marginVertical: 8,
        marginLeft:10,
        marginRight:20,
        borderRadius: 15
    },
    PieStyle:{
        marginVertical: 8,
        marginTop:50,
        marginLeft:10,
        borderRadius: 15
    }
})
