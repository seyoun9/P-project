import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function ListDetailScreen({ route, navigation }) {
  const { inquiryTitle, inquiryContent, responseContent, status } = route.params;

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

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, styles.inactiveTab]}
          onPress={() => navigation.navigate('Service1')}
        >
          <Text style={styles.tabText}>자주 묻는 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, styles.activeTab]}
          onPress={() => navigation.navigate('Service2')}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>1:1 문의</Text>
        </TouchableOpacity>
      </View>

      {/* 문의 제목 및 상태 */}
      <View style={styles.inquiryContainer}>
        <Text style={styles.inquiryTitle}>
          {inquiryTitle}　{status}
        </Text>
      </View>

      {/* 문의 내용 */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>문의 내용</Text>
        <Text style={styles.contentText}>{inquiryContent}</Text>
      </View>
      {/* 구분선 */}
      <View style={styles.divider} />
      {/* 답변 내용 */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>답변 내용</Text>
        <Text style={styles.contentText}>{responseContent || '답변이 등록되지 않았습니다.'}</Text>
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
  inquiryContainer: {
    backgroundColor: '#F2E0C0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A86B00',
  },
  inquiryTitle: {
    fontSize: 16,
    color: '#A86B00',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#F9D9AA',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A86B00',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#A86B00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#000000',
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
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
});
