import React from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import styles from "./style";
import {onBoardingData} from "../../values/data/data";
import I18n from "../../shared/utils/locale/i18n";
import BaseScreen from "../BaseScreen/index";
import IAButton from "../../shared/components/IAButton";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import IAText from "../../shared/components/IAText";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenNames} from "../../route/ScreenNames";
import IARefreshing from "../../shared/components/IARefreshing";

const langs = {
	getStarted: I18n.t("introductionScreen.btnGetStarted"),
	loading: I18n.t("loading"),
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
  		this._goToSplashScreen();
  	} else {
  		this.setState({shouldShowContent: true});
  	}
  }

  _goToSplashScreen = () => {
  	IALocalStorage.setTokenFirstTime(true);
  	this.goToScreen(ScreenNames.SplashScreen);
  }

  _renderContent() {
  	var shouldShowStartBtn = this.state.currentIndex == 4;
  	return (
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
  							<TouchableOpacity onPress={() => this.goBack()}>
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
  			</View>
  	);
  }

  _renderNull() {
  	return (
  		<View style={[styles.container, {alignItems: "center"}]}>
  				<IARefreshing size={15} color={colors.green}/>
  				<IAText text={langs.loading} style={styles.loading}/>
  			</View>
  	);
  }

  render() {
  		return (
  		this.state.shouldShowContent ?
  		  this._renderContent() :
  			this._renderNull()
  	);
  }
}
