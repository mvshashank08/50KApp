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

export default class DealScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isLoading: true,
		isImageStatic: false,
	  	dataSource: [
	  		{title: '50K Network launch in Raipur', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '10 JUL', id: 1},
            {title: 'The Quint Covers Community', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '20 AUG', id: 2},
            {title: 'Fabulyst, A Startup from 50K', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '03 AUG', id: 3}
	  	]
	  };
	}

	componentWillMount(){
		fetch('http://'+ipAddress+':8082/news')
      .then((response) => response.json())
      .then((responseJson) => {
      	console.log(responseJson);
      	this.setState({isLoading:false, dataSource: responseJson.items}) 
      })
      .catch((error) => {
        console.error(error);
      });
		
	}
    filter = (content) => {
        return (content.substring(0, 80))
    }
    filterTitle = (title)=>{
        if(title.length > 35){
            return (title.substring(0,33)+"...");
        }
        return title;
    }
	render() {
		const theme = this.props.theme;
		return (
			
			<View style={{flex: 1}}>
				
				{/*Page*/}
				
				<View style={{flex: 8, padding: 5, backgroundColor: theme.backgroundColor}}>
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
								<TouchableOpacity onPress={()=>this.props.navigator.navigate('NewsDetail', {data: item})}>
									<View style={{width: undefined, margin: 10, height: deviceHeight/7}}>
										{/*Image*/}
										<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
											<Image source={icon} style={{flex: 1, backgroundColor: 'transparent', opacity: 0.7, borderRadius: 5}} />
										</View>
										{/*Content*/}
										<View style={{flex: 1, flexDirection: 'column', padding: 10}}>

											<View style={{flex: 2, flexDirection: 'column', marginLeft: 10}}>
                                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{this.filterTitle(item.title)}</Text>
                                                <Text style={{color: 'white', fontSize: 13, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{this.filter(item.content)}...</Text>
                                                
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
	header: {
		backgroundColor: '#f2f2f2'

	}
});
/*onPress={() =>
          navigate('Profile', { name: 'Jane' })
          
        }*/