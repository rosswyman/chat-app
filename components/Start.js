import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	Alert,
	ImageBackground,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';

export default class StartPage extends Component {
	constructor(props) {
		super(props);
		// not sure if this is the best place to declare state
		this.state = { userName: '' };
		this.state = { backgroundColor: '' };
		this.state = { textColor: '' };
	}

	// Using this method to help with debugging and testing
	alertMyText(input = []) {
		Alert.alert(input.text);
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../assets/backgroundImage.png')}
					style={styles.backgroundImage}
				>
					{/* Breaking up screen into boxes to allow for easier sizing */}
					<View style={styles.appTitleBox}>
						<Text style={styles.titleText}>VERBOSE</Text>
					</View>
					{/* KeyboardAvoidingView prevents the keyboard from hiding the text input */}
					<KeyboardAvoidingView
						style={styles.userOptionsBox}
						behavior="padding"
					>
						<View style={styles.userNameBox}>
							<TextInput
								accessible={true}
								accessibilityLabel="Username field"
								accessibilityHint="Enter your preffered username here"
								style={{
									height: 40,
									borderColor: 'gray',
									borderWidth: 2,
									opacity: 50,
									marginTop: '5%',
									marginHorizontal: '5%',
								}}
								onChangeText={(userName) => this.setState({ userName })}
								value={this.state.text}
								placeholder="Your Name"
							/>
						</View>
						<View style={styles.backgroundColorBox}>
							<Text style={styles.chooseBackgroundColorText}>
								Choose Background Color:
							</Text>
							<View style={styles.chooseBackgroundColor}>
								<TouchableOpacity
									accessible={true}
									accessibilityLabel="Background color option 1"
									accessibilityHint="Selects a black background"
									style={styles.backgroundColor1}
									onPress={() =>
										this.setState({
											backgroundColor: '#090C08',
											textColor: '#ffffff', // defining text color for better contrast
										})
									}
								/>
								<TouchableOpacity
									accessible={true}
									accessibilityLabel="Background color option 2"
									accessibilityHint="Selects a dark purple background"
									style={styles.backgroundColor2}
									onPress={() =>
										this.setState({
											backgroundColor: '#474056',
											textColor: '#ffffff',
										})
									}
								/>
								<TouchableOpacity
									accessible={true}
									accessibilityLabel="Background color option 3"
									accessibilityHint="Selects a light blue background"
									style={styles.backgroundColor3}
									onPress={() =>
										this.setState({
											backgroundColor: '#8A95A5',
											textColor: '#000000',
										})
									}
								/>
								<TouchableOpacity
									accessible={true}
									accessibilityLabel="Background color option 4"
									accessibilityHint="Selects a light greeb background"
									style={styles.backgroundColor4}
									onPress={() =>
										this.setState({
											backgroundColor: '#B9C6AE',
											textColor: '#000000',
										})
									}
								/>
							</View>
						</View>
						<View style={styles.startChatButtonBox}>
							<TouchableOpacity
								accessible={true}
								accessibilityLabel="Start Chat Button"
								accessibilityHint="Press this button to enter the chat"
								style={styles.startChatButton}
								title="Start Chatting"
								// Passing on name, backgroundColor, and textColor as props
								onPress={() =>
									this.props.navigation.navigate('Chat', {
										userName: this.state.userName,
										backgroundColor: this.state.backgroundColor,
										textColor: this.state.textColor,
									})
								}
							>
								<Text style={styles.startChatButtonText}>Start Chatting</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1,
	},
	appTitleBox: {
		flex: 56,
		marginTop: '20%',
	},
	titleText: {
		fontSize: 45,
		fontWeight: '600',
		color: '#FFFFFF',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	userOptionsBox: {
		flex: 44,
		backgroundColor: 'white',
		width: '88%',
		height: '44%',
		marginBottom: '6%',
	},
	userNameBox: {
		flex: 1,
	},
	backgroundColorBox: {
		flex: 1,
	},
	chooseBackgroundColorText: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		opacity: 100,
		textAlign: 'center',
	},
	chooseBackgroundColor: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	backgroundColor1: {
		backgroundColor: '#090C08',
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	backgroundColor2: {
		backgroundColor: '#474056',
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	backgroundColor3: {
		backgroundColor: '#8A95A5',
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	backgroundColor4: {
		backgroundColor: '#B9C6AE',
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	startChatButtonBox: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	startChatButton: {
		width: '88%',
		height: 40,
		backgroundColor: '#757083',
		justifyContent: 'center',
	},
	startChatButtonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
});
