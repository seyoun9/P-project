//추가1202
package com.book.backend.controller;

import com.book.backend.dto.MemberDto;
import com.book.backend.dto.response.SignInResponseDto;
import com.book.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class KakaoLoginController {

    private final AuthService authService;

    @GetMapping("/callback/kakao")
    public ResponseEntity<SignInResponseDto> callback(@RequestParam("code") String code) {

        SignInResponseDto signInResponseDto = authService.dokakaoCallbackProcess(code);

        return ResponseEntity.ok(signInResponseDto);
    }
}
