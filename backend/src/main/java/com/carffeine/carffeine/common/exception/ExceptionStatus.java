package com.carffeine.carffeine.common.exception;

import org.springframework.http.HttpStatus;

import java.util.Arrays;

public enum ExceptionStatus {

    INTERNAL_SERVER_ERROR(Status.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR),
    NOT_FOUND(Status.NOT_FOUND, HttpStatus.NOT_FOUND),
    UNAUTHORIZED(Status.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),
    FORBIDDEN(Status.FORBIDDEN, HttpStatus.FORBIDDEN),
    BAD_REQUEST(Status.BAD_REQUEST, HttpStatus.BAD_REQUEST),
    ;

    private final Status status;
    private final HttpStatus httpStatus;

    ExceptionStatus(Status status, HttpStatus httpStatus) {
        this.status = status;
        this.httpStatus = httpStatus;
    }

    public static ExceptionStatus from(Status input) {
        return Arrays.stream(ExceptionStatus.values())
                .filter(it -> it.status == input)
                .findAny()
                .orElse(INTERNAL_SERVER_ERROR);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
