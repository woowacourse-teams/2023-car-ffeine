package com.carffeine.carffeine.station.exception.congestion;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum CongestionExceptionType implements ExceptionType {

    INVALID_DAY_OF_WEEK(Status.BAD_REQUEST, 7001, "요일은 1(월요일) ~ 7(일요일)까지 가능합니다."),
    ;

    private final Status status;
    private final int exceptionCode;
    private final String message;

    CongestionExceptionType(Status status, int exceptionCode, String message) {
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
