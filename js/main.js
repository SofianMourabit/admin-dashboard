//
// Sidebar navigation active
//

'use strict'
const sidebarWrapper = document.querySelectorAll('#js__sidebar li');
const dashboardWrapper = document.querySelector('#js__dashboard');
const membersWrapper = document.querySelector('#js__members');
const visitsWrapper = document.querySelector('#js__visits');
const settingsWrapper = document.querySelector('#js__settings');

// Clear previous active and set new element active
function setActive(newElement){
  for (let i = 0; i < sidebarWrapper.length; i++) {
    if(sidebarWrapper[i].classList.contains('icon__item--active')){
      sidebarWrapper[i].classList.remove('icon__item--active');
      sidebarWrapper[i].classList.add('icon__item');
    }
  }
  newElement.classList.remove('icon__item');
  newElement.classList.add('icon__item--active');
}


// Event Listeners
dashboardWrapper.addEventListener('click', () =>{
  if (!dashboardWrapper.classList.contains('icon__item--active')){
    setActive(dashboardWrapper);
  }
});
membersWrapper.addEventListener('click', () =>{
  if (!membersWrapper.classList.contains('icon__item--active')){
    setActive(membersWrapper);
  }
});
visitsWrapper.addEventListener('click', () =>{
  if (!visitsWrapper.classList.contains('icon__item--active')){
    setActive(visitsWrapper);
  }
});
settingsWrapper.addEventListener('click', () =>{
  if (!settingsWrapper.classList.contains('icon__item--active')){
    setActive(settingsWrapper);
  }
});

//
// Notification menu popup
//
const notificationLink = document.querySelector('.dropdown > a');
const notificationWrapper = document.querySelector('.dropdown svg');
const notificationCount = document.querySelectorAll('.dropdown__content li');
const notificationsContent = document.querySelector('.dropdown__content');
const notificationHidden = document.querySelector('.is-hidden');

notificationWrapper.addEventListener('click', ()=>{
  let display = notificationsContent.style.display;
  if(display === 'block'){
    notificationsContent.style.display = 'none';
  }else{
    notificationsContent.style.display = 'block';
  }
});

// Notification event Listeners
let i = 1;
notificationsContent.addEventListener('click', (e)=>{
  console.log(notificationHidden);
  let li = e.target.parentElement;
  if(!(notificationHidden === li)){
  li.style.display = 'none';
  }
  i++;
  if (notificationCount.length == i){
    notificationLink.style.color = "#656a6e";
    notificationsContent.style.display = 'none';
    notificationHidden.style.display = 'flex';

  }
})
