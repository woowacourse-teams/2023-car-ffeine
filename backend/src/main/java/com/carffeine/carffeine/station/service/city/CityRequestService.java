package com.carffeine.carffeine.station.service.city;

import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.infrastructure.api.RestTemplateCityRequester;
import com.carffeine.carffeine.station.infrastructure.repository.city.CityCustomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class CityRequestService {

    private static final int MAX_TRY_COUNT = 5;

    private final RestTemplateCityRequester restTemplateCityRequester;
    private final CityCustomRepository cityCustomRepository;

    public void requestCity() {
        for (int i = 0; i < MAX_TRY_COUNT; i++) {
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

        log.error("네트워크 혹은 API 혹은 다른 문제로 지역 정보 저장에 실패하였습니다.");
    }

    private void saveCities() {
        List<City> cities = restTemplateCityRequester.requestCities();
        cityCustomRepository.saveAll(cities);
    }
}
