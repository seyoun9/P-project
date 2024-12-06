import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';

export default function AdminInquiryListScreen({ navigation, setIsAdmin }) {
  const [inquiries] = useState([
    { id: '1', date: '2024-12-05', writer: '홍길동', title: '문의 제목 1' },
    { id: '2', date: '2024-12-04', writer: '김철수', title: '문의 제목 2' },
    { id: '3', date: '2024-12-03', writer: '이영희', title: '문의 제목 3' },
    { id: '4', date: '2024-12-02', writer: '박민수', title: '문의 제목 4' },
    { id: '5', date: '2024-12-01', writer: '최지훈', title: '문의 제목 5' },
  ]);

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    setIsAdmin(false);
  };

  const handleViewInquiry = (inquiry) => {
    navigation.navigate('AdminInquiryDetailList', {
      inquiryId: inquiry.id,
      date: inquiry.date,
      writer: inquiry.writer,
      title: inquiry.title,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.date}, {item.writer}, {item.title}
      </Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => handleViewInquiry(item)}>
        <Text style={styles.viewButtonText}>보기</Text>
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

    
      <FlatList
        data={inquiries}
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
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  viewButton: {
    backgroundColor: '#A86B00',
    padding: 5,
    borderRadius: 5,
  },
  viewButtonText: {
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
