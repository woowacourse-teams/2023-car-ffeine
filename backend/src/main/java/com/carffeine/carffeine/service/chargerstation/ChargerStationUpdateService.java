package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.CustomChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.charger.Charger;
import com.carffeine.carffeine.domain.chargestation.charger.CustomChargerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChargerStationUpdateService {

    private final ChargeStationRepository chargeStationRepository;
    private final CustomChargeStationRepository customChargeStationRepository;
    private final CustomChargerRepository customChargerRepository;

    @Transactional
    public void updateStations(List<ChargeStation> updatedStations) {
        List<ChargeStation> chargeStations = chargeStationRepository.findAllFetch();

        Map<String, ChargeStation> savedStationsByStationId = chargeStations.stream()
                .collect(Collectors.toMap(ChargeStation::getStationId, Function.identity()));

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
                .collect(Collectors.toMap(Charger::getChargerId, Function.identity()));

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
        customChargeStationRepository.saveAllStationsBatch(toSaveStations);
    }

    private void updateAllStations(List<ChargeStation> toUpdateStations) {
        customChargeStationRepository.updateAllStationsBatch(toUpdateStations);
    }

    private void saveAllChargers(List<Charger> toSaveChargers) {
        customChargerRepository.saveAllChargersBatch(toSaveChargers);
    }

    private void updateAllChargers(List<Charger> toUpdateChargers) {
        customChargerRepository.updateAllChargersBatch(toUpdateChargers);
    }
}
