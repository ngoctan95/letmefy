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
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import Constant from "../../shared/utils/constant/Constant";
const videoList = [
	{"name": "Heaven", "video": videos.heaven},
	{"name": "Fire Snow", "video": videos.fireSnow},
	{"name": "Crocodile", "video": videos.crocodile},
	{"name": "Keep Running", "video": videos.keepRunning},
];

const langs = {
	title: I18n.t("splashScreen.title"),
	motto: I18n.t("splashScreen.motto"),
};

class SplashScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			shouldShowTitle: false,
			currentIndexRandomized: 0,
		};
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
		}, Constant.SPLASH_TIME_OUT);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps) {
			return;
		}
	}

	async _directOpenScreenByUserToken () {
		const tokenExist = await IALocalStorage.getTokenFirstTime();
		if (tokenExist) {
		  this._goToWelcomeScreen();
		} else {
			this._goToHomeScreen();
		}
	}

  _goToWelcomeScreen = () => {
  	this.goToScreen(ScreenNames.WelcomeScreen, {currentIndexRandomized: this.state.currentIndexRandomized});
  }

  _goToIntroductionScreen = () => {
  	this.goToScreen(ScreenNames.WelcomeScreen);
  }

  render() {
  	return (
  		<View style={styles.mainContainer}>
  			<StatusBar barStyle="light-content" hidden/>
  			<Video
  				source={videoList[this.state.currentIndexRandomized].video}
  				style={styles.videoContainer}
  				muted={true}
  				repeat={false}
  				resizeMode="cover"/>
  			<View>
  			<Animatable.Text
  				animation={"fadeInDownBig"}
  				duration={Constant.CONTENT_TIME_OUT}
  				style={styles.title}>
  				  {this.state.shouldShowTitle ? langs.title : ""}
  			</Animatable.Text>
  			<Animatable.Text
  				animation={"fadeInUpBig"}
  				easing="ease-in-out-back"
  				duration={Constant.CONTENT_TIME_OUT}
  				style={styles.motto}>
  				  {this.state.shouldShowTitle ? langs.motto : ""}
  			</Animatable.Text>
  			</View>
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
)(SplashScreen);
