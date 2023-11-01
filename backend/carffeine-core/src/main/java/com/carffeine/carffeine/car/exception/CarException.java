package com.carffeine.carffeine.car.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class CarException extends BaseException {

    public CarException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
