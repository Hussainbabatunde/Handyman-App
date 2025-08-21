import {BlurView} from 'expo-blur';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomModal from './CustomModal';
import {AntDesign, Entypo, MaterialIcons} from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomModal from './CustomModal';

interface ModalPolicyTypeProps {
  verify: boolean;
//   setVerify: any;
}
const ModalLoading: React.FC<ModalPolicyTypeProps> = ({
  verify,
//   setVerify,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [loading, setLoading] = useState<boolean>(false);

  const {width, height} = Dimensions.get('window');

  const handleCloseVerify = async () => {
    // setVerify(false);
  };

  const handlePolicyType = (value: string) => {
    // setVerify(false);
  };

  return (
    <CustomModal
      visible={verify}
      onRequestClose={handleCloseVerify}
      newHeight={height}
      tint="dark"
      content={
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            {/* <View style={styles.cancelPolicyTypeHolder}>
                    <MaterialIcons name='cancel' size={24} onPress={handleCloseVerify} color='#344054'/>
                </View> */}
                <ActivityIndicator size="large" color="black" />

          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    marginVertical: 10,
  },
  dataConsentTitle:{
    color: '#344054',
    fontSize: 20,
    marginBottom: 8
  },
  dataConsentBody: {
    textAlign: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  popupHolder: {
    width: '40%',
    padding: 3,
    backgroundColor: '#414141',
    borderRadius: 3,
  },
  policyHolderView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelPolicyTypeHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  TextContainer:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  selectPolicyView: {
    paddingVertical: 10,
  },
  policyTypeText: {
    fontSize: 18,
    color: '#344054',
  },
  descPolicyTypeText: {
    color: '#98A2B3',
    marginTop: 5,
    fontSize: 12,
  },
  policiesView: {
    borderWidth: 1,
    borderColor: '#f2f2f4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  claimViewAndPlanView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // marginVertical: 10
  },
  policyStatusAndPlan: {
    flexDirection: 'row',
  },
  policyTypePlan: {
    color: '#98A2B3',
    fontSize: 14,
    marginRight: 5,
  },
  policyStatusView: {
    backgroundColor: '#ECFDF3',
    padding: 2,
    borderRadius: 5,
  },
  policyStatusText: {
    color: '#067647',
    fontSize: 10,
  },
  policyIdText: {
    color: '#344054',
    fontSize: 16,
  },
  makingAClaim: {
    fontSize: 14,
    color: '#0075C9',
  },
  statusPolicyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dashboardNoPolicyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPolicyImg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  selectedPolicyName: {
    fontSize: 18,
    marginRight: 5,
    color: '#344054',
  },
  buyPolicyButton: {
    marginTop: 5,
    backgroundColor: '#0075c9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buyPolicyText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    backgroundColor: '#FEF3F2',
    padding: 15,
    borderRadius: 50,
  },
  SignOutButton: {
    paddingVertical: 10,
    backgroundColor: '#D92D20',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 37,
  },
  signoutText: {
    color: 'white',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelandBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default ModalLoading;
