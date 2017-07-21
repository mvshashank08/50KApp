import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Image,
	FlatList,
	Platform,
	Text
} from 'react-native';
const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';
export default class Sidebar extends Component{
	render(){
		const resizeMode = 'cover';
    	const text = 'I am some centered text';
		return(
			<View style={{flex: 1, backgroundColor: '#eee'}} >
				<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }} >
					<Image style={{ flex: 1, resizeMode, backgroundColor: 'red', opacity: 0.7}} source={{ uri: remote }} />
				</View>
				<View style={{ flex: 1, justifyContent: 'center', }}>
					<Text style={{ textAlign: 'center', fontSize: 40, color: 'white', backgroundColor: 'transparent'}} >
						{text}
					</Text>
				</View>
			</View>
			
		)
	}
}