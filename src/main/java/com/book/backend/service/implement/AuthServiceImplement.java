package com.book.backend.service.implement;

import com.book.backend.dto.KakaoModel;
import com.book.backend.dto.MemberDto;
import com.book.backend.external.KakaoApiClient;
import com.book.backend.external.KakaoOauthClient;
import com.book.backend.external.KakaoSearchClient;
import com.book.backend.service.KakaoService;
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
import com.book.backend.entity.UserEntity;
import com.book.backend.jwt.JwtProvider;
import com.book.backend.repository.UserRepository;
import com.book.backend.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
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
            if (existedEmail) {
                return SignUpResponseDto.duplicateEmail();
            }

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
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
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return SignInResponseDto.signInFailed();
            }

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            Boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (isMatched == false) {
                return SignInResponseDto.signInFailed();
            }

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

        UserEntity userEntity = userRepository.findByEmail(kakaoMemberInfo.getKakaoAccount().getEmail());

        if (userEntity == null) {
            SignUpRequestDto signUpRequest
                    = SignUpRequestDto.of(kakaoEmail, kakaoId, kakaoId);
            ResponseEntity<? super SignUpResponseDto> responseEntity = signUp(signUpRequest);

            UserEntity savedUserEntity = userRepository.findByEmail(kakaoMemberInfo.getKakaoAccount().getEmail());
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
