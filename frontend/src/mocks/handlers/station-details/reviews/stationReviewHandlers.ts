import { generateReviewsWithReplies } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';

export const stationReviewHandlers = [
  rest.get(`${SERVERS.localhost}/stations/:stationId/total-ratings`, (req, res, ctx) => {
    const reviews = generateReviewsWithReplies();
    const validReviews = reviews.filter((review) => !review.isDeleted);
    return res(
      ctx.json({
        totalRatings: (validReviews.reduce((a, b) => a + b.ratings, 0) / reviews.length).toFixed(2),
        totalCount: validReviews.length,
      }),
      ctx.delay(1000),
      ctx.status(200)
    );
  }),

  rest.get(`${SERVERS.localhost}/stations/:stationId/reviews`, (req, res, ctx) => {
    const reviews = generateReviewsWithReplies();
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    console.log(`page=${page}`);

    if (page === 3) {
      return res(
        ctx.json({
          reviews: reviews.slice(0, 3),
          currentPage: page,
          nextPage: -1,
        }),
        ctx.delay(1000),
        ctx.status(200)
      );
    } else if (page > 3) {
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

  rest.post(`${SERVERS.localhost}/stations/:stationId/reviews`, async (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.patch(`${SERVERS.localhost}/reviews/:reviewId`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.delete(`${SERVERS.localhost}/reviews/:reviewId`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(204));
  }),

  rest.post(
    `${SERVERS.localhost}/stations/:stationId/reviews/:reviewId/replies`,
    (req, res, ctx) => {
      return res(ctx.delay(200), ctx.status(204));
    }
  ),
  rest.patch(`${SERVERS.localhost}/reviews/:reviewId/replies/:replyId`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(204));
  }),
  rest.delete(`${SERVERS.localhost}/reviews/:reviewId/replies/:replyId`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(204));
  }),
];
