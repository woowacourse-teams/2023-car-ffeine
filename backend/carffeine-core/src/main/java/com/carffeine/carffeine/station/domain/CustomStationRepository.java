package com.carffeine.carffeine.station.domain;

import java.util.Collection;
import java.util.List;

public interface CustomStationRepository {

    void saveAll(Collection<Station> stations);

    void saveAllStationsBatch(List<Station> stations);

    void updateAllStationsBatch(List<Station> stations);
}
