package com.book.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.backend.dto.ChatroomDto;
import com.book.backend.service.ChatroomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/book/detail/{isbn}/chats")
@RequiredArgsConstructor
public class ChatroomController {
    
    private final ChatroomService chatroomService;

    @PostMapping("/create")
    public ResponseEntity<ChatroomDto> createChatroom(@PathVariable String isbn, @RequestBody ChatroomDto chatroomDto) {
        ChatroomDto response = chatroomService.createChatroom(isbn, chatroomDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("")
    public ResponseEntity<ChatroomDto> getChatroom(@PathVariable String isbn) {
        ChatroomDto response = chatroomService.getChatroomByIsbn(isbn);
        return ResponseEntity.ok(response);
    }
}
