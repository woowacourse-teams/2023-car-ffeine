package com.carffeine.carffeine.filter.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum FilterExceptionType implements ExceptionType {

    FILTER_ALREADY_REGISTERED(Status.BAD_REQUEST, 1001, "중복된 필터가 포함되어 있습니다.");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    FilterExceptionType(final Status status, final int exceptionCode, final String message) {
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
