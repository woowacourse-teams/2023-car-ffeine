package com.carffeine.carffeine.domain.chargestation;

import java.util.Collection;
import java.util.List;

public interface CustomChargeStationRepository {

    void saveAll(Collection<ChargeStation> chargeStations);

    void saveAllStationsBatch(List<ChargeStation> chargeStations);

    void updateAllStationsBatch(List<ChargeStation> chargeStations);
}
