package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;

public record StationSimpleResponse(
        String stationId,
        String stationName,
        String companyName,
        String address,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
//        List<ChargerSimpleResponse> chargers,
        Long fastCount,
        Long totalCount,
        Long availableCount
) {

    public static StationSimpleResponse from(Station station) {
        return new StationSimpleResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getAddress(),
                station.isParkingFree(),
                station.getOperatingTime(),
                station.getDetailLocation(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.isPrivate(),
//                ChargerSimpleResponse.from(station),
                station.getTotalCount(),
                station.getTotalCount(),
                station.getAvailableCount()
        );
    }

//    public static StationSimpleResponse createWithCharger(StationSimpleResponse origin, StationSimpleResponse other) {
//        List<ChargerSimpleResponse> list = new ArrayList<>(origin.chargers);
//        list.addAll(other.chargers);
//        return new StationSimpleResponse(
//                origin.stationId,
//                origin.stationName,
//                origin.companyName,
//                origin.address,
//                origin.isParkingFree,
//                origin.operatingTime,
//                origin.detailLocation,
//                origin.latitude,
//                origin.longitude,
//                origin.isPrivate,
//                list,
//                origin.totalCount
////                origin.availableCount
//        );
//    }
}
