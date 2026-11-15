(() => {
  const nav = [
    ["Каталог","catalog.html"],["Подбор","selector.html"],["Сравнение","compare.html"],["Журнал","journal.html"]
  ];
  const current = location.pathname.split("/").pop() || "index.html";
  const link = ([label,href]) => `<a href="./${href}" ${current===href?'aria-current="page"':''}>${label}</a>`;
  const header = `
    <a class="skip-link" href="#main">Перейти к содержанию</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="./index.html" aria-label="AETHERIUM — главная">
          <span class="brand-mark" aria-hidden="true">✦</span>
          <span><span class="brand-name">AETHERIUM</span><span class="brand-tag">Astronomy instruments</span></span>
        </a>
        <nav class="main-nav" aria-label="Основная навигация">${nav.map(link).join("")}</nav>
        <div class="header-actions">
          <a class="icon-link" href="./favorites.html" aria-label="Избранное" title="Избранное">♡</a>
          <a class="icon-link" href="./compare.html" aria-label="Сравнение" title="Сравнение">⇄</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Открыть меню">☰</button>
        </div>
      </div>
      <nav class="mobile-nav container" id="mobile-nav" aria-label="Мобильная навигация">${nav.map(link).join("")}<a href="./favorites.html">Избранное</a><a href="./about.html">О проекте</a></nav>
    </header>`;
  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div><a class="brand" href="./index.html"><span class="brand-mark" aria-hidden="true">✦</span><span><span class="brand-name">AETHERIUM</span><span class="brand-tag">Astronomy instruments</span></span></a><p class="muted" style="max-width:360px;margin-top:18px;font-size:13px">Пространство астрономической оптики, знаний и осознанного выбора.</p></div>
          <div><strong>Исследовать</strong><div class="footer-links" style="margin-top:14px"><a href="./catalog.html">Каталог</a><a href="./selector.html">Подбор телескопа</a><a href="./compare.html">Сравнение</a><a href="./journal.html">Журнал</a></div></div>
          <div><strong>Проект</strong><div class="footer-links" style="margin-top:14px"><a href="./about.html">О концепции</a><a href="./guide-optics.html">Гид по оптике</a><a href="./favorites.html">Избранное</a></div></div>
        </div>
        <div class="footer-bottom"><span>© AETHERIUM — демонстрационная концепция магазина.</span><span>Товары и характеристики в прототипе не являются коммерческими предложениями.</span></div>
      </div>
    </footer>`;
  document.querySelectorAll("[data-site-header]").forEach(el => el.innerHTML=header);
  document.querySelectorAll("[data-site-footer]").forEach(el => el.innerHTML=footer);
  document.addEventListener("click", e => {
    const btn=e.target.closest(".menu-toggle");
    if(!btn)return;
    const panel=document.getElementById("mobile-nav");
    const open=btn.getAttribute("aria-expanded")!=="true";
    btn.setAttribute("aria-expanded",String(open));
    btn.setAttribute("aria-label",open?"Закрыть меню":"Открыть меню");
    panel.classList.toggle("is-open",open);
  });
  document.querySelectorAll("[data-theme-toggle]").forEach(btn=>btn.addEventListener("click",()=>{
    const next=document.documentElement.dataset.theme==="light"?"dark":"light";
    document.documentElement.dataset.theme=next;
    try{localStorage.setItem("aetherium-theme",next)}catch(e){}
  }));
  try{const saved=localStorage.getItem("aetherium-theme");if(saved==="light"||saved==="dark")document.documentElement.dataset.theme=saved}catch(e){}
})();