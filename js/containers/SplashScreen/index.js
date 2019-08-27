import React from "react";
import {ImageBackground, StatusBar} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen";
import {splashAnim, splashAnimFinish, splashAnimCounter} from "./actions";
import {styles} from "./style";
import {images} from "../../../assets/index";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {ScreenNames} from "../../route/ScreenNames";

class SplashScreen extends BaseScreen {
	componentDidMount() {
		this.props.splashAnim();
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps) {
			return;
		}
		if (nextProps.num <= 1) {
			this.props.splashAnim();
		} else {
			this._directOpenScreenByUserToken();
		}
	}

	async _directOpenScreenByUserToken () {
		const tokenExist = await IALocalStorage.getTokenUserInfo();
		if (tokenExist) {
			this._goToHomeScreen();
		} else {
			this._goToWelcomeScreen();
		}
	}

  _goToWelcomeScreen = () => {
  	this.goToScreen(ScreenNames.WelcomeScreen);
  }

  _goToHomeScreen = () => {
  	this.goToScreen(ScreenNames.HomeScreen);
  }

  render() {
  	return (
  		<ImageBackground style={styles.mainContainer} source={images.splash} resizeMode={"cover"}>
  			<StatusBar barStyle="light-content" hidden/>
  		</ImageBackground>
  	);
  }
}

const mapStateToProps = state => {
	return state.splashReducer;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			splashAnim,
			splashAnimFinish,
			splashAnimCounter
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen);
