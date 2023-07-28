package com.carffeine.carffeine.station.controller.auth;

import com.carffeine.carffeine.station.controller.auth.dto.MemberResponse;
import com.carffeine.carffeine.station.domain.user.User;
import com.carffeine.carffeine.station.infrastructure.api.AuthMember;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @PostMapping
    public ResponseEntity<MemberResponse> startSearching(@AuthMember User user) {
        MemberResponse response = new MemberResponse(user.getId(), user.getEmail());
        return ResponseEntity.ok().body(response);
    }
}
