package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.exception.CarException;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.MemberFilter;
import com.carffeine.carffeine.filter.domain.MemberFilterRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.carffeine.carffeine.car.exception.CarExceptionType.NOT_FOUND_EXCEPTION;

@RequiredArgsConstructor
@Service
public class FilterService {

    private final MemberRepository memberRepository;
    private final FilterRepository filterRepository;
    private final MemberFilterRepository memberFilterRepository;
    private final CarRepository carRepository;
    private final CarFilterRepository carFilterRepository;

    @Transactional(readOnly = true)
    public List<Filter> findAllFilters() {
        return filterRepository.findAll();
    }

    @Transactional
    public List<Filter> addFilters(Long memberId, FiltersRequest filtersRequest) {
        validateRole(memberId);

        List<Filter> filters = makeFilters(filtersRequest);
        return filterRepository.saveAll(filters);
    }

    private List<Filter> makeFilters(FiltersRequest filtersRequest) {
        return filtersRequest.filters()
                .stream()
                .map(it -> Filter.of(it.name(), it.type()))
                .toList();
    }

    @Transactional
    public void deleteFilterByName(Long memberId, String filterName) {
        validateRole(memberId);
        deleteFilter(filterName);
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    private void deleteFilter(String filterName) {
        Filter filter = filterRepository.findByName(filterName)
                .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND));

        filterRepository.deleteById(filter.getId());
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

    public Car findCar(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new CarException(NOT_FOUND_EXCEPTION));
    }

    private List<Filter> makeCarFilters(FiltersRequest filtersRequest, Car car) {
        List<Filter> filters = filtersRequest.filters()
                .stream()
                .map(it -> findFilter(it.name()))
                .toList();

        List<CarFilter> carFilters = filters.stream()
                .map(it -> new CarFilter(car, it))
                .toList();

        return carFilterRepository.saveAll(carFilters)
                .stream()
                .map(CarFilter::getFilter)
                .toList();
    }

    private Filter findFilter(String filterName) {
        return filterRepository.findByName(filterName)
                .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Filter> findMemberFilters(Long memberId, Long loginMember) {
        Member member = findMember(memberId, loginMember);

        return memberFilterRepository.findAllByMember(member).stream()
                .map(MemberFilter::getFilter)
                .toList();
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

    @Transactional
    public List<MemberFilter> addMemberFilters(Long memberId, Long loginMember, FiltersRequest filtersRequest) {
        Member member = findMember(memberId, loginMember);
        memberFilterRepository.deleteAllByMember(member);
        return memberFilterRepository.saveAll(makeMemberFilters(filtersRequest, member));
    }

    private List<MemberFilter> makeMemberFilters(FiltersRequest filtersRequest, Member member) {
        List<Filter> filters = filtersRequest.filters()
                .stream()
                .map(it -> filterRepository.findByName(it.name())
                        .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND)))
                .toList();

        return filters.stream()
                .map(it -> new MemberFilter(member, it))
                .toList();
    }
}
