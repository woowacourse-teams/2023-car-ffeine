package com.carffeine.carffeine.member.controller.dto;

import com.carffeine.carffeine.car.controller.dto.CarResponse;
import com.carffeine.carffeine.member.domain.MemberCar;

public record MemberCarInfoResponse(
        Long memberId,
        CarResponse car
) {

    public static MemberCarInfoResponse from(MemberCar memberCar) {
        return new MemberCarInfoResponse(memberCar.getMember().getId(), CarResponse.from(memberCar.getCar()));
    }
}
