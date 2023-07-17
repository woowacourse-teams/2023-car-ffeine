package com.carffeine.carffeine.domain.chargestation;

import java.util.Collection;

public interface CustomChargeStationRepository {

    void saveAll(Collection<ChargeStation> chargeStations);
}
