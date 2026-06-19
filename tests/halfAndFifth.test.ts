import { halfAndFifth } from "@/lib/utils/halfAndFifth";
import { describe } from "node:test";

describe("halfAndFifth", () => { it("returns table", () => { expect(halfAndFifth(1)).toStrictEqual([1, 0, 0]) }) })