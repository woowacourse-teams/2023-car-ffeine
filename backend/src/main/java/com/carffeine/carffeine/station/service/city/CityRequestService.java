package com.carffeine.carffeine.station.service.city;

import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.domain.city.CityCustomRepository;
import com.carffeine.carffeine.station.infrastructure.api.RestTemplateCityRequester;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class CityRequestService {

    private final RestTemplateCityRequester restTemplateCityRequester;
    private final CityCustomRepository cityCustomRepository;

    public void requestCity() {
        while (true) {
            try {
                if (cityCustomRepository.isExist()) {
                    log.info("지역 정보가 이미 존재합니다");
                    return;
                }
                saveCities();
                log.info("지역 정보 저장 완료");
                return;
            } catch (Exception e) {
                log.error("지역 정보 저장 실패");
            }
        }
    }

    private void saveCities() {
        List<City> cities = restTemplateCityRequester.requestCities();
        cityCustomRepository.saveAll(cities);
    }
}
