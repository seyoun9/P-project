package com.book.backend.service;

import com.book.backend.dto.BookModel.BookDto;
import java.util.List;

public interface KakaoService {
  List<BookDto> searchBook(String query);
}
