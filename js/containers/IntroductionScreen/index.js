import React from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import styles from "./style";
import {onBoardingData} from "../../values/data/data";
import I18n from "../../shared/utils/locale/i18n";
import BaseScreen from "../BaseScreen/index";
import IAButton from "../../shared/components/IAButton";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenNames} from "../../route/ScreenNames";

const langs = {
	getStarted: I18n.t("introductionScreen.btnGetStarted")
};

export default class IntroductionScreen extends BaseScreen {
  static navigationOptions = () => {
  	return {
  		header: null
  	};
  };

  constructor(props) {
  	super(props);
  	this.state = {
  		currentIndex: 0,
  		shouldShowContent: false,
  	};
  	this.checkTokenFirstTime();
  }

  async checkTokenFirstTime() {
  	var isFirstTime = await IALocalStorage.getTokenFirstTime();
  	if (isFirstTime) {
  		// this._goToSplashScreen();
  		this.setState({shouldShowContent: true});
  	} else {
  		this.setState({shouldShowContent: true});
  	}
  }

  _goToSplashScreen = () => {
  	IALocalStorage.setTokenFirstTime(true);
  	this.goToScreen(ScreenNames.SplashScreen);
  }

  render() {
  	var shouldShowStartBtn = this.state.currentIndex == 4;
  	const {goBack} = this.props.navigation;

  		return (
  		this.state.shouldShowContent ?
  			<View style={styles.container}>
  				<Swiper
  					dot={<View style={styles.dot} />}
  					activeDot={<View style={styles.dotActive} />}
  					paginationStyle={styles.pageHeight}
  					style={styles.swipe}
  					loop={false}
  					onIndexChanged={e => this.setState({currentIndex: e})}>
  					{onBoardingData.map((page, i) => (
  						<View key={i} style={styles.page}>
  							<View style={styles.card}>
  								<Image source={page.img} style={styles.icon} />
  								<TouchableOpacity onPress={() => goBack()}>
  									<Text style={styles.desc}>{page.description}</Text>
  								</TouchableOpacity>
  							</View>
  							<View style={[styles.shadowCard]} />
  							<View style={[styles.shadowCardLast]} />
  						</View>
  					))}
  				</Swiper>
  				{shouldShowStartBtn ?
  				<IAButton
  					style={styles.btn}
  					onPress={()=>this._goToSplashScreen()}
  					title={langs.getStarted.toUpperCase()}
  					color={colors.white}>{langs.getStarted.toUpperCase()}
  				</IAButton>
  				: null}
  			</View> :<View></View>
  	);
  	}
}
