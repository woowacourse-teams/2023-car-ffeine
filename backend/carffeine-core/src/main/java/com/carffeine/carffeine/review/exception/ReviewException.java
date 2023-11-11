package com.carffeine.carffeine.review.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class ReviewException extends BaseException {

    public ReviewException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
