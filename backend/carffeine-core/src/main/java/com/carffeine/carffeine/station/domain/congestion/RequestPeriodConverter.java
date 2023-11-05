package com.carffeine.carffeine.station.domain.congestion;

import javax.persistence.AttributeConverter;

public class RequestPeriodConverter implements AttributeConverter<RequestPeriod, Integer> {

    private static final int UNIT = 100;

    @Override
    public Integer convertToDatabaseColumn(RequestPeriod attribute) {
        return attribute.getSection();
    }

    @Override
    public RequestPeriod convertToEntityAttribute(Integer dbData) {
        return RequestPeriod.from(dbData / UNIT);
    }
}
