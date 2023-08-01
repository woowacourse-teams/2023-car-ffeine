package com.carffeine.carffeine.station.service.station.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record StationSearchResponse(
        String stationId,
        String stationName,
        List<String> speed,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
