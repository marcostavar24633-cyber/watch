(() => {
 const root=document.querySelector("[data-list-page]");if(!root)return;
 const mode=root.dataset.listPage,grid=root.querySelector("[data-list-grid]");
 fetch("./assets/data/products.json").then(r=>r.json()).then(items=>{
  const key=mode==="favorites"?"aetherium-favorites":"aetherium-compare";
  const ids=JSON.parse(localStorage.getItem(key)||"[]");
  const selected=items.filter(p=>ids.includes(p.id));
  if(!selected.length){grid.innerHTML='<div class="empty-state">Здесь пока пусто. Откройте каталог и добавьте демонстрационные конфигурации.</div>';return}
  if(mode==="compare"){
   const table=document.createElement("table");table.className="spec-table";
   const fields=[["Модель",p=>p.name],["Тип",p=>p.categoryLabel],["Апертура",p=>p.apertureMm?p.apertureMm+" мм":"Не указана"],["Фокусное расстояние",p=>p.focalLengthMm?p.focalLengthMm+" мм":"Не указано"],["Монтировка",p=>p.mountType||"Не указана"],["Статус данных",p=>"Демонстрационные данные"]];
   fields.forEach(([label,get])=>{const tr=document.createElement("tr");const th=document.createElement("th");th.textContent=label;tr.append(th);selected.forEach(p=>{const td=document.createElement("td");td.textContent=get(p);tr.append(td)});table.append(tr)});grid.replaceChildren(table);
  }else{
   selected.forEach(p=>{const article=document.createElement("article");article.className="callout";const h=document.createElement("h3");h.textContent=p.name;const d=document.createElement("p");d.className="muted";d.textContent=p.summary;const a=document.createElement("a");a.className="btn btn-secondary btn-small";a.href="./product.html?id="+encodeURIComponent(p.id);a.textContent="Открыть";article.append(h,d,a);grid.append(article)});
  }
 }).catch(()=>grid.textContent="Не удалось загрузить список.");
})();