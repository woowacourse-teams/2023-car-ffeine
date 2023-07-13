package com.carffeine.carffeine.service.chargerStation.dto;

public record Item(
        String busiId,
        String statId,
        String chgerId,
        String stat,
        String statUpdDt,
        String lastTsdt,
        String lastTedt,
        String nowTsdt) {
}
