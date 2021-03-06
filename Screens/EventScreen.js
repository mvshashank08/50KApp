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

const ipAddress = '10.9.9.5';

export default class EventScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isLoading: true,
	  	dataSource: [
	  		{title: 'Startup Presentation', venue: 'ISB, Hyderabad', date: '10 JUL', id: 1},
            {title: 'Startup Presentation', venue: 'ISB, Hyderabad', date: '20 AUG', id: 2},
            {title: 'Startup Presentation', venue: 'ISB, Hyderabad', date: '03 AUG', id: 3}
	  	],
		isImageStatic: false
	  };
	}

	componentWillMount(){
		fetch('http://'+ipAddress+':8082/events')
      .then((response) => response.json())
      .then((responseJson) => {
      	console.log(responseJson);
      	this.setState({isLoading:false, dataSource: responseJson.items}) 
      })
      .catch((error) => {
        console.error(error);
      });
	}

	render() {
		const theme = this.props.theme;
		return (
			
			<View style={{flex: 1}}>
				
				{/*Page*/}
				
				<View style={{flex: 9, padding: 5, backgroundColor: '#ecf2f4'}}>
					{
						this.state.isLoading? 
						(<ActivityIndicator size={'large'} color={theme.themeColor}/>):
							<FlatList
							data={this.state.dataSource}
							keyExtractor={(item, index) => item.title}
							renderItem={({item}) => {
								//console.log(item);
								var icon = this.state.isImageStatic ? require('./images/watermark-img.jpg') : {uri: "http:"+ipAddress+":8080/site/binaries"+item.image.path};
								return(
								<TouchableOpacity onPress={()=>this.props.navigator.navigate('EventDetail', {data: item})}>
									
									<View style={{width: undefined, margin: 10, height: deviceHeight/7}}>
										{/*Image*/}
										<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
											<Image source={icon} style={{flex: 1, backgroundColor: 'transparent', opacity: 0.7, borderRadius: 5}}/>
										</View>
										{/*Content*/}
										<View style={{flex: 1, flexDirection: 'column', padding: 10}}>

											<View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10}}>
												<Icon name='buffer' android='md-calendar' ios='ios-calendar' style={{fontSize: 20, color: 'white', marginTop: 10, backgroundColor: 'transparent'}}/> 
												<Text style={{fontSize: 15, color:'white', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{item.date}</Text>
											</View>

											<View style={{flex: 2, flexDirection: 'column', marginLeft: 10}}>
												<Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{item.title}</Text>
												<Text style={{color: 'white', fontSize: 13, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{item.venue}</Text>
												
											</View>
											<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10}}>
												<Icon name='buffer' android='md-arrow-forward' ios='ios-arrow-forward' style={{fontSize: 20, color: 'white', backgroundColor: 'transparent'}}/>
											</View>

										</View>
									</View>
									
									
								</TouchableOpacity>
							);}}
						/>
					}
					
                
				</View>
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 5,
		shadowOffset:{width: 3, height: 3},
		shadowColor: '#dcdcdc',
		shadowOpacity: 1.0
	}
});
/*onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }*/