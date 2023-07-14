package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeUpdateJdbc;
import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import com.carffeine.carffeine.service.chargerStation.UpdateScrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChargerStationUpdateService {

    private final UpdateScrapper updateScrapper;
    private final ChargeStationRepository chargeStationRepository;
    private final ChargeUpdateJdbc chargeUpdateJdbc;

    @Transactional
    public void updateStations() {
        List<ChargeStation> chargeStations = chargeStationRepository.findAllFetch();
        List<ChargeStation> updatedStations = updateScrapper.updateData();

        Map<String, ChargeStation> savedStationsByStationId = chargeStations.stream()
                .collect(Collectors.toMap(ChargeStation::getStationId, it -> it));

        List<ChargeStation> toSaveStations = new ArrayList<>();
        List<ChargeStation> toUpdateStations = new ArrayList<>();
        List<Charger> toSaveChargers = new ArrayList<>();
        List<Charger> toUpdateChargers = new ArrayList<>();

        for (ChargeStation updateStation : updatedStations) {
            if (isNewStation(savedStationsByStationId, updateStation)) {
                toSaveStations.add(updateStation);
                continue;
            }

            ChargeStation savedStation = savedStationsByStationId.get(updateStation.getStationId());
            if (savedStation.isUpdated(updateStation)) {
                toUpdateStations.add(updateStation);
            }

            updateChargers(updateStation, savedStation, toSaveChargers, toUpdateChargers);
        }

        saveAllStations(toSaveStations);
        updateAllStations(toUpdateStations);

        saveAllChargers(toSaveChargers);
        updateAllChargers(toUpdateChargers);
    }

    private boolean isNewStation(Map<String, ChargeStation> savedStationsByStationId, ChargeStation newStationFromScrap) {
        return !savedStationsByStationId.containsKey(newStationFromScrap.getStationId());
    }

    private void updateChargers(
            ChargeStation updatedStations,
            ChargeStation savedStations,
            List<Charger> toSaveChargers,
            List<Charger> toUpdateChargers
    ) {
        Map<String, Charger> savedChargerByChargerId = savedStations.getChargers().stream()
                .collect(Collectors.toMap(Charger::getChargerId, it -> it));

        for (Charger updatedCharger : updatedStations.getChargers()) {
            if (isNewCharger(savedChargerByChargerId, updatedCharger)) {
                toSaveChargers.add(updatedCharger);
                continue;
            }

            Charger savedCharger = savedChargerByChargerId.get(updatedCharger.getChargerId());
            if (savedCharger.isUpdated(updatedCharger)) {
                toUpdateChargers.add(updatedCharger);
            }
        }
    }

    private boolean isNewCharger(Map<String, Charger> savedChargerByChargerId, Charger updatedCharger) {
        return !savedChargerByChargerId.containsKey(updatedCharger.getChargerId());
    }


    private void saveAllStations(List<ChargeStation> toSaveStations) {
        if (!toSaveStations.isEmpty()) {
            chargeUpdateJdbc.saveAllStationsBatch(toSaveStations);
        }
    }

    private void updateAllStations(List<ChargeStation> toUpdateStations) {
        if (!toUpdateStations.isEmpty()) {
            chargeUpdateJdbc.updateAllStationsBatch(toUpdateStations);
        }
    }

    private void saveAllChargers(List<Charger> toSaveChargers) {
        if (!toSaveChargers.isEmpty()) {
            chargeUpdateJdbc.saveAllChargersBatch(toSaveChargers);
        }
    }

    private void updateAllChargers(List<Charger> toUpdateChargers) {
        if (!toUpdateChargers.isEmpty()) {
            chargeUpdateJdbc.updateAllChargersBatch(toUpdateChargers);
        }
    }
}
