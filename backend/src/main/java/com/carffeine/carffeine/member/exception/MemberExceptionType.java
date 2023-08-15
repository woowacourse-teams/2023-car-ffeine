package com.carffeine.carffeine.member.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum MemberExceptionType implements ExceptionType {

    NOT_FOUND(Status.NOT_FOUND, 3001, "회원이 없습니다"),
    NOT_FOUND_ROLE(Status.NOT_FOUND, 3002, "일치하는 권한이 없습니다"),
    INVALID_ACCESS(Status.INVALID, 3003, "본인의 계정이 아닙니다"),
    CAR_NOT_FOUND(Status.NOT_FOUND, 3004, "해당 유저의 차량을 찾을 수 없습니다"),
    UNAUTHORIZED(Status.UNAUTHORIZED, 3005, "접근 정보가 잘못되었습니다");

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
