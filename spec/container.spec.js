const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto(`http://localhost:${process.env.SERVER_PORT}`);
});

test("the user can navigate through multiple form elements by using Tab", async ({
  page,
}) => {
  const inputs = await page.evaluate(() => {
    const { Select, items } = window.testExports;
    const target = document.createElement("main");
    document.body.appendChild(target);

    const input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.classList.add("input1");
    target.appendChild(input1);

    new Select({
      target,
      props: {
        items,
      },
    });

    const input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.classList.add("input2");
    target.appendChild(input2);
  });

  await page.click(".input1");

  // Pressing Tab gives the focus from input1 to the select component
  await page.keyboard.press("Tab");
  await expect(
    page.$eval(".selectContainer input", (el) => document.activeElement === el)
  ).resolves.toBe(true);

  // Pressing Tab gives the focus from the select component to input2
  await page.keyboard.press("Tab");
  await expect(
    page.$eval(".input2", (el) => document.activeElement === el)
  ).resolves.toBe(true);
});
