package com.carffeine.carffeine.domain.member.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum MemberExceptionType implements ExceptionType {
    INVALID_AUTH_PROVIDER(Status.UNAUTHORIZED, 2001, "지원하지 않는 로그인 플랫폼입니다"),
    ;

    private final Status status;
    private final int exceptionCode;
    private final String message;

    MemberExceptionType(Status status, int exceptionCode, String message) {
        this.status = status;
        this.exceptionCode = exceptionCode;
        this.message = message;
    }

    @Override
    public Status status() {
        return status;
    }

    @Override
    public int exceptionCode() {
        return exceptionCode;
    }

    @Override
    public String message() {
        return message;
    }
}
