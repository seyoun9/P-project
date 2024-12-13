package com.book.backend.service;

import org.springframework.http.ResponseEntity;

import com.book.backend.dto.request.SignInRequestDto;
import com.book.backend.dto.request.SignUpRequestDto;
import com.book.backend.dto.response.SignInResponseDto;
import com.book.backend.dto.response.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

    SignInResponseDto dokakaoCallbackProcess(String code);
}
