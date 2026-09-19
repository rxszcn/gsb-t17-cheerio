// 复现：多选框的读与写。写的时候值里带引号直接抛异常；选项没写 value 属性时永远选不中。
import { describe, it } from 'vitest';
import * as cheerio from '../src/index.js';

describe('多选框读写', () => {
  it('三条现状', () => {
    const html =
      '<select id="m" multiple><option value="v1">One</option><option value="v2">Two</option><option>Three</option></select>';
    const $ = cheerio.load(html);
    console.log('读值 =', JSON.stringify($('#m').val()));
    $('#m').val(['v1', 'Three']);
    console.log('设成 v1 与字面 Three 之后，被选中的 =',
      JSON.stringify($('#m option:selected').toArray().map((o: any) => o.attribs.value ?? (o.children[0] as any).data)));
    const $q = cheerio.load(html);
    try {
      $q('#m').val(['a"b']);
      console.log('带引号的值 = 未抛');
    } catch (e: any) {
      console.log('带引号的值 = 抛:', e.message.slice(0, 60));
    }
  });
});
