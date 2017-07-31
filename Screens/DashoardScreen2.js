import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Image,
	FlatList,
	Platform,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	PickerIOS,
	Picker,
	Animated,
	ScrollView
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, Form} from 'native-base';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
var PickerItemIOS = PickerIOS.Item;

export default class DashboardScreen2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			offSet: new Animated.Value(deviceHeight),
			language: 'java',
			showCarousel: false,
			carouselScreen: 1
		}
		this.buttonHandler = this.buttonHandler.bind(this);
		this.closeCarousel = this.closeCarousel.bind(this);
	}
	buttonHandler(){
		console.log('Notfications pressed');
	}
	closeCarousel(){
		console.log("close carousel")
		this.setState({showCarousel: false})
	}
	render() {
		const theme = this.props.theme;
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				
				{/*Header*/}
				<View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:theme.themeColor}} zIndex={-1}>
					<Text style={{fontSize: 30, color:'white', fontFamily: theme.fontFamily}}>Dashboard</Text>
				</View>
				{/*Page*/}
				
				<View style={{flex: 5, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ecf2f4', paddingLeft: 20, paddingRight: 20}} zIndex={-1}>
					<View style={{flexDirection:'column', justifyContent:'flex-start', backgroundColor:'#ecf2f4', padding: 10}}>
						{/* No Deals for no sign up */}
						
						{/* tile */}
						<TouchableOpacity onPress={()=>this.props.navigator.navigate('Events')}>
							<View style={[styles.tile, {alignItems: 'center'}]}>
								<View style={{alignSelf: 'flex-end'}}>
									<Text style={styles.notification}>2</Text>
								</View>
								
								<Icon name='buffer' android='md-calendar' ios='ios-calendar-outline' style={{fontSize: 40, color: '#4a4a4a', marginTop: 10, marginBottom: 10}}/> 
								<Text style={{fontSize: 15, color:'#4a4a4a', marginTop: 10, fontFamily: theme.fontFamily, fontWeight: 'bold'}}>Events</Text>
								
							</View>
						</TouchableOpacity>

                        {/* tile */}
						<TouchableOpacity onPress={()=>this.props.navigator.navigate('Profile')}>
						<View style={styles.tile}>

							<View style={{alignSelf: 'flex-end'}}>
								<Text style={styles.notification}>2</Text>
							</View>
							
							<Icon name='buffer' android='md-settings' ios='ios-settings-outline' style={{fontSize: 40, color: '#4a4a4a', marginTop: 10, marginBottom: 10}}/> 
							<Text style={{fontSize: 15, color:'#4a4a4a', marginTop: 10, fontFamily: theme.fontFamily, fontWeight: 'bold'}}>Profile</Text>

						</View>
						</TouchableOpacity>
						
					</View>
					<View style={{flexDirection: 'column', justifyContent:'flex-start', backgroundColor:'#ecf2f4', padding: 10}}>
						{/* tile */}
						<TouchableOpacity onPress={()=>this.props.navigator.navigate('News')}>
						<View style={styles.tile}>

							<View style={{alignSelf: 'flex-end'}}>
								<Text style={styles.notification}>2</Text>
							</View>
							
							<Icon name='buffer' android='md-paper' ios='ios-paper' style={{fontSize: 40, color: '#4a4a4a', marginTop: 10, marginBottom: 10}}/> 
							<Text style={{fontSize: 15, color:'#4a4a4a', marginTop: 10, fontFamily: theme.fontFamily, fontWeight: 'bold'}}>News</Text>

						</View>
						</TouchableOpacity>
						
						
					</View>
					
					
					
				</View>
				
				{/*Walkthrough*/}
				{/*layer of violet*/}
				
				{
					this.state.showCarousel &&
				<View style={{flex: 1, position: 'absolute', width: deviceWidth, height: deviceHeight, top: 0, left: 0, bottom: 0, right: 0, padding: 20, backgroundColor: '#464e78', opacity: 0.95}} zIndex={1}></View>
				}
				
				{/*Layer of content and carousel*/}
				{ this.state.showCarousel &&
				<View style={{flex: 1, position: 'absolute', width: deviceWidth, height: deviceHeight, top: 0, left: 0, bottom: 0, right: 0, padding: 20, flexDirection: 'column', justifyContent:'center'}} zIndex={2}>
					{ 
						(this.state.carouselScreen == 1) &&
					<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
						<View style={{margin: 10}}>
							<Text style={{color: '#9b9b9b', fontSize: 30, fontFamily: theme.fontFamily}}>Welcome</Text>
						</View>
						<View style={{margin: 10}}>
							<Text style={{color: '#9b9b9b', textAlign: 'center', fontSize: 15, fontFamily: theme.fontFamily}}>We bring together reputed investors, experienced entrepreneurs and erudite mentors to nurture early stage starups and innovative technologies that will define India's growth story.</Text>
						</View>
						<View style={{margin: 10}}>
							<Button style={{backgroundColor: theme.themeColor }} rounded onPress={()=> this.setState({carouselScreen: 2})}>
								<Text style={{color:'white', fontFamily: theme.fontFamily}}>Get Started</Text>
							</Button>
						</View>
					</View>
					
					}
					
					{
						(this.state.carouselScreen == 2) &&
					<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
						<View style={{margin: 10}}>
							<Text style={{color: '#9b9b9b', textAlign: 'center', fontSize: 30, fontFamily: theme.fontFamily}}>Category of Membership</Text>
						</View>
						<View style={{margin: 10, flexDirection: 'row', justifyContent:'space-around'}}>
							<View style={{padding: 30}}>
								<Icon name='buffer' android='md-person' ios='ios-person' style={{fontSize: 80, color: '#4a4a4a', marginTop: 10, marginBottom: 10}}/> 
								<Text style={{fontFamily: theme.fontFamily}}>INDIVIDUAL</Text>
							</View>
							<View style={{padding: 30}}>
								<Icon name='buffer' android='building' ios='building' style={{fontSize: 80, color: '#4a4a4a', marginTop: 10, marginBottom: 10}}/> 
								<Text style={{fontFamily: theme.fontFamily}}>INSTITUTIONAL</Text>
							</View>
						</View>
						<View style={{margin: 10}}>
							<Button style={{backgroundColor: theme.themeColor }} rounded onPress={()=> this.setState({carouselScreen: 3})}>
								<Text style={{color:'white', fontFamily: theme.fontFamily}}>Next</Text>
							</Button>
						</View>
					</View>
						
					}
					{
						(this.state.carouselScreen == 3) &&
					<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
						
						<View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-between'}}>
							<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginBottom: 30}}>
								<TextInput style={styles.textbox} placeholder="Phone" keyboardType="phone-pad" underlineColorAndroid='transparent'/>
								<Text style={{fontFamily: theme.fontFamily}}>Phone</Text>
							</View>
							
							<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
								<TextInput style={styles.textbox} placeholder="www.domain.com" keyboardType="email-address" underlineColorAndroid='transparent'/>
								<Text style={{fontFamily: theme.fontFamily}}>Website</Text>
							</View>
							
						</View>
						<View style={{margin: 10, flex: 1}}>
							<Button style={{backgroundColor: theme.themeColor }} rounded onPress={()=> this.setState({carouselScreen: 4})}>
								<Text style={{color:'white', fontFamily: theme.fontFamily}}>Next</Text>
							</Button>
						</View>
					</View>
						
					}
					{
						(this.state.carouselScreen == 4) &&
						(
							(Platform.OS === 'ios')?
							<View style={{backgroundColor: 'white', padding: 10, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 7*deviceHeight/8}}>
							
								<View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
									
									<Picker>
										<Picker.Item label="Option 1" value="java" />
										<Picker.Item label="Option 2" value="js" />
									</Picker>
									<Text style={{fontFamily: theme.fontFamily}}>INDUSTRY EXPERIENCE</Text>
								</View>
								
								<View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 20}}>
									
									
									<Picker>
										<Picker.Item label="Option 1" value="java" />
										<Picker.Item label="Option 2" value="js" />
										<Picker.Item label="Python" value="python" />
										<Picker.Item label="C++" value="cpp" />
									</Picker>
									<Text style={{fontFamily: theme.fontFamily}}>Kindly indicate your preferred businesses for which Business Plans could be sent for vetting</Text>
								</View>

								<View style={{flex: 0, flexDirection: 'column', justifyContent: 'flex-end'}}>
									<Button style={{backgroundColor: theme.themeColor }} rounded onPress={this.closeCarousel}>
										<Text style={{color:'white', fontFamily: theme.fontFamily}}>Done</Text>
									</Button>
								</View>
								
							</View>
							:
							<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
								
								<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
									
									<Picker>
										<Picker.Item label="Java" value="java" />
										<Picker.Item label="JavaScript" value="js" />
										<Picker.Item label="Python" value="python" />
										<Picker.Item label="C++" value="cpp" />
									</Picker>
									<Text style={{fontFamily: theme.fontFamily}}>INDUSTRY EXPERIENCE</Text>
								</View>
								
								<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
									
									
									<Picker>
										<Picker.Item label="Java" value="java" />
										<Picker.Item label="JavaScript" value="js" />
										<Picker.Item label="Python" value="python" />
										<Picker.Item label="C++" value="cpp" />
									</Picker>
									<Text style={{textAlign: 'center', fontFamily: theme.fontFamily}}>Kindlt indicate your preferred businesses for which Business Plans could be sent for vetting</Text>
								</View>

								<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
									<Button style={{backgroundColor: theme.themeColor }} rounded onPress={this.closeCarousel}>
										<Text style={{color:'white', fontFamily: theme.fontFamily}}>Done</Text>
									</Button>
								</View>
								
							</View>
							
						)
					}

					
				</View>
				}
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	tile: {
		flexDirection:'column', 
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 10, 
		height: 130, 
		width: 100, 
		backgroundColor:'white', 
		borderRadius: 5,
		shadowOffset:{width: 3, height: 3},
		shadowColor: '#d6e3e6',
		shadowOpacity: 1.0,
	},
	notification:{
		backgroundColor: '#f12c43', color:'white', fontWeight: 'bold', padding: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 5
	},
	textbox: {
        borderRadius: 20,
        height: 40, 
        borderColor: '#dadada', 
        borderWidth: 1,
        margin: 10,
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
		width: 2*deviceWidth/3
    }
});
