import React, { Dispatch } from 'react';
import moment from 'moment';
import { showMessage, hideMessage } from "react-native-flash-message";
import { TextBold } from '../../components/StyledText';

const commonActions = {
    statusBarLight: (dispatch) => {
        dispatch({ type: 'STATUSBAR_LIGHT_CONTENT' });
    },
    statusBarDark: (dispatch) => {
        dispatch({ type: 'STATUSBAR_DARK_CONTENT' });
    },
    statusBarShow: (dispatch) => {
        dispatch({ type: 'STATUSBAR_SHOW' });
    },
    statusBarHide: (dispatch) => {
        dispatch({ type: 'STATUSBAR_HIDE' });
    },
    statusBarToggle: (dispatch, statusBarHidden) => {
        dispatch({ type: 'STATUSBAR_TOGGLE', statusBarHidden });
    },
    toggleGesture: (dispatch, gestureEnabled = true) => {
        dispatch({ type: 'TOGGLE_GESTURE', gestureEnabled });
    },
    setPageTitle: (dispatch, title) => dispatch({ type: 'SET_PAGE_TITLE', title }),
    setQueryString: (query) => {
        query = Object.keys(query).length === 0 && query.constructor === Object ? '' :
            '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&');
        return query;
    },
    emailRegex: (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    formatDateTime: (date, dateFormat = "ll") => moment(date).format(dateFormat),
    formatDate: (date, inputFormat = "YYYY-MM-DD") => moment(date, inputFormat).format('ll'),

    capitalize: (str: string) => {
        if (str.trim() != '') {
            str = String((str).trim());
            return str
                .split(' ')
                .map(word => {
                    let string = word.toLowerCase();
                    string = string[0].toUpperCase() + string.slice(1);
                    return string;
                })
                .join(' ');
        }

        return str;
    },
    randomString: (length = 8) => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    maskPhone: (str) => {
        if (str && str.length > 8) {
            const prefix = (str).substring(0, 3);
            const suffix = (str).substring(-2);
            return `${prefix}_______${suffix}`
        } else {
            return str;
        }
    },
    notify: (type, message, description) => {
        showMessage({
            message,
            description,
            type,
            duration: 5000,
            icon: 'auto',
        });
    },
    formatPhoneCode: (dialCode, phone) => {
        phone = String(phone).trim();
        dialCode = String(dialCode).trim();
        phone = phone.substring(phone.length - 10);
        return dialCode + phone;
    },
}

export default commonActions;