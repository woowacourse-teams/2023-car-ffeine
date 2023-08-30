package com.carffeine.carffeine.auth.controller.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PathMatcherInterceptor implements HandlerInterceptor {

    private final HandlerInterceptor handlerInterceptor;
    private final PathContainer pathContainer;

    public PathMatcherInterceptor(final HandlerInterceptor handlerInterceptor) {
        this.handlerInterceptor = handlerInterceptor;
        this.pathContainer = new PathContainer();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (pathContainer.isNotIncludedPath(request.getServletPath(), request.getMethod())) {
            return true;
        }
        return handlerInterceptor.preHandle(request, response, handler);
    }

    public PathMatcherInterceptor addPathPatterns(String pathPattern, HttpMethod... httpMethod) {
        pathContainer.addIncludePatterns(pathPattern, httpMethod);
        return this;
    }

    public PathMatcherInterceptor excludePathPattern(String pathPattern, HttpMethod pathMethod) {
        pathContainer.addExcludePatterns(pathPattern, pathMethod);
        return this;
    }
}
