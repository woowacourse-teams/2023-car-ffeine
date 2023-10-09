package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.admin.service.dto.StationUpdateRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.station.StationException;
import com.carffeine.carffeine.station.exception.station.StationExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AdminStationService {

    private final StationRepository stationRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Page<Station> getStations(Pageable pageable, String query, Long memberId) {
        validateRole(memberId);
        if (query != null) {
            return stationRepository.findAllByStationNameContains(pageable, query);
        }
        return stationRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Station getStation(String stationId, Long memberId) {
        validateRole(memberId);
        return findStation(stationId);
    }

    private Station findStation(String stationId) {
        return stationRepository.findFetchByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    @Transactional
    public void updateStation(Long memberId, String stationId, StationUpdateRequest request) {
        validateRole(memberId);
        Station station = findStation(stationId);
        Station updatedStation = request.toDomain();
        station.update(updatedStation);
    }
}
