package com.book.backend.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtProvider {
    
    @Value("${secret-key}")
    private String secretKey;

    public String create(String email, String role){
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
        .signWith(key, SignatureAlgorithm.HS256)
        .setSubject(email)
        .claim("role", role)
        .setIssuedAt(new Date())
        .setExpiration(expiredDate)
        .compact();

        return jwt;
    }

    public String validate(String jwt){
        
        Claims claims = null; 
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        
        try {

            claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(jwt)
            .getBody();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

    // 역할 확인 기능 추가 (ADMIN 역할 검증)
    public boolean isAdmin(String jwt) {

        Claims claims = null;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return "ADMIN".equals(claims.get("role")); // "role"이 ADMIN인지 확인
    }
}
