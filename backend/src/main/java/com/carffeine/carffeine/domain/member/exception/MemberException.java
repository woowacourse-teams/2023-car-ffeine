package com.carffeine.carffeine.domain.member.exception;

import com.carffeine.carffeine.common.exception.BaseException;
import com.carffeine.carffeine.common.exception.ExceptionType;

public class MemberException extends BaseException {

    public MemberException(ExceptionType exceptionType) {
        super(exceptionType);
    }
}
