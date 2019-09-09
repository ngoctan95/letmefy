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


var videoList = [
	{"name": "Heaven", "video": videos.heaven},
	{"name": "Fire Snow", "video": videos.fireSnow},
	{"name": "Crocodile", "video": videos.crocodile},
	{"name": "Keep Running", "video": videos.keepRunning},
];

const langs = {
	title: I18n.t("welcomeScreen.title"),
	motto: I18n.t("welcomeScreen.motto"),
	login: I18n.t("welcomeScreen.login"),
	signUp: I18n.t("welcomeScreen.signUp"),
};

class WelcomeScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			shouldShowTitle: false,
			currentIndexRandomized: 0,
		};
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
  					<Animatable.View animation="" style={styles.login}>
  						<IAButton title={langs.login.toUpperCase()} titleStyle={styles.loginTitle}/>
  					</Animatable.View>
  					<Animatable.View style={styles.signUp}>
  						<IAButton title={langs.signUp.toUpperCase()} titleStyle={styles.signUpTitle}/>
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
