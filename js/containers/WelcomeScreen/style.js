import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {fonts} from "../../shared/utils/fonts/fonts";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import {ifIphoneX} from "react-native-iphone-x-helper";

const LOGO_MARGIN_TOP = ScreenHeight / 11 ;

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: null,
		height: null,
	},
	videoContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	logo: {
		marginTop: ifIphoneX ? LOGO_MARGIN_TOP : LOGO_MARGIN_TOP - 15,
	},
	title: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 30,
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
		width: "80%",
		marginTop: 20,
	},
	motto: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		marginTop: 15,
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
		width: "90%",
	},
	absolute: {
		position: "absolute",
		flexDirection: "column",
		top: ScreenHeight * 0.65,
		left: 0,
		bottom: 0,
		right: 0,
		height: "35%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.4)",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		opacity: 0.4
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginTop: 40,
	},
	fbsdk: {
    marginLeft: 20,
    marginRight: 5,
		width: ScreenWidth / 2 - 10 ,
		borderRadius: 20,
		backgroundColor: colors.blue_dodger
	},
	facebookTitle: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 13,
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
	},
	googleTitle: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 13,
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
	},
	google: {
    marginRight: 20,
    marginLeft: 5,
		width: ScreenWidth / 2 - 10,
		borderRadius: 20,
		backgroundColor: colors.red,
	}
});

export default {
	styles
};
