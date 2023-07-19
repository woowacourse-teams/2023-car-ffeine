package com.carffeine.carffeine.service.chargerstation.dto;

public record ChargerStateRequest(
        String busiId,
        String statId,
        String chgerId,
        String stat,
        String statUpdDt,
        String lastTsdt,
        String lastTedt,
        String nowTsdt) {
}
