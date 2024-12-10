package com.book.backend.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.book.backend.entity.User;
import com.book.backend.repository.UserRepository;
import com.book.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImplement implements AdminService {
    
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found with email: " + email);
        }
        userRepository.delete(user);
    }
}
