/**
 * Author: UraNashel
 * Email: tan.nguyen@inapps.net
 */

import React, {Component} from "react";
import {Provider} from "react-redux";
import store from "./js/store/configureStore";
import AppContainer from "./js/route/MainStackRouter";
const Store = new store();
import {
	Provider as PaperProvider,
} from "react-native-paper";

export default class App extends Component {
	render() {
		return (
			<Provider store={Store}>
				<PaperProvider>
					<AppContainer/>
				</PaperProvider>
			</Provider>
		);
	}
}

