import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Image,
	FlatList,
	Platform,
	Text,
	Button
} from 'react-native';
//import OneSignal from 'react-native-onesignal';

export default class Sidebar extends Component{
	constructor(props) {
		super(props);

		
		this.state = {
			seconds: 2,
		};
	}
	componentDidMount() {
    	//OneSignal.configure({});
		//OneSignal.enableInAppAlertNotification(false);
  	}

	
	render(){
		const resizeMode = 'cover';
    	const text = 'I am some centered text';
		return(
			<View style={styles.container}>
				<Text style={styles.welcome}>
				Welcome to the OneSignal Example!
				</Text>
				<Text style={styles.instructions}>
				Using {Platform.OS}? Cool.
				</Text>
			</View>
			
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});