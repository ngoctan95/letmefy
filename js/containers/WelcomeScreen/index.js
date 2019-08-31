import React from "react";
import {Text, ImageBackground, View, StatusBar} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen";
import {styles} from "./style";
import {ScreenNames} from "../../route/ScreenNames";
import I18n from "../../shared/utils/locale/i18n";
import {images} from "../../../assets/index";
import IAButton from "../../shared/components/IAButton";

const langs = {
	title: I18n.t("signinToContinue"),
	signIn: I18n.t("signIn"),
	signUp: I18n.t("signUp")
};

class WelcomeScreen extends BaseScreen {

  _goToLoginScreen = () => {
  	this.goToScreen(ScreenNames.LoginScreen);
  }

  _goToSignUpScreen = () => {
  	this.goToScreen(ScreenNames.SignUpScreen);
  }

  render() {
  	return (
  		<ImageBackground style={styles.mainContainer} source={images.welcome_bg} resizeMode={"stretch"}>
  			<StatusBar barStyle="dark-content" hidden />
  			<View style={styles.signInContainer}>
  				<Text style={[styles.signInTitle]}>{langs.title.toUpperCase()}</Text>
  				<View style={styles.buttonContainer}>
  					<View style={styles.buttonLeftContainer}>
  						<IAButton title={langs.signIn.toUpperCase()} style={styles.buttonView} titleStyle={styles.buttonText} onPress={()=>this._goToLoginScreen()}/>
  					</View>
  					<View style={styles.buttonRightContainer}>
  						<IAButton title={langs.signUp.toUpperCase()} style={styles.buttonView} titleStyle={styles.buttonText} onPress={()=>this._goToSignUpScreen()}/>
  					</View>
  				</View>
  			</View>
  		</ImageBackground>
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
