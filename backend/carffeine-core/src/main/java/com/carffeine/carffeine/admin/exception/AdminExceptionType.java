package com.carffeine.carffeine.admin.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum AdminExceptionType implements ExceptionType {

    NOT_ADMIN(Status.FORBIDDEN, 9001, "관리자가 아닙니다");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    AdminExceptionType(Status status, int exceptionCode, String message) {
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
