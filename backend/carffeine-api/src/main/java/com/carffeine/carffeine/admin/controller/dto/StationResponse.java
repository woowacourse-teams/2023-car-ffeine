package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.Station;

import java.math.BigDecimal;
import java.util.List;

public record StationResponse(
        String stationId,
        String stationName,
        String companyName,
        String contact,
        String detailLocation,
        boolean isParkingFree,
        boolean isPrivate,
        String operationTime,
        String privateReason,
        String stationState,
        String address,
        BigDecimal latitude,
        BigDecimal longitude,
        List<ChargerResponse> chargers
) {

    public static StationResponse from(Station station) {
        return new StationResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getContact(),
                station.getDetailLocation(),
                station.isParkingFree(),
                station.isPrivate(),
                station.getOperatingTime(),
                station.getPrivateReason(),
                station.getStationState(),
                station.getAddress(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                getChargerResponses(station)
        );
    }

    private static List<ChargerResponse> getChargerResponses(Station station) {
        return station.getChargers().stream()
                .map(ChargerResponse::from)
                .toList();
    }

    public record ChargerResponse(
            String stationId,
            String chargerId,
            ChargerType type,
            BigDecimal price,
            BigDecimal capacity,
            String method
    ) {

        public static ChargerResponse from(Charger charger) {
            return new ChargerResponse(
                    charger.getStationId(),
                    charger.getChargerId(),
                    charger.getType(),
                    charger.getPrice(),
                    charger.getCapacity(),
                    charger.getMethod()
            );
        }
    }
}
