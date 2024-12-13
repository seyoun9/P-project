package com.book.backend.kakao;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.book.backend.dto.BookDto.BookSearchDto;

@FeignClient(name = "KakaoSearchClient", url = "https://dapi.kakao.com/v3/search/book")
public interface KakaoSearchClient {

    @GetMapping
    BookSearchDto searchBook(@RequestHeader("Authorization") String token, @RequestParam("query") String query);
}
