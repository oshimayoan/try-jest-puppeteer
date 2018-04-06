import React from 'react';
import puppeteer from 'puppeteer';
import App from './App';
import faker from 'faker';

describe(
  'App',
  () => {
    let page;

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3000');
    }, 16000);

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('What to do');
      expect(text).toContain('Something to do');
    });

    it(
      'should add a todo',
      async () => {
        await page.waitForSelector('[data-test="todoInput"]');
        let todo = 'Something fun to do in KodeFox tonight';
        await page.type('[data-test="todoInput"]', todo, {
          delay: 80,
        });
        await page.waitForSelector('[data-test="todoSubmit"]');
        await page.click('[data-test="todoSubmit"]', {delay: 80});
        await page.waitForSelector('[data-test="todoItem-1"]');
        let text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain(todo);
        await page.type('[data-test="todoInput"]', 'Look! We add a new todo', {
          delay: 80,
        });
        await page.click('[data-test="todoSubmit"]', {delay: 80});
      },
      20000,
    );

    it('should check a todo', async () => {
      await page.waitForSelector('[data-test="todoItem-1"]');
      await page.click('[data-test="todoItem-1"]', {delay: 80});
      await page.type('[data-test="todoInput"]', 'Look! We just check a todo', {
        delay: 80,
      });
    });
  },
  16000,
);
