package com.book.backend.service.implement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.book.backend.dto.ResponseDto;
import com.book.backend.dto.request.SignInRequestDto;
import com.book.backend.dto.request.SignUpRequestDto;
import com.book.backend.dto.response.SignInResponseDto;
import com.book.backend.dto.response.SignUpResponseDto;
import com.book.backend.entity.User;
import com.book.backend.jwt.JwtProvider;
import com.book.backend.kakao.KakaoApiClient;
import com.book.backend.kakao.KakaoModel;
import com.book.backend.kakao.KakaoOauthClient;
import com.book.backend.repository.UserRepository;
import com.book.backend.service.AuthService;
import com.book.backend.service.KakaoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    @Value("${kakao.client-id}")
    private String clientId;
    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    private final KakaoOauthClient kakaoOauthClient;
    private final KakaoApiClient kakaoApiClient;
    private final KakaoService kakaoService;

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignUpResponseDto.duplicateEmail();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            User userEntity = new User(dto);
            userRepository.save(userEntity);

        } catch (Exception e) {

            e.printStackTrace();
            return ResponseDto.databaseError();

        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        
        String token = null;

        try {
            
            String email = dto.getEmail();
            User userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            Boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (isMatched == false) return SignInResponseDto.signInFailed();

            String role = userEntity.getRole().name(); // 역할을 가져옴
            token = jwtProvider.create(email, role); // role을 함께 전달

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token); 
    }

    @Override
    public SignInResponseDto dokakaoCallbackProcess(String authCode) {
        kakaoService.searchBook("test");

        KakaoModel.KakaoOauthTokenDto kakaoToken = kakaoOauthClient.getKakaoToken(
                "authorization_code",
                clientId,
                redirectUri,
                authCode
        );

        String authorization = "Bearer " + kakaoToken.getAccessToken();
        KakaoModel.KakaoMemberInfoDto kakaoMemberInfo = kakaoApiClient.getKakaoMemberInfo(authorization);
        String kakaoId = kakaoMemberInfo.getId();
        String kakaoEmail = kakaoMemberInfo.getKakaoAccount().getEmail();

        User userEntity = userRepository.findByEmail(kakaoMemberInfo.getKakaoAccount().getEmail());

        if (userEntity == null) {
            SignUpRequestDto signUpRequest
                    = SignUpRequestDto.of(kakaoEmail, kakaoId);
            ResponseEntity<? super SignUpResponseDto> responseEntity = signUp(signUpRequest);

            User savedUserEntity = userRepository.findByEmail(kakaoMemberInfo.getKakaoAccount().getEmail());
            SignInRequestDto signInRequest
                    = SignInRequestDto.of(savedUserEntity.getEmail(), kakaoId);
            return (SignInResponseDto) signIn(signInRequest).getBody();
        } else {
            SignInRequestDto signInRequest
                    = SignInRequestDto.of(userEntity.getEmail(), kakaoId);
            return (SignInResponseDto) signIn(signInRequest).getBody();
        }
    }
}
