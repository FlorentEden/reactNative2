import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons';


class Search extends Component{

  constructor(props){
    super(props)
    this.state = {
      response: null,
      city: 'Lyon',
      date: null,
      nomVille: null,
      temp: null,
      fellTemp: null,
      tempMin: null,
      tempMMax: null,
      main: null,
      icon: null,
      icons: [],
    }
  }

  convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
      return 'below absolute zero (0 K)';
    } else {
      return (Math.round(kelvin-273.15));
    }
  }

  componentDidMount(){
    this.searchCity();
  }

  searchCity(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+this.state.city+"&APPID=5d7f2b961deccaa90e359e321c37d7ab")
    .then(res => res.json())
    .then(
      (result) => {
        var date = new Date(result.list[0].dt*1000);
        var jour = date.getDate();
        var month = date.getMonth();
        this.state.date = jour+"/"+month;
        this.state.nomVille = result.city.name;
        this.state.temp = this.convertKelvinToCelsius(result.list[0].main.temp);
        this.state.fellTemp = this.convertKelvinToCelsius(result.list[0].main.feels_like);
        this.state.tempMin = this.convertKelvinToCelsius(result.list[0].main.temp_min);
        this.state.tempMMax = this.convertKelvinToCelsius(result.list[0].main.temp_max);
        this.state.icon = result.list[0].weather[0].icon;
        this.setState({});
      },
      (error) => {}
      );
  }

  setCity(ville){
    this.setState({
      city: ville,
    })
  }


  render(){
    return(
      <View style={styles.view}>
        <View style={styles.viewFlex}>
          <TextInput onChangeText={(text) => this.setCity(text)} value={this.state.city} style={styles.input}/>
          <Button onPress={() => this.searchCity()} title="Search"/>
        </View>
        <Image
          source={{uri: "http://openweathermap.org/img/w/"+this.state.icon+".png"}}
        />
        <View style={styles.viewFlex2}>
          <Text>{this.state.temp}°C</Text>
          <Text>{this.state.date}</Text>
          <Text>{this.state.nomVille}</Text>
          <Text>temperature ressenti: {this.state.fellTemp}°C</Text>
          <Text><FontAwesome5 name='snowflake' size={16} color="grey"/> temperature min: {this.state.tempMin}°C</Text>
          <Text><FontAwesome5 name='thermometer-full' size={16} color="grey"/> temperature max: {this.state.tempMMax}°C</Text>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  view:{
    backgroundColor:"lightgrey",
    height: 1000,
  },
  input:{
    marginTop:30,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor:"white",
  },
  viewFlex:{
    margin: 20,
    textAlign: "center",
  },
  viewFlex2:{
    margin: 20,
    textAlign: "center",
  }
})

export default Search;
