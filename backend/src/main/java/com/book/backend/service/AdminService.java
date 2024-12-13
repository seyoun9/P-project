package com.book.backend.service;

import java.util.List;

import com.book.backend.entity.User;

public interface AdminService {
    List<User> getAllUsers();
    User getUserByEmail(String email);
    void deleteUserByEmail(String email);
}
