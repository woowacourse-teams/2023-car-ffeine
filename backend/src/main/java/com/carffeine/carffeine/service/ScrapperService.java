package com.carffeine.carffeine.service;

import java.net.URI;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.carffeine.carffeine.domain.ChargeStationRepository;
import com.carffeine.carffeine.dto.ChargeStationRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ScrapperService {

	private final RestTemplate restTemplate;
	private final ChargeStationRepository chargeStationRepository;

	public void scrap(){
		 URI uri = UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
			.path("/getChargerInfo")
			.queryParam("serviceKey", "a")
			.queryParam("pageNo", 1)
			.queryParam("numOfRows", 9999)
			.queryParam("dataType","JSON")
			.build()
			.toUri();
		 ChargeStationRequest result = restTemplate.getForObject(uri, ChargeStationRequest.class);



	}
}
