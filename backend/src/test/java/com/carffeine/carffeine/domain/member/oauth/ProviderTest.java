package com.carffeine.carffeine.domain.member.oauth;

import com.carffeine.carffeine.domain.member.exception.MemberException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ProviderTest {

    @CsvSource(value = {"google, GOOGLE"})
    @ParameterizedTest
    void OAuth_로그인_API_제공자의_이름에_따라_Enum을_반환한다(String providerName, Provider provider) {
        // given
        Provider result = Provider.from(providerName);

        // when & then
        assertThat(result).isEqualTo(provider);
    }

    @Test
    void OAuth_로그인_API_제공자의_이름이_없으면_예외가_발생한다() {
        // given
        String wrongName = "gooooooogle";

        // when & then
        assertThatThrownBy(() -> Provider.from(wrongName))
                .isInstanceOf(MemberException.class)
                .hasMessage("지원하지 않는 로그인 플랫폼입니다");
    }
}
