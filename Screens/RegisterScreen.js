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

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const LinkedinUrl = 'http://facebook.github.io/react-native/releases/0.46/'

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
      linkedinUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78x674dy4m9kqq&redirect_uri=http://localhost:3000/&state=997654321&scope=r_basicprofile%20r_emailaddress%20w_share',
      authorizationCode: ''
    }
    this.setModalVisible = this.setModalVisible.bind(this);
    this.loadHandler = this.loadHandler.bind(this);
  }
  componentWillMount(){
    //getting client access token
    /*
    fetch('http://api.qa1.nbos.in/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'client_id=4bda3178-5b28-4c66-a7b5-7fda05c1c186&client_secret=50kSecret&grant_type=client_credentials'
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)
      this.setState({clientToken: responseJson})
      //console.log(this.state.clientToken);


      //getting linkedin login url
      fetch('http://api.qa1.nbos.in/api/identity/v0/auth/social/linkedIn/login', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+this.state.clientToken.access_token,
        }}
      )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        this.setState({linkedinUrl: responseJson.url})
        //console.log(this.state.linkedinUrl);
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
    */
    
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  loadHandler(data){
    console.log(data)
    
    if(data.url.indexOf('linkedin.com') == -1){
      var url = data.url;
      var code = url.slice(url.indexOf('?code=')+6, url.indexOf('&state'));
      console.log(code);
      this.setState({authorizationCode: code}, ()=>{
        console.log("about to fetch");
        fetch('https://www.linkedin.com/oauth/v2/accessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=authorization_code&code='+this.state.authorizationCode+'&redirect_uri=http://localhost:3000/&client_id=78x674dy4m9kqq&client_secret=ntMSKBvpS6fc1H2H'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({clientToken: responseJson.access_token}, ()=>{
            console.log("about to get profile "+ this.state.clientToken)
            fetch('https://api.linkedin.com/v1/people/~?format=json', {
              method: 'GET',
              headers: {
                'Connection': 'Keep-Alive',
                'Authorization': 'Bearer '+this.state.clientToken+'',
                'Host': 'api.linkedin.com'
              }
            })
            .then((response) => response.json())
            .then((responseJson)=>{
              console.log(responseJson);
              this.setState({modalVisible: false});
            })

          })
        });

      });
      
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

          <Button  style={{backgroundColor: theme.themeColor, justifyContent: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 5, width: deviceWidth - 60 }} onPress={()=>{this.props.info.store('isLoggedIn', 'true'); this.props.navigator.navigate('Home')}} full>
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