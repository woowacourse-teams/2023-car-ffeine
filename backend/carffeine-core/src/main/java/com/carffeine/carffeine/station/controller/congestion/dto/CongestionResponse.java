package com.carffeine.carffeine.station.controller.congestion.dto;

import java.util.List;

public record CongestionResponse(List<CongestionInfoResponse> standard,
                                 List<CongestionInfoResponse> quick) {
}
