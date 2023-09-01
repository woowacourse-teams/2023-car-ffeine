package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberFilter;
import com.carffeine.carffeine.member.domain.MemberFilterRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberFilterRepository memberFilterRepository;
    private final FilterRepository filterRepository;

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
