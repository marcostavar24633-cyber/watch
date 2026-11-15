(() => {
  const grid=document.querySelector("[data-product-grid]");
  if(!grid)return;
  const search=document.querySelector("[data-search]");
  const filters=[...document.querySelectorAll("[data-filter]")];
  const sort=document.querySelector("[data-sort]");
  const count=document.querySelector("[data-count]");
  let products=[],active="all";
  const icon=`<svg viewBox="0 0 180 100" fill="none" aria-hidden="true"><path d="M35 44 119 24l11 18-84 22z" stroke="currentColor" stroke-width="2"/><path d="m119 24 17-7 13 22-19 3M52 61l-8 18m0 0h32m-32 0-7 8m47-8 10 8m-44-8 6-23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="38" cy="52" r="3" fill="currentColor"/><path d="M20 88h135" stroke="currentColor" opacity=".35"/></svg>`;
  function card(p){
    const el=document.createElement("article");el.className="product-card";
    const visual=document.createElement("div");visual.className="product-visual";visual.innerHTML=icon;
    const badge=document.createElement("span");badge.className="demo-badge";badge.textContent="Demo";visual.append(badge);
    const copy=document.createElement("div");copy.className="product-copy";
    const type=document.createElement("span");type.className="product-type";type.textContent=p.categoryLabel;
    const title=document.createElement("h3");title.textContent=p.name;
    const desc=document.createElement("p");desc.textContent=p.summary;
    const specs=document.createElement("div");specs.className="spec-row";
    [[p.apertureMm? p.apertureMm+" мм":"Апертура —"],p.mountType||"Монтировка —"].forEach(v=>{const chip=document.createElement("span");chip.className="spec-chip";chip.textContent=v;specs.append(chip)});
    const actions=document.createElement("div");actions.className="card-actions";
    const more=document.createElement("a");more.className="btn btn-secondary btn-small";more.href="./product.html?id="+encodeURIComponent(p.id);more.textContent="Подробнее";
    const fav=document.createElement("button");fav.type="button";fav.className="ghost-action";fav.setAttribute("aria-label","Добавить в избранное");fav.dataset.favorite=p.id;fav.textContent="♡";
    const cmp=document.createElement("button");cmp.type="button";cmp.className="ghost-action";cmp.setAttribute("aria-label","Добавить к сравнению");cmp.dataset.compare=p.id;cmp.textContent="⇄";
    actions.append(more,fav,cmp);copy.append(type,title,desc,specs,actions);el.append(visual,copy);return el;
  }
  function render(){
    const q=(search?.value||"").trim().toLowerCase();
    let list=products.filter(p=>(active==="all"||p.category===active)&&(!q||[p.name,p.categoryLabel,p.summary,p.description].join(" ").toLowerCase().includes(q)));
    if(sort?.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
    if(sort?.value==="aperture")list.sort((a,b)=>(b.apertureMm||0)-(a.apertureMm||0));
    grid.replaceChildren(...list.map(card));
    if(count)count.textContent="Показано: "+list.length;
    if(!list.length){const empty=document.createElement("div");empty.className="empty-state";empty.textContent="Ничего не найдено. Измените запрос или фильтр.";grid.append(empty)}
    syncStates();
  }
  function syncStates(){
    const favs=JSON.parse(localStorage.getItem("aetherium-favorites")||"[]");
    const comps=JSON.parse(localStorage.getItem("aetherium-compare")||"[]");
    grid.querySelectorAll("[data-favorite]").forEach(b=>{const on=favs.includes(b.dataset.favorite);b.setAttribute("aria-pressed",String(on));b.textContent=on?"♥":"♡"});
    grid.querySelectorAll("[data-compare]").forEach(b=>{const on=comps.includes(b.dataset.compare);b.setAttribute("aria-pressed",String(on));b.textContent=on?"✓":"⇄"});
  }
  grid.addEventListener("click",e=>{
    const fav=e.target.closest("[data-favorite]"),cmp=e.target.closest("[data-compare]");
    if(fav){const a=JSON.parse(localStorage.getItem("aetherium-favorites")||"[]");const id=fav.dataset.favorite;localStorage.setItem("aetherium-favorites",JSON.stringify(a.includes(id)?a.filter(x=>x!==id):[...a,id]));syncStates()}
    if(cmp){const a=JSON.parse(localStorage.getItem("aetherium-compare")||"[]");const id=cmp.dataset.compare;if(!a.includes(id)&&a.length>=3){alert("Для сравнения можно выбрать не более трёх демонстрационных конфигураций.");return}localStorage.setItem("aetherium-compare",JSON.stringify(a.includes(id)?a.filter(x=>x!==id):[...a,id]));syncStates()}
  });
  search?.addEventListener("input",render);sort?.addEventListener("change",render);
  filters.forEach(b=>b.addEventListener("click",()=>{active=b.dataset.filter;filters.forEach(x=>x.setAttribute("aria-pressed",String(x===b)));render()}));
  fetch("./assets/data/products.json").then(r=>{if(!r.ok)throw new Error("Не удалось загрузить каталог");return r.json()}).then(data=>{products=data;render()}).catch(()=>{grid.textContent="Каталог временно недоступен. Обновите страницу позже."});
})();