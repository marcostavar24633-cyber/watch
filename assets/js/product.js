(() => {
 const root=document.querySelector("[data-product-detail]");if(!root)return;
 const id=new URLSearchParams(location.search).get("id");
 fetch("./assets/data/products.json").then(r=>r.json()).then(items=>{
  const p=items.find(x=>x.id===id)||items[0];
  const set=(s,v)=>{const e=root.querySelector(s);if(e)e.textContent=v};
  set("[data-name]",p.name);set("[data-category]",p.categoryLabel);set("[data-summary]",p.summary);set("[data-description]",p.description);
  set("[data-aperture]",p.apertureMm?p.apertureMm+" мм":"Не указана");set("[data-mount]",p.mountType||"Не указана");
  set("[data-id]",p.id);document.title=p.name+" — демонстрационная конфигурация | AETHERIUM";
  root.querySelector("[data-demo-note]")?.classList.remove("hidden");
  const fav=root.querySelector("[data-favorite]");if(fav){fav.dataset.favorite=p.id;fav.addEventListener("click",()=>{const a=JSON.parse(localStorage.getItem("aetherium-favorites")||"[]");localStorage.setItem("aetherium-favorites",JSON.stringify(a.includes(p.id)?a.filter(x=>x!==p.id):[...a,p.id]));fav.setAttribute("aria-pressed",String(!a.includes(p.id)));fav.textContent=a.includes(p.id)?"Добавить в избранное":"В избранном"})}
  const cmp=root.querySelector("[data-compare]");if(cmp){cmp.dataset.compare=p.id;cmp.addEventListener("click",()=>{const a=JSON.parse(localStorage.getItem("aetherium-compare")||"[]");if(!a.includes(p.id)&&a.length>=3){alert("Можно сравнить не более трёх моделей.");return}localStorage.setItem("aetherium-compare",JSON.stringify(a.includes(p.id)?a.filter(x=>x!==p.id):[...a,p.id]));cmp.textContent=a.includes(p.id)?"Добавить к сравнению":"Добавлено к сравнению"})}
 }).catch(()=>{root.textContent="Не удалось загрузить демонстрационные данные."});
})();