package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.exception.CarException;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
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

    private Car findCar(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new CarException(NOT_FOUND_EXCEPTION));
    }
}
