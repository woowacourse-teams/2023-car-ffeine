package com.carffeine.carffeine.station.service.station.dto;

import java.math.BigDecimal;

public record ClusterRequest(
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal latitudeDelta,
        BigDecimal longitudeDelta,
        int latitudeDivisionSize,
        int longitudeDivisionSize
) {
}
