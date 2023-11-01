package com.carffeine.carffeine.auth.controller.interceptor;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PathContainerTest {

    private PathContainer pathContainer = new PathContainer();

    @Test
    void include로_등록한_메서드와_uri가_같으면_false를_반환한다() {
        pathContainer.addIncludePatterns("/api/v1/members", HttpMethod.GET);

        boolean notIncludedPath = pathContainer.isNotIncludedPath("/api/v1/members", HttpMethod.GET.name());

        assertThat(notIncludedPath).isFalse();
    }

    @Test
    void include로_등록한_메서드와_uri가_다르면_true를_반환한다() {
        pathContainer.addIncludePatterns("/api/v1/members", HttpMethod.GET);

        boolean notIncludedPath = pathContainer.isNotIncludedPath("/api/v1/members", HttpMethod.POST.name());

        assertThat(notIncludedPath).isTrue();
    }

    @Test
    void exclude로_등록한_메서드와_uri가_같으면_true를_반환한다() {
        pathContainer.addExcludePatterns("/api/v1/members", HttpMethod.GET);

        boolean notIncludedPath = pathContainer.isNotIncludedPath("/api/v1/members", HttpMethod.GET.name());

        assertThat(notIncludedPath).isTrue();
    }
}
