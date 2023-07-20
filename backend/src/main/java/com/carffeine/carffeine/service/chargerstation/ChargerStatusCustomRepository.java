package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatus;

import java.util.List;

public interface ChargerStatusCustomRepository {

    void saveAll(List<ChargerStatus> item);
}
