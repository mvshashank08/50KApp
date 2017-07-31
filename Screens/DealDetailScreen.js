import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Image,
	FlatList,
	Platform,
	ActivityIndicator,
	ScrollView,
	Text,
	Dimensions,
	ProgressViewIOS,
	TouchableOpacity,
	Animated,
	Slider,
	Alert
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Drawer, Card, H3, Badge, Thumbnail } from 'native-base';



const totalMoney = 50000;
const minInvestAmount = 1000;
const knowMoreURL = 'http://10.9.9.54:8008/deal/{dealUuid}/interest/{userUuid}/';
//http://localhost:8008/deal/{dealUuid}/interest/{userUuid}?userUuid=abcd1234&dealUuid=057435da-d82c-4eca-b09e-3031aa1ac7ca
const investURL = 'http://10.9.9.54:8008/deal/{dealUuid}/investment/{userUuid}/{amount}/';
//



const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class DealDetailScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showCarousel: false,
			showDescription: false,
			progressValue: new Animated.Value(0),
			progressBarColor: 'orange',
			progressRupees: 0,
			progressPercent: 0,
			knowMorePanel: false,
			investPanel: false,
			amountToInvest: minInvestAmount,
			progress: 0,
			dealInfo: null,
			isLoading: true
		};
		//tracking the progress value dynamically
		this.state.progressValue.addListener(({value}) => {
			var rupees = ((value/100)*totalMoney).toFixed(2);
			this.setState({progressRupees: rupees});
			this.setState({progressPercent: Math.round(value)});
			if(value < 25){
				this.setState({progressBarColor: 'orange'})
			}
			else if(value >= 25 && value < 50){
				this.setState({progressBarColor: this.props.theme.themeColor})
			}
			else{
				this.setState({progressBarColor: '#5fba7d'})
			}
		});
		
	}

	componentWillMount(){
		console.log(this.props.data.data.uuid)
		fetch('http://'+this.props.info.ipAddress+':'+this.props.info.port+'/getDeal?dealUuid='+this.props.data.data.uuid, {method: 'GET'})
		.then((response) => response.json())
		.then((responseJson)=>{
			console.log(responseJson)
			this.setState({dealInfo: responseJson, isLoading: false});
			
			//console.log(responseJson.securedFunding)
			var value = parseInt(responseJson.securedFunding*100/totalMoney);
			//console.log(value)
			this.setState({progress: value}, ()=>{
				//console.log(this.state.progress)
				//start progressbar animation
				Animated.timing(                  // Animate over time
				this.state.progressValue,            // The animated value to drive
				{
					toValue: this.state.progress,     // Animate to opacity: 1 (opaque)
					duration: 2000,              // Make it take a while
				}
				).start();                        // Starts the animation
			})
		})


		
	}
	setProgressColor = (progress) => {
		//console.log(progress)
		if(progress < 25){
			return 'orange';
		}
		else if(progress >= 25 && progress < 50){
			return this.props.theme.themeColor;
		}
		else{
			return '#5fba7d';
		}
	}
	filterTitle = (title) => {
		if(title.length > 10){
			return (title.substring(0, 10)+"...")
		}
		return title;
	}
	filterDescription = (content) =>{
		if(!this.state.showDescription){
			return (content.substring(0, 100)+ "...");
		}
		return (content);
	}
	handleKnowMore = ()=>{
		var userUuid = this.props.info.userId;
		var dealUuid = this.state.dealInfo.uuid;

		fetch(knowMoreURL+"?userUuid="+userUuid+"&dealUuid="+dealUuid, {method: 'POST'})
		.then((response)=>{
			console.log(response);
			if(response.status == 200){
				this.setState({showCarousel: true, knowMorePanel: true});
			}
			else{
				//handle negative response - like a toast message in Android, for iOS ?
			}
			
		})
	}
	handleInvest = ()=>{
		//()=> this.setState({showCarousel: false, investPanel: false})
		var amount = this.state.amountToInvest;
		var userUuid = this.props.info.userId;
		var dealUuid = this.state.dealInfo.uuid;

		fetch(investURL+"?userUuid="+userUuid+"&dealUuid="+dealUuid+"&amount="+amount, {method: 'POST'})
		.then((response)=>{
			console.log(response);
			if(response.status == 200){

				this.setState({showCarousel: false, investPanel: false})
				//put an alert
				Alert.alert(
					'Investment Successful',
					'The amount has been invested',
					[
						{text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{ cancelable: false }
				)
			}
			else{
				//handle negative response - like a toast message in Android, for iOS ?
			}
			
		})
	}
	render() {
		const myData = this.state.dealInfo;
		//console.log(myData);
		const {goBack} = this.props.navigator;
		const theme = this.props.theme;
		var ipAddress = this.props.info.ipAddress;
		var port = this.props.info.port;
		if(!this.state.isLoading){
			return(
				<Container>
					<Header androidStatusBarColor={theme.themeColor} iosBarStyle="light-content">
						<Left>
						<Button transparent onPress={()=> goBack()}>
							<Icon name='arrow' ios="ios-arrow-back" android="md-arrow-back" style={{color: 'white'}}/>
						</Button>
						</Left>
						<Body>
							<Title style={{color: 'white'}}>{this.filterTitle(myData.company)}</Title>
						</Body>
						<Right />
					</Header>
					<Content style={{backgroundColor: 'white'}}>
						<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
							
							{/*Logo*/}
							<View>
								<Image source={{uri: myData.image.path}} style={{width: 200, height: 100, marginBottom: 20}} resizeMode="contain"/>
							</View>
				
							<View style={{backgroundColor: theme.backgroundColor, flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
							{/*Business Summary*/}
							<View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
								<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>BUSINESS SUMMARY</Text>
								<Text style={{fontSize: 13, marginBottom: 10, fontFamily: theme.fontFamily}}>{this.filterDescription(myData.description)} <Text style={{textDecorationLine: 'underline'}} onPress={()=> this.setState({showDescription: true})}>{!this.state.showDescription && "See more"}</Text></Text>
								
							</View>
						
							{/*progress bar*/}
							<View style={styles.card}>
								<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>FUNDING STATUS</Text>
								<Text style={{alignSelf: 'flex-end', fontFamily: theme.fontFamily}}> 
									(
									<Text style={{fontWeight: 'bold'}}>
										{this.state.progressPercent + "%"}
									</Text>
									) <Text style={{fontWeight: 'bold'}}>
										{this.state.progressRupees}
									</Text> of  <Text style={{fontWeight: 'bold'}}>
										{totalMoney.toFixed(2)}
									</Text> INR
								</Text>
								
								<View style={{flex: 1, height: 5, flexDirection: 'row', borderRadius: 5, marginBottom: 10}}>
									<Animated.View style={{flex: this.state.progressValue, backgroundColor: this.state.progressBarColor}}></Animated.View>
									<View style={{flex: 100-this.state.progress, backgroundColor: '#d6d6d6'}}></View>
								</View>
								{/*Invest and Know More buttons*/}
								<View style={{flexDirection: 'row', marginTop: 10}}>
									<Button style={{backgroundColor:theme.themeColor, flex: 1, margin: 3, borderRadius: 5, justifyContent: 'center', width: 40, height: 30}} onPress={()=> this.setState({showCarousel: true, investPanel: true, amountToInvest: minInvestAmount})}>
										<Text style={{color: 'white', fontSize: 15, fontFamily: theme.fontFamily}}>Invest</Text>
									</Button>
									<Button 
										style={{flex: 1, backgroundColor: '#e5e5e5', margin: 3, borderRadius: 5, justifyContent: 'center', width: 40, height: 30}} 
										onPress={()=> {
												this.handleKnowMore();	
											}
										}
									>
										<Text style={{color: 'black', fontSize: 15, fontFamily: theme.fontFamily}}>Know More</Text>
									</Button>	
								</View>
								
							</View>

							{/*Card*/}
							<View style={styles.card}>
								{/*row*/}
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
									<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>FUND DETAILS</Text>
								</View>
								{/*row*/}
								<View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
									<View style={{flex: 1, flexDirection: 'column'}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Raising</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>${myData.raising}</Text>
									</View>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Dilution</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>{myData.dilution}%</Text>
									</View>
								</View>
								{/*row*/}
								<View style={{flex: 2, flexDirection: 'row'}}>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Annual Revenue</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>${myData.annualRevenue}</Text>
									</View>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Previous Capital</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>${myData.prevCapital}</Text>
									</View>
								</View>
							</View>
						
							{/*Extra Details*/}
							<View style={styles.card}>
								{/*row*/}
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
									<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>COMPANY DETAILS</Text>
								</View>
								{/*row*/}
								<View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
									<View style={{flex: 1, flexDirection: 'column'}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Location</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>{myData.location}</Text>
									</View>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Industry</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>{myData.industry}</Text>
									</View>
								</View>
								{/*row*/}
								<View style={{flex: 2, flexDirection: 'row'}}>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Founded</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily}}>{myData.founded}</Text>
									</View>
									<View style={{flex: 1}}>
										<Text style={{color: '#8c8c8c', paddingBottom: 5, fontFamily: theme.fontFamily}}>Website</Text>
										<Text style={{color: '#3c444f', fontWeight: 'bold', fontSize: 17, fontFamily: theme.fontFamily, textDecorationLine: 'underline'}}>{myData.company}</Text>
									</View>
								</View>
							</View>
							{/*Interesed People*/}
							<View style={{width: deviceWidth, backgroundColor:'white', paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
								<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, fontFamily: theme.fontFamily}}>WHO HAVE INVESTED</Text>
								
								<View style={{flexDirection: 'row', margin: 5}}>
									{
										(this.state.dealInfo.peopleInterested == null)?
										<View style={{flex: 1, justifyContent: 'center', padding: 30}}>
											<Text style={{fontSize: 12, textAlign: 'center'}}>Nobody has invested on this deal yet.</Text>
										</View>
										:
										<ScrollView horizontal>
											<FlatList
												data={this.state.dealInfo.peopleInterested}
												horizontal={true}
												keyExtractor={(item, index) => item.user.email}
												renderItem={({item}) => {
													
													return(
														<View style={{margin: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
															<Thumbnail  source={{uri: item.user.image}} />
															<Text style={{fontFamily: theme.fontFamily}}>{item.user.name}</Text>
															<Text style={{fontWeight: 'bold', fontFamily: theme.fontFamily}}>{item.amount} INR</Text>
														</View>
												);}}
											/>
										</ScrollView>
									}
									
								</View>
							</View>
							</View>
						</View>
					</Content>
					{/*layer of violet*/}
					{
						this.state.showCarousel &&
					<View style={{flex: 1, position: 'absolute', width: deviceWidth, height: deviceHeight, top: 0, left: 0, bottom: 0, right: 0, padding: 20, backgroundColor: '#d6e3e6', opacity: 0.5}} zIndex={1}></View>
					}
					{/*Know more window*/}
					{
						(this.state.showCarousel && this.state.knowMorePanel) &&
						<View style={{flex: 1, position: 'absolute', width: deviceWidth, height: deviceHeight, top: 0, left: 0, bottom: 0, right: 0, padding: 20, flexDirection: 'column', justifyContent:'center'}} zIndex={2}>
						
							<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
								<View style={{margin: 10}}>
									<Text style={{color: '#9b9b9b', fontSize: 30, fontFamily: theme.fontFamily, textAlign: 'center'}}>Thank you for showing interest!</Text>
								</View>
								<View style={{margin: 10}}>
									<Text style={{color: '#9b9b9b', textAlign: 'center', fontSize: 15, fontFamily: theme.fontFamily}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
								</View>
								<View style={{margin: 10}}>
									<Button style={{backgroundColor: '#e5e5e5' }} rounded onPress={()=> this.setState({showCarousel: false, knowMorePanel: false})}>
										<Text style={{color:'black', fontFamily: theme.fontFamily}}>Close</Text>
									</Button>
								</View>
							</View>
						</View>
					}
					{/*Invest window*/}
					{
						(this.state.showCarousel && this.state.investPanel) &&
						<View style={{flex: 1, position: 'absolute', width: deviceWidth, height: deviceHeight, top: 0, left: 0, bottom: 0, right: 0, padding: 20, flexDirection: 'column', justifyContent:'center'}} zIndex={2}>
						
							<View style={{backgroundColor: 'white', padding: 30, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, opacity: 1.0, height: 3*deviceHeight/4}}>
								<View style={{margin: 10}}>
									<Text style={{color: '#9b9b9b', fontSize: 30, fontFamily: theme.fontFamily}}>Invest</Text>
								</View>
								<View style={{margin: 10, width: '100%'}}>
									<View style={{flexDirection: 'row', justifyContent: "space-between"}}>
										<Text>Rs. {minInvestAmount}</Text>
										<Text>Rs. {totalMoney}</Text>
									</View>
									{
										(Platform.OS == 'ios')?
										<Slider 
											minimumTrackTintColor={theme.themeColor}
											maximumValue={totalMoney}
											minimumValue={minInvestAmount}
											onValueChange={(value)=>this.setState({amountToInvest: parseInt(value)})}
											thumbTintColor={theme.themeColor}
											step={totalMoney/20}
										/>
										:
										<Slider
											maximumTrackTintColor={theme.themeColor}
											maximumValue={totalMoney}
											minimumValue={minInvestAmount}
											onValueChange={(value)=>this.setState({amountToInvest: parseInt(value)})}
											thumbTintColor={theme.themeColor}
											step={totalMoney/20}
											
										/>

									}
									{/*Amount to be invested along with percentage*/}
									<Text style={{alignSelf: 'center', marginTop: 25, fontSize: 30}}>Rs. <Text style={{color: theme.themeColor}}>{this.state.amountToInvest}</Text>  (<Text style={{color: theme.themeColor}}>{this.state.amountToInvest*100/totalMoney}%</Text>)</Text>
								</View>
								<View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
									<Button style={{backgroundColor: theme.themeColor }} rounded onPress={this.handleInvest}>
										<Text style={{color:'white', fontFamily: theme.fontFamily}}>Invest</Text>
									</Button>
									<Button style={{backgroundColor: '#e5e5e5' }} rounded onPress={()=> this.setState({showCarousel: false, investPanel: false})}>
										<Text style={{color:'black', fontFamily: theme.fontFamily}}>Cancel</Text>
									</Button>
								</View>
							</View>
						</View>
					}
				</Container>
			);
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

class MyProgressBar extends Component{
	render(){
		return(
			<View style></View>
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
	}
});