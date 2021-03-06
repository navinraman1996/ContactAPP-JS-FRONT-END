import './../scss/main.scss';
import { RSA_X931_PADDING } from 'constants';
let Rx = require('rxjs');

// data entry (name n phone details and email)
const addcontact = (ev)=>{
  // ev.preventDefault();  //to stop the form submitting  
  let contact = { 
    fname: document.getElementById('fname').value,
    lname: document.getElementById('lname').value,
    email: document.getElementById('email').value,
    number: document.getElementById('number').value
  }
    
// document.forms[0].reset(); // to clear the form for the next entries
    
console.warn('added' , {contact} ); //for display purposes only
    
localStorage.setItem('MycontactList', JSON.stringify(contact) ); //saving to localStorage

// for posting the data to the database
fetch("http://localhost:3000/addressBook/",
{
  method: "POST",
  headers:
  {
   'Content-Type':'application/json',
  // mode: 'cors' 
  },
  body: JSON.stringify(contact)
  })
  .then(function(response){
  response.json();
  }).catch((err)=>{
  console.log('Error:',err.message);
  });
}

//Rx events for submit button at adding a contact
let submit = document.getElementById('submit-btn');
const submitbtn$ = Rx.fromEvent(submit, 'click');
submitbtn$.subscribe(addcontact);

// function for table(contact list)
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
  const cell = row.insertCell(0);  
  let button = document.createElement('button');
  button.classList.add('cntButton');
  button.innerHTML=name;
  
  cell.appendChild(button);
  cell.setAttribute("name", id);
  const view$ = Rx.fromEvent(button,'click');
  let id1 = button.parentElement.getAttribute('name');
  view$.subscribe(() =>{fetchcontact(id1)});
}

let showcontact = () => document.getElementById('contact').style.display = 'block';

/** Adding Rx events for add button so that a form will appear*/
let add = document.getElementById('addButton');
const add$ = Rx.fromEvent(add,'click');
add$.subscribe(showcontact);

/**function for displaying the contact details */
function displayTab(res) {
  let fname = res.contact.fname;
  let lname = res.contact.lname;
  let email = res.contact.email;
  let number = res.contact.number;

  let a = `<div>
  First Name: ${fname}<br><br>
  Last Name:  ${lname}<br><br>
  Email:      ${email}<br><br>
  Number:     ${number}<br><br>
  </div>`

  document.getElementById('contactTab').innerHTML = a
  console.log(a)
}

// funtion to fetch a specific contact
function fetchcontact(id){

  fetch('http://localhost:3000/addressBook/' +`${id}`, 
    {
      method: 'GET',
      headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {console.log(response);
  displayTab(response);});
}

//requesting the datalist
let contactlist = [];
let req  = new Request(`http://localhost:3000/addressBook`,
{
  method : 'GET',
  headers: {'Content-Type':'application/json'}
});

//fetching the datalist
fetch(req)
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response =>   {
  contactlist=response;
  populateTable(contactlist);
  console.log(contactlist);
})