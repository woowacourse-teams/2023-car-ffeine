package com.carffeine.carffeine.station.exception.report;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class ReportException extends BaseException {

    public ReportException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
