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

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }
    ]
}

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

const dataBar = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };


export default function Chart1_Line({navigation}) {
    return (
<View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={data}
    width={screenWidth} // from react-native
    height={220}
    fromZero={true}
    yAxisLabel="$"
    yAxisSuffix="k"
    xAxisLabel="|"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={chartConfig}
    bezier
    style={styles.chartStyle}
  />

    {/* <ProgressChart
    data={dataProg}
    width={screenWidth}
    height={220}
    strokeWidth={16}
    radius={32}
    chartConfig={chartConfigProg}
    hideLegend={false}
    style={styles.chartStyle}
    /> */}

    <BarChart
    data={dataBar}
    width={340}
    height={260}
    yAxisLabel="රු"
    yAxisSuffix=""
    chartConfig={chartConfig}
    verticalLabelRotation={30}
    withInnerLines={false}
    //showBarTops={false}
    //showValuesOnTopOfBars={true}
    style={styles.barStyle}
    />
    <Button
    title='Switch to Other graph'
    onPress={() => navigation.navigate('Chart5')}
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
      marginVertical: 8,
      marginLeft:10,
      borderRadius: 15
    }
})
