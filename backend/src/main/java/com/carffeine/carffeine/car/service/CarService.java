package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.exception.CarException;
import com.carffeine.carffeine.car.exception.CarExceptionType;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberCar;
import com.carffeine.carffeine.member.domain.MemberCarRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CarService {

    private final MemberRepository memberRepository;
    private final CarRepository carRepository;
    private final MemberCarRepository memberCarRepository;

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
                .toList();
    }

    private boolean isAlreadyExisted(CarRequest carRequest) {
        return carRepository.existsByNameAndVintage(carRequest.name(), carRequest.vintage());
    }

    @Transactional
    public void deleteCar(Long memberId, Long carId) {
        validateIsMemberAdmin(memberId);
        carRepository.deleteById(carId);
    }

    @Transactional(readOnly = true)
    public MemberCar findMemberCar(Long loginMember) {
        Member member = memberRepository.findById(loginMember)
                .orElseThrow(() -> new MemberException(MemberExceptionType.UNAUTHORIZED));

        return getMemberCar(member);
    }

    private MemberCar getMemberCar(Member member) {
        return memberCarRepository.findByMember(member)
                .orElseGet(() -> new MemberCar(member, null));
    }

    @Transactional
    public Car addMemberCar(Long memberId,
                            Long loginMember,
                            CarRequest carRequest) {
        Member member = findMember(memberId, loginMember);
        Car car = findCar(carRequest);
        addMemberCar(member, car);
        return car;
    }

    private Member findMember(Long memberId, Long loginMember) {
        Member member = memberRepository.findById(loginMember)
                .orElseThrow(() -> new MemberException(MemberExceptionType.UNAUTHORIZED));

        validateMember(memberId, member);
        return member;
    }

    private static void validateMember(Long memberId, Member member) {
        if (!member.isSame(memberId)) {
            throw new MemberException(MemberExceptionType.INVALID_ACCESS);
        }
    }

    private Car findCar(CarRequest carRequest) {
        return carRepository.findByNameAndVintage(carRequest.name(), carRequest.vintage())
                .orElseThrow(() -> new CarException(CarExceptionType.NOT_FOUND_EXCEPTION));
    }

    private void addMemberCar(Member member, Car car) {
        memberCarRepository.deleteByMember(member);
        memberCarRepository.findByMember(member)
                .orElseGet(() -> memberCarRepository.save(new MemberCar(member, car)));
    }
}
