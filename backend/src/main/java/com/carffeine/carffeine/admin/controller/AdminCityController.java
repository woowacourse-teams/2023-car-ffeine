package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.CityResponse;
import com.carffeine.carffeine.admin.service.AdminCityService;
import com.carffeine.carffeine.admin.service.dto.CityCreateRequest;
import com.carffeine.carffeine.admin.service.dto.CityUpdateRequest;
import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.station.domain.city.City;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/admin/cities")
@RestController
public class AdminCityController {

    private final AdminCityService adminCityService;

    @GetMapping
    public ResponseEntity<CustomPage<CityResponse>> findAllCities(@AuthMember Long memberId, Pageable pageable) {
        Page<City> pagedCities = adminCityService.findAll(pageable, memberId);

        int totalPage = pagedCities.getTotalPages();
        List<CityResponse> cities = pagedCities.getContent()
                .stream()
                .map(CityResponse::from)
                .toList();

        return ResponseEntity.ok(new CustomPage<>(totalPage, cities));
    }

    @PostMapping
    public ResponseEntity<CityResponse> saveNewCity(@AuthMember Long memberId, @RequestBody CityCreateRequest cityCreateRequest) {
        City city = adminCityService.save(memberId, cityCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CityResponse.from(city));
    }

    @PatchMapping("/{cityId}")
    public ResponseEntity<CityResponse> updateCity(@AuthMember Long memberId,
                                                   @PathVariable Long cityId,
                                                   @RequestBody CityUpdateRequest cityUpdateRequest) {
        City updatedCity = adminCityService.update(memberId, cityId, cityUpdateRequest);
        return ResponseEntity.ok(CityResponse.from(updatedCity));
    }

    @DeleteMapping("/{cityId}")
    public ResponseEntity<Void> deleteCity(@AuthMember Long memberId, @PathVariable Long cityId) {
        adminCityService.deleteByCityId(memberId, cityId);
        return ResponseEntity.noContent().build();
    }
}
