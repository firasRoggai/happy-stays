import { userInput } from "~/app/_components/ui/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(userInput)
    .mutation(async ({ ctx, input: { email, name, phone } }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name,
          email,
          phone,
        },
      });
    }),
  allusers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });
  }),
  AddToFavorite: protectedProcedure.mutation(async ({ ctx , listingId }) => {
    return ctx.db.user.update({
      where: {id : ctx.session.user.id},
      data : {
        favorite : {
          connect : {
            id : listingId
          }
        }
      }
    });
  }),
  display: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) return;
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
