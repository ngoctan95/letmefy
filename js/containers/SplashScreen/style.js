import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {fonts} from "../../shared/utils/fonts/fonts";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
// import { isIphoneX } from "../../shared/utils/device/device";
import {ifIphoneX} from "react-native-iphone-x-helper";

const LOGO_MARGIN_TOP = ScreenHeight / 11 ;

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: null,
		height: null,
	},
	logo: {
		marginTop: ifIphoneX ? LOGO_MARGIN_TOP : LOGO_MARGIN_TOP - 15,
	},
	title: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 22,
		marginLeft: 24,
		marginRight: 24,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white
	},
	mottoContainer: {
		width: "100%",
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 53,
		marginLeft: 12,
		marginRight: 12,
	},
	motto: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 22,
		marginLeft: 24,
		marginRight: 24,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white
	}
});

export default {
	styles
};
