package com.book.backend.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.book.backend.dto.BookDto;
import com.book.backend.dto.BookDto.BookSearchDto;
import com.book.backend.kakao.KakaoSearchClient;
import com.book.backend.service.KakaoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoServiceImplement implements KakaoService {

    @Value("${kakao.client-id}")
    private String clientId;

    private final KakaoSearchClient kakaoSearchClient;

    @Override
    public List<BookDto> searchBook(String query) {
        String auth = "KakaoAK " + clientId;
        BookSearchDto bookSearchResult = kakaoSearchClient.searchBook(auth, query);
        return bookSearchResult.getDocuments();
    }

    @Override
    public BookDto getBookDetailByIsbn(String isbn) {
        String auth = "KakaoAK " + clientId;
        BookSearchDto bookSearchResult = kakaoSearchClient.searchBook(auth, isbn);
        return bookSearchResult.getDocuments().stream()
                .filter(book -> book.getIsbn().contains(isbn))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Book with ISBN " + isbn + " not found"));
    }
}
