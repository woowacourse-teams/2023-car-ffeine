package com.carffeine.carffeine.city.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class CityException extends BaseException {

    public CityException(final ExceptionType exceptionType) {
        super(exceptionType);
    }
}
