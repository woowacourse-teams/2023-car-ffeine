package com.carffeine.carffeine.station.domain.filter;


import com.carffeine.carffeine.station.controller.user.dto.UserVerifyResponse;
import com.carffeine.carffeine.station.service.security.UserService;
import com.carffeine.carffeine.station.service.user.dto.UserLoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
//@Component
public class VerifyUserFilter implements Filter {
    public static final String AUTHENTICATE_USER = "authenticateUser";
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if ((httpServletRequest.getMethod().equals("POST"))) {
            try {
                UserLoginRequest userLoginRequest = objectMapper.readValue(request.getReader(), UserLoginRequest.class);
                UserVerifyResponse verifyResponse = userService.verifyUser(userLoginRequest);
                if (verifyResponse.isValid()) {
                    request.setAttribute(AUTHENTICATE_USER, new AuthenticateUser(userLoginRequest.email(), verifyResponse.userRole()));
                } else {
                    throw new IllegalArgumentException();
                }
                chain.doFilter(request, response);
            } catch (Exception e) {
                log.error("Fail User Verify");
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
            }
        }
    }
}
