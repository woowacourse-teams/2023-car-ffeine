package com.carffeine.carffeine.filter.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class FilterException extends BaseException {

    public FilterException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
