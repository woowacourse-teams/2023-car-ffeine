package com.carffeine.carffeine.member.domain;

import com.carffeine.carffeine.member.fixture.MemberFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class MemberTest {

    @Test
    void 회원의_권한이_일반_회원이면_false를_반환한다() {
        // given
        Member member = MemberFixture.일반_회원;

        // when
        boolean result = member.isAdmin();

        // then
        assertThat(result).isFalse();
    }

    @Test
    void 회원의_권한이_관리자면_true를_반환한다() {
        // given
        Member member = MemberFixture.관리자_회원;

        // when
        boolean result = member.isAdmin();

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 회원의_이메일의_가려서_반환한다() {
        // given
        Member member = MemberFixture.일반_회원;

        // when
        String result = member.maskEmail();

        // then
        assertThat(result).isEqualTo("b**ster@email.com");
    }
}
