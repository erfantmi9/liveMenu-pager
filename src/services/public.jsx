import AsyncStorage from "@react-native-async-storage/async-storage";

export async function f_setDataToStorage(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
}

export async function f_getDataFromStorage(key) {
  try {
    // console.log('getDataFromStorage', value);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('f_getDataFromStorageError',error);
    // Error retrieving data
  }
}

export async function f_removeFromStorage(key) {
  await AsyncStorage.removeItem(key);

}
