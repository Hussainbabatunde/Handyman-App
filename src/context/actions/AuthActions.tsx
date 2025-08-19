import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as LocalAuthentication from 'expo-local-authentication';

export default {
    setUserData: async (dispatch: any, userToken: string, userData: any, userInfo: any) => {
        console.log("setUserData function is being called!"); // Check if this appears
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('identifierName', `${userInfo?.firstName}`);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        dispatch({
            type: 'LOGIN',
            userToken,
            userData,
            identifierName: `${userInfo?.firstName}`,
            userInfo
        });
    },
    setIdentifier: async (dispatch: any, identifier: string, identifierName: string) => {
        await AsyncStorage.setItem('identifier', identifier);
        //await AsyncStorage.setItem('identifierName', identifierName);
        dispatch({ type: 'SET_IDENTIFIER', identifier, identifierName });
    },
    setIdentifierName: async (dispatch: any, identifierName: string) => {
        await AsyncStorage.setItem('identifierName', identifierName);
        dispatch({ type: 'SET_IDENTIFIER_NAME', identifierName });
    },
    logoutUser: async (dispatch: any) => {
        await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.removeItem('userData');
        // await AsyncStorage.setItem('userData', JSON.stringify({loggedIn: "true"}));
        await AsyncStorage.removeItem('userTokenExp');
        dispatch({ type: 'LOGOUT' });
    },
    removeIdentifier: async (dispatch: any) => {
        await AsyncStorage.removeItem('identifier');
        await AsyncStorage.removeItem('identifierName');
        dispatch({ type: 'REMOVE_IDENTIFIER' });
    },
    removeUserData: async (dispatch: any) => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('userTokenExp');
        await AsyncStorage.removeItem('identifier');
        await AsyncStorage.removeItem('identifierName');
        dispatch({ type: 'REMOVE_USER_DATA' });
    },
    /* setFingerPrint: async (dispatch: any, status = false) => {
        await AsyncStorage.setItem('fingerPrint', JSON.stringify(status));
        dispatch({ type: 'SET_FINGER_PRINT', fingerPrint: (status ? true : false) });
    },
    checkFpHardware: async () => {
        let compatible = false;
        try {
            compatible = await LocalAuthentication.hasHardwareAsync();
        } catch (error) {
            compatible = false;
        }
        return compatible;
    },
    checkFpEnrolled: async () => {
        let biometricRecords = false;
        try {
            biometricRecords = await LocalAuthentication.isEnrolledAsync();
        } catch (error) {
            biometricRecords = false;
        }
        return biometricRecords;
    },
    scanFp: async () => {
        let result = false;
        try {
            const scan = await LocalAuthentication.authenticateAsync(
                'Scan your finger.'
            );
            console.log(scan, 'authFp...');
            if (scan.success) {
                result = true;
            } else {
                result = false;
            }
        } catch (error) {
            result = false;
        }
        return result;
    },
    setHomePref: async (dispatch: any, homePref) => {
        await AsyncStorage.setItem('homePref', JSON.stringify(homePref));
        dispatch({ type: 'SET_HOME_PREF', homePref });
    },
    setCurrentPath: async (dispatch: any, currentPath) => {
        await AsyncStorage.setItem('currentPath', currentPath);
        dispatch({ type: 'SET_PATH_NAME', currentPath })
    }, */
}