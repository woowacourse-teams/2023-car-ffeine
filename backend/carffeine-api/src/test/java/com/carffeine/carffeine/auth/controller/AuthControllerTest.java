package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.support.MockBeanInjection;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.carffeine.support.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
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
        when(authService.generateToken(any()))
                .thenReturn("access token");

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
                        )
                ));
    }
}






