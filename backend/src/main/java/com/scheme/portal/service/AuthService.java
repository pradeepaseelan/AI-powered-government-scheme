package com.scheme.portal.service;

import com.scheme.portal.dto.AuthResponse;
import com.scheme.portal.dto.LoginRequest;
import com.scheme.portal.dto.RegisterRequest;
import com.scheme.portal.entity.User;
import com.scheme.portal.exception.BadRequestException;
import com.scheme.portal.repository.UserRepository;
import com.scheme.portal.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(User.Role.USER);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), "USER");
        return new AuthResponse(token, user.getFullName(), user.getEmail(), "USER");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), "USER");
        return new AuthResponse(token, user.getFullName(), user.getEmail(), "USER");
    }
}
