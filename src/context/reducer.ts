import * as React from 'react';
import Constants from 'expo-constants';

export const initialState = {
    userData: null,
    userToken: null,
    userTokenExp: null,
    appIsReady: false,
    authStatus: null,
    statusBarstyle: 'default',
    statusBarHidden: false,
    formValues: {},
    formActionType: 1,
    stateData: null,
    introViewed: false,
    identifier: null,
    isOnline: false,
    allPolicyData: null
};


export const AppReducer = (initialState: any, action: any) => {
    switch (action.type) {
        case "APP_READY": {
            return {
                ...initialState,
                appIsReady: true
            };
        }
        case "SET_APP_DATA": {
            // console.log('SET_APP_DATA', 'SET_APP_DATA')
            return {
                ...initialState,
                userToken: action.userToken,
                userData: action.userData,
                userTokenExp: action.userTokenExp,
                identifier: action.identifier,
                identifierName: action.identifierName,
                //introViewed: action.introViewed,
                appIsReady: true,
            };
        }
        case "REMOVE_USER_DATA":
            return {
                ...initialState,
                userToken: null,
                userData: null,
                userTokenExp: null,
                identifier: null,
                identifierName: null,
            };
        case "SET_INTRO_VIEW": {
            return {
                ...initialState,
                introViewed: action.introViewed || false,
            };
        }
        case 'STATUSBAR_LIGHT_CONTENT':
            return {
                ...initialState,
                statusBarstyle: 'light-content',
            };
        case 'STATUSBAR_DARK_CONTENT':
            return {
                ...initialState,
                statusBarstyle: 'dark-content',
            };
        case 'STATUSBAR_HIDE':
            return {
                ...initialState,
                statusBarHidden: true,
            };
        case 'STATUSBAR_SHOW':
            return {
                ...initialState,
                statusBarHidden: false,
            };
        case 'STATUSBAR_TOGGLE':
            return {
                ...initialState,
                statusBarHidden: action.statusBarHidden || false,
            };
        case "UPDATE_ONLINE_STATUS":
            return {
                ...initialState,
                isOnline: action.isOnline,
            };
        case "SET_IDENTIFIER": {
            return {
                ...initialState,
                identifier: action.identifier,
                identifierName: action.identifierName,
            };
        }
        case "REMOVE_IDENTIFIER": {
            return {
                ...initialState,
                identifier: null,
                identifierName: null,
            };
        }
        case "SET_IDENTIFIER_NAME": {
            return {
                ...initialState,
                identifierName: action.identifierName,
            };
        }
        case "LOGIN": {
            return {
                ...initialState,
                userToken: action.userToken,
                userData: action.userData,
                identifierName: action.identifierName,
                userInfo: action.userInfo
            };
        }
        case "SET_ALL_POLICY": {
            return {
                ...initialState,
                allPolicyData: action.allPolicyData,
            };
        }
        case "LOGOUT":
            return {
                ...initialState,
                userToken: null,
                // userData: null,
                userTokenExp: null,
            };
        default:
            return initialState;
    }
};