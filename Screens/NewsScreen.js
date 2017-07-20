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
		isImageStatic: true,
	  	dataSource: [
	  		{title: '50K Network launch in Raipur', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '10 JUL', id: 1},
            {title: 'The Quint Covers Community', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '20 AUG', id: 2},
            {title: 'Fabulyst, A Startup from 50K', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '03 AUG', id: 3}
	  	]
	  };
	}

	componentWillMount(){
		
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
						this.state.isloading? 
						(<ActivityIndicator size={'large'}/>):
							<FlatList
							data={this.state.dataSource}
							keyExtractor={(item, index) => item.id}
							renderItem={({item}) => {
								//console.log(item);
								var icon = this.state.isImageStatic ? require('./images/watermark-img.jpg') : {uri: 'https://facebook.github.io/react/img/logo_og.png'};
								return(
								<TouchableOpacity onPress={()=>this.props.navigator.navigate('NewsDetail', {data: item})}>
									<Image source={icon} style={{backgroundColor: 'transparent', opacity: 0.8, width: undefined, margin: 10, height: deviceHeight/7}} borderRadius={5}>
										<View style={{flex: 1, flexDirection: 'column', padding: 10}}>

											<View style={{flex: 2, flexDirection: 'column', marginLeft: 10}}>
                                                <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily}}>{this.filterTitle(item.title)}</Text>
                                                <Text style={{color: 'black', fontSize: 13, fontFamily: theme.fontFamily}}>{this.filter(item.content)}...</Text>
                                                
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
	header: {
		backgroundColor: '#f2f2f2'

	}
});
/*onPress={() =>
          navigate('Profile', { name: 'Jane' })
          
        }*/