import React, { PureComponent } from 'react'
import {
	View,
	Text,
	PermissionsAndroid
} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import SmsRetriever from 'react-native-sms-retriever';



class Sms extends PureComponent {
	
	componentDidMount () {
		this.requestReadSmsPermission();

		// this._onSmsListenerPressed()
		this._onSmsListenerPressed2()
	}

	componentWillUnmount() {
		// this.subscription.remove()
	}

	_onSmsListenerPressed = async () => {
		try {
			const registered = await SmsRetriever.startSmsRetriever();
			if (registered) {
				SmsRetriever.addSmsListener(event => {
					console.log(event)
					console.log("AQUII")
				})
			}
		} catch (error) {
			console.log(JSON.stringify(error))
		}
	}

	_onSmsListenerPressed2 = () => {
		this.subscription  = SmsListener.addListener(message => {
			console.log(message)
			let verificationCodeRegex = /REGALAPP CODE ([\d]{6})/
			
			if (verificationCodeRegex.test(message.body)) {
				let verificationCode = message.body.match(verificationCodeRegex)[1]
				
				console.log(verificationCode)
				/*
				if (verifiedSuccessfully) {
					subscription.remove()
					return
				}
				*/
			}
			
		})
	}

	async requestReadSmsPermission() {
		try {
			var granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_SMS,
				{
					title: "Auto Verification OTP",
					message: "need access to read sms, to verify OTP"
				}
			)

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("sms read permissions granted", granted);

				granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
						title: "Receive SMS",
						message: "Need access to receive sms, to verify OTP"
					}
				)

				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					console.log("RECEIVE_SMS permissions granted", granted);
				}
				else console.log("RECEIVE_SMS permissions denied");
			}
			else console.log("sms read permissions denied");
		}
		catch (err) {
			console.log(err);
		}
	}


	render () {
		return (
			<View>
				<Text>Lector SMS</Text>
			</View>
		)
	}
}

export default Sms
