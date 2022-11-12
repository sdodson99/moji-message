import { test, expect } from '@playwright/test';

test('get a moji message', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);

  await page.getByLabel('Enter a Message').fill('Hello World');

  await page.click('#emojiPicker');
  await page.getByTitle('face with tears of joy').click();

  await page.getByText('Convert Message').click();

  await page.locator('#copyMojiMessage').click();

  const copiedMojiMessage = await page.evaluate(
    'navigator.clipboard.readText()'
  );

  expect(copiedMojiMessage).toMatchSnapshot();
});
