// [BANK] Q161: GreenSock's horizontalLoop helper (codepen.io/GreenSock/pen/wvZMwez), lifted whole per the entry
// ("the canonical GSAP seamless marquee: lift it whole"); also the engine of [BANK] Q361 (center + onChange).
// Two tweens per item on one timeline, durations = distance / pixelsPerSecond, the wrap tween immediateRender:false,
// xPercent snapped to integers, pre-rendered. Measure only after document.fonts.ready (the entry's first failure mode).
// Adaptations: no Draggable (not shipped; Club plugin), the gsap.context wrapper is dropped so the caller's
// matchMedia context owns every tween, and tl.destroy() removes the resize listener.
import { gsap } from 'gsap';

export function horizontalLoop(items, config = {}) {
  items = gsap.utils.toArray(items);
  const onChange = config.onChange;
  let lastIndex = 0;
  const tl = gsap.timeline({
    repeat: config.repeat, paused: config.paused, defaults: { ease: 'none' },
    onUpdate: onChange && function () { const i = tl.closestIndex(); if (lastIndex !== i) { lastIndex = i; onChange(items[i], i); } },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });
  const length = items.length, startX = items[0].offsetLeft, times = [], widths = [], spaceBefore = [], xPercents = [];
  const center = config.center, pixelsPerSecond = (config.speed || 1) * 100;
  const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);
  const container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode;
  let curIndex = 0, timeOffset = 0, totalWidth, timeWrap;
  const getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0);
  const populateWidths = () => {
    let b1 = container.getBoundingClientRect(), b2;
    items.forEach((el, i) => {
      widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i] * 100 + gsap.getProperty(el, 'xPercent'));
      b2 = el.getBoundingClientRect(); spaceBefore[i] = b2.left - (i ? b1.right : b1.left); b1 = b2;
    });
    gsap.set(items, { xPercent: i => xPercents[i] });
    totalWidth = getTotalWidth();
  };
  const populateOffsets = () => {
    timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
    center && times.forEach((t, i) => { times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset); });
  };
  const getClosest = (values, value, wrap) => {
    let i = values.length, closest = 1e10, index = 0, d;
    while (i--) { d = Math.abs(values[i] - value); if (d > wrap / 2) d = wrap - d; if (d < closest) { closest = d; index = i; } }
    return index;
  };
  const populateTimeline = () => {
    tl.clear();
    for (let i = 0; i < length; i++) {
      const item = items[i], curX = xPercents[i] / 100 * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
      const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
      tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
        .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
          { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
        .add('label' + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    timeWrap = gsap.utils.wrap(0, tl.duration());
  };
  const refresh = deep => {
    const progress = tl.progress();
    tl.progress(0, true); populateWidths(); deep && populateTimeline(); populateOffsets(); tl.progress(progress, true);
  };
  const onResize = () => refresh(true);
  gsap.set(items, { x: 0 });
  populateWidths(); populateTimeline(); populateOffsets();
  addEventListener('resize', onResize);
  function toIndex(index, vars = {}) {
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // shortest direction
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex && index !== curIndex) time += tl.duration() * (index > curIndex ? 1 : -1);
    if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap };
    curIndex = newIndex; vars.overwrite = true;
    return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
  }
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.closestIndex = setCurrent => { const index = getClosest(times, tl.time(), tl.duration()); if (setCurrent) curIndex = index; return index; };
  tl.current = () => curIndex;
  tl.next = vars => toIndex(tl.current() + 1, vars);
  tl.previous = vars => toIndex(tl.current() - 1, vars);
  tl.times = times;
  tl.refresh = refresh;
  tl.destroy = () => removeEventListener('resize', onResize);
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
  tl.closestIndex(true);
  lastIndex = curIndex;
  onChange && onChange(items[curIndex], curIndex);
  return tl;
}
