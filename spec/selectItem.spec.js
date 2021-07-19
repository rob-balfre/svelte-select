const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto(`http://localhost:${process.env.SERVER_PORT}`);
});

test("allows the user to select an item by clicking with a focusable ancestor", async ({
  page,
}) => {
  await page.evaluate(() => {
    const { Select, items } = window.testExports;
    const target = document.createElement("main");
    document.body.appendChild(target);

    const ancestor = document.createElement("div");
    ancestor.setAttribute("tabindex", "-1");
    target.appendChild(ancestor);

    const select = new Select({
      target: ancestor,
      props: {
        items,
      },
    });
    window.selectInstance = select;
  });

  await page.click(".selectContainer");
  await page.click(".listItem");

  const value = await page.evaluate(() => {
    return window.selectInstance.value;
  });

  expect(value).toEqual({
    value: "chocolate",
    label: "Chocolate",
  });
});
