package com.book.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InquiryDto {
    private Long userId;
    private String title;
    private String content;
    private String response;
    private String status;
}
