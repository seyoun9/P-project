package com.book.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatroomDto {
    
    private Long id;
    private Long bookId;
    private String title;

    public ChatroomDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
