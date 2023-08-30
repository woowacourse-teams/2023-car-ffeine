package com.carffeine.carffeine.member.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.car.controller.dto.CarResponse;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.controller.dto.MemberCarInfoResponse;
import com.carffeine.carffeine.member.domain.MemberCar;
import com.carffeine.carffeine.member.domain.MemberFilter;
import com.carffeine.carffeine.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}/filters")
    public ResponseEntity<FiltersResponse> findMemberFilters(@PathVariable Long memberId,
                                                             @AuthMember Long loginMember) {
        List<Filter> memberFilters = memberService.findMemberFilters(memberId, loginMember);
        return ResponseEntity.ok(FiltersResponse.from(memberFilters));
    }

    @PostMapping("/{memberId}/filters")
    public ResponseEntity<FiltersResponse> addMemberFilters(@PathVariable Long memberId,
                                                            @AuthMember Long loginMember,
                                                            @RequestBody FiltersRequest filtersRequest) {
        List<MemberFilter> memberFilters = memberService.addMemberFilters(memberId, loginMember, filtersRequest);
        return ResponseEntity.ok(FiltersResponse.fromMemberFilters(memberFilters));
    }

    @GetMapping("/me")
    public ResponseEntity<MemberCarInfoResponse> findMemberCarInfo(@AuthMember Long loginMember) {
        MemberCar memberCar = memberService.findMemberCar(loginMember);
        return ResponseEntity.ok(MemberCarInfoResponse.from(memberCar));
    }

    @PostMapping("/{memberId}/cars")
    public ResponseEntity<CarResponse> addMemberCar(@PathVariable Long memberId,
                                                    @AuthMember Long loginMember,
                                                    @RequestBody CarRequest carRequest) {
        Car car = memberService.addMemberCar(memberId, loginMember, carRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CarResponse.from(car));
    }
}
