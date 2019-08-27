import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {colors} from "../colors/colors";
import LinearGradient from "react-native-linear-gradient";
import imgs from "../../assets/imgs/index";
import * as Animatable from "react-native-animatable";
import {strings} from "../../utils/locales/i18n";

const SNSNodata = () => {
	return (
		<View>
			<LinearGradient
				colors={[colors.gray_less, colors.gray_less]}
				style={style.shadow}>
				<Animatable.Image animation={"tada"}  source={imgs.no_data} iterationCount={5} style={{width: 60, height: 60, marginTop: 10}}/>
				<Text>{strings("no_data")}</Text>
			</LinearGradient>
		</View>
	);
};
export default SNSNodata;
const style = StyleSheet.create({
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		alignContent: "center",
		flex: 1,
		opacity: 0.5,
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});