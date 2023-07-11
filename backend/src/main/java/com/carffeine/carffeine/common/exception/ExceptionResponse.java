package com.carffeine.carffeine.common.exception;

public record ExceptionResponse(
        int exceptionCode,
        String message
) {
}
