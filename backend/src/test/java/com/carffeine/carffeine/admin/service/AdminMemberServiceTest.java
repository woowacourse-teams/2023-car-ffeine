package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.data.domain.PageRequest.of;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AdminMemberServiceTest {

    private MemberRepository memberRepository;
    private AdminMemberService adminMemberService;
    private Member admin;
    private Member user;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        adminMemberService = new AdminMemberService(memberRepository);
        admin = memberRepository.save(MemberFixture.관리자_회원);
        user = memberRepository.save(MemberFixture.일반_회원);
    }

    @Test
    void 회원을_요청한_갯수만큼_가져온다() {
        // given
        for (int i = 0; i < 30; i++) {
            memberRepository.save(Member.builder()
                    .id((long) i)
                    .build());
        }

        // when
        Page<Member> reportPage = adminMemberService.getMembers(admin.getId(), of(0, 10));

        // then
        assertSoftly(softly -> {
            softly.assertThat(reportPage.getNumberOfElements()).isEqualTo(10);
            softly.assertThat(reportPage.getTotalPages()).isEqualTo(4);
        });
    }

    @Test
    void 회원_목록을_요청할_때_관리자가_아니라면_예외가_발생한다() {
        // given
        for (int i = 0; i < 30; i++) {
            memberRepository.save(Member.builder()
                    .id((long) i)
                    .build());
        }

        // when & then
        assertThatThrownBy(() -> adminMemberService.getMembers(user.getId(), of(0, 10)))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }
}
