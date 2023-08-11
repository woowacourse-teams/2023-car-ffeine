package com.carffeine.carffeine.station.exception.review;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum ReviewExceptionType implements ExceptionType {

    INVALID_RATINGS_MIN_LENGTH(Status.INVALID, 4001, "별점은 최소 1점입니다"),
    INVALID_RATINGS_MAX_LENGTH(Status.INVALID, 4002, "별점은 최대 5점입니다"),
    INVALID_CONTENT_MIN_LENGTH(Status.INVALID, 4003, "리뷰 내용은 최소 10자 입니다"),
    INVALID_CONTENT_MAX_LENGTH(Status.INVALID, 4004, "리뷰 내용은 최대 200자 입니다"),
    UNAUTHORIZED_MEMBER(Status.UNAUTHORIZED, 4005, "리뷰 작성자와 수정자가 다릅니다");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    ReviewExceptionType(Status status, int exceptionCode, String message) {
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
