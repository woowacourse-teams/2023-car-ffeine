package com.carffeine.carffeine.member.controller;

import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;
import com.carffeine.carffeine.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<?> getPersonalizationInfo() {
        return null;
    }

    @PostMapping("/filters")
    public ResponseEntity<?> addCustomFiltersByMember(@AuthMember Long memberId,
                                                      @RequestBody MemberCustomFilterRequest memberCustomFilterRequest) {
        memberService.addCustomFiltersByMember(memberId, memberCustomFilterRequest);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filters")
    public ResponseEntity<?> getFiltersChooseByMember(@AuthMember Long memberId) {
        return ResponseEntity.ok(memberService.getFilterChooseByMember(memberId));
    }
}
