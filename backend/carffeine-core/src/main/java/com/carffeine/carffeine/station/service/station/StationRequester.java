package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.service.station.dto.StationRequest;

public interface StationRequester {

    StationRequest requestChargeStationRequest(int pageNo);
}
