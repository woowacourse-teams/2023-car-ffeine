package com.carffeine.carffeine.member.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 회원_목록을_페이지로_조회한다() {
        // given
        Member member = Member.builder()
                .name("user")
                .email("user@email.com")
                .memberRole(MemberRole.USER)
                .build();
        memberRepository.save(member);
        memberRepository.save(Member.builder()
                .name("asd")
                .email("email2@email.com")
                .memberRole(MemberRole.ADMIN)
                .build());

        // when
        Page<Member> result = memberRepository.findAll(Pageable.ofSize(1));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.getTotalPages()).isEqualTo(2);
            softly.assertThat(result.getContent()).containsExactly(member);
        });
    }
}
