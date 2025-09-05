// components/ChatInterface.tsx
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSocket } from '../../component/SocketContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import AppContext from '../../context';
import moment from 'moment';
import { capitalize } from '../../context/actions/utils';

// Types
interface Message {
  id: string;
  content: string;
  receiverId: string;
  senderId?: string;
  conversationId?: string;
  type: 'sent' | 'received' | 'system';
  createdAt: string
}

interface User {
  id: string;
  username?: string;
  status: 'online' | 'away' | 'busy';
  isTyping?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

const ChatInterface: React.FC = () => {
  const { emit, on, off, isConnected, clientId } = useSocket();
  const route = useRoute<any>()
  const { userData } = useContext<any>(AppContext)
  const { otherUser } = route.params;

  const navigation = useNavigation<StackNavigationProp<any>>();


  // State
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string>('general');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Refs
  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Socket event handlers
  useEffect(() => {


    const handleError = (error: { message: string }): void => {
      Alert.alert('Error', error.message);
      setIsLoading(false);
    };

    // Register event listeners
    on("new_message", (data: any) => {
      console.log("new message: ", data);
      setMessages((prev: any) => {
  // remove duplicates by id
  const filtered = prev.filter((msg: any) => msg.id !== data.id);
  return [...filtered, data];
});
    })
    // on('userJoined', handleUserJoined);
    // on('userLeft', handleUserLeft);
    // on('onlineUsers', handleOnlineUsers);
    // on('typing', handleUserTyping);
    // on('stopTyping', handleUserStoppedTyping);
    // on('error', handleError);
    on("joined_room", (data: any) => {
      // addMessage('', `Joined room: ${data.roomId}, conversationId: ${data.conversationId}`);
      setCurrentRoom(data?.conversationId)
    });


    return () => {
      // off('userJoined', handleUserJoined);
      // off('userLeft', handleUserLeft);
      // off('onlineUsers', handleOnlineUsers);
      // off('typing', handleUserTyping);
      // off('stopTyping', handleUserStoppedTyping);
      off('error', handleError);
    };
  }, [on, off, emit, clientId]);

  useEffect(() => {
    if (currentRoom) {
      emit("get_messages", { conversationId: currentRoom });

      on("get_messages_response", (response: any) => {
        setMessages(response);
      });
    }
  }, [currentRoom])

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!isTyping && clientId) {
      setIsTyping(true);
      emit('startTyping', { clientId, roomId: currentRoom });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping && clientId) {
        setIsTyping(false);
        emit('stopTyping', { clientId, roomId: currentRoom });
      }
    }, 3000);
  }, [isTyping, clientId, emit, currentRoom]);

  // Send message
  const sendMessage = useCallback(() => {
    if (message.trim() && isConnected && clientId) {
      const messageData = {
        content: message.trim(),
        senderId: userData?.user?.id,
        conversationId: currentRoom,
        receiverId: otherUser?.id
      };

      setIsLoading(true);
      emit('send_message', messageData);
      setMessage('')
      // Stop typing
      if (isTyping) {
        setIsTyping(false);
        emit('stopTyping', { clientId, roomId: currentRoom });
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }// Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      setTimeout(() => setIsLoading(false), 500);
    }
  }, [message, isConnected, clientId, currentRoom, emit, isTyping]);

  // Join room
  const joinRoom = useCallback(() => {
    // if (clientId && roomId !== currentRoom) {
    emit('join', { userId: userData?.user?.id, otherUserId: otherUser?.id });
    // setCurrentRoom(roomId);
    setMessages([]); // Clear messages when switching rooms
    // }
  }, [clientId, currentRoom, emit]);

  useEffect(() => {
    const initiate = async () => {
      if (otherUser?.id) {
        await joinRoom()
      }
    }
    initiate()
  }, [otherUser])

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = moment(timestamp);
    const now = moment();

    const diffInHours = now.diff(date, "hours");

    if (diffInHours < 24) {
      // Show only time (e.g. "03:45 PM")
      return date.format("hh:mm A");
    } else {
      // Show date + time (e.g. "02/09/2025 03:45 PM")
      return date.format("DD/MM/YYYY hh:mm A");
    }
  };

  // Render message item
  const renderMessage = ({ item }: { item: Message }) => {
    const isSent = item.senderId === userData?.user?.id;
    // const isSystem = item.receiverId === otherUser?.id;

    // if (isSystem) {
    //   return (
    //     <View style={styles.systemMessageContainer}>
    //       <Text style={styles.systemMessage}>{item?.content}</Text>
    //       <Text style={styles.systemTimestamp}>{formatTimestamp(item?.createdAt)}</Text>
    //     </View>
    //   );
    // }

    return (
      <View style={[styles.messageContainer, isSent ? styles.sentMessage : styles.receivedMessage]}>
        <View style={[styles.messageBubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
          <Text style={[styles.messageText, isSent ? styles.sentText : styles.receivedText]}>
            {item.content}
          </Text>
          <Text style={[styles.timestamp, isSent ? styles.sentTimestamp : styles.receivedTimestamp]}>
            {formatTimestamp(item?.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  // Render typing indicator
  const renderTypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    const typingText = typingUsers.length === 1
      ? `${typingUsers[0]} is typing...`
      : `${typingUsers.length} users are typing...`;

    return (
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>{typingText}</Text>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back-sharp" size={24} color="black" />
          <Text style={styles.headerTitle}>{capitalize(otherUser?.firstName)} {capitalize(otherUser?.lastName)}</Text>
        </View>
        <View style={styles.connectionStatus}>
          <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
          <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
        </View>
      </View>
      {/* <Text style={styles.onlineCount}>{onlineUsers.length} online</Text> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {renderHeader()}

        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
          {renderTypingIndicator()}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (text.length > 0) {
                  handleTyping();
                }
              }}
              placeholder="Type a message..."
              multiline
              maxLength={500}
              editable={isConnected}
              placeholderTextColor="#999"
            />
            {isLoading && (
              <ActivityIndicator
                size="small"
                color="#007AFF"
                style={styles.loadingIndicator}
              />
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || isLoading) && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isLoading}
          >
            <Text style={[
              styles.sendButtonText,
              (!message.trim() || isLoading) && styles.sendButtonTextDisabled
            ]}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  onlineCount: {
    fontSize: 12,
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: screenWidth * 0.8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    maxWidth: '100%',
  },
  sentBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#E9ECEF',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receivedTimestamp: {
    color: '#666',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessage: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  systemTimestamp: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
    alignItems: 'flex-end',
  },
  textInputContainer: {
    flex: 1,
    marginRight: 12,
    position: 'relative',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
  },
  sendButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonTextDisabled: {
    color: '#FFFFFF',
  },
});

export default ChatInterface;