import React from 'react';
import puppeteer from 'puppeteer';
import App from './App';

describe(
  'App',
  () => {
    let page;

    beforeAll(async () => {
      console.log('E2E_CI:', process.env.E2E_CI);
      console.log('CIRCLECI:', process.env.CIRCLECI);
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3000');
    }, 16000);

    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('React');
    });

    it('should type name', async () => {
      await page.waitForSelector('[data-test="name"]');
      await page.type('[data-test="name"]', 'Yoan');
    });

    it('should type email', async () => {
      await page.waitForSelector('[data-test="email"]');
      await page.type('[data-test="email"]', 'yoan@kodefox.com');
    });

    it('should type password', async () => {
      await page.waitForSelector('[data-test="password"]');
      await page.type('[data-test="password"]', '1234');
    });

    it('should click submit', async () => {
      await page.waitForSelector('[data-test="submitButton"]');
      await page.click('[data-test="submitButton"]');
      await page.waitForSelector('[data-test="submitSuccess"]');
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Submitted!');
    });
  },
  16000,
);
