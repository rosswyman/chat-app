import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	Button,
	Alert,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

export default class StartPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.route.params.userName,
		};
	}

	// for use with testing and debugging
	alertMyText(input = []) {
		Alert.alert(input.text);
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: this.props.route.params.backgroundColor,
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<View style={styles.navBar}>
					<Text
						style={{
							color: this.props.route.params.textColor,
						}}
					>
						{this.state.name}'s Chat
					</Text>
				</View>
				<TextInput
					style={{
						height: 80,
						borderColor: 'gray',
						borderWidth: 2,
						color: this.props.route.params.textColor,
					}}
					onChangeText={(message) => this.setState({ message })}
					value={this.state.message}
					placeholder="Type your message..."
					placeholderTextColor="#596951"
				/>
				<TouchableOpacity
					style={styles.sendMessageButton}
					title="Start Chatting"
					onPress={() => {
						this.alertMyText({ text: this.state.message });
						// this.alertMyText({ text: this.props.route.params.textColor });
					}}
				>
					<Text style={styles.sendMessageButtonText}>Send</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	navBar: {
		justifyContent: 'center',
		flexDirection: 'row',
	},
	sendMessageButton: {
		marginHorizontal: '30%',
		marginVertical: '10%',
		height: 40,

		backgroundColor: 'gray',
		justifyContent: 'center',
	},
	sendMessageButtonText: {
		textAlign: 'center',
	},
});
