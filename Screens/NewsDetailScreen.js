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
const newsDetailUrl = 'http://10.9.9.54:8000/newsItem?newsId=';

export default class NewsDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true
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
    componentWillMount(){
        var id = this.props.data.data;
        console.log(id);
        fetch(newsDetailUrl + id)
      .then((response) => response.json())
      .then((responseJson) => {
      	console.log(JSON.parse(responseJson.body));
      	this.setState({isLoading:false, dataSource: JSON.parse(responseJson.body)}) 
      })
      .catch((error) => {
        console.error(error);
      });
    }
    render(){
        
        const theme = this.props.theme;
        const {goBack} = this.props.navigator;
        
        
        if(this.state.isLoading == false){
            const myData = this.state.dataSource;
            var icon = {uri: myData.image.path};
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
                                    
                                </View>
                                <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Icon name='buffer' android='md-calendar' ios='ios-calendar' style={{fontSize: 20, color: 'white', marginTop: 10, marginBottom: 10, backgroundColor: 'transparent'}}/> 
                                    <Text style={{fontSize: 15, color:'white', marginTop: 10, marginLeft: 10, fontFamily: theme.fontFamily, backgroundColor: 'transparent'}}>{this.formatDate(myData.date)}</Text>
                                </View>

                            </View>
                        </View>
                        
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
        else{
            return(
				<View style={{flex: 1, justifyContent:'center', backgroundColor: 'white'}}>
					<ActivityIndicator size={'large'} color={theme.themeColor}/>
				</View>
			);
        }
    }
        
    
}