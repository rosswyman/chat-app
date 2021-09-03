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
	Platform,
	KeyboardAvoidingView,
} from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.route.params.userName,
			messages: [],
		};
	}

	componentDidMount() {
		this.setState({
			messages: [
				{
					_id: 1,
					text: 'Hello developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
				},
				{
					_id: 2,
					text: this.state.name + ' has entered the chat.',
					createdAt: new Date(),
					system: true,
				},
			],
		});
	}

	onSend(messages = []) {
		this.setState((previousState) => ({
			// takes the previous state and adds the new messages to it
			messages: GiftedChat.append(previousState.messages, messages),
		}));
	}

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: {
						backgroundColor: '#fff',
					},
					right: {
						backgroundColor: '#000',
					},
				}}
			/>
		);
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
						// the text color is specified to maintain contrast with the background colors
						style={{
							color: this.props.route.params.textColor,
						}}
					>
						{this.state.name}'s Chat
					</Text>
				</View>
				{/* This 'flex: 1' will set the width and height of the view to 100% */}
				<View style={{ flex: 1 }}>
					<GiftedChat
						accessible={true}
						accessibilityLabel="Chat field"
						accessibilityHint="Here you will find the messages in this chat.  The field to input a message is at the bottom."
						renderBubble={this.renderBubble.bind(this)}
						messages={this.state.messages}
						onSend={(messages) => this.onSend(messages)}
						user={{
							_id: 1,
						}}
					/>
					{/* The following is included to prevent the keyboard from obsuring the message field */}
					{Platform.OS === 'android' ? (
						<KeyboardAvoidingView behavior="height" />
					) : null}
				</View>

				{/* Can probably delete this in the near future, but I'm holding on to it for the time being. 
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
				</TouchableOpacity> */}
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
