package com.book.backend.service;

import org.springframework.http.ResponseEntity;

import com.book.backend.dto.response.GetSignInUserResponseDto;

public interface UserService {
    
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    void withdrawUser(Long userId);
}
