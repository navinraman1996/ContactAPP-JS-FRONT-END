import './../scss/main.scss';

//let contacts = [];
// import React from 'react';
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
   'Content-Type':'application/json'
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



// const root = "https://jsonplaceholder.typicode.com/users";
// fetch(root)
//   .then(function(response){
//     response.json();
//   })
//   .then((jsonData)=>{
//     console.log(jsonData);
//   })
//   .catch((err)=>{
//     console.log('Error:',err.message);
//   });



const showcontact = (ev)=>{
    ev.preventDefault();
    let req  = new Request(`http://localhost:3000/addressBook`,{
    method : 'GET',
    headers: {
           'Content-Type':'application/json'
          },
    mode: 'cors'
});
fetch(req)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log('the data', data);
    let result = ``;
    let details = ``;
            data.forEach((user) => {
                const { _id, fname,lname, email, number} = user;
                result +=
                    `<div>
                        <button id = "dispcont"> ${fname} ${lname}</button>
                      </div>
                     `;
                details +=`
                <div id ="wrapper-ct">
                     <h5> Contact ID: ${_id} </h5>
                         <ul class="w3-ul">
                             <li> First Name : ${fname}</li>
                             <li> Last Name : ${lname}</li>
                             <li> Email : ${email} </li>
                             <li> Phone Number : ${number} </li>
                         </ul>
                    </div>
                `;
                document.getElementById("result").innerHTML = details;
                    })
                    
                }).catch((err)=>{
                    console.log('Error:',err.message);
                  });
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
                }
document.getElementById('getData').addEventListener('click', showcontact);


   var button = document.querySelector('button');

   Rx.Observable.fromEvent(button, 'click')
       .subscribe(
         (value) => console.log(value.clientX)
     );