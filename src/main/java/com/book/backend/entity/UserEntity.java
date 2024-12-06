package com.book.backend.entity;

import com.book.backend.dto.request.SignUpRequestDto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class UserEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long userId;

    private String email;

    private String password;

    @Column(name = "kakaoId")
    private String kakaoId;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private String nickname;

    public UserEntity(SignUpRequestDto dto) {
        
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.role = Role.USER;
        this.kakaoId = dto.getKakaoId();
        this.nickname = "test";
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
}
