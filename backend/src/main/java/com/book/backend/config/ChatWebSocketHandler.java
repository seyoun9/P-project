package com.book.backend.config;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.book.backend.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, List<WebSocketSession>> chatrooms = new ConcurrentHashMap<>();
    private final JwtProvider jwtProvider;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String token = getJwtToken(session);
        String email = jwtProvider.validate(token);

        if (email == null) {
            session.close();
            System.out.println("WebSocket 연결 실패: 유효하지 않은 토큰");
            return;
        }

        String isbn = extractIsbn(session);
        chatrooms.computeIfAbsent(isbn, k -> new CopyOnWriteArrayList<>()).add(session);
        System.out.println("WebSocket 연결 성공: ISBN=" + isbn + ", 사용자=" + email);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        String isbn = extractIsbn(session);

        List<WebSocketSession> sessions = chatrooms.get(isbn);
        if (sessions != null) {
            for (WebSocketSession s : sessions) {
                s.sendMessage(new TextMessage(payload));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String isbn = extractIsbn(session);
        List<WebSocketSession> sessions = chatrooms.get(isbn);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                chatrooms.remove(isbn);
            }
        }
        System.out.println("WebSocket 연결 해제: ISBN=" + isbn);
    }

    private String getJwtToken(WebSocketSession session) {
        // HTTP 헤더에서 Authorization 토큰 추출
        String query = session.getUri().getQuery();
        if (query != null && query.contains("token=")) {
            return query.split("token=")[1];
        }
        return null;
    }

    private String extractIsbn(WebSocketSession session) {
        // WebSocketSession의 URI에서 ISBN 추출 로직
        return session.getUri().getPath().split("/")[3]; // 예: "/book/detail/{isbn}/chats/ws"에서 ISBN 추출
    }

    private boolean isSameChatroom(WebSocketSession session, String isbn) {
        return extractIsbn(session).equals(isbn);
    }

}
