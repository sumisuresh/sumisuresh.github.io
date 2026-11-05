const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');toggle.focus();}});
const search=document.querySelector('#pub-search');
if(search){
 let currentFilter='All';
 const entries=[...document.querySelectorAll('#publication-list .publication')];
 const filters=[...document.querySelectorAll('[data-filter]')];
 const applyFilters=()=>{
  const query=search.value.toLowerCase().trim();let count=0;
  entries.forEach(entry=>{const visible=(currentFilter==='All'||entry.dataset.kind===currentFilter)&&(!query||entry.dataset.search.includes(query));entry.hidden=!visible;if(visible)count++;});
  document.querySelector('#result-count').textContent=`${count} ${count===1?'publication':'publications'}`;
  document.querySelector('#no-results').hidden=count!==0;
 };
 const initial=new URLSearchParams(location.search).get('q');if(initial)search.value=initial;
 search.addEventListener('input',applyFilters);
 filters.forEach(button=>button.addEventListener('click',()=>{currentFilter=button.dataset.filter;filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});applyFilters();}));
 applyFilters();
}
