package com.carffeine.carffeine.station.controller.security;

import com.carffeine.carffeine.station.service.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    @PostMapping("/jwt")
    public ResponseEntity<String> createJwt() {
//        String jwt = authService.createJwt(loginRequest.userName()); // DTO 로 response 만들어서 반환
//        return ResponseEntity.ok().body(jwt);
        String jwt = authService.makeJwt();
        return ResponseEntity.ok().body(jwt);
    }
}
