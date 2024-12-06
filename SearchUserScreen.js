import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';

export default function SearchUserScreen({ navigation, setIsAdmin }) {
  const [activeTab, setActiveTab] = useState('searchUser'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const users = [
    { id: '1', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '2', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '3', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '4', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '5', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
    { id: '6', name: '가입일', username: 'ID', password: 'PW', access: '접속이력' },
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

    
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'allUsers' && styles.activeTab]}
          onPress={() => {
            setActiveTab('allUsers');
            navigation.navigate('AdminAllUser'); 
          }}
        >
          <Text style={styles.tabText}>전체 회원 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'searchUser' && styles.activeTab]}
          onPress={() => {
            setActiveTab('searchUser');
            navigation.navigate('SearchUser'); 
          }}
        >
          <Text style={styles.tabText}>특정 회원 검색</Text>
        </TouchableOpacity>
      </View>

    
      <View style={styles.searchContainer}>
        <Image source={require('../assets/SearchIcon.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="회원 검색"
          value={searchQuery}
          onChangeText={setSearchQuery} 
        />
      </View>

    
      <FlatList
        data={users.filter((user) => user.username.includes(searchQuery) || user.id.includes(searchQuery))} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    
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
    paddingBottom: 100, 
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9D9AA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
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
});
