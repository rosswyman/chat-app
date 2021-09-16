import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import screens
import Chat from './components/Chat';
import Start from './components/Start';
import CustomActions from './components/CustomActions';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	renderCustomActions = (props) => {
		return <CustomActions {...props} />;
	};

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Start">
					<Stack.Screen name="Start" component={Start} />
					<Stack.Screen name="Chat" component={Chat} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
