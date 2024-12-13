package com.book.backend.entity;

import com.book.backend.dto.request.SignUpRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")

public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long userId;

    private String email;
    
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public User(SignUpRequestDto dto) {
        
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.role = Role.USER;

    }

    public enum Role {
        USER,
        ADMIN;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
            "email='" + email + '\'' +
            ", role=" + role +
            '}';
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class MemberDto {
        private String token;
    }
}
