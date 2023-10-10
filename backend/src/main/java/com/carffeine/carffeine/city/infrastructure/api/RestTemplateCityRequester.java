package com.carffeine.carffeine.city.infrastructure.api;

import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.city.service.CityRequester;
import com.carffeine.carffeine.city.service.dto.CityRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Component
public class RestTemplateCityRequester implements CityRequester {

    private static final String CITY_REQUEST_URL = "https://raw.githubusercontent.com/sosow0212/city/main/data.json";

    private final RestTemplate restTemplate;

    @Override
    public List<City> requestCities() {
        restTemplate.getMessageConverters()
                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        RequestEntity<Void> requestEntity = RequestEntity
                .get(URI.create(CITY_REQUEST_URL))
                .accept(MediaType.TEXT_PLAIN)
                .build();

        String rawCitiesData = restTemplate
                .exchange(requestEntity, String.class)
                .getBody();

        return makeCities(rawCitiesData);
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
                .toList();
    }
}
