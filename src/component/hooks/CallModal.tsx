// components/CallModal.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface CallModalProps {
  visible: boolean;
  isIncoming?: boolean;
  isConnected?: boolean;
  callerName?: string;
  callerImage?: any;
  onAnswer?: () => void;
  onReject?: () => void;
  onEnd?: () => void;
  onToggleMute?: () => void;
  isMuted?: boolean;
  duration?: string;
}

const { width, height } = Dimensions.get('window');

export const CallModal: React.FC<CallModalProps> = ({
  visible,
  isIncoming = false,
  isConnected = false,
  callerName = 'Unknown',
  callerImage,
  onAnswer,
  onReject,
  onEnd,
  onToggleMute,
  isMuted = false,
  duration = '00:00',
}) => {
  
  // Incoming call screen
  if (isIncoming && !isConnected) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.incomingContainer}>
          <View style={styles.callerInfoContainer}>
            <Text style={styles.incomingText}>Incoming call</Text>
            {callerImage ? (
              <Image source={callerImage} style={styles.callerImage} />
            ) : (
              <View style={styles.callerImagePlaceholder}>
                <Text style={styles.callerInitial}>
                  {callerName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.callerName}>{callerName}</Text>
          </View>

          <View style={styles.incomingButtons}>
            <TouchableOpacity
              style={[styles.callButton, styles.rejectButton]}
              onPress={onReject}
            >
              <MaterialIcons name="call-end" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.callButton, styles.acceptButton]}
              onPress={onAnswer}
            >
              <MaterialIcons name="call" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  // Active call screen
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.activeCallContainer}>
        <View style={styles.callerInfoContainer}>
          {callerImage ? (
            <Image source={callerImage} style={styles.callerImage} />
          ) : (
            <View style={styles.callerImagePlaceholder}>
              <Text style={styles.callerInitial}>
                {callerName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.callerName}>{callerName}</Text>
          <Text style={styles.callStatus}>
            {isConnected ? duration : 'Connecting...'}
          </Text>
        </View>

        <View style={styles.callControls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              isMuted && styles.mutedButton
            ]}
            onPress={onToggleMute}
          >
            <MaterialIcons 
              name={isMuted ? "mic-off" : "mic"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endCallButton]}
            onPress={onEnd}
          >
            <MaterialIcons name="call-end" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {}} // Could add speaker toggle
          >
            <FontAwesome name="volume-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  incomingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  activeCallContainer: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  callerInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomingText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 40,
  },
  callerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  callerImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  callerInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  callerName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  incomingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#F44336',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  mutedButton: {
    backgroundColor: '#F44336',
  },
});