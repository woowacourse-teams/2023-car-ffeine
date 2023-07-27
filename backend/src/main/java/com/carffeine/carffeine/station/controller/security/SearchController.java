package com.carffeine.carffeine.station.controller.security;

import com.carffeine.carffeine.station.controller.security.dto.MemberResponse;
import com.carffeine.carffeine.station.domain.security.Member;
import com.carffeine.carffeine.station.infrastructure.api.AuthMember;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @PostMapping
    public ResponseEntity<MemberResponse> startSearching(@AuthMember Member member) {
        MemberResponse response = new MemberResponse(member.getId(), member.getEmail());
        return ResponseEntity.ok().body(response);
    }
}
