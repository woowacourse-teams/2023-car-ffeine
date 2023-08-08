package com.carffeine.carffeine.admin.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class AdminException extends BaseException {

    public AdminException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
