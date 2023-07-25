package com.carffeine.carffeine.station.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class StationException extends BaseException {

    public StationException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
