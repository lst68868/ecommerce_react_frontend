import {
  getAllProducts,
  // getOneProductOrDefault,
  // createProduct,
  // updateProduct,
  // deleteProduct,
} from "../src/services/Controller.js";

describe("GIVEN I am fetching all products from MongoDB", () => {
  test("THEN I expect to see all products", async () => {
    const result = await getAllProducts();
    // console.log(result);
    expect(result.products[0].category).toBe("men's clothing");
  });
});
