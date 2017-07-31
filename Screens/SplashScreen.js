import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	Animated,
	TouchableOpacity,
	StatusBar
} from 'react-native';
import { Button } from 'native-base';

export default class SplashScreen extends Component {
	render() {
		const theme = this.props.theme;
		return (
			<View style={{flex: 1, backgroundColor:'white', flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'}}>
				<StatusBar
					backgroundColor={theme.themeColor}
				/>
				<View style={{flex:1}}></View>
				<View style={{flex:1, justifyContent: 'center'}}>
					<Image source={require('./images/50k-icon.png')} style={{width: 100, height: 100, marginLeft: 30}} resizeMode="contain"/>
				</View>
				
				<View style={{flex:1}}>
					
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#9b9b9b',
		

	}
});