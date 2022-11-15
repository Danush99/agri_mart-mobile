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
const chartConfig = {
    backgroundGradientFrom: "#F2F2F2",
    //backgroundGradientFromOpacity: 5,
    backgroundGradientTo: "#F2F2F2",
    //backgroundGradientToOpacity: 5,
    decimalPlaces: 0,
    //backgroundColor: "white",
    //decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "1",
        strokeWidth: "1",
        stroke: "white"
    },
    //strokeWidth: 1, // optional, default 3
    barPercentage: 0.1,
    useShadowColorFromDataset: false, // optional
    //propsForVerticalLabels: 10,
    //propsForHorizontalLabels: 10
};

const dataBar = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: ["100", "45", "28", "80", "99", "43"]
      }
    ]
  };


export default function Chart3_Bar({ myData,title,height, ...props }) {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <BarChart
        data={myData}
        width={340}
        height={height}
        yAxisLabel=""
        yAxisSuffix=""
        //yAxisInterval={1}
        chartConfig={chartConfig}
        verticalLabelRotation={90}
        withHorizontalLabels={false}
        //segments={0.5}
        //showBarTops={false}
        showValuesOnTopOfBars={true}
        withInnerLines={false}
        style={styles.barStyle}
        />
    </View>

)}

const styles = StyleSheet.create({
    title:{
      textDecorationLine: 'underline',
    },
    chartStyle:{
        marginVertical: 8,
        marginLeft:10,
        marginRight:20,
        borderRadius: 15
    },
    barStyle:{
        marginVertical: 40,
        marginLeft:10,
        borderRadius: 15,
        paddingRight:2,
        marginTop:20
    },
    container: {
        marginTop:40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#f5fcff"
      }
})