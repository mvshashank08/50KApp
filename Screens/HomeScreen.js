import React, { Component } from 'react';
import {
	Dimensions,
	StatusBar
} from 'react-native';
import { Container, Content, Header, Title, Footer, FooterTab, Button, Icon, Text, Badge, Left, Body, Right, StyleProvider, Tab, Tabs } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import DealScreen from './DealScreen';
import EventScreen from './EventScreen';
import NewsScreen from './NewsScreen';
import ProfileScreen from './ProfileScreen';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class FooterTabsBadgeExample extends Component {
	constructor(props){
		super(props);
		this.state={
			page: 'Deals'
		};
		console.log("HomeScreen");
		
	}
	renderPage = (page)=>{
		if(this.state.page == "Deals"){
			return (<DealScreen theme={this.props.theme} navigator={this.props.navigator}/>);
		}
		if(this.state.page == "Events"){
			return (<EventScreen theme={this.props.theme} navigator={this.props.navigator}/>);
		}
		if(this.state.page == "News"){
			return (<NewsScreen theme={this.props.theme} navigator={this.props.navigator}/>);
		}
		if(this.state.page == "Profile"){
			return (<ProfileScreen theme={this.props.theme} navigator={this.props.navigator}/>);
		}
	}
  render() {
		const theme = this.props.theme;
	return (
		<StyleProvider style={getTheme(platform)}>
	  <Container>
		<Header androidStatusBarColor={theme.themeColor} iosBarStyle="light-content">
			<Left/>
			<Body>
				<Title style={{color: 'white'}}>{this.state.page}</Title>
			</Body>
			<Right>
				<Button transparent>
					<Icon name='search' ios="ios-search" android="md-search" style={{color: 'white'}}/>
				</Button>
			</Right>
		</Header>
		<Content style={{backgroundColor: theme.backgroundColor}}>
			{
				this.renderPage()
			}
		</Content>
		<Footer>
		  <FooterTab>
			<Button active={this.state.page == "Deals"?true:false} vertical onPress={()=>{this.setState({page: 'Deals'}); this.renderPage()}}>
			  {/*<Badge><Text>2</Text></Badge>*/}
			  <Icon android='logo-buffer' ios='logo-buffer' />
			  <Text>Deals</Text>
			</Button>
			<Button active={this.state.page == "Events"?true:false} vertical onPress={()=>{this.setState({page: 'Events'}); this.renderPage()}}>
			  <Icon android='md-calendar' ios='ios-calendar' />
			  <Text>Events</Text>
			</Button>
			<Button active={this.state.page == "News"?true:false} vertical onPress={()=>{this.setState({page: 'News'}); this.renderPage()}}>
			  {/*<Badge><Text>2</Text></Badge>*/}
			  <Icon android='md-paper' ios='ios-paper' />
			  <Text>News</Text>
			</Button>
			<Button active={this.state.page == "Profile"?true:false} vertical onPress={()=>{this.setState({page: 'Profile'}); this.renderPage()}}>
			  <Icon android='md-settings' ios='ios-settings' />
			  <Text>Profile</Text>
			</Button>
		  </FooterTab>
		</Footer>
	  </Container>
		</StyleProvider>
	);
  }
}