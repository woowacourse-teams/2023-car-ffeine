package com.carffeine.carffeine.web;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter extends OncePerRequestFilter {

    private static final String CARFFEIN_DOMAIN_SUFFIX = ".carffe.in";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String origin = request.getHeader("Origin");

        setOriginHeader(response, origin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Location");

        filterChain.doFilter(request, response);
    }

    private void setOriginHeader(HttpServletResponse response, String origin) {
        if (origin == null) {
            response.setHeader("Access-Control-Allow-Origin", "*");
            return;
        }
        if (origin.endsWith(CARFFEIN_DOMAIN_SUFFIX)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        }
    }
}
