import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const indexRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        data: z.string(),
        listingId: z.string(),
      }),
    )
    .mutation(() => {
        
        return ""
    }),
});
