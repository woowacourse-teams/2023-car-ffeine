package com.carffeine.carffeine.station.controller.auth;

import com.carffeine.carffeine.station.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/jwt")
    public ResponseEntity<String> createJwt() {
        return ResponseEntity.ok().body("temp");
    }
}
