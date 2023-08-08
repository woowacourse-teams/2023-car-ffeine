package com.carffeine.carffeine.filter.controller.dto.companyName;

import com.carffeine.carffeine.filter.controller.domain.companyName.CompanyName;

public record CompanyNameResponse(String companyName) {

    public static CompanyNameResponse from(CompanyName companyName) {
        return new CompanyNameResponse(companyName.getCompanyName());
    }
}
