package com.book.backend.service;

import java.util.List;

import com.book.backend.dto.BookDto;

public interface KakaoService {

    List<BookDto> searchBook(String query);

    BookDto getBookDetailByIsbn(String isbn);
}
