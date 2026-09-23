/* Maricarna — vanilla JavaScript. No libraries or build step required. */
'use strict';

// Opening and scroll animations. Content stays visible if JavaScript is disabled.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element, index) => { element.classList.toggle('from-right', index % 2 === 1); observer.observe(element); });
}
window.setTimeout(() => document.querySelector('.site')?.classList.add('ready'), reducedMotion ? 0 : 1200);

// How-to tabs: mouse, touch, and keyboard.
const steps = [
  ['水を用意する', 'いつもの水道水やミネラルウォーターをグラスに。'],
  ['本体を入れる', 'マリカルナを水に入れます。使用方法は製品の説明書をご確認ください。'],
  ['ボタンを押す', 'スイッチをひと押し。シンプルな操作で生成が始まります。'],
  ['約30秒で完成', 'できたての水素水を、毎日のひと息に。']
];
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.getElementById('step-panel');
let currentStep = 0;
function showStep(index, focus = false) {
  currentStep = (index + steps.length) % steps.length;
  tabs.forEach((tab, i) => {
    const active = i === currentStep;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tabs[currentStep].id);
  panel.querySelector('.giant-number').textContent = `0${currentStep + 1}`;
  panel.querySelector('h3').textContent = steps[currentStep][0];
  panel.querySelector('p').textContent = steps[currentStep][1];
  if (!reducedMotion && panel.animate) panel.animate([{opacity:0, transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}], {duration:350});
  if (focus) tabs[currentStep].focus();
}
if (panel) {
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showStep(index));
  tab.addEventListener('keydown', event => {
    const keys = {ArrowRight:currentStep+1, ArrowLeft:currentStep-1, Home:0, End:steps.length-1};
    if (Object.hasOwn(keys,event.key)) { event.preventDefault(); showStep(keys[event.key],true); }
  });
});
panel.querySelector('.text-button').addEventListener('click', () => showStep(currentStep + 1));
}


// External destinations: one configuration file for staging and production.
const settings = window.MARICARNA_CONFIG || {};
if (settings.previewMode === false) document.querySelectorAll('[data-preview]').forEach(el => el.hidden = true);
function approvedUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
document.querySelectorAll('[data-destination]').forEach(link => {
  const key = link.dataset.destination;
  const url = approvedUrl(key === 'googleForm' ? settings.googleFormUrl : settings.squareUrl);
  const ready = url && (key !== 'square' || settings.salesInformationReady === true);
  const status = document.getElementById(link.getAttribute('aria-describedby'));
  if (ready) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('role');
    if (status) status.textContent = key === 'googleForm' ? 'Googleフォームが新しいタブで開きます。' : 'Squareの申込ページが新しいタブで開きます。';
  } else {
    const explain = event => {
      event.preventDefault();
      if (status) status.textContent = key === 'googleForm' ? 'お問い合わせフォームは準備中です。公開までお待ちください。' : '申込受付は準備中です。公開までお待ちください。';
    };
    link.addEventListener('click', explain);
    link.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') explain(event); });
  }
});
