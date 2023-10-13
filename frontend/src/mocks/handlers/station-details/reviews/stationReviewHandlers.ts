import { generateReplies, generateReviews } from '@mocks/data/reviews';
import { rest } from 'msw';

import { DEVELOP_SERVER_URL } from '@constants/server';

export const stationReviewHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/total-ratings`, (req, res, ctx) => {
    const reviews = generateReviews();
    const validReviews = reviews.filter((review) => !review.isDeleted);
    const min = 1;
    const max = 2000;
    return res(
      ctx.json({
        totalRatings: parseFloat(
          (validReviews.reduce((a, b) => a + b.ratings, 0) / reviews.length).toFixed(2)
        ),
        totalCount: Math.floor(Math.random() * (max - min + 1)) + min,
      }),
      ctx.delay(1000),
      ctx.status(200)
    );
  }),

  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/reviews`, (req, res, ctx) => {
    const reviews = generateReviews();
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    console.log(`충전소 후기 조회 page=${page}`);

    if (page === 5) {
      return res(
        ctx.json({
          reviews: reviews.slice(0, 3),
          currentPage: page,
          nextPage: -1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    } else if (page > 5) {
      return res(
        ctx.json({
          reviews: [],
          currentPage: page,
          nextPage: -1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    } else {
      return res(
        ctx.json({
          reviews,
          currentPage: page,
          nextPage: page + 1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    }
  }),

  rest.post(`${DEVELOP_SERVER_URL}/stations/:stationId/reviews`, async (req, res, ctx) => {
    const body = await req.json();
    console.log(`충전소 후기 작성 :${JSON.stringify(body)}`);
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.patch(`${DEVELOP_SERVER_URL}/reviews/:reviewId`, async (req, res, ctx) => {
    const body = await req.json();
    console.log(`충전소 후기 수정 :${JSON.stringify(body)}`);
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.delete(`${DEVELOP_SERVER_URL}/reviews/:reviewId`, async (req, res, ctx) => {
    console.log(`충전소 후기 삭제`);
    return res(ctx.delay(200), ctx.status(204));
  }),

  rest.get(`${DEVELOP_SERVER_URL}/reviews/:reviewId/replies`, (req, res, ctx) => {
    const replies = generateReplies();
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    console.log(`충전소 답글 조회 page=${page}`);

    if (page === 2) {
      return res(
        ctx.json({
          replies: replies.slice(0, 3),
          currentPage: page,
          nextPage: -1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    } else if (page > 2) {
      return res(
        ctx.json({
          replies: [],
          currentPage: page,
          nextPage: -1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    } else {
      return res(
        ctx.json({
          replies,
          currentPage: page,
          nextPage: page + 1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    }
  }),

  rest.post(`${DEVELOP_SERVER_URL}/reviews/:reviewId/replies`, async (req, res, ctx) => {
    const body = await req.json();
    console.log(`충전소 후기 답글 작성 :${JSON.stringify(body)}`);
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.patch(`${DEVELOP_SERVER_URL}/reviews/:reviewId/replies/:replyId`, async (req, res, ctx) => {
    const body = await req.json();
    console.log(`충전소 후기 답글 수정 :${JSON.stringify(body)}`);
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.delete(`${DEVELOP_SERVER_URL}/reviews/:reviewId/replies/:replyId`, (req, res, ctx) => {
    console.log(`충전소 후기 답글 삭제`);
    return res(ctx.delay(200), ctx.status(204));
  }),
];
