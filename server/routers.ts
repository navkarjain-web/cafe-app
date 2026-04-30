import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  getMenuItems,
  getMenuItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,

  getReservations,
  createReservation,
  updateReservationStatus,
  getReservationById,

  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "./db";

import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,

  /* AUTH */
  auth: router({
    me: publicProcedure.query(() => ({
      id: 1,
      name: "Admin",
      email: "admin@local.com",
      role: "admin",
    })),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);

      ctx.res.clearCookie(COOKIE_NAME, {
        ...cookieOptions,
        maxAge: -1,
      });

      return { success: true };
    }),
  }),

  /* MENU */
  menu: router({
    list: publicProcedure.query(() => getMenuItems()),

    byCategory: publicProcedure
      .input(z.enum(["drinks", "food", "specials"]))
      .query(({ input }) => getMenuItemsByCategory(input)),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          category: z.enum(["drinks", "food", "specials"]),
          price: z.string(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return createMenuItem({
          name: input.name,
          description: input.description,
          category: input.category,
          price: input.price as any,
          imageUrl: input.imageUrl,
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          category: z
            .enum(["drinks", "food", "specials"])
            .optional(),
          price: z.string().optional(),
          imageUrl: z.string().optional(),
          isAvailable: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const { id, ...updates } = input;

        return updateMenuItem(id, updates as any);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return deleteMenuItem(input.id);
      }),
  }),

  /* RESERVATIONS */
  reservations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return getReservations();
    }),

    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().min(1),
          partySize: z.number().min(1).max(20),
          reservationDate: z.date(),
          reservationTime: z.string(),
          specialRequests: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const reservation = await createReservation({
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            partySize: input.partySize,
            reservationDate: input.reservationDate,
            reservationTime: input.reservationTime,
            specialRequests: input.specialRequests,
            status: "pending",
          });

          /* notification fail ho toh booking fail na ho */
          try {
            await notifyOwner({
              title: "New Reservation",
              content:
                `${input.customerName} booked for ` +
                `${input.partySize} guests`,
            });
          } catch (err) {
            console.log("Notification failed");
          }

          return reservation;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Reservation failed",
          });
        }
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum([
            "pending",
            "confirmed",
            "cancelled",
          ]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return updateReservationStatus(
          input.id,
          input.status
        );
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return getReservationById(input.id);
      }),
  }),

  /* GALLERY */
  gallery: router({
    list: publicProcedure.query(() =>
      getGalleryImages()
    ),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().min(1),
          displayOrder: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return createGalleryImage({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          displayOrder: input.displayOrder || 0,
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          displayOrder: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const { id, ...updates } = input;

        return updateGalleryImage(id, updates as any);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return deleteGalleryImage(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;