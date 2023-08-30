package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.controller.support.AuthenticationExtractor;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AuthenticationExtractorTest {

    private HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

    @Test
    void 정상_토큰이면_토큰이_존재한다() {
        when(request.getHeader("Authorization")).thenReturn("Bearer token");

        Optional<String> extract = AuthenticationExtractor.extract(request);

        assertThat(extract).isPresent();
    }

    @Test
    void 토큰이_비었다면_반환되는_토큰이_존재하지_않는다() {
        when(request.getHeader("Authorization")).thenReturn("");

        Optional<String> extract = AuthenticationExtractor.extract(request);

        assertThat(extract).isEmpty();
    }

    @Test
    void 토큰이_null이라면_토큰이_존재하지_않는다() {
        when(request.getHeader("Authorization")).thenReturn(null);

        Optional<String> extract = AuthenticationExtractor.extract(request);

        assertThat(extract).isEmpty();
    }

    @Test
    void 유효하지_않은_형식의_토큰이면_토큰이_존재하지_않는다() {
        when(request.getHeader("Authorization")).thenReturn("invalid");

        Optional<String> extract = AuthenticationExtractor.extract(request);

        assertThat(extract).isEmpty();
    }

    @Test
    void Authorization_헤더가_없다면_토큰이_존재하지_않는다() {
        when(request.getHeader("Other")).thenReturn("Bearer token");

        Optional<String> extract = AuthenticationExtractor.extract(request);

        assertThat(extract).isEmpty();
    }
}
