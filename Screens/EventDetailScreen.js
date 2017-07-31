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
const ipAddress = '10.9.9.40';

export default class EventDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            agenda:[
                {
                    startTime: '3:00PM',
                    endTime: '3:15PM',
                    description: 'Networking'
                },
                {
                    startTime: '3:10PM',
                    endTime: '3:45PM',
                    description: 'Talk by Sanjay on "Startups"'
                },
                {
                    startTime: '3:45PM',
                    endTime: '4:15PM',
                    description: 'Startup pitch-PlayYourSport'
                },
                {
                    startTime: '4:15PM',
                    endTime: '4:30PM',
                    description: 'Tea Break'
                },
                {
                    startTime: '4:30PM',
                    endTime: '5:00PM',
                    description: 'Startup pitch Oowomaniya'
                },
                {
                    startTime: '5:00PM',
                    endTime: '5:30PM',
                    description: 'Talk by Vineel - India Growth Story'
                }
            ],
            isImageStatic: false
        };
    }
    filterTitle = (title) => {
		if(title.length > 14){
			return (title.substring(0, 14)+"...")
		}
		return title;
	}
    formatDate(milliSec){
		var date = new Date(parseInt(milliSec));
		return date.toLocaleDateString();
	}
    render(){
        const myData = this.props.data.data;
        const theme = this.props.theme;
        const {goBack} = this.props.navigator;
        var icon = this.state.isImageStatic ? require('./images/watermark-img.jpg') : {uri: "http:"+ipAddress+":8080/site/binaries"+myData.image.path};
        
        return(
            <Container>
                <Header androidStatusBarColor={theme.themeColor} iosBarStyle="light-content">
                <Left>
                    <Button transparent onPress={()=> goBack()}>
                    <Icon name='arrow' ios="ios-arrow-back" android="md-arrow-back" style={{color: 'white'}} onPress={()=> goBack()}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: 'white', fontFamily: theme.fontFamily}}>{this.filterTitle(myData.title)}</Title>
                </Body>
                <Right />
                </Header>
                <Content style={{backgroundColor: 'white'}}>
                    {/*Image View*/}
                    <View style={{width: undefined, height: 2*deviceHeight/7}}>
                        {/*Image*/}
                        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black'}}>
                            <Image source={icon} style={{flex: 1, opacity: 0.5, }}/>
                        </View>
                        {/*Content*/}
                        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>

                            <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{myData.title}</Text>
                                <Text style={{color: 'white', fontSize: 13, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{myData.venue}</Text>
                                
                            </View>
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon name='buffer' android='md-calendar' ios='ios-calendar' style={{fontSize: 20, color: 'white', marginTop: 10, marginBottom: 10, backgroundColor: 'transparent'}}/> 
                                <Text style={{fontSize: 15, color:'white', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{this.formatDate(myData.startDate)}</Text>
                            </View>

                        </View>
                    </View>
                    
                    <View style={{backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
                        {/*Business Summary*/}
                        <View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
                            <Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>EVENT DETAILS</Text>
                            <Text style={{fontSize: 13, marginBottom: 10, fontFamily: theme.fontFamily}}>{myData.description}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: theme.backgroundColor, flexDirection: 'column', alignItems: 'center', paddingTop: 20}}>
                        {/*Business Summary*/}
                        <View style={{width: deviceWidth, paddingLeft: 20, flexDirection: 'column', padding: 5, marginBottom: 10}}>
                            <Text style={{color: theme.themeColor, fontWeight: 'bold', fontSize: 13, marginBottom: 5, fontFamily: theme.fontFamily}}>AGENDA</Text>
                            <Text style={{fontSize: 13, marginBottom: 10, fontFamily: theme.fontFamily}}>{myData.agenda}</Text>
                        </View>
                    </View>
                </Content>
                {/*Footer buttons*/}
                <View style={{flex: 0, flexDirection: 'row', }} zIndex={-1}>
                    <Button full style={{backgroundColor:theme.themeColor, flex: 1}}>
                        <Text style={{color: 'white', fontSize: 15, fontFamily: theme.fontFamily}}>Register</Text>
                    </Button>
                </View>
            </Container>
        );
        
        
    }
}