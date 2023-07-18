package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.service.chargerstation.dto.Item;

import java.util.List;

public interface ChargerStatusCustomRepository {

    void saveAll(List<Item> item);
}
