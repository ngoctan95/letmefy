import IAStorageManager from "./IAStorageManager";
import Constant from "../constant/Constant";

class IALocalStorage {

  /**
   * Set/get user info
   */
  static setUserInfo = async (userInfo) => {
  	await IAStorageManager.setItem(Constant.USER.USER_INFO, userInfo);
  }

  static getUserInfo = async () => {
  	return await IAStorageManager.getItem(Constant.USER.USER_INFO);
  }

  /**
   * Set/get user TOKEN info
   */
  static setTokenUserInfo = async (tokenUserInfo) => {
  	await IAStorageManager.setItem(Constant.USER.TOKEN_INFO, tokenUserInfo);
  }

  static getTokenUserInfo = async () => {
  	return await IAStorageManager.getItem(Constant.USER.TOKEN_INFO);
  }

  /**
   * Set/get device TOKEN info
   */
  static setDeviceToken = async (deviceToken) => {
  	await IAStorageManager.setItem(Constant.USER.DEVICE_TOKEN, deviceToken);
  }

  static getDeviceToken = async () => {
  	return await IAStorageManager.getItem(Constant.USER.DEVICE_TOKEN);
  }


  /**
   * Reset all token and user info
   */
  static resetLocalStorage = async () => {
  	await IAStorageManager.removeItem(Constant.USER.TOKEN_INFO);
  	await IAStorageManager.removeItem(Constant.USER.USER_INFO);
  }

}

export default IALocalStorage;