package com.carffeine.carffeine.station.domain.charger;

import java.util.List;

public interface CustomChargerRepository {

    void saveAll(List<Charger> chargers);

    void saveAllChargersBatch(List<Charger> chargers);

    void updateAllChargersBatch(List<Charger> chargers);
}
