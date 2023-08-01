package com.carffeine.carffeine.station.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class AuthorizationException extends BaseException {

    public AuthorizationException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
