package com.book.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class SignUpRequestDto {
    
    @NotBlank @Email
    private String email;

    @NotBlank @Size(min=8, max=20)
    private String password;

    private String kakaoId;
}
