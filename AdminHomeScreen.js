import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function AdminHomeScreen({ setIsAdmin, navigation }) {
  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    setIsAdmin(false); // 관리자 상태를 false로 설정하여 자동으로 LoginScreen으로 이동
  };


  const handleChangePw = () => {
    Alert.alert('비밀번호 변경 화면으로 이동합니다.');
    navigation.navigate('AdminChangePw'); 
  };

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        {/* 로고 */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.headerButtons}>
          {/* 홈 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate('AdminHome')}>
            <Image source={require('../assets/HomeButton.png')} style={styles.icon} />
          </TouchableOpacity>
          {/* 설정 버튼 */}
          <TouchableOpacity onPress={handleChangePw}>
            <Image source={require('../assets/SettingButton.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 관리자 모드 텍스트 */}
      <Text style={styles.welcomeText}>관리자 모드입니다.</Text>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 메뉴 영역 */}
      <View style={styles.menuContainer}>
        {/* 메뉴 제목 */}
        <Text style={styles.menuTitle}>관 리</Text>
        {/* 메뉴 아이템 */}
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminAllUser')}
          >
            <Image source={require('../assets/AdminUserButton.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>회원 관리</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AdminInquiryList')}
          >
            <Image source={require('../assets/AdminInquireButton.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>문의 관리</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

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
