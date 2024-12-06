import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function FindPwScreen({ navigation }) {
  const handleFindPassword = () => {
    Alert.alert('비밀번호가 재설정되었습니다.');
    console.log('비밀번호 재설정 완료');
    navigation.navigate('Login'); // 비밀번호 찾기 완료 후 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* 비밀번호 찾기 텍스트 */}
      <Text style={styles.title}>비밀번호 찾기</Text>
      
      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 흰색 테두리 박스 */}
      <View style={styles.inputContainer}>
        {/* 아이디 (E-mail) 입력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디 (E-mail)</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력하세요"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider2} />

        {/* 인증번호 입력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>인증번호</Text>
          <TextInput
            style={styles.input}
            placeholder="인증번호를 입력하세요"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider2} />

        {/* 새로운 비밀번호 입력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>새로운 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="새로운 비밀번호를 입력하세요"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>
        <View style={styles.divider2} />
        {/* 확인 버튼 */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleFindPassword} // handleFindPassword 호출
        >
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
    backgroundColor: '#FFE8CA', // 배경색: 크림색
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#A86B00',
    textAlign: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // 흰색 배경
    padding: 20,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#A86B00',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#A86B00',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#A86B00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
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
    marginVertical: 10,
  },
});
