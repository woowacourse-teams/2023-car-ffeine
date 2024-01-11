package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.CustomChargerRepository;
import com.carffeine.carffeine.station.domain.CustomStationRepository;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.StationRepository;
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
public class StationUpdateService {

    private final StationRepository stationRepository;
    private final CustomStationRepository customStationRepository;
    private final CustomChargerRepository customChargerRepository;

    @Transactional
    public void updateStations(List<Station> updatedStations) {
        List<Station> stations = stationRepository.findAllFetch();

        Map<String, Station> savedStationsByStationId = stations.stream()
                .collect(Collectors.toMap(Station::getStationId, Function.identity()));

        List<Station> toSaveStations = new ArrayList<>();
        List<Station> toUpdateStations = new ArrayList<>();
        List<Charger> toSaveChargers = new ArrayList<>();
        List<Charger> toUpdateChargers = new ArrayList<>();

        for (Station updateStation : updatedStations) {
            if (isNewStation(savedStationsByStationId, updateStation)) {
                toSaveStations.add(updateStation);
                continue;
            }

            Station savedStation = savedStationsByStationId.get(updateStation.getStationId());
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

    private boolean isNewStation(Map<String, Station> savedStationsByStationId, Station newStationFromScrap) {
        return !savedStationsByStationId.containsKey(newStationFromScrap.getStationId());
    }

    private void updateChargers(
            Station updatedStations,
            Station savedStations,
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

    private void saveAllStations(List<Station> toSaveStations) {
        customStationRepository.saveAllStationsBatch(toSaveStations);
    }

    private void updateAllStations(List<Station> toUpdateStations) {
        customStationRepository.updateAllStationsBatch(toUpdateStations);
    }

    private void saveAllChargers(List<Charger> toSaveChargers) {
        customChargerRepository.saveAllChargersBatch(toSaveChargers);
    }

    private void updateAllChargers(List<Charger> toUpdateChargers) {
        customChargerRepository.updateAllChargersBatch(toUpdateChargers);
    }
}
