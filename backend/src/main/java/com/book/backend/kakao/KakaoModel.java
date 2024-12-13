package com.book.backend.kakao;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class KakaoModel {
    @Getter
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class KakaoOauthTokenDto {
        private String tokenType;

        private String accessToken;

        private String idToken;

        private Integer expiresIn;

        private String refreshToken;

        private Integer refreshTokenExpiresIn;

        private String scope;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class KakaoMemberInfoDto {
        private String id;
        private KakaoAccount kakaoAccount;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class KakaoAccount{
        private String email;
    }
}
