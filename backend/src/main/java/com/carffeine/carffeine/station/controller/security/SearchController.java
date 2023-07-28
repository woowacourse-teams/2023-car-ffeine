package com.carffeine.carffeine.station.controller.security;

import com.carffeine.carffeine.station.controller.security.dto.UserResponse;
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
    public ResponseEntity<UserResponse> startSearching(@AuthMember User user) {
        UserResponse response = new UserResponse(user.getId(), user.getEmail());
        return ResponseEntity.ok().body(response);
    }
}
