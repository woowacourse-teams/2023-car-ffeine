package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateUpdateRequest;

public interface ChargerStateRequester {

    ChargerStateUpdateRequest requestChargerStatusUpdate(int pageNo);
}
