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
	StatusBar,
	Dimensions
} from 'react-native';
import { Button } from 'native-base';
//import SplashScreen from './SplashScreen.js';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default class LoginScreen extends Component {
	constructor(props){
		super(props);
		this.state={
			showSplash: true
		}
		setTimeout(()=>this.setState({showSplash: false}), 2000)
	}
	render() {
		const theme = this.props.theme;
		return (
			<View style={{flex: 1, backgroundColor:'white', flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'}}>
				<StatusBar
					backgroundColor={theme.themeColor}
				/>
				<View style={{flex:1}}></View>
				<View style={{flex:4, justifyContent: 'flex-start'}}>
					<FadeInView>
						<Image source={require('./images/50k-logo.png')} style={{width: 250, height: 250}} resizeMode="contain"/>
					</FadeInView>
				</View>
				
				<View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<Button style={{backgroundColor: theme.themeColor, borderRadius: 5, width: deviceWidth - 40, justifyContent: 'center' }} onPress={()=>this.props.navigator.navigate('Register')}>
							<Text style={{color:'white', fontFamily: theme.fontFamily}}>Sign Up</Text>
						</Button>
					</View>

					<View style={{flex: 0}}>
						<Button onPress={()=>this.props.navigator.navigate('Home')} transparent>
							<Text style={{color: theme.themeColor, fontFamily: theme.fontFamily}}>SKIP</Text>
						</Button>
					</View>
					
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