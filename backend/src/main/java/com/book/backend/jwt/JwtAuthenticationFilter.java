package com.book.backend.jwt;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtProvider jwtProvider;

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
            try {
                // Authentication Filter
                String token = parseBearerToken(request);

                if (token == null){
                    filterChain.doFilter(request, response);
                    return;
                }
    
                String email = jwtProvider.validate(token);
    
                if (email == null){
                    filterChain.doFilter(request, response);
                    return;
                }
    
                // 사용자가 ADMIN인 경우, 권한 추가
                AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, 
                    jwtProvider.isAdmin(token) ? AuthorityUtils.createAuthorityList("ROLE_ADMIN") : AuthorityUtils.NO_AUTHORITIES);
                    
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authenticationToken);
    
                SecurityContextHolder.setContext(securityContext);

            } catch (Exception e) {
                e.printStackTrace();
            }

            filterChain.doFilter(request, response);
            
    }

    private String parseBearerToken(HttpServletRequest request){

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer");
        if (!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
