package com.carffeine.carffeine.controller.chargerStation.dto;

import java.util.List;
import java.util.Map;

public record CongestionResponse(Map<String, List<CongestionInfoResponse>> standard,
                                 Map<String, List<CongestionInfoResponse>> quick) {
}
