import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';

export default function RecomBookScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'bot', text: '어떤 책을 추천해드릴까요?' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
  };
  const handleSend = () => {
    if (inputText.trim() === '') return;
  const userMessage = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      text: inputText,
  };


    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessage = {
      id: (messages.length + 2).toString(),
      sender: 'bot',
      text: (
        <>
          <Text>세 가지 도서를 추천해드리겠습니다. {'\n'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsBook', { bookTitle: 'Book1' })}
          >
            <Text style={styles.bookLink}>1. Book1</Text>
          </TouchableOpacity>
          <Text>{'\n'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsBook', { bookTitle: 'Book2' })}
          >
            <Text style={styles.bookLink}>2. Book2</Text>
          </TouchableOpacity>
          <Text>{'\n'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsBook', { bookTitle: 'Book3' })}
          >
            <Text style={styles.bookLink}>3. Book3</Text>
          </TouchableOpacity>
        </>
      ),
    };

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // AI 메시지 추가 후 스크롤
      setTimeout(() => {
        if (flatListRef.current) flatListRef.current.scrollToEnd({ animated: true });
      }, 200);
    }, 1000);

    setInputText('');
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={70}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* 상단 바 */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image source={require('../assets/HomeButton.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePw')}>
              <Image source={require('../assets/SettingButton.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 고정 크기의 채팅창 */}
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === 'bot'
                    ? styles.botMessageContainer
                    : styles.userMessageContainer,
                ]}
              >
                {item.sender === 'bot' && (
                  <Image
                    source={require('../assets/ChatbotIcon.png')}
                    style={styles.chatBotIcon}
                  />
                )}
                <View
                  style={[
                    styles.message,
                    item.sender === 'bot' ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  {typeof item.text === 'string' ? (
                    <Text style={styles.messageText}>{item.text}</Text>
                  ) : (
                    item.text
                  )}
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            onContentSizeChange={() => {
              if (flatListRef.current) flatListRef.current.scrollToEnd({ animated: true });
            }}
          />
        </View>

        {/* 입력창 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image source={require('../assets/SendButton.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>

        {/* 로그아웃 버튼 */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8CA',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  chatContainer: {
    height: 476, // 고정된 높이
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
  },
  chatBotIcon: {
    marginTop: 5,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  botMessage: {
    backgroundColor: '#F9C8A0',
  },
  userMessage: {
    backgroundColor: '#D8E8F5',
  },
  messageText: {
    fontSize: 14,
  },
  bookLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    position: 'absolute',
    bottom: 70,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute', // 절대 위치로 설정
    bottom: 0,
    left: '50%', // 화면 가로 중심으로 이동
    transform: [{ translateX: -35 }], // 버튼의 가로 중앙을 정확히 맞추기 위해 추가
  },  
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
