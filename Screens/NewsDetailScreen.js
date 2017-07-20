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
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Drawer, Card, H3, Badge, Thumbnail, List, ListItem } from 'native-base';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


export default class NewsDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state = {

            isImageStatic: false
        };
    }
    filterTitle = (title) => {
		if(title.length > 14){
			return (title.substring(0, 14)+"...")
		}
		return title;
	}
    render(){
        const myData = this.props.data.data;
        const theme = this.props.theme;
        const {goBack} = this.props.navigator;
        var icon = this.state.isImageStatic ? require('./images/watermark-img.jpg') : {uri: 'http://www.smeadvisor.com/wp-content/uploads/2012/04/Startup-Week-Dubai-1024x680.jpg'};
        if(true){
            return(
                <Container>
                    <Header androidStatusBarColor={theme.themeColor} iosBarStyle="light-content">
                    <Left>
                        <Button transparent>
                        <Icon name='arrow' ios="ios-arrow-back" android="md-arrow-back" style={{color: 'white'}} onPress={()=> goBack()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: 'white', fontFamily: theme.fontFamily}}>{this.filterTitle(myData.title)}</Title>
                    </Body>
                    <Right />
                    </Header>
                    <Content style={{backgroundColor: 'white'}}>
                        <Image source={icon} style={{ backgroundColor: 'transparent', opacity: 0.9, height: 2*deviceHeight/7}} resizeMode="stretch">
                            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                                <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
                                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily}}>{myData.title}</Text>
                                    
                                </View>
                                <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Icon name='buffer' android='md-calendar' ios='ios-calendar-outline' style={{fontSize: 20, color: 'white', marginTop: 10, marginBottom: 10}}/> 
                                    <Text style={{fontSize: 15, color:'white', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily}}>{myData.date}</Text>
                                </View>
                            </View>
                        </Image>
                        <View style={{backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
                            {/*Business Summary*/}
                            <View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
                                
                                <Text style={{fontSize: 13, marginBottom: 10, fontFamily: theme.fontFamily}}>{myData.content}</Text>
                            </View>
                        </View>
                        
                    </Content>
                </Container>
            );
        }
        return(
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                {/*Header*/}
                <View style={{height: deviceHeight/10, flexDirection: 'row', justifyContent: 'space-between', alignItems: (Platform.OS === 'ios'?'flex-end': 'center'),  paddingLeft: 20, paddingRight: 20, paddingBottom: 10, backgroundColor: theme.themeColor}}>
					<View>
						<TouchableOpacity onPress={()=> goBack()}>
						    <Icon ios='ios-arrow-back' android="md-arrow-back" style={{fontSize: 30, color: 'white'}}/>
						</TouchableOpacity>
					</View>
					<View>
						<Text style={{color: 'white', fontSize: 25, marginBottom: (Platform.OS === 'ios'? 5: 0), fontFamily: theme.fontFamily}}>{this.filterTitle(myData.title)}</Text>
					</View>
					<View>
						<Icon ios='ios-search' android="md-search" style={{fontSize: 30, color: 'white'}}/>
					</View>
				</View>
                {/*Image and Text*/}
                <View style={{flex: 3}}>
                    <Image source={{uri: 'http://www.smeadvisor.com/wp-content/uploads/2012/04/Startup-Week-Dubai-1024x680.jpg'}} style={{flex: 1, backgroundColor: 'transparent', opacity: 0.8}} resizeMode="stretch" zIndex={1}>
                        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                            <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily}}>{myData.title}</Text>
                                <Text style={{color: 'white', fontSize: 13, fontFamily: theme.fontFamily}}>{myData.venue}</Text>
                                
                            </View>
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon name='buffer' android='md-calendar' ios='ios-calendar-outline' style={{fontSize: 20, color: 'white', marginTop: 10, marginBottom: 10}}/> 
                                <Text style={{fontSize: 15, color:'white', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily}}>{myData.date}</Text>
                            </View>
                        </View>
                    </Image>
                    
                </View>
                <View style={{flex: 5}}>
                    <ScrollView>
                        <View style={{backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
							{/*Business Summary*/}
							<View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
								<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>EVENT DETAILS</Text>
								<Text style={{fontSize: 13, marginBottom: 10, fontFamily: theme.fontFamily}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
							</View>
                        </View>
                        <View style={{backgroundColor: theme.backgroundColor, flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
							{/*Business Summary*/}
							<View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
								<Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>AGENDA</Text>

								<FlatList
                                    data={this.state.agenda}
                                    keyExtractor={(item, index) => item.startTime}
                                    renderItem={ 
                                        ({item}) => {
                                            return(<Text style={{fontFamily: theme.fontFamily}}>{item.startTime} - {item.endTime}  -   {item.description}</Text>);
                                            
                                        }
                                    }
                                />
							</View>
                        </View>
                    </ScrollView>
                </View>
                {/*Footer buttons*/}
				<View style={{flex: 0, flexDirection: 'row', }} zIndex={-1}>
					<Button full style={{backgroundColor:theme.themeColor, flex: 1}}>
						<Text style={{color: 'white', fontSize: 15, fontFamily: theme.fontFamily}}>Register</Text>
					</Button>
				</View>
            </View>
        );
    }
}