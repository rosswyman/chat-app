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
import firebase from 'firebase';
import firestore from 'firebase';

export default class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.route.params.userName,
			user: {
				_id: '',
				name: '',
			},
			messages: [],
			uid: 0,
		};

		const firebaseConfig = {
			apiKey: 'AIzaSyAz4Erk1QKiEg97-hTUUg7hb1gcGvNz4G4',
			authDomain: 'chat-app-652fd.firebaseapp.com',
			projectId: 'chat-app-652fd',
			storageBucket: 'chat-app-652fd.appspot.com',
			messagingSenderId: '681539876645',
			appId: '1:681539876645:web:f4352420b7f7cecad94ccc',
			measurementId: 'G-DN521Y7J41',
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		this.referenceChatMessages = firebase.firestore().collection('messages');
	}

	componentDidMount() {
		const name = this.props.route.params.userName;
		// creating a references to messages collection
		this.referenceMessagesUser = firebase
			.firestore()
			.collection('messages')
			.where('uid', '==', this.state.uid);

		this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
			// if the user is not signed in, they will be signed in anonymously
			if (!user) {
				firebase.auth().signInAnonymously();
			}
			this.setState({
				uid: user.uid,
				messages: [],
				user: {
					_id: user.uid,
					name: name,
				},
			});
			this.unsubscribe = this.referenceChatMessages
				.orderBy('createdAt', 'desc')
				.onSnapshot(this.onCollectionUpdate);
		});
	}

	componentWillUnmount() {
		this.authUnsubscribe();
		this.unsubscribe();
	}

	addMessage() {
		const newMessage = this.state.messages[0];

		this.referenceChatMessages.add({
			uid: this.state.uid,
			_id: newMessage._id,
			createdAt: newMessage.createdAt,
			image: newMessage.image || null,
			text: newMessage.text || '',
			user: newMessage.user,
		});
	}

	onSend(messages = []) {
		this.setState(
			(previousState) => ({
				// takes the previous state and adds the new messages to it
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.addMessage();
			}
		);
	}

	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// go through each document
		querySnapshot.forEach((doc) => {
			// get the QueryDocumentSnapshot's data
			let data = doc.data();
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: data.user,
			});
		});
		this.setState({
			messages,
		});
	};

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
						user={this.state.user}
					/>
					{/* The following is included to prevent the keyboard from obsuring the message field */}
					{Platform.OS === 'android' ? (
						<KeyboardAvoidingView behavior="height" />
					) : null}
				</View>
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
