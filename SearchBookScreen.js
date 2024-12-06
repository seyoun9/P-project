import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';

export default function SearchBookScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const books = [
    { id: '1', title: 'Book1', description: '책 설명 1', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Book2', description: '책 설명 2', image: 'https://via.placeholder.com/150' },
  ];

  const handleTextChange = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSearchResults([]); // 입력값이 비어 있으면 결과 초기화
    } else {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredBooks);
    }
  };

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

      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <Image source={require('../assets/SearchIcon.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChangeText={handleTextChange} // 입력값 변경 시 필터링
        />
      </View>

      {/* 검색 결과 */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => navigation.navigate('DetailsBook', { bookTitle: item.title })}
            >
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
      )}

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
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  logo: { width: 50, height: 50 },
  headerButtons: { flexDirection: 'row' },
  icon: { width: 50, height: 50, marginLeft: 15 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: '100%', // 검색창 너비
  },
  searchIcon: { width: 25, height: 25, marginRight: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 16, paddingLeft: 10 },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%', // 검색창 너비와 동일하게 설정
  },
  bookImage: { width: 50, height: 70, marginRight: 10 },
  bookTitle: { fontSize: 16, fontWeight: 'bold' },
  bookDescription: { fontSize: 12 },
  noResultsText: { textAlign: 'center', color: '#555', fontSize: 16, marginTop: 20 },
  logoutButton: {
    backgroundColor: '#A86B00',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  logoutText: { color: '#FFFFFF', fontSize: 12 },
});
