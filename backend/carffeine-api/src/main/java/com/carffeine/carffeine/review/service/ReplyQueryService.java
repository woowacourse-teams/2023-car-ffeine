package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.review.infrastructure.ReplyQueryRepository;
import com.carffeine.carffeine.review.infrastructure.dto.ReplyResponse;
import com.carffeine.carffeine.review.infrastructure.dto.ReplyResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReplyQueryService {

    private static final int NEXT_PAGE_INDEX = 1;
    private static final int NO_MORE_PAGE = -1;

    private final ReplyQueryRepository replyQueryRepository;

    public ReplyResponses findAllReplies(Long reviewId, Pageable pageable) {
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(reviewId, pageable);
        return new ReplyResponses(allReplies.getContent(), getNextPage(pageable.getPageNumber(), allReplies));
    }

    private static int getNextPage(int pageNumber, Page<ReplyResponse> allReplies) {
        if (allReplies.hasNext()) {
            return pageNumber + NEXT_PAGE_INDEX;
        }
        return NO_MORE_PAGE;
    }
}
