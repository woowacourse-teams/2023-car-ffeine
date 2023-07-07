package com.carffeine.carffeine.domain;

import com.carffeine.carffeine.common.BaseException;
import com.carffeine.carffeine.common.ExceptionType;

public class ChargeStationException extends BaseException {

    public ChargeStationException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
