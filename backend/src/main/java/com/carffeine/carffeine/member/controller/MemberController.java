package com.carffeine.carffeine.member.controller;

import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.member.controller.dto.CarPersonalizationRequest;
import com.carffeine.carffeine.member.controller.dto.CarPersonalizationResponse;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;
import com.carffeine.carffeine.member.controller.dto.MemberResponse;
import com.carffeine.carffeine.member.domain.personalization.Personalization;
import com.carffeine.carffeine.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public ResponseEntity<CarPersonalizationResponse> uploadMyCarInfo(@AuthMember Long memberId,
                                                                      @RequestBody CarPersonalizationRequest request) {
        Personalization personalization = memberService.uploadCarPersonalization(memberId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CarPersonalizationResponse.from(personalization));
    }

    @GetMapping
    public ResponseEntity<MemberResponse> findPersonalizationInfo(@AuthMember Long memberId) {
        return ResponseEntity.ok(memberService.findMemberPersonalization(memberId));
    }

    @PostMapping("/filters")
    public ResponseEntity<FiltersResponse> addCustomFiltersByMember(@AuthMember Long memberId,
                                                         @RequestBody MemberCustomFilterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(memberService.addCustomFiltersByMember(memberId, request));
    }

    @GetMapping("/filters")
    public ResponseEntity<FiltersResponse> findCustomFiltersByMember(@AuthMember Long memberId) {
        return ResponseEntity.ok(memberService.findFilterChooseByMember(memberId));
    }
}
