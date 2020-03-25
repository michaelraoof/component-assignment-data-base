import React, { Component } from "react";
import { StyleSheet, Alert, SafeAreaView, Button, Text, TextInput, View } from "react-native";
import OptionsMenu from "react-native-options-menu";
const MoreIcon = require("../AwesomeProject - Copy/61140.png");
export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = { num1: "", num2: "", result: "" };
  }
  sum() {
    // console.log(this.state.num1 + "hahah");
    var n1 = parseFloat(this.state.num1);
    var n2 = parseFloat(this.state.num2);
    this.setState({ result: String(n1 + n2) });
  }
  subtract() {
    var n1 = parseFloat(this.state.num1);
    var n2 = parseFloat(this.state.num2);
    this.setState({ result: String(n1 - n2) });
  }
  mult() {
    var n1 = parseFloat(this.state.num1);
    var n2 = parseFloat(this.state.num2);
    this.setState({ result: String(n1 * n2) });
  }
  div() {
    var n1 = parseFloat(this.state.num1);
    var n2 = parseFloat(this.state.num2);
    if (n2 != 0) this.setState({ result: String(n1 / n2) });
    else alert("can`t divide by zero ");
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.opt}>
          <OptionsMenu
            button={MoreIcon}
            buttonStyle={{
              width: 100,
              height: 20,
              margin: 7.5,
              resizeMode: "contain"
            }}
            destructiveIndex={1}
            options={["Sum", "subtract", "multiple", "divide"]}
            actions={[this.sum.bind(this), this.subtract.bind(this), this.mult.bind(this), this.div.bind(this)]}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            keyboardType={"numeric"}
            placeholder="Number 1"
            placeholderTextColor="black"
            // onChangeText={(t) => this.setState({ text1: t, text2: this.state.text2 })}
            onChangeText={value => {
              if (!isNaN(value)) {
                this.setState({ num1: value });
              }
            }}
            value={`${this.state.num1}`}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            keyboardType={"numeric"}
            placeholder="Number 2"
            placeholderTextColor="black"
            //   onChangeText={(t) => this.setState({ text1: this.state.text1, text2: t })}
            onChangeText={value => {
              if (!isNaN(value)) {
                this.setState({ num2: value });
              }
            }}
            value={`${this.state.num2}`}
          />
        </View>
        <View style={styles.output}>
          <Text>{this.state.result}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",

    alignItems: "center",
    marginBottom: 350
  },

  inputs: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#009688",
    padding: 10,
    backgroundColor: "white",
    color: "black"
  },
  output: {
    padding: 20
  },

  buttons: {
    padding: 10
  },
  opt: {
    position: "absolute",
    top: 100,
    right: -10
  }
});
