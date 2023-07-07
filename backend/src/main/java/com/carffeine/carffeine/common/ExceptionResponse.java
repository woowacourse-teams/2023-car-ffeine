package com.carffeine.carffeine.common;

public record ExceptionResponse(
        int exceptionCode,
        String message
) {
}
