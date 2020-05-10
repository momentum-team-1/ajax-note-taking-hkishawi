// import { create } from "json-server"

console.log("js is working")

let noteForm = document.querySelector("#note-form")
let notePad = document.querySelector(".notes")

renderNotes()

//1. we are adding event listener for form submission 
noteForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let noteTextInput = document.querySelector("#note-text")
    console.log("listening pending")
    let noteText = noteTextInput.value 
    noteTextInput.value = ""
    createNewNote(noteText)
    console.log("listener listening")
})

// // //2. we want to get the fetch request to post data within its own function
function createNewNote (noteText) {
    fetch('http://localhost:3000/notes/', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({note: noteText, done: false, created: moment().format()})
    })
    .then(() => renderNotes())
    console.log("request fetched")
}

// //     //response data can be used to GET data in renderNotes(). The response data can be used to append new note to list of notes. Successful POST response from this server has the newly created data. The newly created data can be used to create notes individually
// // }

// // 3. now we are rendering the notePad using data that is in the server
function renderNotes () {
    notePad.innerHTML = ""
    fetch('http://localhost:3000/notes', {
        method:'GET'
    })
    .then(response => response.json())
    .then(function (data) {
        console.log(data)
        //add content to DOM
        //create div
        //create p element for each item
    for (let note of data) {
        let noteParagraphEl = document.createElement("p")
        noteParagraphEl.textContent = note.note
        noteParagraphEl.id = note.id
        notePad.appendChild(noteParagraphEl)
        
        let createDeleteButton = document.createElement("button") 
        createDeleteButton.textContent = "delete"
        notePad.appendChild(createDeleteButton) 
        createDeleteButton.addEventListener("click", () => {
            deleteExistingNote(note.id) 
        })
        
        let createEditButton = document.createElement("button")
        createEditButton.textContent = "edit"
        createEditButton.setAttribute('id', 'button_click')
        notePad.appendChild(createEditButton)
        createEditButton.addEventListener("click", () => {
            editExistingNote(note.id)
        })
        
        createEditButton.onclick = makeAreaEditable;
        var makeAreaEditable = function () {
            var textAreaEdit = document.createElement('textarea');
            textAreaEdit.onclick = myFunction;
            textAreaEdit.customProperty = p.value;
    
            function myFunction(e) {
                var objP = e.currentTarget;
                objP.value = objP.customProperty;
                document.getElementById("button_click").value = "ok";
            }
        }
    document.getElementById('note-text').value ="";
       

        // noteObject.dataset.id = note.id
        // noteObject.innerText = object.item
    }
    })
}

function deleteExistingNote (noteId) {
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE'
    })
    .then(() => console.log("delete success"))
    .then(renderNotes)   
}

function editExistingNote (noteId) {
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH'
    })
    .then(() => console.log("edit success"))
    .then(renderNotes)


}
// function editExistingNote (noteId) {
//     fetch(`http://localhost:3000/notes/${noteId}`, {
//         method: 'PATCH'
// })
// document.getElementById("note-text").value;
//     if (document.getElementById("note-text").value) {
//         var div = document.createElement('div');
//         div.classname = "edit";

//         var pEl = document.createElement()
//     }

// }
