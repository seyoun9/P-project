package com.book.backend.service.implement;

import com.book.backend.dto.BookModel.BookDto;
import com.book.backend.dto.BookModel.BookSearchDto;
import com.book.backend.external.KakaoSearchClient;
import com.book.backend.service.KakaoService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KakaoServiceImplement implements KakaoService {
  @Value("${kakao.client-id}") private String clientId;

  private final KakaoSearchClient kakaoSearchClient;

  public List<BookDto> searchBook(String query) {
    String auth = "KakaoAK " + clientId;
    BookSearchDto bookSearchResult = kakaoSearchClient.searchBook(auth, query);

     return bookSearchResult.getDocuments();
  }
}
