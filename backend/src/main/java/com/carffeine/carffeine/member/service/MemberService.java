package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.capacity.CapacityRepository;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.companyName.CompanyNameRepository;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorTypeRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.member.controller.dto.CarPersonalizationRequest;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;
import com.carffeine.carffeine.member.controller.dto.MemberResponse;
import com.carffeine.carffeine.member.domain.filter.MemberCapacityFilter;
import com.carffeine.carffeine.member.domain.filter.MemberCapacityFilterRepository;
import com.carffeine.carffeine.member.domain.filter.MemberCompanyNameFilter;
import com.carffeine.carffeine.member.domain.filter.MemberCompanyNameFilterRepository;
import com.carffeine.carffeine.member.domain.filter.MemberConnectorTypeFilter;
import com.carffeine.carffeine.member.domain.filter.MemberConnectorTypeFilterRepository;
import com.carffeine.carffeine.member.domain.member.Member;
import com.carffeine.carffeine.member.domain.member.MemberRepository;
import com.carffeine.carffeine.member.domain.personalization.Personalization;
import com.carffeine.carffeine.member.domain.personalization.PersonalizationRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberCompanyNameFilterRepository memberCompanyNameFilterRepository;
    private final MemberCapacityFilterRepository memberCapacityFilterRepository;
    private final MemberConnectorTypeFilterRepository memberConnectorTypeFilterRepository;
    private final CompanyNameRepository companyNameRepository;
    private final CapacityRepository capacityRepository;
    private final ConnectorTypeRepository connectorTypeRepository;
    private final PersonalizationRepository personalizationRepository;

    @Transactional
    public Personalization uploadCarPersonalization(Long memberId, CarPersonalizationRequest request) {
        Member member = findMember(memberId);

        if (!personalizationRepository.existsByMember(member)) {
            return personalizationRepository.save(Personalization.from(member, request.name(), request.year()));
        }

        Personalization personalization = findPersonalization(member);

        return personalization.update(request.name(), request.year());
    }

    private Personalization findPersonalization(Member member) {
        return personalizationRepository.findByMember(member)
                .orElseThrow(() -> new MemberException(MemberExceptionType.PERSONALIZATION_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public MemberResponse findMemberPersonalization(Long memberId) {
        Member member = findMember(memberId);
        Personalization personalization = findPersonalization(member);

        return MemberResponse.of(memberId, personalization);
    }

    @Transactional
    public FiltersResponse addCustomFiltersByMember(Long memberId, MemberCustomFilterRequest memberCustomFilterRequest) {
        Member member = findMember(memberId);

        saveCompanyNameFilters(memberCustomFilterRequest, member);
        saveCapacityFilters(memberCustomFilterRequest, member);
        saveConnectorTypeFilters(memberCustomFilterRequest, member);

        return FiltersResponse.from(memberCustomFilterRequest);
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.MEMBER_NOT_FOUND));
    }

    private void saveCompanyNameFilters(MemberCustomFilterRequest memberCustomFilterRequest, Member member) {
        memberCompanyNameFilterRepository.deleteAllByMember(member);

        List<MemberCompanyNameFilter> addedCompanyNameFilters = memberCustomFilterRequest.companyNames()
                .stream()
                .map(it -> companyNameRepository.findByCompanyKey(it.key())
                        .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND)))
                .map(it -> MemberCompanyNameFilter.of(member, it))
                .collect(Collectors.toList());

        memberCompanyNameFilterRepository.saveAll(addedCompanyNameFilters);
    }

    private void saveCapacityFilters(MemberCustomFilterRequest memberCustomFilterRequest, Member member) {
        memberCapacityFilterRepository.deleteAllByMember(member);

        List<MemberCapacityFilter> addedCapacityFilters = memberCustomFilterRequest.capacities()
                .stream()
                .map(it -> capacityRepository.findByCapacity(it)
                        .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND)))
                .map(it -> MemberCapacityFilter.of(member, it))
                .collect(Collectors.toList());

        memberCapacityFilterRepository.saveAll(addedCapacityFilters);
    }

    private void saveConnectorTypeFilters(MemberCustomFilterRequest memberCustomFilterRequest, Member member) {
        memberConnectorTypeFilterRepository.deleteAllByMember(member);

        List<MemberConnectorTypeFilter> addedConnectorTypeFilters = memberCustomFilterRequest.connectorTypes()
                .stream()
                .map(it -> connectorTypeRepository.findByConnectorKey(it.key())
                        .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND)))
                .map(it -> MemberConnectorTypeFilter.of(member, it))
                .collect(Collectors.toList());

        memberConnectorTypeFilterRepository.saveAll(addedConnectorTypeFilters);
    }

    @Transactional(readOnly = true)
    public FiltersResponse findFilterChooseByMember(Long memberId) {
        Member member = findMember(memberId);

        List<CompanyName> companyNameFilters = getCompanyNames(member);
        List<Capacity> capacityFilters = getCapacities(member);
        List<ConnectorType> connectorTypeFilters = getConnectorTypes(member);

        return FiltersResponse.of(companyNameFilters, capacityFilters, connectorTypeFilters);
    }

    private List<ConnectorType> getConnectorTypes(Member member) {
        return memberConnectorTypeFilterRepository.findAllByMember(member)
                .stream()
                .map(MemberConnectorTypeFilter::getConnectorType)
                .collect(Collectors.toList());
    }

    private List<Capacity> getCapacities(Member member) {
        return memberCapacityFilterRepository.findAllByMember(member)
                .stream()
                .map(MemberCapacityFilter::getCapacity)
                .collect(Collectors.toList());
    }

    private List<CompanyName> getCompanyNames(Member member) {
        return memberCompanyNameFilterRepository.findAllByMember(member)
                .stream()
                .map(MemberCompanyNameFilter::getCompanyName)
                .collect(Collectors.toList());
    }
}
