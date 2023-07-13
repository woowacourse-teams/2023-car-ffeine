package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChargeStationRepositoryImplTest {

    @Autowired
    private ChargeStationRepositoryImpl chargeStationRepositoryImpl;

    @Autowired
    private ChargeStationRepository chargeStationRepository;
}
