import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleHome = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 완료 후 로그인 화면으로 이동
  };

  const nickname = '사용자'; // 예제 닉네임 (추후 props나 state로 받아올 수 있음)

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
          {/* 세팅 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate('ChangePw')}>
            <Image source={require('../assets/SettingButton.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 환영 메시지 */}
      <Text style={styles.welcomeText}>환영합니다, {nickname} 님.</Text>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 메뉴 영역 */}
      <View style={styles.menuContainer}>
        {/* 메뉴 제목 */}
        <Text style={styles.menuTitle}>메 뉴</Text>
        {/* 메뉴 아이템 */}
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('RecomBook')}>
            <Image source={require('../assets/BookRecomButton.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>도서 추천</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SearchBook')}>
            <Image source={require('../assets/BookSearchButton.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>도서 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Service1')}>
            <Image source={require('../assets/ServiceButton.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>고객센터</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleHome}>
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
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#A86B00',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    marginTop: 80,
    alignSelf: 'center',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    width: 350,
    paddingVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#A86B00',
    borderWidth: 2,
  },
  menuTitle: {
    fontSize: 25,
    color: '#A86B00',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  menuIcon: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  menuText: {
    color: '#A86B00',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute', // 절대 위치로 설정
    bottom: 20, // 화면 아래쪽에서 20px 위로 배치
    left: '50%', // 화면 가로 중심으로 이동
    transform: [{ translateX: -15 }], // 버튼의 가로 중앙을 정확히 맞추기 위해 추가
  },  
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
});

