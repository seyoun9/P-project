package com.book.backend.service.implement;

import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.book.backend.dto.ResponseDto;
import com.book.backend.dto.response.GetSignInUserResponseDto;
import com.book.backend.entity.UserEntity;
import com.book.backend.repository.UserRepository;
import com.book.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        
        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.notExistUser();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);

    }

    @Override
    public void withdrawUser(long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(
            ()-> new IllegalArgumentException("존재하지 않는 회원 입니다.")
        );

        userRepository.delete(userEntity);
    }

}
