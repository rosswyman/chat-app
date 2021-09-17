import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import MapView from 'react-native-maps';

import CustomActions from './CustomActions';

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
			isConnected: false,
			image: null,
		};

		// Configuration for Google Firebase Database
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

	//display messages from AsyncStorage, used to show locally stored messages while online
	async getMessages() {
		let messages = '';
		try {
			messages = (await AsyncStorage.getItem('messages')) || [];
			this.setState({
				messages: JSON.parse(messages),
			});
		} catch (error) {
			console.log(error.message);
		}
	}

	// Creates a new message
	addMessage() {
		const newMessage = this.state.messages[0];

		this.referenceChatMessages.add({
			uid: this.state.uid,
			_id: newMessage._id,
			createdAt: newMessage.createdAt,
			image: newMessage.image || null,
			text: newMessage.text || '',
			user: newMessage.user,
			location: newMessage.location || null,
		});
	}

	// save messages to Asyncstorage
	async saveMessages() {
		try {
			await AsyncStorage.setItem(
				'messages',
				JSON.stringify(this.state.messages)
			);
			console.log('saveMessages called');
		} catch (error) {
			console.log(error.message);
		}
	}

	// deletes Asyncstorage messages
	async deleteMessages() {
		try {
			await AsyncStorage.removeItem('messages');
			this.setState({
				messages: [],
			});
			console.log('deleteMessages called');
		} catch (error) {
			console.log(error.message);
		}
	}

	onSend(messages = []) {
		this.setState(
			(previousState) => ({
				// takes the previous state and adds the new messages to it
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.addMessage();
				this.saveMessages();
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
				image: data.image || null,
				location: data.location || null,
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

	// hides the inputtoolbar if the user is offline
	renderInputToolbar(props) {
		if (this.state.isConnected == false) {
		} else {
			return <InputToolbar {...props} />;
		}
	}

	renderCustomActions = (props) => <CustomActions {...props} />;

	//custom map view
	renderCustomView(props) {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	}

	// for use with testing and debugging
	alertMyText(input = []) {
		Alert.alert(input.text);
	}

	componentDidMount() {
		// Checks to see if the user is online
		NetInfo.fetch().then((connection) => {
			if (connection.isConnected) {
				console.log('online');
				this.setState({ isConnected: true });
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
			} else {
				this.setState({ isConnected: false });
				console.log('offline');
				this.getMessages();
			}
		});

		const name = this.props.route.params.userName;
		// creating a references to messages collection
		this.referenceMessagesUser = firebase
			.firestore()
			.collection('messages')
			.where('uid', '==', this.state.uid);
	}

	componentWillUnmount() {
		this.authUnsubscribe();
		this.unsubscribe();
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
				<View style={{ flex: 4 }}>
					<GiftedChat
						accessible={true}
						accessibilityLabel="Chat field"
						accessibilityHint="Here you will find the messages in this chat.  The field to input a message is at the bottom."
						messages={this.state.messages}
						renderBubble={this.renderBubble.bind(this)}
						renderInputToolbar={this.renderInputToolbar.bind(this)}
						renderActions={this.renderCustomActions}
						renderCustomView={this.renderCustomView}
						onSend={(messages) => this.onSend(messages)}
						user={this.state.user}
					/>

					{/* The following is included to prevent the keyboard from obsuring the message field */}
					{Platform.OS === 'android' ? (
						<KeyboardAvoidingView behavior="height" />
					) : null}
				</View>

				{/* The following button was used for development, and is kept for use with future development
				<View style={{ flex: 1 }}>
					<Button
						onPress={() => this.deleteMessages()}
						title="Delete asyncStorage Messages"
					/>
				</View> */}
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
