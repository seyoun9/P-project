import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';

export default function AdminAllUserScreen({ navigation, setIsAdmin }) {
  const [activeTab, setActiveTab] = useState('allUsers'); 
  const users = [
    { id: '1', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '2', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '3', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '4', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '5', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '6', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '7', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '8', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '9', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '10', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
  ];

  const handleDelete = (userId) => {
    Alert.alert('회원탈퇴', `ID: ${userId}의 회원을 탈퇴하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      { text: '탈퇴', onPress: () => console.log(`${userId} 회원 탈퇴 완료`) },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    setIsAdmin(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.name}, {item.username}, {item.password}, {item.access}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminHome')}>
            <Image source={require('../assets/HomeButton.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminChangePw')}>
            <Image source={require('../assets/SettingButton.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'allUsers' && styles.activeTab]}
          onPress={() => {
            setActiveTab('allUsers');
            navigation.navigate('AdminAllUser'); // 전체 회원 조회
          }}
        >
          <Text style={styles.tabText}>전체 회원 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'searchUser' && styles.activeTab]}
          onPress={() => {
            setActiveTab('searchUser');
            navigation.navigate('SearchUser'); // 특정 회원 검색
          }}
        >
          <Text style={styles.tabText}>특정 회원 검색</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList 사용하여 스크롤 처리 */}
      <FlatList
        data={activeTab === 'allUsers' ? users : []} // 전체 회원 조회일 때만 users 데이터 표시
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          activeTab === 'allUsers' && (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>회원 목록</Text>
            </View>
          )
        }
        contentContainerStyle={styles.flatListContainer} // 여백 조정
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
    paddingBottom: 100, // 화면 하단에 여백 추가
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
  tabText: {
    fontSize: 14,
    color: '#A86B00',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    borderColor: '#A86B00',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#A86B00',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#A86B00',
    padding: 12,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -15 }],
  },
  logoutText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  headerContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A86B00',
  },
  flatListContainer: {
    flexGrow: 1, // FlatList의 높이를 화면에 맞게 스크롤 가능하게 처리
  },
});
