import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

export default function ServiceScreen1({ navigation }) {
  const [activeTab, setActiveTab] = useState('FAQ'); // 현재 활성화된 탭 ('FAQ' or 'Inquiry')

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
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
          style={[styles.tabButton, activeTab === 'FAQ' && styles.activeTab]}
          onPress={() => setActiveTab('FAQ')}
        >
          <Text style={[styles.tabText, activeTab === 'FAQ' && styles.activeTabText]}>자주 묻는 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Inquiry' && styles.activeTab]}
          onPress={() => navigation.navigate('Service2')}
        >
          <Text style={[styles.tabText, activeTab === 'Inquiry' && styles.activeTabText]}>1:1 문의</Text>
        </TouchableOpacity>
      </View>

      {/* 선택된 화면 내용 */}
      {activeTab === 'FAQ' && (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.questionBox}>
            <Text style={styles.question}>Q1. 회원탈퇴는 어떻게 하나요?</Text>
            <Text style={styles.answer}>A1. 회원탈퇴는 1:1 문의 남겨주시면 처리해드립니다.</Text>
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.question}>Q2. 이메일이 기억이 안 나면 어떡하나요?</Text>
            <Text style={styles.answer}>A2. 카카오톡 채널로 연락 주세요.</Text>
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.question}>Q3. 비밀번호 변경은 어떻게 하나요?</Text>
            <Text style={styles.answer}>A3. 로그인 후 화면 우측 상단 자물쇠 버튼을 눌러주세요.</Text>
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.question}>Q4. AI 추천 도서를 확인하려면?</Text>
            <Text style={styles.answer}>A4. 홈 화면에서 도서 추천 버튼을 클릭하여 AI가 추천하는 도서를 확인하세요.</Text>
          </View>
        </ScrollView>
      )}

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
    backgroundColor: '#F2E0C0',
    borderWidth: 1,
    borderColor: '#A86B00',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#A86B00',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    color: '#A86B00',
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 14,
    color: '#444444',
    marginTop: 5,
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
