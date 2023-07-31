package com.carffeine.carffeine.station.domain.charger;

import java.util.List;

public interface ChargerStatusCustomRepository {

    void saveAll(List<ChargerStatus> item);

    void updateAll(List<ChargerStatus> chargerStatuses);
}
