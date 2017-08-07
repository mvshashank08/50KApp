import React, { Component } from 'react';
import {
	Dimensions,
	StatusBar,
    View,
    ActivityIndicator
} from 'react-native';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen'
/*
    This screen appears when the user opens the applciation
    Here whether the user has already logged into the app is checked
    If the user has already logged into the app then the user is navigated to HomeScreen
    if not the user is navigated to LoginScreen (first time user is opening the app)
 */
export default class LandingScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            email: null,
            isLoaded: false
        }
    }

    componentWillMount(){
        this.props.info.retrieve('email').then((value)=>{
            //console.log(value);
            this.setState({email: value, isLoaded: true});
        });
    }
	
    render() {
        const theme = this.props.theme;
        if(this.state.isLoaded == true){
            //console.log(this.state.email);
            if(this.state.email == null || this.state.email == 'null'){
                //user opens the app for the first time
                return(
                    <LoginScreen 
                        navigator={this.props.navigator} 
                        theme={this.props.theme} 
                        info={this.props.info}
                    />
                );
            }
            else{
                //the user has already logged in
                //console.log("HomeScreen is to be returned")
                    return(
                    <HomeScreen 
                        navigator={this.props.navigator} 
                        theme={this.props.theme} 
                        info={this.props.info}
                    />
                );
            }
        }
        else{
            return(
                <View style={{flex: 1, justifyContent:'center', backgroundColor: 'white'}}>
					<ActivityIndicator size={'large'} color={theme.themeColor}/>
				</View>
            );
        }
        
            
        
    }
}