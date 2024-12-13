package com.book.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.book.backend.dto.ResponseDto;
import com.book.backend.dto.response.GetSignInUserResponseDto;
import com.book.backend.entity.User;
import com.book.backend.repository.UserRepository;
import com.book.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        
        User user = null;

        try {
            user = userRepository.findByEmail(email);
            if (user == null) return GetSignInUserResponseDto.notExistUser();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(user);

    }

    @Override
    public void withdrawUser(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(
            ()-> new IllegalArgumentException("존재하지 않는 회원 입니다.")
        );

        userRepository.delete(user);
    }
    
}
