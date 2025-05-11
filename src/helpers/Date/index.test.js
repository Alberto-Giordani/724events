import { render } from "@testing-library/react";
import { getMonth } from ".";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            render(getMonth(new Date("2022-01-01")))
            expect(getMonth(new Date("2022-01-01"))).toEqual("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            render(getMonth(new Date("2022-07-08")))
            expect(getMonth(new Date("2022-07-08"))).toEqual("juillet")
        });
    });
})

