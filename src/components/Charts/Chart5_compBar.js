import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryGroup } from "victory-native";

const data1 =[
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 2 },
  { x: 5, y: 1 }
]
const data2 =[
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 5 },
  { x: 5, y: 5 }
]
const data3 =[
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 4 }
]

export default function Chart5_compBar({ myData,title,height,noComp,topics,range,lp, ...props }){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

            <View style={styles.labelContainer}>
              <View style={styles.labelDotContainer}>
                <View style={styles.label1}/>
                <Text style={styles.labelText}>
                  {topics[1]}
                </Text>
              </View>
              <View style={styles.labelDotContainer}>
                <View style={styles.label2}/>
                <Text style={styles.labelText}>
                  {topics[0]}
                </Text>
              </View>
            </View>



        <VictoryChart
          padding={{ top: 10, bottom: 30,left:lp }}
          width={325}
          theme={VictoryTheme.material}
          domain={{ y: range }}
        >
            <VictoryGroup horizontal
              //minDomain={{ y: 0 }}
              offset={8}
              style={{ 
                data: { width: 5},
                border:{marginLeft:10}
              }}
              colorScale={["#ED6665", "#177AD5", "gold"]}
            >
              {noComp>0?
              <VictoryBar
                //cornerRadius={{top:100}}
                data={myData[0]}
              />:null
              }
              {noComp>1?
              <VictoryBar
                data={myData[1]}
              />:null
              }
              {noComp>2?
              <VictoryBar
                data={myData[2]}
              />:null
              }
          </VictoryGroup>
        </VictoryChart>
      </View>
    );
}

const styles = StyleSheet.create({
  title:{
    textDecorationLine: 'underline',
  },
  barStyle:{
    marginLeft:10,
    borderRadius: 15,
    paddingRight:2
  },
  container: {
    //marginLeft:10,
    marginTop:40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#f5fcff",
    marginVertical:10,
  },
  labelContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  labelDotContainer:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  label1:{
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#177AD5',
    marginRight: 8,
  },
  label2:{
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ED6665',
    marginRight: 8,
  },
  labelText:{
    width: 60,
    height: 20,
  }
});