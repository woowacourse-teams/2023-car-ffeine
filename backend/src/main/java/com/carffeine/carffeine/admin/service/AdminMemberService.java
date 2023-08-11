package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.admin.service.dto.MemberRoleUpdateRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AdminMemberService {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Page<Member> getMembers(Long loginMemberId, Pageable pageable) {
        validateRole(loginMemberId);
        return memberRepository.findAll(pageable);
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    @Transactional
    public void updateRole(Long loginMemberId, Long memberId, MemberRoleUpdateRequest request) {
        validateRole(loginMemberId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND));

        member.updateRole(MemberRole.from(request.role()));
    }
}
