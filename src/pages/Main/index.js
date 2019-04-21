import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import logo from "../../assets/logo.png";
import api from "../../services/api";

export default class Main extends Component {
  state = { newBox: "" };

  async componentDidMount() {
    //verifica se já tem box na propriedade @RocketBox:box
    const box = await AsyncStorage.getItem("@RocketBox:box");

    if (box) {
      this.props.navigation.navigate("Box");
    }
  }

  handleSignIn = async () => {
    const response = await api.post("boxes", {
      title: this.state.newBox
    });

    //nome da propriedade para gravar informação: @RocketBox:box
    //resposta do axios do backend: response.data._id
    await AsyncStorage.setItem("@RocketBox:box", response.data._id);

    //history serve para navegar o usuário para alguma tela
    this.props.navigation.navigate("Box");
  };

  render() {
    return (
      <View style ={styles.container}>
        <Image style={styles.logo} source={logo} />

        <TextInput
          style={styles.input}
          placeholder="Crie um box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.newBox}
          onChangeText={text => this.setState({ newBox: text })}
        />
        <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
