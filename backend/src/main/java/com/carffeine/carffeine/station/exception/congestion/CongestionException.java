package com.carffeine.carffeine.station.exception.congestion;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class CongestionException extends BaseException {

    public CongestionException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
