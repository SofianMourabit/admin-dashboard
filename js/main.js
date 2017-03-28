'use strict';
//
// Sidebar navigation active
//

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
dashboardWrapper.addEventListener('click', (e) =>{
  e.preventDefault();
  if (!dashboardWrapper.classList.contains('icon__item--active')){
    setActive(dashboardWrapper);
  }
});
membersWrapper.addEventListener('click', (e) =>{
  e.preventDefault();
  if (!membersWrapper.classList.contains('icon__item--active')){
    setActive(membersWrapper);
  }
});
visitsWrapper.addEventListener('click', (e) =>{
  e.preventDefault();
  if (!visitsWrapper.classList.contains('icon__item--active')){
    setActive(visitsWrapper);
  }
});
settingsWrapper.addEventListener('click', (e) =>{
  e.preventDefault();
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


const followersWrapper = document.querySelector('#js__followers');
const sharesWrapper = document.querySelector('#js__shares');
const serverWrapper = document.querySelector('#js__server');

notificationWrapper.addEventListener('click', (e)=>{
  e.preventDefault();
  let display = notificationsContent.style.display;
  if(display === 'block'){
    notificationsContent.style.display = 'none';
  }else{
    notificationsContent.style.display = 'block';
  }
});

// Notification event Listeners
followersWrapper.addEventListener('click', () =>{
  followersWrapper.style.display = 'none';
});
sharesWrapper.addEventListener('click', () =>{
  sharesWrapper.style.display = 'none';
});
serverWrapper.addEventListener('click', () =>{
  serverWrapper.style.display = 'none';
});

// Change notification icon color
let i = 1;
notificationsContent.addEventListener('click', (e)=>{
  i++;
  if (notificationCount.length <= i){
    notificationLink.style.color = "#656a6e";
    notificationsContent.style.display = 'none';
    notificationHidden.style.display = 'flex';
  }
});

//
// Ajax call to get random users for New Members and Activity panels
//

const url = 'https://randomuser.me/api/?results=8&gender=female&nat=us&inc=name,registered,email,picture';

var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'json';
xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      let json = xhr.response.results;
      let j = 0;
      for(let i = 0; i < json.length; i++) {
        let user = json[i];
        let email = user.email;
        let firstname = user.name.first;
        let lastname = user.name.last;
        let picture = user.picture.thumbnail;
        let date = user.registered;
        if(i <= 3){
          let registrationDate = moment(date).format("DD/MM/YY");
          let feedHTML = `
          <div class="feed__item">
          <div class="grid__col--2 feed__image">
          <img alt="${firstname} ${lastname} profile picture" class="img--feed" src="${picture}">
          </div>
          <div class="grid__col--10 feed__content">
          <small class="right">${registrationDate}</small>
          <strong>${firstname} ${lastname}</strong><br>
          <a href="mailto:${email}" class="">${email}</a>
          </div>
          </div>
          `;
          let feed = document.querySelector('#js__newMembers');
          feed.insertAdjacentHTML('afterbegin',feedHTML);
        }else{
          let today = new Date();
          let time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() - Math.floor((Math.random() * 24) + 1));
          let lastActivity = moment(time).fromNow();
          let activities = ["commented on FoxyJS SEO Tips", "likes the post Facebook's Changes for 2016", "commented on Facebook's Changes for 2016", "posted FoxyJS SEO Tips"];
          let feedHTML = `
          <div class="feed__item">
          <div class="grid__col--2 feed__image">
          <img alt="${firstname} ${lastname} profile picture" class="img--feed" src="${picture}">
          </div>
          <div class="feed__content grid__col--9">
          <span>${firstname} ${lastname} ${activities[j]}</span><br>
          <small class="left">${lastActivity}</small>
          </div>
          <div class="feed__more grid__col--1">
          <a href="#">
          <svg class="icon__svg">
          <use xlink:href="sprite/sprite.svg#icons--next"/>
          </svg>
          </a>
          </div>
          </div>
          `;
          let feed = document.querySelector('#js__activity');
          feed.insertAdjacentHTML('beforeend',feedHTML);
          j++;

        }
      }
      createEmailList();
    }
  }
};

xhr.send(null);


//
// Localstorage for saving settings
//

function localStorageSupport() {
  return (('localStorage' in window) && window['localStorage'] !== null)
}

if (localStorageSupport()) {
  let saveSetting = document.querySelector("#saveSetting");
  saveSetting.addEventListener('click', (e) =>{
    e.preventDefault();
    swal({
      title: "Success",
      text: "User settings succesfully updated",
      type: "success",
      confirmButtonColor: "#2a3d45",
    });
    localStorage.setItem('email', document.querySelector("#emailNotification").checked);
    localStorage.setItem('profile', document.querySelector("#publicProfile").checked);
  });

  let emailSetting = eval(localStorage.getItem('email'));
  let profileSetting = eval(localStorage.getItem('profile'));
  if(!emailSetting){
    document.querySelector("#emailNotification").checked = false;
  }else{
    document.querySelector("#emailNotification").checked = true;
  }
  if(!profileSetting){
    document.querySelector("#publicProfile").checked = false;
  }else {
    document.querySelector("#publicProfile").checked = true;
  }
}


//
// Search autocomplete
//

// Filter email list
let contentDiv = document.querySelector("#js__autocomplete");
let userName = document.querySelector("#name");
function createEmailList(){
  let emails = document.querySelectorAll('#js__newMembers a');
  for(let i = 0; i < emails.length; i++){
    let email =  emails[i].innerHTML;
    let contentItem = `<div class="autocomplete__item"><a href="#" data-val="${email}">${email}</a></div>`;
    contentDiv.insertAdjacentHTML('afterbegin', contentItem);
  }
};
userName.addEventListener('keyup', (e)=>{
  let a = document.querySelectorAll('.autocomplete__item a');
  contentDiv.style.display = 'block';
  let inputText = e.target.value;
  for(let i=0; i < a.length; i++) {
    let email = a[i].getAttribute("data-val");
    if (email.includes(inputText) && inputText){
      a[i].parentElement.style.display = "block";
    }else{
      a[i].parentElement.style.display = "none";
    }
  }
});

//Select email from list
contentDiv.addEventListener('click', (e) =>{
  e.preventDefault();
  let email = e.target.getAttribute('data-val');
  userName.value = email;
  contentDiv.style.display = 'none';
});


//
// Message user notification
//
const send = document.querySelector('#js__send');
send.addEventListener('click', (e)=>{
  let searchbox = document.querySelector('#name').value;
  let message = document.querySelector('#msg').value;
  e.preventDefault();
  if(searchbox && message){
    swal({
      title: "Success",
      text: "message succesfully sent to user",
      type: "success",
      confirmButtonColor: "#2a3d45",
    });
  }else{
    swal({
      title: "Whoops",
      text: "Please complete all form fields before submitting",
      type: "warning",
      confirmButtonColor: "#ff784f",
      confirmButtonText: "Try again",
    });
  }
});
