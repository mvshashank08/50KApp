import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  TextInput,
   Text,
  ScrollView
} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Drawer, Card, H3, Badge, Thumbnail, Tabs, Tab, TabHeading, List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sidebar from './Sidebar';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const getProfileUrl = 'http://10.9.9.54:8080/profile?email=';


export default class ProfileScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
        name: 'Christopher Nolan',
        email: 'chrisnolan@gmail.com',
        phone: '',
        domainExpertise: '',
        website: '',
		image: require('./images/watermark-img.jpg'),
		editName: {text: "", status: false},
		editEmail: {text: "", status: false},
		editPhone: {text: "", status: false},
		editDE: {text: "", status: false},
		editWebsite: {text: "", status: false},
		isLoading: true,
		isLoggedIn: false
      };
	}

	componentWillMount(){
		this.props.info.retrieve('email').then((value)=>{
			console.log(value);
			if(value != 'null'){
				//user logged in
				fetch(getProfileUrl+value, {method: 'GET'})
				.then((response) => response.json())
				.then((responseJson)=>{
					console.log(responseJson);
					var data = responseJson;
					this.setState({name: data.firstname+" "+data.lastname, email: value, image: (data.image==null)?require('./images/watermark-img.jpg'):{uri: data.image}, isLoading: false, isLoggedIn: true});
				})
			}
			else{
				this.setState({isLoggedIn: false});
			}
			
		});
		

	}
	
	render() {
		const theme = this.props.theme;
		if(this.state.isLoggedIn == true){
			//user has logged in
			if(this.state.isLoading == false){
				return(
					<View>
						<View style={{backgroundColor: theme.backgroundColor, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: deviceWidth, height: deviceHeight/4}}>
							<View style={{flex: 0, flexDirection: 'row', width: deviceWidth}}>
								<View style={{flex: 1}}></View>
								
								<View style={{flex: 1}}></View>
							</View>
							
							<Image source={this.state.image}  style={{height:125, width: 125, borderRadius: 60}}/>
						</View>
						
						<View style={{backgroundColor: 'white'}}>
							<List>
								{/*Name*/}
								<ListItem>
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*Name*/}
										<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text style={{color: theme.themeColor}}>Name</Text>
										</View>
										{/*Value*/}
										<View style={{flex: 7, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
											<Text>{this.state.name}</Text>
										</View>
									</View>
								</ListItem>
								{/*Email*/}
								<ListItem>		
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*Name*/}
										<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text style={{color: theme.themeColor}}>Email</Text>
										</View>
										{/*Value*/}
										<View style={{flex: 7, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
											<Text>{this.state.email}</Text>
										</View>
										
									</View>
								</ListItem>
								
							</List>
						</View>
						
					</View>
				);
			}
			else{
				return(
					<View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
						<ActivityIndicator size={'large'} color={theme.themeColor}/>
					</View>
				);
			}
		}
		else{
			//user has not logged in
			return(
				<View style={{flex: 1, backgroundColor: theme.backgroundColor, flexDirection: 'column', justifyContent: 'center', margin: 10, padding: 10}}>
					<Text style={{fontFamily: theme.fontFamily}}>Please sign up with us to set up your profile. </Text>
					<TouchableOpacity onPress={()=>{this.props.info.reset('Login', this.props.navigator)}}>
						<Text style={{color: theme.themeColor, fontSize: 20, fontFamily: theme.fontFamily}}>Sign up</Text>
					</TouchableOpacity>
					
					
				</View>
			);

		}
		
	}
}

const styles = StyleSheet.create({
	card: {
		width: deviceWidth - 40, 
		borderRadius: 5,
		shadowOffset:{width: 3, height: 3},
		shadowColor: '#dcdcdc',
		shadowOpacity: 1.0, 
		padding: 20,
		marginBottom: 10,
		backgroundColor: 'white'
	},
    textbox: {
      borderRadius: 15,
      height: 40, 
      borderColor: 'white', 
      borderWidth: 1,
      backgroundColor: 'white',
      textAlign: 'left',
	  margin: 1
    }
});