(() => {
 const root=document.querySelector("[data-product-detail]");if(!root)return;
 const id=new URLSearchParams(location.search).get("id");
 fetch("./assets/data/products.json").then(r=>r.json()).then(items=>{
  const p=items.find(x=>x.id===id);if(!p){root.textContent="Демонстрационная конфигурация не найдена. Вернитесь в каталог.";return;}
  const set=(s,v)=>{const e=root.querySelector(s);if(e)e.textContent=v};
  set("[data-name]",p.name);set("[data-category]",p.categoryLabel);set("[data-summary]",p.summary);set("[data-description]",p.description);
  set("[data-aperture]",p.apertureMm?p.apertureMm+" мм":"Не указана");set("[data-mount]",p.mountType||"Не указана");
  set("[data-id]",p.id);document.title=p.name+" — демонстрационная конфигурация | AETHERIUM";
  root.querySelector("[data-demo-note]")?.classList.remove("hidden");
  const fav=root.querySelector("[data-favorite]");if(fav){fav.dataset.favorite=p.id;const initial=(window.AetheriumStore?.read("aetherium-favorites") || []).includes(p.id);fav.setAttribute("aria-pressed",String(initial));fav.textContent=initial?"В избранном":"Добавить в избранное";fav.addEventListener("click",()=>{const a=window.AetheriumStore?.read("aetherium-favorites") || [];const on=!a.includes(p.id);const saved=window.AetheriumStore?.write("aetherium-favorites",on?[...a,p.id]:a.filter(x=>x!==p.id));if(saved){fav.setAttribute("aria-pressed",String(on));fav.textContent=on?"В избранном":"Добавить в избранное"}else{fav.textContent="Не удалось сохранить";}})}
  const cmp=root.querySelector("[data-compare]");if(cmp){cmp.dataset.compare=p.id;cmp.addEventListener("click",()=>{const a=(window.AetheriumStore?.read("aetherium-compare") || []);if(!a.includes(p.id)&&a.length>=3){cmp.textContent="Лимит — 3 модели";return}const saved=window.AetheriumStore?.write("aetherium-compare",a.includes(p.id)?a.filter(x=>x!==p.id):[...a,p.id]);if(saved)cmp.textContent=a.includes(p.id)?"Добавить к сравнению":"Добавлено к сравнению";else cmp.textContent="Не удалось сохранить"})}
 }).catch(()=>{root.textContent="Не удалось загрузить демонстрационные данные."});
})();