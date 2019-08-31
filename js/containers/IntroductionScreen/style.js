import {Dimensions, StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;
const entryBorderRadius = 5;
export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-end",
		backgroundColor: "rgba(45, 47, 59, 1)",
	},
	swipe: {
		backgroundColor: "transparent",
		paddingTop: PAGE_HEIGHT * 20 / 100,
		paddingBottom: 50,
		paddingLeft: 40,
		paddingRight: 20,
	},
	btn: {
		position: "absolute",
		bottom: 50,
		right: 0,
		width: "70%",
		color: colors.white,
		alignSelf: "center",
		left: "15%"
	},
	pageHeight: {
		bottom: (5 * PAGE_HEIGHT) / 100, right: 0
	},
	page: {
		position: "relative",
		width: PAGE_WIDTH - 80,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: entryBorderRadius,
		backgroundColor: "#ccc"
	},

	desc: {
		fontSize: PAGE_WIDTH / 28,
		color: "rgba(99, 99, 99, 1)",
		backgroundColor: "transparent",
		marginTop: 2 * PAGE_HEIGHT/100,
		marginBottom: 5 * PAGE_HEIGHT/100,
		lineHeight: 25,
		textAlign: "center",
	},

	icon: {
		alignItems: "center",
		width: PAGE_WIDTH /2,
		resizeMode: "contain"
	},

	card: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		left: 0,
		bottom: 0,
		zIndex: 10,
		width: PAGE_WIDTH - 80,
		alignItems: "center",

		shadowColor: "#000",
		shadowOpacity: .2,
		shadowRadius: entryBorderRadius,
		shadowOffset: {width: 0, height: 4},
		elevation: 5,

		backgroundColor: "rgba(255,255,255, 1)",
		borderRadius: entryBorderRadius,
	},

	shadowCard: {
		left: 10,
		bottom: -10,
		width: PAGE_WIDTH - 100,
		position: "absolute",
		zIndex: 8,
		height: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		backgroundColor: "rgba(255,255,255, .9)",
		borderBottomRightRadius: entryBorderRadius,
		borderBottomLeftRadius: entryBorderRadius,

		shadowColor: "#000",
		shadowOpacity: .3,
		shadowRadius: 1,
		shadowOffset: {width: 0, height: 1},
		elevation: 5,
	},

	shadowCardLast: {
		position: "absolute",
		zIndex: 8,
		bottom: -20,
		left: 20,
		width: PAGE_WIDTH - 120,
		height: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		backgroundColor: "rgba(255,255,255,.6)",
		borderBottomRightRadius: entryBorderRadius,
		borderBottomLeftRadius: entryBorderRadius,
	},

	dot: {
		backgroundColor: "rgba(218, 218, 218, 1)",
		width: 6,
		height: 6,
		borderRadius: 4,
		marginLeft: 4,
		marginRight: 4,
	},

	dotActive: {
		backgroundColor: "rgba(218, 218, 218, 1)",
		width: 9,
		height: 9,
		borderRadius: 6,
		marginLeft: 4,
		marginRight: 4,
	}
});