import { PrismaClient } from "../generated/prisma";
import {mockDeep} from "vitest-mock-extended";


export const prismaClient = mockDeep<PrismaClient>();

 