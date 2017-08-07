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
	Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Drawer, Card, H3, Text, Badge } from 'native-base';
import Sidebar from './Sidebar';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const getDealsUrl = 'http://10.9.9.54:8008/getAllDeals';

export default class DealScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isLoading: true,
	  	dataSource: [],
			isImageStatic: false,
			isLoggedIn: true
	  };
	  console.log(this.props.navigator);
	}

	componentWillMount(){
		
		fetch('http://'+this.props.info.ipAddress+':'+this.props.info.port+'/getAllDeals')
      	.then((response) => response.json())
      	.then((responseJson) => {
      	//console.log(responseJson.body);
		
      	this.setState({isLoading:false, dataSource: JSON.parse(responseJson.body).items}) 
      })
      .catch((error) => {
        console.error(error);
      });
	}

	render() {
		const theme = this.props.theme;
		var ipAddress = this.props.info.ipAddress;
		var port = this.props.info.port;
		var now = new Date().getTime();
		this.props.info.retrieve('email').then((value)=>{
			if(value == 'null')
				this.setState({isLoggedIn: false});

		})
		return (
			
			<View style={{flex: 1}}>
				
				<View style={{flex: 8, padding: 5, backgroundColor: theme.backgroundColor}}>
					{
						this.state.isLoading? 
						(<ActivityIndicator size={'large'} color={theme.themeColor}/>):
							<FlatList
							data={this.state.dataSource}
							keyExtractor={(item, index) => item.company}
							renderItem={({item}) => {
								//console.log(item);
								var icon = (this.state.isImageStatic? require('./images/watermark-img.jpg'): {uri: item.image.path})
								//console.log(icon);
								var timeDiff = Math.abs(now - item.endDate);
								var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
								
								
								if(this.state.isLoggedIn == false){
									//skipped login
									if(now > item.endDate){
										console.log(diffDays);
										return(
											<TouchableOpacity onPress={()=>this.props.navigator.navigate('DealDetail', {data: item})}>
											<Card >
												<View style={{flex: 1, flexDirection: 'row', padding: 5}}>

													<View style={{flex:1, marginRight: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
														<Image source={icon} style={{width: 40, height: 40}} resizeMode="contain"/>
													</View>

													<View style={{flex: 5, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 5}}>

														<View>
															<Text style={{fontSize: 15, fontFamily: theme.fontFamily}}>{item.company}</Text>
															
															<Text style={{fontSize: 10, color: theme.textColor, fontFamily: theme.fontFamily}}>{item.location}</Text>
															
															
															<Text style={{fontSize: 13, color: theme.textColor, fontFamily: theme.fontFamily}}>{item.industry}</Text>
														</View>
														<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
															<Text style={{fontSize: 10, fontFamily: theme.fontFamily, backgroundColor: 'red', color: 'white', borderRadius: 3, padding: 3, fontWeight: 'bold'}}>Closed {diffDays} days ago</Text>
														</View>
													</View>

												</View>
											</Card>
											</TouchableOpacity>
										);
									}
								}
								else{
									//successfully logged in
									return(
										<TouchableOpacity onPress={()=>this.props.navigator.navigate('DealDetail', {data: item})}>
										<Card >
											<View style={{flex: 1, flexDirection: 'row', padding: 5}}>

												<View style={{flex:1, marginRight: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
													<Image source={icon} style={{width: 40, height: 40}} resizeMode="contain"/>
												</View>

												<View style={{flex: 5, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 5}}>

													<View>
														<Text style={{fontSize: 15, fontFamily: theme.fontFamily}}>{item.company}</Text>
														
														<Text style={{fontSize: 10, color: theme.textColor, fontFamily: theme.fontFamily}}>{item.location}</Text>
														
														
														<Text style={{fontSize: 13, color: theme.textColor, fontFamily: theme.fontFamily}}>{item.industry}</Text>
													</View>
													<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
														{
															(now > item.endDate)?
															<Text style={{fontSize: 10, fontFamily: theme.fontFamily, backgroundColor: 'red', color: 'white', borderRadius: 3, padding: 3, fontWeight: 'bold'}}>Closed {diffDays} days ago</Text>
															:
															<Text style={{fontSize: 10, fontFamily: theme.fontFamily}}>Closes in {diffDays} days</Text>
														}
													</View>
												</View>

											</View>
										</Card>
										</TouchableOpacity>
									);
								}
								}}
						/>
					}
				</View>
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#f2f2f2'

	}
});
