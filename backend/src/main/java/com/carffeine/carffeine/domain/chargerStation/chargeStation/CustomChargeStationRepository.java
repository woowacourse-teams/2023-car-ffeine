package com.carffeine.carffeine.domain.chargerStation.chargeStation;

import java.util.Collection;

public interface CustomChargeStationRepository {

    void saveAll(Collection<ChargeStation> chargeStations);
}
