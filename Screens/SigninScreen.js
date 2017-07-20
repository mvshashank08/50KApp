import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	Animated,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Button, Item, Input, Icon } from 'native-base';

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
export default class SigninScreen extends Component {
	render() {
		const theme = this.props.theme;
		const {goBack} = this.props.navigator;
		return (
			<View style={{flex: 1, backgroundColor:'white', flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'}}>
                {/*Header*/}
                <View style={{flex: 0, alignSelf: 'flex-start', marginLeft: 20, marginTop: (Platform.OS === 'ios'? 25: 15)}}>
                    <TouchableOpacity onPress={()=> goBack()}>
                        <Icon ios='ios-arrow-back' android="md-arrow-back" style={{fontSize: 30, color: '#444444'}}/>
                    </TouchableOpacity>
                </View>
                {/*Logo*/}
                <View style={{flex:2}}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                        <FadeInView>
                            <Image source={require('./images/50k-logo.png')} style={{width: 300, height: 300}} resizeMode="contain"/>
                        </FadeInView>
                    </View>
                </View>
                {/*Sign up form*/}
                <View style={{flex: 2, width: deviceWidth - 40, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <TextInput style={styles.textbox} placeholder="Phone" keyboardType="phone-pad" underlineColorAndroid='transparent'/>

                    <TextInput style={styles.textbox} placeholder="Email" keyboardType="email-address" underlineColorAndroid='transparent'/>

                    <Button  style={{backgroundColor: theme.themeColor, justifyContent: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 5, width: deviceWidth - 60 }} onPress={()=>this.props.navigator.navigate('Home')} full>
                    <Text style={{color:'white'}}>Sign in</Text>
                    </Button>
                </View>
                
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textbox: {
    borderRadius: 5,
    height: 40, 
    borderColor: '#dadada', 
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
  }
});