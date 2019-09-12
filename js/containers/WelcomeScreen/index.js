import React from "react";
import {StatusBar, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen";
import {styles} from "./style";
import {videos} from "../../../assets/index";
import {ScreenNames} from "../../route/ScreenNames";
import I18n from "../../shared/utils/locale/i18n";
import Video from "react-native-video";
import *  as Animatable from "react-native-animatable";
import Utils from "../../shared/utils/stuff/Utils";
import Constant from "../../shared/utils/constant/Constant";
import {colors} from "../../shared/utils/colors/colors";
import IAButton from "../../shared/components/IAButton";
import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from "react-native-fbsdk";
import LogManager from "../../shared/utils/logging/LogManager";
import {GoogleSignin, statusCodes} from "react-native-google-signin";

var videoList = [
	{"name": "Heaven", "video": videos.heaven},
	{"name": "Fire Snow", "video": videos.fireSnow},
	{"name": "Crocodile", "video": videos.crocodile},
	{"name": "Keep Running", "video": videos.keepRunning},
];

const langs = {
	title: I18n.t("welcomeScreen.title"),
	motto: I18n.t("welcomeScreen.motto"),
	loginFBSDK: I18n.t("welcomeScreen.loginFBSDK"),
	loginGoogleSDK: I18n.t("welcomeScreen.loginGoogleSDK"),
	somethingWrong: I18n.t("somethingWrong"),
	error: I18n.t("error"),
	validEmailIncorrect: I18n.t("emailInvalid"),
	validPasswordIncorrect: I18n.t("passwordInvalid"),
	success: I18n.t("success"),
	loginSuccess: I18n.t("loginSuccess"),
	loginFailedTitle: I18n.t("loginFail"),
	googleNotSupport: I18n.t("notSupport"),
	googleSignInError: I18n.t("googleSignInSuspend"),
	errorFetchingDataFB: I18n.t("errorFetchingData"),
};

class WelcomeScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			shouldShowTitle: false,
			currentIndexRandomized: 0,
		};
		this._configGoogleSignIn();
		this._filterVideoCurrentIndexRandomizedNotMatch = this._filterVideoCurrentIndexRandomizedNotMatch.bind(this);
	}

	_filterVideoCurrentIndexRandomizedNotMatch() {
		var currentIndexRandomized = this.props.navigation.state.params.currentIndexRandomized;
		if (currentIndexRandomized) {
			videoList = videoList.filter((item, index) => index != currentIndexRandomized);
		}
	}

	componentWillMount() {
		const currentIndexRandomized = Utils.randomInRange(0, 3);
		this.setState({currentIndexRandomized});
	}

	_configGoogleSignIn() {
		// Configuration for google signin flow
		GoogleSignin.configure({
			webClientId: Constant.WEB_CLIENT_ID,
			offlineAccess: false,
		});
	}

  signIn = async () => {
  	try {
  		if (await this.isUserSignedIn()) {
  			this.signOut();
  		}
  		await GoogleSignin.hasPlayServices();
  		const loggedInUser = await GoogleSignin.signIn();
  		// const token  = await GoogleSignin.getTokens();
  		console.log(LogManager.parseJsonObjectToJsonString(loggedInUser.user));
  		// Login with google
  		// this.props.signIn({email: loggedInUser.user.email,
  		// 	password: "",
  		// 	type: Constant.LOGIN_TYPE.google,
  		// 	token: token.idToken});

  	} catch (error) {
  		this.handleSignInError(error);
  	}
  };

  /**
   * @name handleSignInError
   * @param error the SignIn error object
   */
  handleSignInError = async error => {
  	if (error.code) {
  		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  			// this.showSignInError('User cancelled the login flow.');
  		} else if (error.code === statusCodes.IN_PROGRESS) {
  			// this.showSignInError('Sign in is in progress.');
  		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  			await this.getGooglePlayServices();
  		} else {
  			console.log(error);
  			// this.alertInfo(langs.error, JSON.stringify(error))
  		}
  	} else {
  		console.log(error);
  		// this.alertInfo(langs.error, JSON.stringify(error))
  	}
  };

  /**
   * @name signOut
   */
  signOut = async () => {
  	try {
  		await GoogleSignin.revokeAccess();
  		await GoogleSignin.signOut();
  	} catch (error) {
  		this.handleSignInError(error);
  	}
  };

  getGooglePlayServices = async () => {
  	try {
  		await GoogleSignin.hasPlayServices({
  			showPlayServicesUpdateDialog: true
  		});
  		// Google services are available
  	} catch (err) {
  		this.alertInfo(langs.error, langs.googleNotSupport);
  	}
  };
  /**
   * @name isUserSignedIn
   */
  isUserSignedIn = async () => {
  	const isUserSignedIn = await GoogleSignin.isSignedIn();
  	return isUserSignedIn;
  };

  componentDidMount() {
  	this._updateTitle();
  	this._updateTimeLeftToGoToHomeScreen();
  }

  _updateTitle() {
  	setTimeout(()=>{
  		this.setState({
  			shouldShowTitle: true,
  		});
  	}, 1500);
  }

  _updateTimeLeftToGoToHomeScreen() {
  	setTimeout(()=>{
  		this._directOpenScreenByUserToken();
  	}, 5000);
  }

  componentWillReceiveProps(nextProps) {
  	if (!nextProps) {
  		return;
  	}
  }

  async _directOpenScreenByUserToken () {
  	this._goToHomeScreen();
  }

  _goToHomeScreen = () => {
  	this.goToScreen(ScreenNames.HomeScreen);
  }

  _goToLoginFacebook() {
  	LoginManager.logInWithPermissions(["public_profile", "email"]).then(
  		result => {
  			if (!result.isCancelled) {
  				this._getFBUserInfo();
  			}
  		},
  		() => {
  			this.alertInfo(langs.error, langs.somethingWrong);
  		}
  	);
  }


  _getFBUserInfo() {
  	AccessToken.getCurrentAccessToken()
  		.then((user) => {
  			// There are some info here:
  			// user.accessToken
  			// user.accessTokenSource
  			// user.userID
  			// IALocalStorage.setTokenUserInfo(user.accessToken);
  			return user;
  		})
  		.then((user) => {
  			const responseInfoCallback = (error, result) => {
  				if (error) {
  					this.alertInfo(langs.errorFetchingDataFB, error.toString());
  				} else {
  					console.log(LogManager.parseJsonObjectToJsonString(result));
  					// There are some info here:
  					// email, id, last_name, first_name, name, picture.
  					// They are exist here because of depending on the fields in GraphRequest
  					// IALocalStorage.setUserInfo(result);
  					// this.props.signIn({email: result.email,
  					// 	password: "",
  					// 	type: Constant.LOGIN_TYPE.facebook,
  					// 	token: user.accessToken});
  				}
  			};
  			// Config request for getting information
  			const infoRequest = new GraphRequest("/me", {
  				accessToken: user.accessToken,
  				parameters: {
  					fields: {
  						string: "email, name, first_name, last_name, picture"
  					}
  				}
  			}, responseInfoCallback);

  			// Start the graph request.
  			new GraphRequestManager()
  				.addRequest(infoRequest)
  				.start();
  		});
  }


  render() {
  	return (
  		<View style={[styles.mainContainer, {backgroundColor: colors.black}]}>
  			<StatusBar barStyle="light-content" hidden/>
  			<Video
  				source={videoList[this.state.currentIndexRandomized].video}
  				style={styles.videoContainer}
  				muted={true}
  				repeat
  				resizeMode="cover"/>
  			<Animatable.View
  				style={styles.absolute}
  				animation={"fadeIn"}
  				duration={Constant.CONTENT_TIME_OUT}>
  				<View style={{height: "50%"}}>
  					<Animatable.Text
  						animation={"bounceInLeft"}
  						duration={Constant.CONTENT_TIME_OUT}
  						style={styles.title}>
  						{langs.title}
  					</Animatable.Text>
  					<Animatable.Text
  						animation={"bounceInRight"}
  						duration={Constant.CONTENT_TIME_OUT}
  						style={styles.motto}>
  						{langs.motto}
  					</Animatable.Text>
  				</View>
  				<View style={styles.buttonContainer}>
  					<Animatable.View animation="fadeInLeft" duration={Constant.BUTTON_TIME_OUT} style={styles.fbsdk}>
  						<IAButton title={langs.loginFBSDK.toUpperCase()} titleStyle={styles.facebookTitle} onPress={()=>{this._goToLoginFacebook();}}/>
  					</Animatable.View>
  					<Animatable.View animation="fadeInRight" duration={Constant.BUTTON_TIME_OUT} style={styles.google}>
  						<IAButton title={langs.loginGoogleSDK.toUpperCase()} titleStyle={styles.googleTitle} onPress={()=>{this.signIn();}}/>
  					</Animatable.View>
  				</View>
  			</Animatable.View>
  	</View>
  	);
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomeScreen);
