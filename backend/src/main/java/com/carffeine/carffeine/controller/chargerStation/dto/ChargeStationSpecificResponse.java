package com.carffeine.carffeine.controller.chargerStation.dto;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;

import java.math.BigDecimal;
import java.util.List;

public record ChargeStationSpecificResponse(
        String stationId,
        String stationName,
        String companyName,
        String contact,
        List<ChargerSpecificResponse> chargers,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
        String stationState,
        String privateReason
) {

    public static ChargeStationSpecificResponse from(ChargeStation station) {
        return new ChargeStationSpecificResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getContact(),
                ChargerSpecificResponse.from(station),
                station.getIsParkingFree(),
                station.getOperatingTime(),
                station.getDetailLocation(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.getIsPrivate(),
                station.getStationState(),
                station.getPrivateReason()
        );
    }
}
