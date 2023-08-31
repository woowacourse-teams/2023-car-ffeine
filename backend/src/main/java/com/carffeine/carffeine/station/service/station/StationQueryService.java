package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StationQueryService {

    private final StationQueryRepository stationQueryRepository;

    @Transactional(readOnly = true)
    public StationSpecificResponse findStationById(String stationId) {
        return stationQueryRepository.findStationById(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }
}
