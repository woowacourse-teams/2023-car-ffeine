package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.auth.service.dto.Tokens;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.Cookie;
import java.time.Duration;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(AuthController.class)
@AutoConfigureRestDocs
public class AuthControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 로그인_uri를_반환한다() throws Exception {
        // given
        when(authService.loginUri(any(), any()))
                .thenReturn("http://login.com");

        // then
        mockMvc.perform(get("/oauth/{provider}/login-uri", "google")
                        .param("redirect-uri", "http://example.com"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-redirect-uri",
                        pathParameters(parameterWithName("provider").description("OAuth provider name")),
                        requestParameters(parameterWithName("redirect-uri").description("Redirect URI")),
                        responseFields(fieldWithPath("loginUri").description("Login URI"))
                ));
    }

    @Test
    void 로그인_토큰_생성() throws Exception {
        // Given
        OAuthLoginRequest loginRequest = new OAuthLoginRequest("http://redirect-uri.com", "thisiscode");
        String provider = "google";

        // when
        when(authService.generateTokens(any()))
                .thenReturn(new Tokens("access token", "refreshToken"));
        when(refreshTokenCookieGenerator.createCookie(anyString()))
                .thenReturn(ResponseCookie.from("refresh-token", "refreshToken")
                        .maxAge(Duration.ofMillis(10000))
                        .path("/")
                        .secure(true)
                        .httpOnly(true)
                        .build());

        // then
        mockMvc.perform(post("/oauth/{provider}/login", provider)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andDo(customDocument("login",
                        pathParameters(parameterWithName("provider").description("OAuth provider name")),
                        requestFields(
                                fieldWithPath("redirectUri").description("리디렉션할 uri"),
                                fieldWithPath("code").description("provider에게 받은 code")
                        ),
                        responseFields(
                                fieldWithPath("token").description("Access token")
                        ),
                        responseHeaders( //응답 헤더 문서화
                                headerWithName(HttpHeaders.SET_COOKIE).description("refresh token")
                        )
                ));
    }

    @Test
    void refresh_token으로_access_token을_반환한다() throws Exception {
        // given
        String refreshToken = "your-refresh-token";
        String accessToken = "new-access-token";
        when(authService.renewAccessToken(refreshToken)).thenReturn(accessToken);

        // when & then
        mockMvc.perform(post("/renew")
                        .cookie(new Cookie("refresh-token", refreshToken)))
                .andExpect(status().isOk())
                .andDo(customDocument("renew-access-token",
                        responseFields(
                                fieldWithPath("token").description("Renewed access token")
                        )
                ));
    }

    @Test
    public void logout을_한다() throws Exception {
        // given
        when(refreshTokenCookieGenerator.createLogoutCookie())
                .thenReturn(ResponseCookie.from("refreshToke", "")
                        .maxAge(0)
                        .build());

        // when & then
        mockMvc.perform(post("/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("logout",
                        responseHeaders(
                                headerWithName("Set-Cookie")
                                        .description("Logout cookie containing refreshed token")
                        )));
    }
}






