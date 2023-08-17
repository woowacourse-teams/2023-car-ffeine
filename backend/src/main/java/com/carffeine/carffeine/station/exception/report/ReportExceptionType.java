package com.carffeine.carffeine.station.exception.report;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum ReportExceptionType implements ExceptionType {

    DUPLICATE_REPORT(Status.BAD_REQUEST, 2001, "이미 신고한 충전소는 신고가 불가합니다"),
    NOT_FOUND(Status.NOT_FOUND, 2002, "요청하신 id의 신고 정보를 찾을 수 없습니다."),
    ;

    private final Status status;
    private final int exceptionCode;
    private final String message;

    ReportExceptionType(Status status, int exceptionCode, String message) {
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
