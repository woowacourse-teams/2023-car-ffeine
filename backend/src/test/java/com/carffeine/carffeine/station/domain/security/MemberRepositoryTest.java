package com.carffeine.carffeine.station.domain.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    private String email;
    private Long memberId;

    @BeforeEach
    void setUp() {
        email = "xxx@gmail.com";
        Member member = new Member(email);
        Member save = memberRepository.save(member);
        memberId = save.getId();
    }

    @Test
    void 회원을_저장한다() {
        // when
        List<Member> all = memberRepository.findAll();

        // then
        assertThat(all).hasSize(1);
    }

    @Test
    void 회원의_메일을_통해_찾는다() {
        // when
        Member expectedMember = memberRepository.findByEmail(email);

        // then
        assertThat(email).isEqualTo(expectedMember.getEmail());
    }
}
