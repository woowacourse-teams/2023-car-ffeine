package com.carffeine.carffeine.common.exception;

public interface ExceptionType {

    Status status();

    int exceptionCode();

    String message();
}
