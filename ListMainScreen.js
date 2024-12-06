import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';

export default function ListMainScreen({ route, navigation }) {
  const { inquiries } = route.params || []; // ServiceScreen2에서 전달된 inquiries 배열

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inquiryItem}
      onPress={() =>
        navigation.navigate('ListDetail', {
          inquiryId: item.id,
          inquiryTitle: item.title,
          inquiryContent: item.content, // 문의 내용을 전달
          responseContent: item.response || '답변 대기 중',
        })
      }
    >
      <View style={styles.inquiryRow}>
        <Text style={styles.inquiryText}>{item.title}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

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

      {/* 제목 */}
      <Text style={styles.title}>내 문의 내역</Text>

      {/* 문의 리스트 */}
      <FlatList
        data={inquiries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

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
  title: {
    fontSize: 18,
    color: '#A86B00',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  inquiryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1, // 밑줄 추가
    borderBottomColor: '#A86B00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inquiryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inquiryText: {
    fontSize: 14,
    color: '#A86B00',
    flex: 1, // 제목이 길 경우 상태와 간격 조정
  },
  statusText: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
