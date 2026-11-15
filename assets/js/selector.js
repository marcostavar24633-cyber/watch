(() => {
 const root=document.querySelector("[data-selector]");if(!root)return;
 const steps=[
  {q:"Что вы хотите наблюдать?",opts:[["moon","Луну и планеты"],["deep-sky","Туманности и галактики"],["astrophoto","Фотографировать космос"],["unsure","Пока не определился"]]},
  {q:"Какой у вас опыт?",opts:[["beginner","Я начинаю"],["some","Есть небольшой опыт"],["advanced","Опытный наблюдатель"]]},
  {q:"Где планируете наблюдать?",opts:[["city","Город / балкон"],["suburb","Дача / пригород"],["dark","Места с тёмным небом"],["mixed","В разных условиях"]]}
 ];
 let index=0,answers=[];
 const title=root.querySelector("[data-step-title]"),opts=root.querySelector("[data-step-options]"),progress=root.querySelector("[data-progress]"),next=root.querySelector("[data-next]"),back=root.querySelector("[data-back]"),result=root.querySelector("[data-result]");
 function render(){
  result.classList.add("hidden");root.querySelector("[data-step-panel]").classList.remove("hidden");
  title.textContent=steps[index].q;progress.textContent="Шаг "+(index+1)+" из "+steps.length;opts.replaceChildren();
  steps[index].opts.forEach(([v,label])=>{const b=document.createElement("button");b.type="button";b.className="step-option";b.textContent=label;b.setAttribute("aria-pressed",String(answers[index]===v));b.addEventListener("click",()=>{answers[index]=v;opts.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));next.disabled=false});opts.append(b)});
  back.disabled=index===0;next.textContent=index===steps.length-1?"Показать направление":"Далее";next.disabled=!answers[index];
 }
 function finish(){
  root.querySelector("[data-step-panel]").classList.add("hidden");result.classList.remove("hidden");
  let msg="Начните с базового сравнения рефракторов, рефлекторов и катадиоптриков. Уточните условия наблюдения и удобство использования.";
  if(answers[0]==="astrophoto")msg="Для астрофотографии важна система целиком: монтировка, камера, фокусёр, корректор и гидирование. Не выбирайте только по диаметру трубы.";
  else if(answers[0]==="deep-sky")msg="Сравнивайте апертуру, поле зрения, условия тёмного неба и удобство наведения. Большая апертура не отменяет влияния засветки и атмосферы.";
  else if(answers[0]==="moon")msg="Для Луны и планет оцените оптическую схему, устойчивость монтировки, качество фокусировки и условия наблюдения.";
  result.querySelector("[data-result-text]").textContent=msg;
 }
 next.addEventListener("click",()=>{if(!answers[index])return;if(index<steps.length-1){index++;render()}else finish()});
 back.addEventListener("click",()=>{if(index>0){index--;render()}});
 root.querySelector("[data-restart]").addEventListener("click",()=>{index=0;answers=[];render()});
 render();
})();