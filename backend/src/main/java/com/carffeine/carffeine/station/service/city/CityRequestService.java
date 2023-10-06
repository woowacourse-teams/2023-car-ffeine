package com.carffeine.carffeine.station.service.city;

import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.domain.city.CityCustomRepository;
import com.carffeine.carffeine.station.service.city.dto.CityRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class CityRequestService {

    private static final String CITY_REQUEST_URL = "https://raw.githubusercontent.com/gabrielyoon7/city-generator/main/data.json";

    private final CityCustomRepository cityCustomRepository;
    private final RestTemplate restTemplate;

    @Transactional
    public void requestCity() {
        while (true) {
            try {
                if (cityCustomRepository.isExistAlready()) {
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
        restTemplate.getMessageConverters()
                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        RequestEntity<Void> requestEntity = RequestEntity
                .get(URI.create(CITY_REQUEST_URL))
                .accept(MediaType.TEXT_PLAIN)
                .build();

        String rawCitiesData = restTemplate
                .exchange(requestEntity, String.class)
                .getBody();

        List<City> cities = makeCities(rawCitiesData);
        cityCustomRepository.saveAll(cities);
    }

    private List<City> makeCities(String rawCities) {
        ObjectMapper objectMapper = new ObjectMapper();

        List<CityRequest> cityRequests;

        try {
            cityRequests = objectMapper.readValue(rawCities, new TypeReference<List<CityRequest>>() {
            });
        } catch (JsonProcessingException e) {
            log.error("객체로 변환하는 과정에서 문제가 발생했습니다.");
            throw new RuntimeException(e);
        }

        return cityRequests.stream()
                .map(CityRequest::toCity)
                .collect(Collectors.toList());
    }
}
