package com.carffeine.carffeine.domain.chargerStation.exception;

import com.carffeine.carffeine.common.exception.ExceptionType;
import com.carffeine.carffeine.common.exception.Status;

public enum ChargeStationExceptionType implements ExceptionType {

    INVALID_LATITUDE(Status.INVALID, 1001, "유효하지 않는 위도입니다"),
    INVALID_LONGITUDE(Status.INVALID, 1002, "유효하지 않는 경도입니다"),
    CHARGE_STATION_NOT_FOUND(Status.NOT_FOUND, 1003, "요청하신 id의 충전소를 찾을 수 없습니다.");

    private final Status status;
    private final int exceptionCode;
    private final String message;

    ChargeStationExceptionType(Status status, int exceptionCode, String message) {
        this.status = status;
        this.exceptionCode = exceptionCode;
        this.message = message;
    }

    @Override
    public Status status() {
        return status;
    }

    @Override
    public int exceptionCode() {
        return exceptionCode;
    }

    @Override
    public String message() {
        return message;
    }
}
