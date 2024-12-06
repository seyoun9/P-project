package com.book.backend.external;

import com.book.backend.dto.KakaoModel;
import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;

@FeignClient(name = "KakaoApiClient", url = "https://kapi.kakao.com/v2")
public interface KakaoApiClient {

  @GetMapping("/user/me")
  @Headers("Content-Type: application/x-www-form-urlencoded;charset=utf-8")
  KakaoModel.KakaoMemberInfoDto getKakaoMemberInfo(@RequestHeader("Authorization") String token);
}