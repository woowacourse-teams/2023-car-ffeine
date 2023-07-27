package com.carffeine.carffeine.station.controller.security;

import com.carffeine.carffeine.station.service.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/jwt")
    public ResponseEntity<String> createJwt() {
        return ResponseEntity.ok().body("temp");
    }
}
