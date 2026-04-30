import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const adminUser = {
  id: 1,
  name: "Admin",
  email: "admin@local.com",
  role: "admin",
};

export const protectedProcedure = t.procedure.use(async (opts) => {
  return opts.next({
    ctx: { ...opts.ctx, user: adminUser },
  });
});

export const adminProcedure = protectedProcedure;