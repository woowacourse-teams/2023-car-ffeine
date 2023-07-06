package com.carffeine.carffeine.dto;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.Charger;
import com.carffeine.carffeine.domain.ChargerState;
import com.carffeine.carffeine.domain.ChargerStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public record ChargeStationInfoRequest(
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

    public ChargeStation toDomain() {
        return ChargeStation.builder()
                .stationId(statId)
                .stationName(statNm)
                .companyName(busiNm)
                .isParkingFree(isYes(parkingFree))
                .operatingTime(useTime)
                .detailLocation(location)
                .latitude(new BigDecimal(lat))
                .longitude(new BigDecimal(lng))
                .isPrivate(isYes(limitYn))
                .contact(busiCall)
                .stationState(note)
                .privateReason(limitDetail)
                .chargers(toChargers())
                .build();
    }

    private List<Charger> toChargers() {
        return List.of(
                Charger.builder()
                        .stationId(statId)
                        .chargerId(chgerId)
                        .type(chgerType)
                        .chargerStatus(toChargerStatus())
                        .capacity(parseBigDecimalFromString(output))
                        .method(method)
                        .build()
        );
    }

    private ChargerStatus toChargerStatus() {
        return ChargerStatus.builder()
                .stationId(statId)
                .chargerId(chgerId)
                .latestUpdateTime(parseDateTimeFromString(lastTedt))
                .chargerState(parseChargeState(stat))
                .build();
    }

    private ChargerState parseChargeState(String stat) {
        if (stat == null || stat.isBlank()) {
            return null;
        }
        int input = Integer.parseInt(stat);
        return ChargerState.of(input);
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
