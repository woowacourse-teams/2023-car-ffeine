package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record StationInfoRequest(
        String trafficYn,
        String delDetail,
        String delYn,
        String limitDetail,
        String limitYn,
        String note,
        String parkingFree,
        String kindDetail,
        String kind,
        String zscode,
        String zcode,
        String method,
        String output,
        String powerType,
        String nowTsdt,
        String lastTedt,
        String lastTsdt,
        String statUpdDt,
        String stat,
        String busiCall,
        String busiNm,
        String bnm,
        String busiId,
        String lng,
        String lat,
        String useTime,
        String location,
        String addr,
        String chgerType,
        String chgerId,
        String statId,
        String statNm
) {

    private static final String YES = "Y";

    public Station toStation() {
        return Station.builder()
                .stationId(statId)
                .stationName(statNm)
                .companyName(busiNm)
                .address(addr)
                .isParkingFree(isYes(parkingFree))
                .operatingTime(useTime)
                .detailLocation(location)
                .latitude(Latitude.from(lat))
                .longitude(Longitude.from(lng))
                .isPrivate(isYes(limitYn))
                .contact(busiCall)
                .stationState(note)
                .privateReason(limitDetail)
                .build();
    }

    public Charger toCharger() {
        return Charger.builder()
                .stationId(statId)
                .chargerId(chgerId)
                .type(ChargerType.from(chgerType))
                .chargerStatus(toChargerStatus())
                .capacity(parseBigDecimalFromString(output))
                .method(method)
                .build();
    }

    private ChargerStatus toChargerStatus() {
        return ChargerStatus.builder()
                .stationId(statId)
                .chargerId(chgerId)
                .latestUpdateTime(parseDateTimeFromString(lastTedt))
                .chargerCondition(parseChargeState(stat))
                .build();
    }

    private ChargerCondition parseChargeState(String stat) {
        if (stat == null || stat.isBlank()) {
            return null;
        }
        int input = Integer.parseInt(stat);
        return ChargerCondition.from(input);
    }

    private boolean isYes(String input) {
        return input.equals(YES);
    }

    private LocalDateTime parseDateTimeFromString(String input) {
        if (input == null || input.length() != 14) {
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return LocalDateTime.parse(input, formatter);
    }

    private BigDecimal parseBigDecimalFromString(String input) {
        if (input == null || input.isBlank()) {
            return null;
        }

        return new BigDecimal(input);
    }
}
