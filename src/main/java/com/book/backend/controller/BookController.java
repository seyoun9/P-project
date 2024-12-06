package com.book.backend.controller;

import com.book.backend.dto.BookModel.BookDto;
import com.book.backend.service.KakaoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

  private final KakaoService kakaoService;

  @GetMapping("/search")
  public ResponseEntity<List<BookDto>> searchBook(@RequestParam("query") String query) {
    List<BookDto> bookDtoList = kakaoService.searchBook(query);

    return ResponseEntity.ok().body(bookDtoList);
  }
}
