/* eslint-disable react/display-name */
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
} from "react-navigation";
import React from "react";
import SplashScreen from "../containers/SplashScreen/index";
import WelcomeScreen from "../containers/WelcomeScreen/index";
import IntroductionScreen from "../containers/IntroductionScreen/index";

export default class AppContainer extends React.Component {
	render() {
		// SwitchNavigator for using the multiple stack in the same route
		const AppSwitchNavigator = createSwitchNavigator({
			IntroductionScreen: {screen: IntroductionScreen},
			SplashScreen: {screen: SplashScreen},
			WelcomeScreen: {screen: WelcomeScreen},
		});

		// ScreenNavigator for separately each screen into stack one
		const MainScreenNavigator = createStackNavigator(
			{
				MainScreen: {screen: AppSwitchNavigator},
			},
			{
				mode: "modal",
				headerMode: "none",
				transparentCard: true,
			}
		);
		const App = createAppContainer(MainScreenNavigator);
		return <App {...this.props} />;
	}

}
