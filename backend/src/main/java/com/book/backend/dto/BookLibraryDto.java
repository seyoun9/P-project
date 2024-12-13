package com.book.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookLibraryDto {
    private Long bookId;
    private String libraryCode;
    private Boolean available;
}
