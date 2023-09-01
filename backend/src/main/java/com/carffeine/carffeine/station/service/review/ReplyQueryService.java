package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReplyQueryService {

    public static final int NEXT_PAGE_INDEX = 1;
    public static final int NO_MORE_PAGE = -1;
    private final ReplyQueryRepository replyQueryRepository;

    public ReplyResponses findAllReplies(Long reviewId, Pageable pageable) {
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(reviewId, pageable);
        return new ReplyResponses(allReplies.getContent(), getNextPage(pageable, allReplies));
    }

    private static int getNextPage(Pageable pageable, Page<ReplyResponse> allReplies) {
        return allReplies.hasNext() ? pageable.getPageNumber() + NEXT_PAGE_INDEX : NO_MORE_PAGE;
    }
}
