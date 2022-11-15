import * as React from 'react';
import { Text, View,Dimensions,StyleSheet} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const dataProg = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

const chartConfigProg = {
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
}


export default function Chart1_Line() {
  return (
  <View>
    <Text>Bezier Line Chart</Text>
      <ProgressChart
      data={dataProg}
      width={screenWidth}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfigProg}
      hideLegend={false}
      style={styles.chartStyle}
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
    barStyle:{
        marginHorizontal:10,
        marginVertical: 8,
        marginLeft:10,
        marginRight:40,
        borderRadius: 15
    }
})
