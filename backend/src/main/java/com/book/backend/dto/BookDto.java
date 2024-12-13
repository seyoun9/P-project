package com.book.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    
    private String title;
    private String isbn;
    private String contents;
    private String thumbnail;

    @Getter
    @AllArgsConstructor
    public static class BookSearchDto {
        private List<BookDto> documents;
    }
}
