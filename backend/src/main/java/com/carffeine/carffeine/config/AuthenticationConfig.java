package com.carffeine.carffeine.config;

import com.carffeine.carffeine.station.domain.filter.JwtAuthorizationFilter;
import com.carffeine.carffeine.station.domain.filter.JwtFilter;
import com.carffeine.carffeine.station.domain.filter.VerifyUserFilter;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.infrastructure.api.AuthMemberResolver;
import com.carffeine.carffeine.station.service.security.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AuthenticationConfig implements WebMvcConfigurer {

    private final UserService userService;
    private final AuthMemberResolver authMemberResolver;

    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public FilterRegistrationBean<Filter> verifyUserFilter(ObjectMapper mapper, UserService userService) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new VerifyUserFilter(mapper, userService));
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter(JwtProvider provider, ObjectMapper mapper, UserService userService) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter(userService, provider, mapper, secretKey));
        filterRegistrationBean.setOrder(2);
        filterRegistrationBean.addUrlPatterns("/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtAuthorizationFilter(JwtProvider provider, ObjectMapper mapper) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthorizationFilter(provider, mapper));
        filterRegistrationBean.setOrder(2);
        return filterRegistrationBean;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authMemberResolver);
    }
}
