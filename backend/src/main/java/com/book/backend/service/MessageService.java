package com.book.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.book.backend.dto.MessageDto;
import com.book.backend.entity.Chatroom;
import com.book.backend.entity.Message;
import com.book.backend.entity.User;
import com.book.backend.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
    
    private final MessageRepository messageRepository;

    public void saveMessage(MessageDto messageDto) {
        Message message = new Message(
            null,
            new Chatroom(messageDto.getChatroomId(), null, null),
            new User(messageDto.getUserId(), null, null, null),
            messageDto.getContent()
        );
        messageRepository.save(message);
    }

    // 특정 채팅방의 메시지 조회
    public List<Message> getMessagesByChatroomId(Long chatroomId) {
        return messageRepository.findByChatroom_Id(chatroomId);
    }
}
