package com.book.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.backend.dto.MessageDto;
import com.book.backend.entity.Message;
import com.book.backend.service.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class MessageController {
    
    private final MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody MessageDto messageDto) {
        messageService.saveMessage(messageDto);
        return ResponseEntity.ok().build();
    }
    
    // 특정 채팅방의 메시지 조회
    @GetMapping("/{chatroomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long chatroomId) {
        List<Message> messages = messageService.getMessagesByChatroomId(chatroomId);
        return ResponseEntity.ok(messages);
    }

}
