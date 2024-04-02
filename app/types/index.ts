import { Liberal } from "@prisma/client";

export type SafeLiberal = Omit<Liberal, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
