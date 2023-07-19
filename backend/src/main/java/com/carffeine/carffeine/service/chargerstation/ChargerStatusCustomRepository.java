package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateRequest;

import java.util.List;

public interface ChargerStatusCustomRepository {

    void saveAll(List<ChargerStateRequest> item);
}
