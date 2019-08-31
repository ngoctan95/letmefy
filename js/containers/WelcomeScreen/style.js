import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {fonts} from "../../shared/utils/fonts/fonts";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";


export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.welcome_screen_background_fill
	},
	signInContainer: {
		width: "100%",
		flexDirection: "column",
		height: (ScreenHeight * 2) / 5 - 20,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		fontFamily: fonts.family.nunito.regular,
		bottom: 0,
		// backgroundColor:
	},
	signInTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 40,
		marginBottom: 28,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.white
	},
	buttonText: {
		fontSize: 20,
		fontFamily: fonts.family.nunito.regular
	},
	buttonRightContainer: {
		width: (ScreenWidth - 52 - 10) / 2,
		height: 65,
		borderWidth: 2.5,
		borderColor: colors.white,
		borderRadius: 50,
		marginLeft: 10,
	},
	buttonLeftContainer: {
		width: (ScreenWidth - 52 - 10) / 2,
		height: 65,
		borderWidth: 2.5,
		borderColor: colors.white,
		borderRadius: 50,
		marginRight: 10,
	},
	buttonView: {
		width: 200,
		height: 65,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
	}
});

export default {
	styles
};
