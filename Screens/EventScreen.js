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
		isImageStatic: true
	  };
	}

	componentWillMount(){
		
	}

	render() {
		const theme = this.props.theme;
		return (
			
			<View style={{flex: 1}}>
				
				{/*Page*/}
				
				<View style={{flex: 9, padding: 5, backgroundColor: '#ecf2f4'}}>
					{
						this.state.isloading? 
						(<ActivityIndicator size={'large'}/>):
							<FlatList
							data={this.state.dataSource}
							keyExtractor={(item, index) => item.id}
							renderItem={({item}) => {
								//console.log(item);
								var icon = this.state.isImageStatic ? require('./images/watermark-img.jpg') : {uri: 'https://facebook.github.io/react/img/logo_og.png'};
								return(
								<TouchableOpacity onPress={()=>this.props.navigator.navigate('EventDetail', {data: item})}>
									
									<Image source={icon} style={{width: undefined, borderRadius: 5, margin: 10, height: deviceHeight/7, backgroundColor: 'transparent', opacity: 0.8}}>
										<View style={{flex: 1, flexDirection: 'column', padding: 10}}>

											<View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10}}>
												<Icon name='buffer' android='md-calendar' ios='ios-calendar' style={{fontSize: 20, color: 'black', marginTop: 10}}/> 
												<Text style={{fontSize: 15, color:'black', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily}}>{item.date}</Text>
											</View>

											<View style={{flex: 2, flexDirection: 'column', marginLeft: 10}}>
												<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily}}>{item.title}</Text>
												<Text style={{color: 'black', fontSize: 13, fontFamily: theme.fontFamily}}>{item.venue}</Text>
												
											</View>
											<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10}}>
												<Icon name='buffer' android='md-arrow-forward' ios='ios-arrow-forward' style={{fontSize: 20, color: 'black'}}/>
											</View>

										</View>
									</Image>
									
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