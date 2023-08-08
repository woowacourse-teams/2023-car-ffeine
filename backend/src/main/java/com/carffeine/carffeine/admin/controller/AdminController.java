package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.StationPageResponse;
import com.carffeine.carffeine.admin.service.AdminService;
import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stations")
    public ResponseEntity<CustomPage<StationPageResponse>> getStations(
            @AuthMember Long memberId,
            Pageable pageable,
            @RequestParam("q") String query
    ) {
        Page<Station> pagedStation = adminService.getStations(pageable, query, memberId);
        int totalPages = pagedStation.getTotalPages();
        List<StationPageResponse> elements = pagedStation.getContent().stream()
                .map(StationPageResponse::from)
                .toList();
        return ResponseEntity.ok(new CustomPage<>(totalPages, elements));
    }
}
