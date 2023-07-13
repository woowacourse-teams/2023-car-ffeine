package com.carffeine.carffeine.domain.chargerStation.chargeStation;

import com.carffeine.carffeine.service.chargerStation.dto.ChargeStationRequest;

public interface ChargeStationRequester {

    ChargeStationRequest requestChargeStationRequest(int pageNo);
}
