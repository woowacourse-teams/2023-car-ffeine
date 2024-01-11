package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.admin.service.dto.CityCreateRequest;
import com.carffeine.carffeine.admin.service.dto.CityUpdateRequest;
import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.city.domain.CityRepository;
import com.carffeine.carffeine.city.exception.CityException;
import com.carffeine.carffeine.city.exception.CityExceptionType;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.Latitude;
import com.carffeine.carffeine.station.domain.Longitude;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AdminCityService {

    private final MemberRepository memberRepository;
    private final CityRepository cityRepository;

    @Transactional(readOnly = true)
    public Page<City> findAll(Pageable pageable, Long memberId) {
        validateRole(memberId);
        return cityRepository.findAll(pageable);
    }

    @Transactional
    public City save(Long memberId, CityCreateRequest request) {
        validateRole(memberId);

        return cityRepository.save(new City(
                request.name(),
                request.latitude(),
                request.longitude())
        );
    }

    @Transactional
    public City update(Long memberId,
                       Long cityId,
                       CityUpdateRequest cityUpdateRequest) {
        validateRole(memberId);
        City city = findCity(cityId);
        return city.update(cityUpdateRequest.name(), Latitude.from(cityUpdateRequest.latitude()), Longitude.from(cityUpdateRequest.longitude()));
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    private City findCity(Long cityId) {
        return cityRepository.findById(cityId)
                .orElseThrow(() -> new CityException(CityExceptionType.NOT_FOUND));
    }

    @Transactional
    public void deleteByCityId(Long memberId, Long cityId) {
        validateRole(memberId);
        cityRepository.deleteById(cityId);
    }
}
