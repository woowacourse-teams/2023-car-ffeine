package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.service.dto.StationRequest;

public interface StationRequester {

    StationRequest requestChargeStationRequest(int pageNo);
}
