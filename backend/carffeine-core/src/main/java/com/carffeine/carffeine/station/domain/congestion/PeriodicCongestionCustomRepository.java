package com.carffeine.carffeine.station.domain.congestion;

import java.util.List;

public interface PeriodicCongestionCustomRepository {

    void updateNotUsingCountByIds(List<String> ids);

    void updateUsingCountByIds(List<String> ids);

    void saveAllIfNotExist(List<PeriodicCongestion> periodicCongestions);
}
