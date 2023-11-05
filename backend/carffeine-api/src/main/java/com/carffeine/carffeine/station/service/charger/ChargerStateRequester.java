package com.carffeine.carffeine.station.service.charger;

public interface ChargerStateRequester {

    ChargerStateUpdateRequest requestChargerStatusUpdate(int pageNo);
}
