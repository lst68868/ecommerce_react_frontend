describe("GIVEN I am adding numbers", () => {
  test("THEN I expect 2 + 2 to equal 4", () => {
    const num1 = 2;
    const num2 = 2;
    const result = num1 + num2;
    expect(result).toBe(4);
  });
});
