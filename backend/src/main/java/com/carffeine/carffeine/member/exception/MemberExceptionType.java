package com.carffeine.carffeine.member.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum MemberExceptionType implements ExceptionType {

    NOT_FOUND(Status.NOT_FOUND, 3001, "회원이 없습니다");

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
