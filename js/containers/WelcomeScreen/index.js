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

var videoList = [
	{"name": "Heaven", "video": videos.heaven},
	{"name": "Fire Snow", "video": videos.fireSnow},
	{"name": "Crocodile", "video": videos.crocodile},
	{"name": "Keep Running", "video": videos.keepRunning},
];

const langs = {
	title: I18n.t("splashScreen.title"),
	motto: I18n.t("splashScreen.motto"),
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
  		<View style={styles.mainContainer}>
  			<StatusBar barStyle="light-content" hidden/>
  			<Video
  				source={videoList[this.state.currentIndexRandomized].video}
  				style={styles.videoContainer}
  				muted={true}
  				repeat={false}
  				resizeMode="cover"/>
  			<View>
  			{/* <Animatable.Text
  				animation={"fadeInDownBig"}
  					duration={3500}
  				style={styles.title}>
  				  {this.state.shouldShowTitle ? langs.title : ""}
  			</Animatable.Text>
  			<Animatable.Text
  					animation={"fadeInUpBig"}
  					easing="ease-in-out-back"
  					duration={3500}
  					onTransitionEnd={()=>{()=>this._directOpenScreenByUserToken();}}
  				style={styles.motto}>
  				  {this.state.shouldShowTitle ? langs.motto : ""}
  			</Animatable.Text> */}
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
)(WelcomeScreen);
