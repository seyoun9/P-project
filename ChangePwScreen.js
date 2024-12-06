import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ChangePwScreen({ navigation }) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleChangePw = () => {
    if (newPw !== confirmPw) {
      alert('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 변경되었습니다.');
    navigation.navigate('Login'); // 비밀번호 변경 후 로그인 화면으로 이동
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

      {/* 제목 */}
      <Text style={styles.title}>비밀번호 변경</Text>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 입력 영역 */}
      <View style={styles.inputContainer}>
        {/* 기존 비밀번호 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>기존 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="기존 비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={currentPw}
            onChangeText={setCurrentPw}
          />
          {/* 확인 버튼 */}
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.checkButtonText}>확인</Text>
          </TouchableOpacity>
        </View>

        {/* 구분선 */}
        <View style={styles.divider2} />

        {/* 새로운 비밀번호 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>새로운 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="새로운 비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={newPw}
            onChangeText={setNewPw}
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider2} />

        {/* 새로운 비밀번호 확인 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>새로운 비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            placeholder="새로운 비밀번호 확인"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPw}
            onChangeText={setConfirmPw}
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider2} />

        {/* 확인 버튼 */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleChangePw}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />
    </View>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A86B00',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15, // 입력 그룹 간 간격 축소
  },
  label: {
    fontSize: 16,
    color: '#A86B00',
    marginBottom: 5,
  },
  input: {
    height: 45, // 높이를 조금만 증가
    borderColor: '#A86B00',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  checkButton: {
    backgroundColor: '#CCCCCC',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#000000',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  divider2: {
    width: '100%',
    height: 1,
    backgroundColor: '#F6AAAA',
    marginVertical: 5, // 간격 축소
  },
});
