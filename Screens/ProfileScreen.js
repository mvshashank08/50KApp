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



export default class ProfileScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
        name: 'Christopher Nolan',
        email: 'chrisnolan@gmail.com',
        phone: '9843589231',
        domainExpertise: '',
        website: '',
		image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg',
		editName: {text: "", status: false},
		editEmail: {text: "", status: false},
		editPhone: {text: "", status: false},
		editDE: {text: "", status: false},
		editWebsite: {text: "", status: false}
      };
	}

	componentWillMount(){
		
	}
	
	render() {
		const theme = this.props.theme;
		if(true){
			return(
				<View>
					<View style={{backgroundColor: theme.backgroundColor, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: deviceWidth, height: deviceHeight/4}}>
						<View style={{flex: 0, flexDirection: 'row', width: deviceWidth}}>
							<View style={{flex: 1}}></View>
							<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
								<TouchableOpacity >
								<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'auto'}}/>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1}}></View>
						</View>
						
						<Thumbnail large source={{uri: this.state.image}} />
					</View>
					
					<View style={{backgroundColor: 'white'}}>
						<List>
							{/*Name*/}
							<ListItem>
								
								{
									!this.state.editName.status &&
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*Name*/}
										<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text style={{color: theme.themeColor}}>Name</Text>
										</View>
										{/*Value*/}
										<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text>{this.state.name}</Text>
										</View>
										{/*Icon*/}
										<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editName: {status: true}})}>
											<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
									</View>
								}
								{
									this.state.editName.status &&
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*TextBox*/}
										<View style={{flex: 6, padding: 2}}>
											<TextInput 
												style={[styles.textbox, {flex: 1}]} 
												placeholder="Name" 
												keyboardType="default" 
												underlineColorAndroid='transparent' 
												autoFocus={true} 
												returnKeyType={'done'}
												enablesReturnKeyAutomatically={true}
												onChangeText={(text)=>this.setState({editName:{text: text, status: true}})}	
											/>
										</View>
										{/*Icon tick*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=> this.setState({name: this.state.editName.text, editName:{text: "", status: false}})}>
											<Icon name="check" color={theme.green} size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
										{/*Icon X*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editName: {text: "", status: false}})}>
											<Icon name="close" color='red' size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
									</View>
								}
							</ListItem>
							{/*Email*/}
							<ListItem>		
								{
									!this.state.editEmail.status &&
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*Name*/}
										<View style={{flex: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text style={{color: theme.themeColor}}>Email</Text>
										</View>
										{/*Value*/}
										<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text>{this.state.email}</Text>
										</View>
										{/*Icon*/}
										<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editEmail: {status: true}})}>
											<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
									</View>
								}
								{
									this.state.editEmail.status &&
									<View style={{flex: 1, flexDirection: 'row'}}>
										{/*TextBox*/}
										<View style={{flex: 6, padding: 2}}>
											<TextInput 
												style={[styles.textbox, {flex: 1}]} 
												placeholder="Email" 
												keyboardType="email-address" 
												underlineColorAndroid='transparent' 
												autoFocus={true} 
												onChangeText={(text)=>this.setState({editEmail:{text: text, status: true}})}	
											/>
										</View>
										{/*Icon tick*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=> this.setState({email: this.state.editEmail.text, editEmail:{text: "", status: false}})}>
											<Icon name="check" color={theme.green} size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
										{/*Icon X*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editEmail: {text: "", status: false}})}>
											<Icon name="close" color='red' size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
									</View>
								}
							</ListItem>
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
										<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text>{this.state.phone}</Text>
										</View>
										{/*Icon*/}
										<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editPhone: {status: true}})}>
											<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'flex-end'}}/>
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
											<Icon name="check" color={theme.green} size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
										{/*Icon X*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editPhone: {text: "", status: false}})}>
											<Icon name="close" color='red' size={20} style={{alignSelf: 'flex-end'}}/>
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
											<Text style={{color: theme.themeColor}}>Domain Expertise</Text>
										</View>
										{/*Value*/}
										<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text>{this.state.domainExpertise}</Text>
										</View>
										{/*Icon*/}
										<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editDE: {status: true}})}>
											<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'flex-end'}}/>
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
											<Icon name="check" color={theme.green} size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
										{/*Icon X*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editDE: {text: "", status: false}})}>
											<Icon name="close" color='red' size={20} style={{alignSelf: 'flex-end'}}/>
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
										<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<Text>{this.state.website}</Text>
										</View>
										{/*Icon*/}
										<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editWebsite: {status: true}})}>
											<Icon name="pencil" color="gray" size={20} style={{alignSelf: 'flex-end'}}/>
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
												placeholder="Domain Expertise" 
												keyboardType="default" 
												underlineColorAndroid='transparent' 
												autoFocus={true} 
												onChangeText={(text)=>this.setState({editWebsite:{text: text, status: true}})}	
											/>
										</View>
										{/*Icon tick*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=> this.setState({website: this.state.editWebsite.text, editWebsite:{text: "", status: false}})}>
											<Icon name="check" color={theme.green} size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
										{/*Icon X*/}
										<View style={{flex: 0, justifyContent: 'center', alignItems: 'center', padding: 5}}>
											<TouchableOpacity onPress={()=>this.setState({editWebsite: {text: "", status: false}})}>
											<Icon name="close" color='red' size={20} style={{alignSelf: 'flex-end'}}/>
											</TouchableOpacity>
										</View>
									</View>
								}
							</ListItem>
						</List>
					</View>
					
				</View>
			);
		}
		return (
			
			<View style={{flex: 1}}>
				
				{/*Page*/}
				
				<View style={{flex: 8, backgroundColor: theme.backgroundColor}}>
					
					{/*Tabs*/}
					{/*
					<View style={{flex: 1, flexDirection: 'row', backgroundColor: '#d4eef8', alignItems: 'center'}}>
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={{color: theme.themeColor, fontWeight: 'bold', fontFamily: theme.fontFamily}}>Personal Info</Text>
						</View>
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={{fontFamily: theme.fontFamily}}>Change Password</Text>
						</View>
					</View>
					*/
					}
					{/*Content*/}
					<View style={{flex: 9, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
						<ScrollView style={{backgroundColor: theme.backgroundColor}}>
							{/*name*/}
							<View style={{width: deviceWidth-40}}>
							<TextInput style={styles.textbox}
								placeholder={ 'Name' }
								onChangeText={(text) => {this.setState({name: text})}}
								value={this.state.name}
								underlineColorAndroid='transparent'
							/>
							</View>
							{/*email*/}
							<View style={{width: deviceWidth-40}}>
							<TextInput style={styles.textbox}
								placeholder={ 'Email' }
								onChangeText={(text) => {this.setState({email: text})}}
								value={this.state.email}
								keyboardType="email-address"
								underlineColorAndroid='transparent'
							/>
							</View>
							{/*phone*/}
							<View style={{width: deviceWidth-40}}>
							<TextInput style={styles.textbox}
								placeholder={ 'phone' }
								onChangeText={(text) => {this.setState({name: text})}}
								value={this.state.phone}
								keyboardType="phone-pad"
								underlineColorAndroid='transparent'
							/>
							</View>
							{/*domain expertise*/}
							<View style={{width: deviceWidth-40}}>
							<TextInput style={styles.textbox}
								placeholder={ 'Domain Expertise' }
								onChangeText={(text) => {this.setState({name: text})}}
								value={this.state.domainExpertise}
								keyboardType="default"
								underlineColorAndroid='transparent'
							/>
							</View>
							{/*website*/}
							<View style={{width: deviceWidth-40}}>
							<TextInput style={styles.textbox}
								placeholder={ 'Website' }
								onChangeText={(text) => {this.setState({name: text})}}
								value={this.state.website}
								keyboardType="default"
								underlineColorAndroid='transparent'
							/>
							</View>
							<View style={{margin: 10, flexDirection:'row'}}>
								<View style={{flex: 0}}>
									<Icon ios='ios-close' android="md-close" style={{fontSize: 25, color: theme.themeColor, alignSelf: 'flex-end'}}/>
									<Thumbnail large source={{uri: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg'}} />
								</View>
								<View style={{flex: 1}}></View>
							</View>
							
						</ScrollView>
            
           
          			</View>
            
				</View>
				<View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, backgroundColor: theme.backgroundColor}}>
					<Button style={{backgroundColor: theme.themeColor}} rounded>
						<Text style={{color: 'white'}}>Update</Text>
					</Button>
				</View>
			</View>
			
		);
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