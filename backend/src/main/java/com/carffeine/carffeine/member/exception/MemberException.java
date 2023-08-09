package com.carffeine.carffeine.member.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class MemberException extends BaseException {

    public MemberException(final ExceptionType exceptionType) {
        super(exceptionType);
    }
}
