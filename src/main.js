import './../scss/main.scss';
import { RSA_X931_PADDING } from 'constants';
let Rx = require('rxjs');

// data entry (name n phone details and email)
const addcontact = (ev)=>{
  ev.preventDefault();  //to stop the form submitting
  let contact = { 
    fname: document.getElementById('fname').value,
    lname: document.getElementById('lname').value,
    email: document.getElementById('email').value,
    number: document.getElementById('number').value
  }
    
document.forms[0].reset(); // to clear the form for the next entries
  
console.warn('added' , {contact} ); //for display purposes only
  
localStorage.setItem('MycontactList', JSON.stringify(contact) ); //saving to localStorage

// for posting the data to the database
fetch("http://localhost:3000/addressBook/", 
  {
    method: "POST",
    headers:
    {
    'Content-Type':'application/json',
    mode: 'cors'
    },
    body: JSON.stringify(contact)
    })
    .then(function(response){
    response.json();
    }).catch((err)=>{
    console.log('Error:',err.message);
  });
}

// adding event listeners for button
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit-btn').addEventListener('click', addcontact);
});

//funtion for table
function populateTable(contactlist){
  for( let i=0;i<contactlist.length; i++){
  const contact = (contactlist[i]);
  const name = contact.fname + " " +contact.lname;
  const contactId = contact._id;
  addRow(table, name, contactId, i);
  }
}

let table = document.querySelector('table');

// function to add row
function addRow(table, name, id, position) {
  const row = table.insertRow(position);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);  
  cell1.innerHTML=name;
  let button = document.createElement('button');
  button.classList.add('viewbutton');
  button.innerHTML="view"
  cell2.appendChild(button);
  cell2.setAttribute("name", id);
  const view$ = Rx.fromEvent(button,'click');
  let id1 = button.parentElement.getAttribute('name');
  view$.subscribe(() =>{fetchcontact(id1)});
}

// funtion to fetch a specific contact
function fetchcontact(id){
  
  fetch('http://localhost:3000/addressBook/' +`${id}`, 
    {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      mode: 'cors'
    },
  })
  .then(response => {response.json()
  console.log(JSON.stringify(response))})
  .catch(error => console.error('Error:', error))
}

//requesting the data
let contactlist = [];
let req  = new Request(`http://localhost:3000/addressBook`,
{
  method : 'GET',
  headers: {'Content-Type':'application/json',mode: 'cors'}
});

//fetching the data
fetch(req)
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response =>   {
  contactlist=response;
  populateTable(contactlist);
  console.log(contactlist);
})