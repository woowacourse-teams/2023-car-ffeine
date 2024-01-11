package com.carffeine.carffeine.auth.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class AuthException extends BaseException {

    public AuthException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
