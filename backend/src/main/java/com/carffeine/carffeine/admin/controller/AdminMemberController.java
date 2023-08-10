package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.MembersResponse;
import com.carffeine.carffeine.admin.service.AdminMemberService;
import com.carffeine.carffeine.admin.service.dto.MemberRoleUpdateRequest;
import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @GetMapping("/members")
    public ResponseEntity<CustomPage<MembersResponse>> getMembers(
            @AuthMember Long loginMemberId,
            Pageable pageable
    ) {
        Page<Member> pagedMember = adminMemberService.getMembers(loginMemberId, pageable);
        int totalPages = pagedMember.getTotalPages();
        List<MembersResponse> elements = pagedMember.getContent().stream()
                .map(MembersResponse::from)
                .toList();
        return ResponseEntity.ok(new CustomPage<>(totalPages, elements));
    }

    @PatchMapping("/members/{memberId}")
    public ResponseEntity<Void> getMembers(
            @AuthMember Long loginMemberId,
            @PathVariable Long memberId,
            @RequestBody MemberRoleUpdateRequest request
    ) {
        adminMemberService.updateRole(loginMemberId, memberId, request);
        return ResponseEntity.noContent().build();
    }
}
