import React, { useState, useRef, useEffect, Alert } from 'react';
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
} from 'react-native';

export default function ChatBookScreen({ navigation, route }) {
  const { bookTitle = '제목 없음' } = route.params || {}; // 기본값 설정
  const [messages, setMessages] = useState([
    { id: '1', sender: '익명 1', text: '이 책 정말 좋아요!' },
    { id: '2', sender: '익명 2', text: '저도 한 번 읽어보고 싶네요.' },
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

    const randomAnonymousId = `익명 ${Math.floor(Math.random() * 100) + 1}`; // 랜덤 익명 ID 생성
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: randomAnonymousId,
      text: inputText,
    };


    setMessages((prevMessages) => [...prevMessages, newMessage]);
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

        {/* 책 제목 */}
        <View style={styles.bookTitleContainer}>
          <Text style={styles.bookTitle}>{`'${bookTitle}'의 채팅방`}</Text>
        </View>

        {/* 채팅 내용 */}
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.sender}>{item.sender}</Text>
                <View style={styles.messageBox}>
                  <Text style={styles.messageText}>{item.text}</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    marginTop: 30,
    paddingHorizontal: 10,
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
    resizeMode: 'contain',
  },
  bookTitleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatContainer: {
    height: 444, // 고정된 높이
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  messageContainer: {
    marginBottom: 10,
    marginHorizontal: 10, // 좌우 여백 추가
  },
  sender: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  messageBox: {
    backgroundColor: '#F9C8A0',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start', // 메시지가 왼쪽 또는 오른쪽 정렬
    maxWidth: '80%', // 최대 폭 설정 (화면의 80%까지만)
  },
  messageText: {
    fontSize: 14,
    color: '#333',
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
    bottom: 20, // 화면 아래쪽에서 20px 위로 배치
    left: '50%', // 화면 가로 중심으로 이동
    transform: [{ translateX: -35 }], // 버튼의 가로 중앙을 정확히 맞추기 위해 추가
  },  
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
