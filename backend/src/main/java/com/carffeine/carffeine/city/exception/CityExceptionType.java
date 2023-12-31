package com.carffeine.carffeine.city.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum CityExceptionType implements ExceptionType {

    NOT_FOUND(Status.NOT_FOUND, 10001, "요청하신 도시를 찾을 수 없습니다.");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    CityExceptionType(Status status, int exceptionCode, String message) {
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
