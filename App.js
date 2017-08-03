import React from 'react';
import {
  AppRegistry,
  Text,
  AsyncStorage
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import DashboardScreen from './Screens/DashboardScreen';
import DashboardScreen2 from './Screens/DashoardScreen2';
import DealScreen from './Screens/DealScreen';
import DealDetailScreen from './Screens/DealDetailScreen';
import EventScreen from './Screens/EventScreen';
import NewsScreen from './Screens/NewsScreen';
import NewsDetailScreen from './Screens/NewsDetailScreen';
import EventDetailScreen from './Screens/EventDetailScreen';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import SigninScreen from './Screens/SigninScreen';
import Sidebar from './Screens/Sidebar';


const globalData = {
	theme: {
		themeColor: '#0084ff',
		green: '#5fba7d',
		textColor: '#9b9b9b',
		fontFamily: 'SourceSansPro-Regular',
		backgroundColor: '#ecf2f4'
	},
	other: {
		ipAddress: '10.9.9.54',
		port: 8008,
		userId: 'abcd1234',
		store: async (key, value)=>{
			try{
				await AsyncStorage.setItem(key, value);
			}catch(error){
				console.log(error);
			}
		},
		retrieve: async (key)=>{
			try{
				var value = await AsyncStorage.getItem(key);
				return value;
			}catch(error){
				console.log(error);
			}
		}
	}
}
const backAction = NavigationActions.back();

class Home extends React.Component {
	static navigationOptions = {
	title: 'HomeScreen',
	header: null
	};
	render() {
		
		return <HomeScreen navigator={this.props.navigation} theme={globalData.theme} info={globalData.other}/>;
	}
}

class LandingScreen extends React.Component {
	static navigationOptions = {
	title: 'LoginScreen',
	header: null
	};
	render() {
		
		return <LoginScreen navigator={this.props.navigation} theme={globalData.theme} info={globalData.other}/>;
	}
}

class Register extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
	};
	render() {
		
		return <RegisterScreen navigator={this.props.navigation} theme={globalData.theme} info={globalData.other}/>;
	}
}

class Signin extends React.Component {
	static navigationOptions = {
		title: 'Signin',
		header: null
	};
	render() {
		
		return <SigninScreen navigator={this.props.navigation} theme={globalData.theme}/>;
	}
}
/*
class Dashboard extends React.Component {
	static navigationOptions = {
	title: 'Dashboard',
	header: null
	};
	render() {
		
		return <DashboardScreen navigator={this.props.navigation} theme={globalData.theme}/>;
	}
}

class Dashboard2 extends React.Component {
	static navigationOptions = {
	title: 'Dashboard2',
	header: null
	};
	render() {
		
		return <DashboardScreen2 navigator={this.props.navigation} theme={globalData.theme}/>;
	}
}
*/
/*
class Deals extends React.Component {
	static navigationOptions = {
	title: 'Deals',
	header: null
	};
	render() {
		return <DealScreen navigator={this.props.navigation} theme={theme}/>;
	}
}
*/
class DealDetail extends React.Component {
	static navigationOptions = {
		title: 'DealDetail',
		header: null
	};
	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		return <DealDetailScreen navigator={this.props.navigation} data={params} theme={globalData.theme} info={globalData.other}/>;
	}
}


/*
class Events extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
	};
	render() {
		
		return <EventScreen navigator={this.props.navigation} theme={theme}/>;
	}
}
*/
class EventDetail extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
	};
	render() {
		const { params } = this.props.navigation.state;
		return <EventDetailScreen navigator={this.props.navigation} theme={globalData.theme} data={params}/>;
	}
}
/*
class News extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
	};
	render() {
		
		return <NewsScreen navigator={this.props.navigation} theme={theme}/>;
	}
}
*/
class NewsDetail extends React.Component {
	static navigationOptions = {
		title: 'NewsDetail',
		header: null
	};
	render() {
		const { params } = this.props.navigation.state;
		return <NewsDetailScreen navigator={this.props.navigation} theme={globalData.theme} data={params}/>;
	}
}
/*
class Profile extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
	};
	render() {
		
		return <ProfileScreen navigator={this.props.navigation} theme={theme}/>;
	}
}
*/
class Sample extends React.Component {
	static navigationOptions = {
		title: 'NewsDetail',
		header: null
	};
	render() {
		const { params } = this.props.navigation.state;
		return <Sidebar navigator={this.props.navigation} theme={globalData.theme} data={params}/>;
	}
}
const SampleApp3 = StackNavigator(
	{
		LandingScreen: { screen: LandingScreen },
		Register: {screen: Register},
		Signin: {screen: Signin},
		Home: {screen: Home},	
		DealDetail: {screen: DealDetail},
		EventDetail: {screen: EventDetail},
		NewsDetail: {screen: NewsDetail},
	}
);

AppRegistry.registerComponent('SampleApp3', () => SampleApp3);