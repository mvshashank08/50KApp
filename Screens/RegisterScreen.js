//https://stackoverflow.com/questions/39682445/prevent-webview-from-loading-url-in-android-react-native
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
  Platform,
  WebView,
  Modal
} from 'react-native';
import { Button, Item, Input, Icon } from 'native-base';

//import config
import {config} from '../config.js';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


const sendAuthCode = config.loginUrl;
const redirectUrl = config.loginUrl+'status';

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
export default class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      profileUrl: '',
      clientToken: '',
      linkedinUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81hcrkktl6101f&redirect_uri='+redirectUrl+'&state=997654321&scope=r_basicprofile%20r_emailaddress%20w_share',
      authorizationCode: ''
    }
    this.setModalVisible = this.setModalVisible.bind(this);
    this.loadHandler = this.loadHandler.bind(this);
  }
  componentWillMount(){
    
    
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  loadHandler(data){
    console.log(data)
    //if redirected to another domain other than linkedin.com
    if(data.url.indexOf('linkedin.com') == -1){
      var url = data.url;
      //if the url contain code, then the login is a success
      if(url.indexOf('code') != -1){
        var code = url.slice(url.indexOf('?code=')+6, url.indexOf('&state'));
        console.log(code);
        this.setState({authorizationCode: code, modalVisible: false}, ()=>{
          
			//send authorization code to server
			var authCodeUrl = sendAuthCode+code;
			console.log(authCodeUrl);
			
			var request = new XMLHttpRequest();
			request.onreadystatechange = (e) => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					console.log(request.responseText);
					var email = JSON.parse(request.responseText).body;
					this.props.info.store('email', email);
					this.props.info.store('authCode', code);
					//response sent successfully, send the user to home screen
					this.props.info.reset('Home', this.props.navigator);
					//clear the navigator stack also

				} else {
					alert('An error occured. Please login again.');
				}
			};

			request.open('GET', authCodeUrl);
			request.send();
			/*
			fetch(authCodeUrl)
			.then((response) => response.json())
			.then((responseJson)=>{
				console.log(responseJson);
				this.props.info.store('email', responseJson.body);
				this.props.info.store('authCode', code);
				//response sent successfully, send the user to home screen
				this.props.info.reset('Home', this.props.navigator);
				//clear the navigator stack also
			});
			*/
        });
      }
      else{
        //login failed

      }
      
    }
    
  }

	render() {
		const theme = this.props.theme;
		const {goBack} = this.props.navigator;
		return (
			<View style={{flex: 1, backgroundColor:'white', flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'}}>
        {/*Modal Window*/}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', padding: 10, paddingTop: (Platform.OS === 'ios'?20:5)}}>
            <TouchableOpacity onPress={()=>this.setState({modalVisible: false})}>
              <Icon ios='ios-close' android="md-close" style={{alignSelf: 'flex-end', color: '#444444', fontSize: 30}}/>
            </TouchableOpacity>
          </View>
          <WebView
            ref={(WEBVIEW)=>{this.WEBVIEW = WEBVIEW}}
            source={{uri: this.state.linkedinUrl}}
            style={{flex: 1}}
            onNavigationStateChange={this.loadHandler}
          />
          
        </Modal>
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
              <Image source={require('./images/50k-logo.png')} style={{width: 250, height: 250}} resizeMode="contain"/>
            </FadeInView>
          </View>
				</View>
        {/*Sign up form*/}
				<View style={{flex: 2, width: deviceWidth - 40, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <TextInput style={styles.textbox} placeholder="Phone" keyboardType="phone-pad" underlineColorAndroid='transparent'/>
          
          <TextInput style={styles.textbox} placeholder="Email" keyboardType="email-address" underlineColorAndroid='transparent'/>

          <Button  style={{backgroundColor: theme.themeColor, justifyContent: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 5, width: deviceWidth - 60 }} full>
            <Text style={{color:'white'}}>Sign up</Text>
          </Button>
        </View>
        {/*Linkedin Login button*/}
				<View style={{flex:2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:theme.textColor}}> or</Text>
          <TouchableOpacity onPress={()=>{console.log(this.state.linkedinUrl);this.setModalVisible(true)}}>
            <Image source={require('./images/SignInSmallDefault.png')} style={{marginTop: 10, marginBottom: 10, borderRadius: 5}}/>
          </TouchableOpacity>
          <Text style={{color:theme.textColor, marginTop: 5}}>
            Already have an account? <Text style={{fontWeight: 'bold', textDecorationLine:'underline'}} onPress={()=>this.props.navigator.navigate('Signin')}>Sign in</Text>
          </Text>			
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