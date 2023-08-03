package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.CustomChargerRepository;
import com.carffeine.carffeine.station.domain.station.CustomStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
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
    public String updateStations(List<Station> updatedStations, String lastStationId, int limit) {
        List<Station> savedStations = getStations(lastStationId, limit);

        Map<String, Station> savedStationsByStationId = savedStations.stream()
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

        customStationRepository.saveAllStationsBatch(toSaveStations);
        customStationRepository.updateAllStationsBatch(toUpdateStations);
        customChargerRepository.saveAllChargersBatch(toSaveChargers);
        customChargerRepository.updateAllChargersBatch(toUpdateChargers);
        return getLastStationId(savedStations);
    }

    private String getLastStationId(List<Station> savedStations) {
        if (savedStations.isEmpty()) {
            return null;
        }
        return savedStations.get(savedStations.size() - 1).getStationId();
    }

    private List<Station> getStations(String stationId, int limit) {
        if (stationId == null) {
            return stationRepository.findAllByOrder(Pageable.ofSize(limit));
        }
        return stationRepository.findAllByPaging(stationId, Pageable.ofSize(limit));
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
}
