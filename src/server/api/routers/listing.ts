import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { approveInput, listingInput } from "~/types";

export const listingrouter = createTRPCRouter({
  all: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findMany({
        include: {
          images: true,
        },
        take: input.amount,
      });
      return listing;
    }),

  filteredListings: publicProcedure
    .input(
      z.object({
        amount: z.number().optional(),
        location: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { location } = input;

      const listing = await ctx.db.listing.findMany({
        where: {
          ...(location ? { city: location, approve: "Approved", status: "Active" } : {
            approve: "Approved", status: "Active"
          }),
        },
        include: {
          images: true,
        },
        take: input.amount,
      });
      return listing;
    }),

  getsingleListing: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findFirst({
        where: {
          id: input,
        },
        include: {
          images: true,
          createdBy: true,
        },
      });
      return listing;
    }),
  listingByUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findFirst({
        where: {
          id: input,
          createdById: ctx.session.user.id,
        },
        include: {
          images: true,
        },
      });
      return listing;
    }),
  listingByAdmin: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findFirst({
        where: {
          id: input,
        },
        include: {
          images: true,
        },
      });
      return listing;
    }),
  adminAllUserListings: protectedProcedure.query(async ({ ctx }) => {
    const userListings = await ctx.db.listing.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const NewUserListings = userListings.map((listing) => {
      return {
        id: listing.id,
        name: listing.name,
        createdAt: listing.createdAt,
        approve: listing.approve,
        Author: {
          id: listing.createdBy.id,
          email: listing.createdBy.email,
          name: listing.createdBy.name,
          image: listing.createdBy.image,
        },
      };
    });
    return NewUserListings;
  }),
  allUserListings: protectedProcedure.query(async ({ ctx }) => {
    const userListings = await ctx.db.listing.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        approve: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return userListings;
  }),

  create: protectedProcedure
    .input(listingInput)
    .mutation(
      async ({
        ctx,
        input: {
          name,
          description,
          city,
          street,
          province,
          type,
          status,
          price,
          ameneties,
        },
      }) => {
        const listing = ctx.db.listing.create({
          data: {
            name,
            description,
            street,
            province: province,
            city: city,
            type: type,
            price,
            status,
            Amenties: ameneties,
            createdBy: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
        return listing;
      },
    ),
  getnumberofListings: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const number = await ctx.db.listing.count({
        where: {
          createdById: input,
        },
      });
      return number;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.delete({
        where: {
          id: input,
        },
      });
    }),
  approve: protectedProcedure
    .input(approveInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.update({
        where: {
          id: input.id,
        },
        data: {
          approve: input.newapprove,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: listingInput,
      }),
    )
    .mutation(
      async ({
        ctx,
        input: {
          id,
          data: {
            name,
            description,
            city,
            province,
            street,
            type,
            status,
            price,
            ameneties,
          },
        },
      }) => {
        return ctx.db.listing.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            city: city,
            province: province,
            street: street,
            type: type,
            price,
            status,
            Amenties: ameneties,
          },
        });
      },
    ),

    // temp
    importListings: protectedProcedure
    .input(z.string().optional()) // Optional input for custom JSON file path
    .mutation(async ({ ctx, input }) => {
      // Default file path or use the provided input
      const filePath = input || path.join(process.cwd(), "listings.json");

      // Read and parse the JSON file
      const data = JSON.parse(readFileSync(filePath, "utf-8"));

      // Iterate over each listing in the JSON file and create it in the database
      const createdListings = await Promise.all(
        data.map(async (listing: any) => {
          return ctx.db.listing.create({
            data: {
              name: listing.name,
              description: listing.description,
              street: listing.street,
              city: listing.city,
              province: listing.province,
              type: listing.type,
              status: listing.status || "Active",
              price: listing.price || 0,
              Amenties: listing.Amenties,
              approve: listing.approve || "Pending",
              createdBy: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          });
        })
      );

      return createdListings;
    }),
});
