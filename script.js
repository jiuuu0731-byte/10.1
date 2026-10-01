const data = window.neoContent;
// 서울 날짜 기준으로 네오의 나이를 계산합니다.
const seoulDate = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const dateValue = type => Number(seoulDate.find(part=>part.type===type).value);
let neoAge = dateValue('year') - 2023;
if(dateValue('month')<8 || (dateValue('month')===8 && dateValue('day')<31)) neoAge--;
data.profile.find(row=>row[0]==='나이')[1] = `만 ${Math.max(0,neoAge)}살 · 오늘 기준`;
function element(tag, text, className) { const node=document.createElement(tag); if(text)node.textContent=text; if(className)node.className=className; return node; }
data.profile.forEach(([label,value])=>{document.querySelector('#profile').append(element('dt',label),element('dd',value));});
data.traits.forEach((item,i)=>{const card=element('article',null,'card');card.append(element('span',`0${i+1}`,'number'),element('h3',item.title),element('p',item.text),element('small',item.label));document.querySelector('#traits').append(card);});
function renderSchedule(period='all'){const panel=document.querySelector('#schedule');panel.replaceChildren();data.schedule.filter(x=>period==='all'||x.period===period).forEach(item=>{const row=element('article',null,'schedule-row');const copy=element('div');copy.append(element('h3',item.title),element('p',item.text));row.append(element('span',item.time,'time'),copy);panel.append(row);});panel.setAttribute('aria-labelledby',`tab-${period}`);}
const tabs=[...document.querySelectorAll('[data-period]')];tabs.forEach((button,i)=>{button.addEventListener('click',()=>{tabs.forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});renderSchedule(button.dataset.period);});button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].focus();tabs[next].click();}});});renderSchedule();
data.milestones.forEach(item=>{const card=element('article');card.append(element('small',item.stage),element('h3',item.title),element('p',item.text),element('span',item.date,'date'));document.querySelector('#milestones').append(card);});
document.querySelector('#year').textContent=new Date().getFullYear();
