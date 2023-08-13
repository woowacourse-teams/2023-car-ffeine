package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.exception.CarException;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.carffeine.carffeine.car.exception.CarExceptionType.NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Service
public class CarService {

    private final MemberRepository memberRepository;
    private final CarRepository carRepository;
    private final CarFilterRepository carFilterRepository;
    private final FilterRepository filterRepository;

    @Transactional(readOnly = true)
    public List<Car> findAllCars() {
        return carRepository.findAll();
    }

    @Transactional
    public List<Car> saveCars(Long memberId, CarsRequest carsRequest) {
        validateIsMemberAdmin(memberId);
        return saveAll(carsRequest);
    }

    private void validateIsMemberAdmin(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    private List<Car> saveAll(CarsRequest carsRequest) {
        return carsRequest.cars()
                .stream()
                .filter(it -> !isAlreadyExisted(it))
                .map(it -> carRepository.save(Car.from(it.name(), it.vintage())))
                .collect(Collectors.toList());
    }

    private boolean isAlreadyExisted(CarRequest carRequest) {
        return carRepository.existsByNameAndVintage(carRequest.name(), carRequest.vintage());
    }

    @Transactional
    public void deleteCar(Long memberId, Long carId) {
        validateIsMemberAdmin(memberId);
        Car car = findCar(carId);
        carRepository.deleteById(car.getId());
    }

    @Transactional(readOnly = true)
    public List<Filter> findCarFilters(Long carId) {
        Car car = findCar(carId);
        return findAllFiltersByCar(car);
    }

    private Car findCar(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new CarException(NOT_FOUND_EXCEPTION));
    }

    private List<Filter> findAllFiltersByCar(Car car) {
        return carFilterRepository.findAllByCar(car)
                .stream()
                .map(CarFilter::getFilter)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Filter> addCarFilters(Long memberId,
                                      Long carId,
                                      FiltersRequest filtersRequest) {
        validateRole(memberId);
        Car car = findCar(carId);
        carFilterRepository.deleteAllByCar(car);
        return makeCarFilters(filtersRequest, car);
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    private List<Filter> makeCarFilters(FiltersRequest filtersRequest, Car car) {
        List<Filter> filters = filtersRequest.filters()
                .stream()
                .map(it -> filterRepository.findByName(it.name())
                        .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND)))
                .toList();

        List<CarFilter> carFilters = filters.stream()
                .map(it -> new CarFilter(car, it))
                .toList();

        return carFilterRepository.saveAll(carFilters)
                .stream()
                .map(CarFilter::getFilter)
                .toList();
    }
}
