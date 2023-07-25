package com.carffeine.carffeine.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionResponse;
import com.carffeine.carffeine.common.exception.ExceptionStatus;
import com.carffeine.carffeine.common.exception.ExceptionType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleException(BaseException e) {
        ExceptionType type = e.getExceptionType();
        ExceptionStatus exceptionStatus = ExceptionStatus.from(type.status());
        return ResponseEntity.status(exceptionStatus.getHttpStatus())
                .body(new ExceptionResponse(type.exceptionCode(), type.message()));
    }
}
