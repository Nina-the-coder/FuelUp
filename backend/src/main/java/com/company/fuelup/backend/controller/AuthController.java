package com.company.fuelup.backend.controller;

import com.company.fuelup.backend.model.User;
import com.company.fuelup.backend.repository.UserRepository;
import com.company.fuelup.backend.security.JwtUtil;
import com.company.fuelup.backend.service.UserService;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Data
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ DTO for cleaner request binding
    public static class SignupRequest {
        public String name;
        public String email;
        public String password;
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    // ✅ Signup API
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (req.email == null || req.password == null || req.name == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        User user = userService.registerUser(req.email, req.password, req.name);
        System.out.println("Registered user: " + user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of(
                "message", "Signup successful",
                "token", token,
                "username", user.getName()
        ));
    }

    // ✅ Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.email == null || req.password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing email or password"));
        }

        User user = userRepo.findByEmail(req.email).orElse(null);
        if (user == null || !encoder.matches(req.password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token,
                "username", user.getName()
        ));
    }

    // ✅ Google OAuth success callback
    @GetMapping("/google/success")
    public ResponseEntity<?> googleSuccess() {
        return ResponseEntity.ok(Map.of("message", "Google login success!"));
    }
}
