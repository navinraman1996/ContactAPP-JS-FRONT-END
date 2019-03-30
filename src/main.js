import './../scss/main.scss';
import { RSA_X931_PADDING } from 'constants';
let Rx = require('rxjs');

// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addcontact = (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let contact = { 
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        number: document.getElementById('number').value
      }
    //contacts.push(contact);
    document.forms[0].reset(); // to clear the form for the next entries
    //document.querySelector('form').reset();
    //for display purposes only
    console.warn('added' , {contact} );
    // let pre = document.querySelector('#msg pre');
    // pre.textContent = '\n' + JSON.stringify(contact, '\t', 2);
    //saving to localStorage
    localStorage.setItem('MycontactList', JSON.stringify(contact) );

    fetch("http://localhost:3000/addressBook/",{
  method: "POST",
  headers:{
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
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit-btn').addEventListener('click', addcontact);
});
function populateTable(contactlist){
  for( let i=0;i<contactlist.length; i++){
  const contact = (contactlist[i]);
  const name = contact.fname + " " +contact.lname;
  const contactId = contact._id;
  addRow(table, name, contactId, i);
  }
}


let table = document.querySelector('table');
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

function fetchcontact(id){
  //console.log(id);
  // contactcard.classList.toggle("hidden");
  fetch('http://localhost:3000/addressBook/' +`${id}`, {
    method: 'GET',
    headers: {
    "Content-Type": "application/json",
    mode: 'cors'
  }, })
  .then(response => {response.json()
  console.log(JSON.stringify(response))})
  .catch(error => console.error('Error:', error))
    // console.log(typeof newContact);
//     console.log(newContact);
// })
}



  let contactlist = [];
    let req  = new Request(`http://localhost:3000/addressBook`,{
    method : 'GET',
    headers: {
           'Content-Type':'application/json'
          },
          mode: 'cors'
});
fetch(req)
.then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response =>   {
    contactlist=response;
    populateTable(contactlist);
    console.log(contactlist);
  })
  // .then(function (response) {
  //   return response.json()
  // })
  // .then(function (data) {
  //   console.log('the data', data);
  //   contactlist = data;
  //   populateTable(contactlist);
  // })
  // .catch((err)=>{
  //   console.log('Error:',err.message);
  // })

  

  
                
                  //document.getElementById('result').innerHTML = details;

// fetch('https://jsonplaceholder.typicode.com/users')
//         .then((res) => { return res.json() })
//         .then((data) => {
//             let result = `<h2> Random User Info From Jsonplaceholder API</h2>`;
//             data.forEach((user) => {
//                 const { id, name, email, address: { city, street } } = user
//                 result +=
//                     `<div>
//                      <h5> User ID: ${id} </h5>
//                          <ul class="w3-ul">
//                              <li> User Full Name : ${name}</li>
//                              <li> User Email : ${email} </li>
//                              <li> User Address : ${city}, ${street} </li>
//                          </ul>
//                       </div>`;
//                         document.getElementById('result').innerHTML = result;
//                     });
//                 })
// }