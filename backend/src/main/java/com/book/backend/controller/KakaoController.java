package com.book.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.book.backend.dto.BookDto;
import com.book.backend.dto.response.SignInResponseDto;
import com.book.backend.service.AuthService;
import com.book.backend.service.KakaoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;
    private final AuthService authService;

    @GetMapping("/oauth/callback/kakao")
    public ResponseEntity<SignInResponseDto> callback(@RequestParam("code") String code) {
        SignInResponseDto signInResponseDto = authService.dokakaoCallbackProcess(code);
        return ResponseEntity.ok(signInResponseDto);
    }

    @GetMapping("/book/search")
    public ResponseEntity<List<BookDto>> searchBook(@RequestParam("query") String query) {
        List<BookDto> bookDtoList = kakaoService.searchBook(query);
        return ResponseEntity.ok(bookDtoList);
    }

    @GetMapping("/book/detail/{isbn}")
    public ResponseEntity<BookDto> getBookDetail(@PathVariable String isbn) {
        BookDto bookDetail = kakaoService.getBookDetailByIsbn(isbn);
        return ResponseEntity.ok(bookDetail);
    }
}
