package com.carffeine.carffeine.domain.chargestation.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class ChargeStationException extends BaseException {

    public ChargeStationException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
