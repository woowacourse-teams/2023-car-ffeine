package com.carffeine.carffeine.dto;

import com.carffeine.carffeine.domain.ChargeStation;

import java.math.BigDecimal;
import java.util.List;

public record ChargeStationRequest(

        int numOfRows,
        String resultCode,
        int pageNo,
        List<ChargeStationInfoRequest> items,
        int totalCount,
        String resultMsg
) {

    public List<ChargeStation> toDomains() {
        return items.stream()
                .map(this::toDomain)
                .toList();
    }

    private ChargeStation toDomain(ChargeStationInfoRequest i) {
        return ChargeStation.builder()
                .stationId(i.statId())
                .stationName(i.statNm())
                .companyName(i.busiNm())
                .isParkingFree(isParkingFree(i.parkingFree()))
                .operatingTime(i.useTime())
                .detailLocation(i.location())
                .latitude(new BigDecimal(i.lat()))
                .longitude(new BigDecimal(i.lng()))
                .isPrivate(isParkingFree(i.limitYn()))
                .contact(i.busiCall())
                .stationState(i.stat())
                .privateReason(i.limitDetail())
                .build();
    }

    public boolean isParkingFree(String input) {
        return input.equals("Y");
    }
}
