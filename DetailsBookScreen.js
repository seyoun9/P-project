import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function DetailsBookScreen({ route, navigation }) {
  const { bookTitle } = route.params; // RecomBookScreen에서 전달된 책 제목
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    console.log('로그아웃 완료');
    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
  };

  // 백엔드에서 책 정보를 가져오는 함수 (임시 데이터 사용)
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // 여기에 백엔드 API 호출 코드를 추가
        // 예: const response = await fetch(`https://api.example.com/books/${bookTitle}`);
        // const data = await response.json();

        // 임시 데이터
        const data = {
          image: 'https://via.placeholder.com/150',
          title: bookTitle,
          description: '이 책은 독자들에게 큰 영감을 주는 책입니다. 꼭 한번 읽어보세요!',
        };

        setBookDetails(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookTitle]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#A86B00" />
      </View>
    );
  }

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

      {/* 구분선 */}
      <View style={styles.divider} />
      {/* 책 상세 정보 */}
      <View style={styles.contentContainer}>
        {/* 왼쪽 책 이미지 */}
        <Image source={{ uri: bookDetails.image }} style={styles.bookImage} />

        {/* 오른쪽 책 정보 */}
        <View style={styles.bookInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bookTitle}>{bookDetails.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.bookDescription}>{bookDetails.description}</Text>
          </View>

          {/* 버튼 섹션 (오른쪽 아래, 세로 배치) */}
          <View style={styles.buttonContainer}>

            <TouchableOpacity
              onPress={() => navigation.navigate('ChatBook', { bookTitle: bookDetails.title })}
            >
            <Text style={styles.linkText}>채팅방 가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LibrBook', { bookTitle: bookDetails.title })}
            >
              <Text style={styles.linkText}>보유 도서관 찾으러 가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE8CA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    resizeMode: 'contain',
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    // 화면 중앙 배치
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    width: '100%', // 가로 폭을 화면 거의 전체로 설정
    height: 350, // 컨테이너 높이 증가
  },
  bookImage: {
    width: 140,
    height: 200,
    borderRadius: 5,
    marginRight: 20,
    marginTop: 50,
  },
  bookInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  bookDescription: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-end', // 버튼을 오른쪽 끝으로 정렬
    marginTop: 20,
  },
  linkText: {
    color: '#A86B00',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'right', // 텍스트를 오른쪽 정렬
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
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
  },
});
