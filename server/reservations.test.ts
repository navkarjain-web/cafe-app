import { describe, it, expect } from "vitest";
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

describe("reservations", () => {
  describe("create", () => {
    it("should create a reservation with valid data", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const reservationData = {
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "+1 (555) 123-4567",
        partySize: 4,
        reservationDate: new Date("2024-06-15"),
        reservationTime: "18:30",
        specialRequests: "Window seat preferred",
      };

      const result = await caller.reservations.create(reservationData);

      expect(result).toBeDefined();
    });

    it("should validate email format", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        customerName: "John Doe",
        customerEmail: "invalid-email",
        customerPhone: "+1 (555) 123-4567",
        partySize: 4,
        reservationDate: new Date("2024-06-15"),
        reservationTime: "18:30",
      };

      await expect(caller.reservations.create(invalidData as any)).rejects.toThrow();
    });

    it("should validate party size constraints", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "+1 (555) 123-4567",
        partySize: 25, // exceeds max of 20
        reservationDate: new Date("2024-06-15"),
        reservationTime: "18:30",
      };

      await expect(caller.reservations.create(invalidData as any)).rejects.toThrow();
    });
  });

  describe("list", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext(false); // non-admin user
      const caller = appRouter.createCaller(ctx);

      await expect(caller.reservations.list()).rejects.toThrow("FORBIDDEN");
    });

    it("should allow admin to list reservations", async () => {
      const ctx = createMockContext(true); // admin user
      const caller = appRouter.createCaller(ctx);

      const result = await caller.reservations.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("updateStatus", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext(false); // non-admin user
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.reservations.updateStatus({ id: 1, status: "confirmed" })
      ).rejects.toThrow("FORBIDDEN");
    });
  });
});
