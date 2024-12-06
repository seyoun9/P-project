import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function AdminInquiryDetailListScreen({ route, navigation, setIsAdmin }) {
  const { inquiryId, date, writer, title } = route.params;

  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = () => {
    if (!answer.trim()) {
      Alert.alert('답변 내용이 비어 있습니다.');
      return;
    }
    Alert.alert('답변이 등록되었습니다.');
    console.log(`답변: ${answer}`); 
    setAnswer('');  
  };

  const handleLogout = () => {
    Alert.alert('로그아웃되었습니다.');
    setIsAdmin(false);
  };

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

      
      <View style={styles.inquiryContainer}>
        <Text style={styles.inquiryTitle}>{title}</Text>
        <Text style={styles.inquiryText}>작성자: {writer}</Text>
        <Text style={styles.inquiryText}>날짜: {date}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>문의 내용</Text>
          <Text style={styles.contentText}>문의 내용 자리.</Text>
        </View>
      </View>

    
      <View style={styles.answerContainer}>
        <Text style={styles.sectionTitle}>답변 내용</Text>
        <TextInput
          style={styles.answerInput}
          multiline
          placeholder="답변을 입력하세요"
          value={answer}
          onChangeText={setAnswer}
        />
      </View>


      <TouchableOpacity style={styles.submitButton} onPress={handleAnswerSubmit}>
        <Text style={styles.submitButtonText}>답변하기</Text>
      </TouchableOpacity>


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
  inquiryContainer: {
    marginBottom: 20,
  },
  inquiryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A86B00',
  },
  inquiryText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  contentContainer: {
    marginTop: 15,
    backgroundColor: '#F2E0C0',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A86B00',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A86B00',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#000',
  },
  answerContainer: {
    marginTop: 20,
    backgroundColor: '#F9D9AA',
    padding: 10,
    borderRadius: 5,
  },
  answerInput: {
    height: 100,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#A86B00',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
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
