package com.carffeine.carffeine.config;

import com.carffeine.carffeine.station.domain.filter.JwtFilter;
import com.carffeine.carffeine.station.domain.member.MemberRepository;
import com.carffeine.carffeine.station.infrastructure.api.AuthMemberResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;
import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final MemberRepository memberRepository;
    private final AuthMemberResolver authMemberResolver;

    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter(memberRepository, secretKey));
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/api/search");
        return filterRegistrationBean;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authMemberResolver);
    }
}
