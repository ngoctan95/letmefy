import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {View, TextInput, StyleSheet, ViewPropTypes} from "react-native";
import * as Animatable from "react-native-animatable";
import Icons from "react-native-vector-icons/Entypo";
import fonts from "../../utils/fonts/fonts";

const labelUpAnimation = {
	from: {
		bottom: 10,
		fontSize: 17
	},
	to: {
		bottom: 35,
		fontSize: 14
	}
};
const labelDownAnimation = {
	from: {
		bottom: 35,
		fontSize: 14
	},
	to: {
		bottom: 10,
		fontSize: 17
	}
};

class IAInput extends PureComponent {
  static propTypes = {
  	label: PropTypes.string,
  	underlineWidth: PropTypes.number,
  	underlineColor: PropTypes.string,
  	containerStyle: ViewPropTypes.style,
  	style: ViewPropTypes.style,
  	labelStyle: ViewPropTypes.style,
  	secureTextEntry: PropTypes.bool,
  	visibleIconColor: PropTypes.string,
  	activeColor: PropTypes.string,
  	returnKeyType: PropTypes.string,
  	onSubmitEditting: PropTypes.func,
  	ref: PropTypes.string,
  	refInner: PropTypes.string,
  };

  static defaultProps = {
  	label: "",
  	underlineWidth: 1,
  	containerStyle: {},
  	style: {},
  	labelStyle: {},
  	underlineColor: "transparent",
  	secureTextEntry: false,
  	visibleIconColor: "#4A4A4A",
  	activeColor: "red"
  };

  constructor(props) {
  	super(props);
  	this.state = {
  		isFocused: false,
  		inputValue: props.value,
  		visibleSecureText: true
  	};
  }

  onInputBlur = () => {
  	this.setState({isFocused: false});
  };

  onInputFocus = () => {
  	this.setState({isFocused: true});
  };

  onChangeText = value => {
  	const {onChangeText} = this.props;
  	this.setState({inputValue: value});
  	if (onChangeText) onChangeText(value);
  };

  render() {
  	const {
  		label,
  		underlineColor,
  		underlineWidth,
  		containerStyle,
  		style,
  		labelStyle,
  		placeholder,
  		secureTextEntry,
  		hasEye,
  		activeColor,
  		visibleIconColor,
  		onSubmitEditting,
  		refInner
  	} = this.props;
  	const {isFocused, inputValue, visibleSecureText} = this.state;
  	/**
     * Move label up if input has focus or value
     */
  	const labelShouldMoveUp = isFocused || inputValue;
  	/**
     * At input type secure text, show text when user click toggle visible
     */
  	const secureInputShouldShow = secureTextEntry ? visibleSecureText : false;
  	return (
  		<View style={[styles.container, containerStyle]}>
  			<Animatable.Text
  				animation={labelShouldMoveUp ? labelUpAnimation : labelDownAnimation}
  				style={[styles.label, labelStyle, {color: labelShouldMoveUp ? activeColor : "#676e75"}]}
  				duration={300}
  			>
  				{label}
  			</Animatable.Text>
  			<View style={{flexDirection: "row", justifyContent: "center"}}>
  				<TextInput
  					{...this.props}
  					ref={refInner}
  					style={[styles.input, style]}
  					placeholder={label ? "" : placeholder}
  					onBlur={this.onInputBlur}
  					onFocus={this.onInputFocus}
  					onChangeText={this.onChangeText}
  					secureTextEntry={secureInputShouldShow}
  					onSubmitEditting={onSubmitEditting}
  				/>
  				{secureTextEntry && hasEye && (
  					<Icons
  						onPress={() => this.setState({visibleSecureText: !visibleSecureText})}
  						name={visibleSecureText ? "eye-with-line" : "eye"}
  						size={16.5}
  						style={{paddingHorizontal: 5}}
  						color={visibleIconColor}
  					/>
  				)}
  			</View>
  			<View
  				style={{
  					flex: 1,
  					maxHeight: underlineWidth,
  					backgroundColor: underlineColor
  				}}
  			/>
  		</View>
  	);
  }
}
export default IAInput;

const styles = StyleSheet.create({
	container: {
		height: 55,
		justifyContent: "flex-end"
	},
	input: {
		height: 40,
		fontFamily: fonts.family.nunito.regular,
		fontSize: 17,
		color: "#212224",
		letterSpacing: 0.38,
		flex: 1
	},
	label: {
		position: "absolute",
		left: 0,
		bottom: 4,
		fontSize: 14,
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		color: "#676e75"
	}
});
