package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.station.exception.review.ReviewException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원3;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.UNAUTHORIZED_MEMBER;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ReplyTest {

    private Reply reply;

    @BeforeEach
    void setUp() {
        reply = Reply.builder()
                .id(1L)
                .review(리뷰_별4_15글자)
                .member(일반_회원)
                .content("저도 그렇게 생각합니다")
                .isDeleted(false)
                .build();
    }

    @Test
    void 답글을_수정한다() {
        // when
        reply.updateContent("저는 그렇게 생각 안하는데요");

        // then
        assertThat(reply.getContent()).isEqualTo("저는 그렇게 생각 안하는데요");
    }

    @Test
    void 답글_작성자와_편집자가_다르면_예외가_발생한다() {
        // when & then
        assertThatThrownBy(() -> reply.validate(일반_회원3))
                .isInstanceOf(ReviewException.class)
                .hasMessage(UNAUTHORIZED_MEMBER.message());
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "아닌데요"})
    void 답글_등록시_내용이_10자보다_작으면_예외가_발생한다(String content) {
        // when & then
        assertThatThrownBy(() -> Reply.builder()
                .id(2L)
                .review(리뷰_별4_15글자)
                .member(일반_회원)
                .content(content)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_CONTENT_MIN_LENGTH.message());
    }

    @Test
    void 답글_등록시_내용이_200자보다_크면_예외가_발생한다() {
        // given
        String content201 = "*".repeat(201);

        // when & then
        assertThatThrownBy(() -> Reply.builder()
                .id(2L)
                .review(리뷰_별4_15글자)
                .member(일반_회원)
                .content(content201)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_CONTENT_MAX_LENGTH.message());
    }
}
