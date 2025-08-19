import { Alert } from 'react-native';
import commonActions from './CommonActions';
import NetInfo from "@react-native-community/netinfo";
import { PropsErrors } from '../../@types/errors';

export default {
    errorResponse: async ({ error, exclude = [], dispatch }: PropsErrors) => {
        let errorHeader, errMsg, errCode, isConnected;

        console.log(exclude, 'exclude____')

        console.log(error, 'errorResponse_____')

        if (!exclude.includes(999)) {
            //await NetInfo.fetch();
            const networkState = await NetInfo.fetch();
            const onlineState = Boolean(networkState.isConnected && networkState.isInternetReachable);

            console.log(onlineState, 'onlineState____');
            console.log(error?.response?.data, error?.response?.status, 'error_status___')

            if (error?.response?.status === undefined || error?.response?.status === 0) {
                if (error?.message === 'Network Error' || error?.code === "ERR_NETWORK") {
                    if (!onlineState) {
                        errorHeader = 'Connectivity Error';
                        errMsg = 'No internet connectivity, please check and try again!';
                        errCode = `ERR_G1000`;
                    } else {
                        errorHeader = 'Error Notification';
                        errMsg = 'Can not process request, please retry!';
                        errCode = `ERR_G1002`;
                    }
                } else if (error?.code === 'ECONNABORTED') {
                    errorHeader = 'Error Notification!';
                    errMsg = 'Can not process request, please retry.';
                    errCode = `ERR_T29`;
                } else {
                    errorHeader = 'Error Notification!';
                    errMsg = 'Can not process request, please retry.';
                    errCode = `ERR_S31`;
                }

                //Alert.alert(errorHeader, errMsg);
                //alert(`${errorHeader}\n${errMsg}`)
                commonActions.notify('danger', errorHeader, errMsg);
                return;
            }

            const errors = error?.response?.data;
            const status = error?.response?.status;
            const { message, code } = errors;
            //TODO: Remove logs
            //console.log(error?.response?.data, 'error?.response?.data...')
            switch (status) {
                case 0:
                    if (!exclude.includes(0)) {
                        if (error.message === 'Network Error') {
                            if (!onlineState) {
                                errorHeader = 'Connectivity Error';
                                errMsg = 'No connectivity, please check your internet and try again!';
                                errCode = `ERR_G1003`;
                            } else {
                                errorHeader = 'Error Notification';
                                errMsg = 'An error occurred, please retry!';
                                errCode = `ERR_G1004`;
                            }
                        }
                    }
                    break;
                case 401:
                case 403:
                    if (!exclude.includes(401) || !exclude.includes(403)) {
                        dispatch({ type: 'LOGOUT' });
                        commonActions.notify('danger', 'Authentication Error!', 'Authentication failed, please login again!');
                        return;
                    }

                    commonActions.notify('danger', 'Authentication Error!', 'Authentication failed, please login!');
                    return;
                case 409:

                    commonActions.notify('danger', 'Error!', message);
                    return;
                case 422:
                    if (!exclude.includes(422)) {
                        let listMsg = '';
                        const listErrors = errors?.errors;

                        if (listErrors) {
                            for (const error in listErrors) {
                                //console.log(listErrors[error][0], 'listErrors...')
                                listMsg = listMsg + `${listErrors[error][0]}\n`;
                            }

                            errorHeader = 'Validation Error';
                            const s = listErrors.length > 0 ? 's' : '';
                            errMsg = `The following error${s} occurred:\n`;
                            errMsg += listMsg;
                        } else {
                            commonActions.notify('danger', 'Error Notification', message);
                        }
                    } else {
                        //return { status: error?.response?.status, message };
                        commonActions.notify('danger', 'Error Notification', message);
                    }
                    break;
                case 404:
                case 405:
                case 400:
                case 500:
                    if (exclude.includes(404) || exclude.includes(405) || exclude.includes(400) || exclude.includes(500)) {
                        return { status: error?.response?.status, message };
                    } else {
                        errorHeader = 'Error Notification';
                        errMsg = message ? message : "An error occurred, please retry!";
                    }
                    break;
                default:
                    errorHeader = 'Error Notification';
                    errMsg = "An error occurred, please retry!";
                    errCode = `ERR_D5100D`;
            }

            if (errorHeader && errMsg) {
                //alert(errorHeader, errCode ? `${errMsg} (${errCode})` : errMsg);
                commonActions.notify('danger', errorHeader, errMsg);
            }

        }

    },
}