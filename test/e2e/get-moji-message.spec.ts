import { test, expect } from '@playwright/test';

test('get a moji message', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);

  await page.getByLabel('Enter a Message').fill('Hello World');

  await page.locator('#messageEmojiPicker').click();
  await page.type('[placeholder=Search]', '💜');
  await page.getByRole('button', { name: '💜' }).click();

  await page.locator('#backgroundEmojiPicker').click();
  await page.keyboard.type('🤍');
  await page.getByRole('button', { name: '🤍' }).click();

  await page.getByText('Convert Message').click();

  await page.locator('#copyButton').click();

  const copiedMojiMessage = await page.evaluate('navigator.clipboard.readText()');

  expect(copiedMojiMessage).toMatchSnapshot();
});
