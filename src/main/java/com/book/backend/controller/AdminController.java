package com.book.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("메인 화면");
    }

    @GetMapping("/user-info")
    public ResponseEntity<String> getAdminUserInfo() {
        return ResponseEntity.ok("유저 정보");
    }

    @GetMapping("/inquiry")
    public ResponseEntity<String> getAdminInquiry() {
        return ResponseEntity.ok("유저 문의");
    }
}
