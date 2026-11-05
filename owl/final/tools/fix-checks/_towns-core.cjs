// what every towns version must do: the site's 29 towns, honest answers, no injected markup, the town shared with the call
module.exports = async (p, rec, sel) => {
  const ans = () => p.evaluate(s => document.querySelector(s).textContent, sel.ans);
  await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }), sel.input); await p.waitForTimeout(300);
  rec('the site’s own 29 towns are offered as suggestions', await p.evaluate(() => document.querySelectorAll('#towns datalist option').length === 29));
  await p.fill(sel.input, 'Roseville'); await p.waitForTimeout(300); const a1 = await ans();
  await p.fill(sel.input, 'st paul'); await p.waitForTimeout(300); const a2 = await ans();
  rec('a whole name or “st paul” answers yes, with the straight-line distance', /Yes, we come to Roseville\./.test(a1) && /About \d+ miles from our Shoreview base/.test(a1) && /Saint Paul/.test(a2), a1);
  await p.fill(sel.input, 'Duluth'); await p.waitForTimeout(300); const a3 = await ans();
  rec('a town not on the list gets an honest answer and the phone number', /Duluth isn’t on our list of 29 towns/.test(a3) && /\(651\) 977-6027/.test(a3));
  await p.fill(sel.input, '<img src=x onerror=alert(1)>'); await p.waitForTimeout(300);
  rec('typed text is never injected as markup', await p.evaluate(() => !document.querySelector('#towns .ans img, #towns .ans [onerror]')));
  await p.fill(sel.input, 'Shoreview'); await p.waitForTimeout(300);
  rec('Shoreview is home: the answer gives the real office address', /1000 County Rd E #230, Shoreview, MN 55126/.test(await ans()));
  await p.fill(sel.input, 'Stillwater'); await p.waitForTimeout(300);
  rec('the town is shared with the page (the call section reads it)', await p.evaluate(() => sessionStorage.getItem('owlTown') === 'Stillwater'));
};
