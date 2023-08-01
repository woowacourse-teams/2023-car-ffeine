package com.carffeine.carffeine.station.controller.auth;

import com.carffeine.carffeine.station.controller.auth.dto.JwtResponse;
import com.carffeine.carffeine.station.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
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
