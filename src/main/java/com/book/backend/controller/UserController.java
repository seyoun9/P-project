package com.book.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.backend.dto.response.GetSignInUserResponseDto;
import com.book.backend.service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetSignInUserResponseDto> response  = userService.getSignInUser(email);
        return response;
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> withdrawUser(@PathVariable("userId") long userId) {
        userService.withdrawUser(userId);

        return ResponseEntity.ok().build();
    }
}
