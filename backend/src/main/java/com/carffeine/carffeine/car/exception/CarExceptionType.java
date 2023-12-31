package com.carffeine.carffeine.car.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum CarExceptionType implements ExceptionType {

    NOT_FOUND_EXCEPTION(Status.NOT_FOUND, 5001, "해당 차량을 찾을 수 없습니다.");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    CarExceptionType(Status status, int exceptionCode, String message) {
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
