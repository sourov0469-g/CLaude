// Ladder interaction checks for new Service Area versions (the real 29 towns; abstract, never a map).
const TOWNS = ['Shoreview','North Oaks','Arden Hills','Vadnais Heights','Little Canada','Roseville','Mounds View','New Brighton','Lino Lakes','Blaine','White Bear Lake','Maplewood','Fridley','Saint Paul','Minneapolis','Forest Lake','Coon Rapids','Oakdale','Stillwater','Woodbury','Maple Grove','Plymouth','Minnetonka','Edina','Eden Prairie','Bloomington','Eagan','Burnsville','Apple Valley'];
module.exports = {
  '4': async (p, S, rec) => {
    rec('29 houses, one per real town, Shoreview first', await p.evaluate(([S, T]) => [...document.querySelectorAll(S + ' .nm')].map(n => n.textContent).join('|') === T.join('|'), [S, TOWNS]));
    rec('starts at home: Shoreview centred and named', await p.evaluate(S => /Shoreview/.test(document.querySelector(S + ' .read').textContent) && document.querySelector(S + ' .nm.on').textContent === 'Shoreview', S));
    await p.fill('#ar4-q', 'stillw'); await p.waitForTimeout(1200);
    rec('typing a town glides the row to it and lights its windows', await p.evaluate(S => document.querySelector(S + ' .nm.on').textContent === 'Stillwater' && document.querySelectorAll(S + ' g[data-i="18"] .win.on').length === 2 && /Stillwater/.test(document.querySelector(S + ' .read').textContent), S));
    await p.focus(S + ' .row'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900);
    rec('arrow keys move along the row', await p.evaluate(S => document.querySelector(S + ' .nm.on').textContent === 'Woodbury', S));
    await p.fill('#ar4-q', 'Duluth'); await p.waitForTimeout(200);
    rec('an unlisted town is told the truth and given the phone', await p.evaluate(S => /not on our list of 29 towns/.test(document.querySelector(S + ' .read').textContent), S));
  },
  '5': async (p, S, rec) => {
    rec('the drum holds the 29 real towns as listbox options', await p.evaluate(([S, T]) => document.querySelector(S + ' .win').getAttribute('role') === 'listbox' && [...document.querySelectorAll(S + ' [role=option]')].map(o => o.textContent).join('|') === T.join('|'), [S, TOWNS]));
    await p.waitForTimeout(1500); await p.focus(S + ' .win'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(500);
    rec('arrow keys turn the drum (active descendant follows)', await p.evaluate(S => document.querySelector(S + ' .win').getAttribute('aria-activedescendant') === 'ar5-o2' && /Arden Hills/.test(document.querySelector(S + ' .read').textContent), S));
    await p.fill('#ar5-q', 'eagan'); await p.waitForTimeout(600);
    rec('typing turns the drum to the town', await p.evaluate(S => document.querySelector(S + ' [aria-selected="true"]').textContent === 'Eagan' && document.querySelector(S + ' .cnt').textContent === '27 / 29', S));
    await p.click(S + ' .dn'); await p.waitForTimeout(500);
    rec('the 3D buttons turn it one town', await p.evaluate(S => document.querySelector(S + ' [aria-selected="true"]').textContent === 'Burnsville', S));
  }
};
