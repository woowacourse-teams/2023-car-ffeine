package com.carffeine.carffeine.auth.config;

import com.carffeine.carffeine.auth.controller.AuthArgumentResolver;
import com.carffeine.carffeine.auth.controller.interceptor.LoginCheckerInterceptor;
import com.carffeine.carffeine.auth.controller.interceptor.LoginInterceptor;
import com.carffeine.carffeine.auth.controller.interceptor.PathMatcherInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.ANY;
import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.DELETE;
import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.GET;
import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.OPTIONS;
import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.PATCH;
import static com.carffeine.carffeine.auth.controller.interceptor.HttpMethod.POST;

@RequiredArgsConstructor
@Configuration
public class AuthConfig implements WebMvcConfigurer {

    private final AuthArgumentResolver authArgumentResolver;
    private final LoginInterceptor loginInterceptor;
    private final LoginCheckerInterceptor loginCheckerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckerInterceptor());
        registry.addInterceptor(loginInterceptor());
    }

    private HandlerInterceptor loginCheckerInterceptor() {
        return new PathMatcherInterceptor(loginCheckerInterceptor)
                .excludePathPattern("/**", OPTIONS)
                .addPathPatterns("/stations/**/reports/me", GET);
    }

    private HandlerInterceptor loginInterceptor() {
        return new PathMatcherInterceptor(loginInterceptor)
                .excludePathPattern("/**", OPTIONS)
                .addPathPatterns("/admin/**", ANY)
                .addPathPatterns("/members/**", ANY)
                .addPathPatterns("/cars/**/filters", POST)
                .addPathPatterns("/cars", POST)
                .addPathPatterns("/filters", POST)
                .addPathPatterns("/stations/**/reports", POST)
                .addPathPatterns("/stations/**/reviews/**", POST, DELETE, PATCH)
                .addPathPatterns("/reviews/**/replies", POST, DELETE, PATCH)
                .addPathPatterns("/reviews/**", DELETE, PATCH);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authArgumentResolver);
    }
}
