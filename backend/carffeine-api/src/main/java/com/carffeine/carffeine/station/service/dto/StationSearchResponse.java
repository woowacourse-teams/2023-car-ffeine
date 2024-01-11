package com.carffeine.carffeine.station.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record StationSearchResponse(
        String stationId,
        String stationName,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
