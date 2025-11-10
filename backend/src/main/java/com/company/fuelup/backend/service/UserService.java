package com.company.fuelup.backend.service;

import com.company.fuelup.backend.model.User;
import com.company.fuelup.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    public User registerUser(String email, String password, String name) {
        if (userRepo.existsByEmail(email))
            throw new RuntimeException("Email already in use");

        User user = new User();
        user.setEmail(email);
        user.setPassword(encoder.encode(password));
        user.setName(name);
        user.setProvider("LOCAL");
        return userRepo.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
}
