package com.book.backend.external;

import com.book.backend.dto.KakaoModel;
import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "KakaoOauthClient", url = "https://kauth.kakao.com/oauth")
public interface KakaoOauthClient {

  @PostMapping("/token")
  @Headers("Content-Type: application/x-www-form-urlencoded;charset=utf-8")
  KakaoModel.KakaoOauthTokenDto getKakaoToken(
          @RequestParam("grant_type") String grantType,
          @RequestParam("client_id") String clientId,
          @RequestParam("redirect_uri") String redirectUri,
          @RequestParam("code") String code
  );
}