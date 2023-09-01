package com.carffeine.carffeine.car.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.infrastructure.dto.CarsResponse;
import com.carffeine.carffeine.car.service.CarQueryService;
import com.carffeine.carffeine.car.service.CarService;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.service.FilterQueryService;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/cars")
@RestController
public class CarController {

    private final CarService carService;
    private final CarQueryService carQueryService;
    private final FilterQueryService filterQueryService;

    @GetMapping
    public ResponseEntity<CarsResponse> findAllCars() {
        return ResponseEntity.ok(carQueryService.findAllCars());
    }

    @PostMapping
    public ResponseEntity<CarsResponse> saveAllCars(@AuthMember Long memberId,
                                                    @RequestBody CarsRequest carsRequest) {
        List<Car> cars = carService.saveCars(memberId, carsRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CarsResponse.from(cars));
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<Void> deleteCarById(@AuthMember Long memberId,
                                              @PathVariable Long carId) {
        carService.deleteCar(memberId, carId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{carId}/filters")
    public ResponseEntity<FiltersResponse> findCarFilters(@PathVariable Long carId) {
        return ResponseEntity.ok(filterQueryService.findCarFilters(carId));
    }

    @PostMapping("/{carId}/filters")
    public ResponseEntity<FiltersResponse> addCarFilters(@AuthMember Long memberId,
                                                         @PathVariable Long carId,
                                                         @RequestBody FiltersRequest filtersRequest) {
        List<Filter> filters = carService.addCarFilters(memberId, carId, filtersRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FiltersResponse.from(filters));
    }
}
