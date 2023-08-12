package com.carffeine.carffeine.filter.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum FilterExceptionType implements ExceptionType {

    FILTER_NOT_FOUND(Status.NOT_FOUND, 1001, "해당 필터를 찾을 수 없습니다.");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    FilterExceptionType(Status status, int exceptionCode, String message) {
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
