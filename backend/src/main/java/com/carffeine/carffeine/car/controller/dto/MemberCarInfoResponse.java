package com.carffeine.carffeine.car.controller.dto;

import com.carffeine.carffeine.car.domain.MemberCar;
import com.carffeine.carffeine.car.infrastructure.dto.CarResponse;

public record MemberCarInfoResponse(
        Long memberId,
        CarResponse car
) {

    public static MemberCarInfoResponse from(MemberCar memberCar) {
        if (memberCar.getCar() == null) {
            return new MemberCarInfoResponse(memberCar.getMember().getId(), null);
        }

        return new MemberCarInfoResponse(memberCar.getMember().getId(), CarResponse.from(memberCar.getCar()));
    }
}
