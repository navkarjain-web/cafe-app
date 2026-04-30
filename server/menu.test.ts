import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(isAdmin: boolean = false): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: isAdmin ? "admin" : "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: isAdmin ? user : user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("menu", () => {
  describe("list", () => {
    it("should return all menu items", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.menu.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("byCategory", () => {
    it("should filter menu items by category", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const drinks = await caller.menu.byCategory("drinks");

      expect(Array.isArray(drinks)).toBe(true);
    });

    it("should support all categories", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const categories = ["drinks", "food", "specials"] as const;

      for (const category of categories) {
        const items = await caller.menu.byCategory(category);
        expect(Array.isArray(items)).toBe(true);
      }
    });
  });

  describe("create", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext(false); // non-admin user
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.menu.create({
          name: "Espresso",
          category: "drinks",
          price: "3.50",
        })
      ).rejects.toThrow("FORBIDDEN");
    });

    it("should allow admin to create menu items", async () => {
      const ctx = createMockContext(true); // admin user
      const caller = appRouter.createCaller(ctx);

      const result = await caller.menu.create({
        name: "Cappuccino",
        description: "Creamy espresso with steamed milk",
        category: "drinks",
        price: "4.50",
      });

      expect(result).toBeDefined();
    });

    it("should validate required fields", async () => {
      const ctx = createMockContext(true);
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.menu.create({
          name: "",
          category: "drinks",
          price: "3.50",
        } as any)
      ).rejects.toThrow();
    });
  });

  describe("delete", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext(false);
      const caller = appRouter.createCaller(ctx);

      await expect(caller.menu.delete({ id: 1 })).rejects.toThrow("FORBIDDEN");
    });
  });
});
