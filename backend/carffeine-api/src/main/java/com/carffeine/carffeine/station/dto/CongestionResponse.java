package com.carffeine.carffeine.station.dto;

import java.util.List;

public record CongestionResponse(List<CongestionInfoResponse> standard,
                                 List<CongestionInfoResponse> quick) {
}
