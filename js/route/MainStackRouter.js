/* eslint-disable react/display-name */
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
} from "react-navigation";
import React from "react";
import SplashScreen from "../containers/SplashScreen/index";

// Create bottom tab for navigator
// const AppBottomTabNavigator = createBottomTabNavigator(
// 	{
// 		HomeScreen: {
// 			screen: HomeScreen,
// 			navigationOptions: {
// 				tabBarIcon: ({focused}) => {
// 					return (
// 						<View>
// 							{focused ? icons.tabbar.home.IC_PRESSED_HOME : icons.tabbar.home.IC_NORMAL_HOME}
// 						</View>
// 					);
// 				}
// 			}
// 		},
// 		ResultScreen: {
// 			screen: ResultScreen,
// 			navigationOptions: {
// 				tabBarIcon: ({focused}) => {
// 					return (
// 						<View>
// 							{focused ? icons.tabbar.trophy.IC_NORMAL_RESULT : icons.tabbar.trophy.IC_PRESSED_RESULT}
// 						</View>
// 					);
// 				}
// 			}
// 		},
// 		SettingScreen: {
// 			screen: SettingScreen,
// 			navigationOptions: {
// 				tabBarIcon: ({focused}) => {
// 					return (
// 						<View>
// 							{focused ? icons.tabbar.setting.IC_PRESSED_SETTING : icons.tabbar.setting.IC_NORMAL_SETTING}
// 						</View>
// 					);
// 				}
// 			}
// 		}
// 	},
// 	{
// 		tabBarOptions: {
// 			showLabel: false, // Define if title in bottom will be display
// 			activeTintColor: colors.pink,
// 			inactiveTintColor: colors.black
// 			// statusBarHidden: false,
// 		},
// 		tabBarComponent: TabbarComponentCustom
// 	}
// );



export default class AppContainer extends React.Component {
	render() {
		// const Navigator = createDrawerNavigator(
		// 	{MainScreenNavigator: {screen: AppBottomTabNavigator}},
		// 	{
		// 		contentComponent: (props) => {
		// 			return (
		// 				<Drawer {...props}/>
		// 			);
		// 		},
		// 		drawerWidth: ScreenWidth,
		// 	}
		// );
		// SwitchNavigator for using the multiple stack in the same route
		const AppSwitchNavigator = createSwitchNavigator({
			SplashScreen: {screen: SplashScreen},
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
