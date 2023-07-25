package com.carffeine.carffeine.station.service.charger;

import com.carffeine.carffeine.station.service.charger.dto.ChargerStateUpdateRequest;

public interface ChargerStateRequester {

    ChargerStateUpdateRequest requestChargerStatusUpdate(int pageNo);
}
