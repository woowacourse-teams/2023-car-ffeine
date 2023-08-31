package com.carffeine.carffeine.auth.controller.interceptor;

import org.springframework.util.PathMatcher;

public class PathRequest {

    private final String path;
    private final HttpMethod method;

    public PathRequest(String path, HttpMethod method) {
        this.path = path;
        this.method = method;
    }

    public boolean matches(PathMatcher pathMatcher, String targetPath, String pathMethod) {
        return pathMatcher.match(path, targetPath) && method.matches(pathMethod);
    }
}
