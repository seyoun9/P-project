import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function LibrBookScreen({ route, navigation }) {
  const { bookTitle } = route.params || { bookTitle: '도서명' }; // 전달받은 도서명

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
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

      {/* 화면 제목 */}
      <Text style={styles.title}>‘{bookTitle}’ 보유 도서관 조회</Text>

      {/* 지도 API 영역 */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapText}>[지도 API 영역]</Text>
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
    fontSize: 20,
    textAlign: 'center',
    color: '#A86B00',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  mapContainer: {
    flex: 0.9,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderColor: '#A86B00',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  mapText: {
    color: '#A86B00',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
