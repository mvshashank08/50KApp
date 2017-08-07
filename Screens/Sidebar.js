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
			if(false){
				return(
					<View>
						{/*Phone*/}
								<ListItem>
									{
										!this.state.editPhone.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*Name*/}
											<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<Text style={{color: theme.themeColor}}>Phone</Text>
											</View>
											{/*Value*/}
											<View style={{flex: 6, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
												<Text>{this.state.phone}</Text>
											</View>
											{/*Icon*/}
											<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editPhone: {status: true}})}>
												<Icon name="pencil" color="gray" size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
									{
										this.state.editPhone.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*TextBox*/}
											<View style={{flex: 6, padding: 2}}>
												<TextInput 
													style={[styles.textbox, {flex: 1}]} 
													placeholder="Phone" 
													keyboardType="phone-pad" 
													underlineColorAndroid='transparent' 
													autoFocus={true} 
													onChangeText={(text)=>this.setState({editPhone:{text: text, status: true}})}	
												/>
											</View>
											{/*Icon tick*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=> this.setState({phone: this.state.editPhone.text, editPhone:{text: "", status: false}})}>
												<Icon name="check" color={theme.green} size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
											{/*Icon X*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editPhone: {text: "", status: false}})}>
												<Icon name="close" color='red' size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
								</ListItem>
								{/*Domian Expertise*/}
								<ListItem>
									{
										!this.state.editDE.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*Name*/}
											<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<Text style={{color: theme.themeColor, textAlign:'center'}}>Domain Expertise</Text>
											</View>
											{/*Value*/}
											<View style={{flex: 6, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
												<Text>{this.state.domainExpertise}</Text>
											</View>
											{/*Icon*/}
											<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editDE: {status: true}})}>
												<Icon name="pencil" color="gray" size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
									{
										this.state.editDE.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*TextBox*/}
											<View style={{flex: 6, padding: 2}}>
												<TextInput 
													style={[styles.textbox, {flex: 1}]} 
													placeholder="Domain Expertise" 
													keyboardType="default" 
													underlineColorAndroid='transparent' 
													autoFocus={true} 
													onChangeText={(text)=>this.setState({editDE:{text: text, status: true}})}	
												/>
											</View>
											{/*Icon tick*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=> this.setState({domainExpertise: this.state.editDE.text, editDE:{text: "", status: false}})}>
												<Icon name="check" color={theme.green} size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
											{/*Icon X*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editDE: {text: "", status: false}})}>
												<Icon name="close" color='red' size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
								</ListItem>
								{/*Website*/}
								<ListItem>
									{
										!this.state.editWebsite.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*Name*/}
											<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<Text style={{color: theme.themeColor}}>Website</Text>
											</View>
											{/*Value*/}
											<View style={{flex: 6, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
												<Text>{this.state.website}</Text>
											</View>
											{/*Icon*/}
											<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editWebsite: {status: true}})}>
												<Icon name="pencil" color="gray" size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
									{
										this.state.editWebsite.status &&
										<View style={{flex: 1, flexDirection: 'row'}}>
											{/*TextBox*/}
											<View style={{flex: 6, padding: 2}}>
												<TextInput 
													style={[styles.textbox, {flex: 1}]} 
													placeholder="Website" 
													keyboardType="default" 
													underlineColorAndroid='transparent' 
													autoFocus={true} 
													onChangeText={(text)=>this.setState({editWebsite:{text: text, status: true}})}	
												/>
											</View>
											{/*Icon tick*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=> this.setState({website: this.state.editWebsite.text, editWebsite:{text: "", status: false}})}>
												<Icon name="check" color={theme.green} size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
											{/*Icon X*/}
											<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
												<TouchableOpacity onPress={()=>this.setState({editWebsite: {text: "", status: false}})}>
												<Icon name="close" color='red' size={25} style={{alignSelf: 'flex-end'}}/>
												</TouchableOpacity>
											</View>
										</View>
									}
								</ListItem>
					</View>
				);
			}
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