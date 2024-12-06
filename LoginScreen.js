import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation, setIsAdmin }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (id === 'admin' && password === 'admin123') {
      setIsAdmin(true); // 관리자 상태로 변경
    } else {
      setIsAdmin(false); // 일반 사용자 상태로 변경
      navigation.navigate('Home'); // 일반 사용자 홈으로 이동
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>로그인</Text>
      <View style={styles.divider} />

      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ID</Text>
          <TextInput
            style={styles.input}
            placeholder="ID"
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={setId}
          />
        </View>
        <View style={styles.divider2} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PW</Text>
          <TextInput
            style={styles.input}
            placeholder="PW"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.divider2} />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        onPress={() => console.log('카카오 로그인')} // 카카오 로그인 로직 추가 예정
      >
        <Image
          source={require('../assets/kakaoLogin.png')}
          style={styles.kakaoButtonImage}
        />
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Join')}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
          <Text style={styles.footerText}>PW 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8CA',
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
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#A86B00',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
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
  loginButton: {
    backgroundColor: '#A86B00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  kakaoButtonImage: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
    marginHead: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  footerText: {
    fontSize: 14,
    color: '#A86B00',
    textDecorationLine: 'underline'
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
  }
});
