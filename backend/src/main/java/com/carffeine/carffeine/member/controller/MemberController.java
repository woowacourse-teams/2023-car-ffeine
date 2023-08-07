package com.carffeine.carffeine.member.controller;

import com.carffeine.carffeine.member.controller.dto.JwtResponse;
import com.carffeine.carffeine.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<JwtResponse> createJwt(Long memberId) {
        String jwt = memberService.createJwt(memberId);
        JwtResponse jwtResponse = new JwtResponse(jwt);
        return ResponseEntity.ok().body(jwtResponse);
    }
}
