package com.carffeine.carffeine.domain.chargerStation.charger;

import java.util.List;

public interface CustomChargerRepository {

    void saveAll(List<Charger> chargers);
}
