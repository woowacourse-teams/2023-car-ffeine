package com.carffeine.carffeine.station.domain.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ReplyRepository extends Repository<Reply, Long> {

    Reply save(Reply reply);

    Optional<Reply> findById(Long replyId);

    Page<Reply> findAllByReview(Review review, Pageable pageable);

    Long countByReview(Review review);
}
