import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function ServiceScreen2({ navigation }) {
  const [inquiries, setInquiries] = useState([]); // 문의 데이터 저장

  const [title, setTitle] = useState(''); // 제목 입력 상태
  const [content, setContent] = useState(''); // 내용 입력 상태

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
  };

  const handleInquiry = () => {
    if (!title || !content) {
      Alert.alert('오류', '제목과 내용을 모두 입력해주세요.');
      return;
    }

  // 새로운 문의를 배열에 추가
  const newInquiry = {
    id: `${inquiries.length + 1}`, // 고유 ID 생성
    title,
    content, // content도 함께 저장
    status: '미답변', // 기본 상태는 '미답변'
  };

  setInquiries((prevInquiries) => [newInquiry, ...prevInquiries]);
  Alert.alert('문의가 등록되었습니다.');
  setTitle('');
  setContent('');
};

  const goToHistory = () => {
    if (inquiries.length === 0) {
      Alert.alert('오류', '등록된 문의가 없습니다.');
      return;
    }

    // 내 문의내역 화면으로 문의 데이터를 전달
    navigation.navigate('ListMain', { inquiries });
  };

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        {/* 로고 */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.headerButtons}>
          {/* 홈 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/HomeButton.png')} style={styles.icon} />
          </TouchableOpacity>
          {/* 설정 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate('ChangePw')}>
            <Image source={require('../assets/SettingButton.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, styles.inactiveTab]}
          onPress={() => navigation.navigate('Service1')}
        >
          <Text style={styles.tabText}>자주 묻는 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>1:1 문의</Text>
        </TouchableOpacity>
      </View>

      {/* 입력 영역 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="문의 제목을 입력하세요"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="문의 내용을 입력하세요"
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline={true}
        />
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleInquiry}>
          <Text style={styles.submitButtonText}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
          <Text style={styles.historyButtonText}>내 문의내역</Text>
        </TouchableOpacity>
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8CA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2E0C0',
    borderRadius: 5,
    marginBottom: 20,
    height: 40,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A86B00',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  inactiveTab: {
    backgroundColor: '#F2E0C0',
  },
  tabText: {
    fontSize: 14,
    color: '#A86B00',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#A86B00',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A86B00',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#A86B00',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  historyButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#A86B00',
    borderRadius: 5,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#A86B00',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -15 }],
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
