console.log("u r connects")

let noteForm = document.querySelector("#note-form")
console.log(noteForm)

1//event listener created so form is submitted
noteForm.addEventListener('submit', function(event){
    event.preventDefault()
    let noteTextInput = document.querySelector("#note-text")
    let noteText = noteTextInput.value
    noteTextInput.value = ""
    createNewNote(noteText)
    console.log(event)
})
2//fetch request to post data "in its own function"
function createNewNote (noteText) {
    return fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({note: noteText, done: false, created: moment().format()})
})
    .then(response => response.json())
    .then(data => console.log(data))
} 

3//now we are rendering the notes app using data that is already on the server 
function renderNotes() {
    fetch('http://localhost:3000/notes/', {      method: 'GET'
})
    .then(response => response.json())
    .then(function (data) {
        //here we want to add content to the DOM
        //create div
        //create p element
        let note = document.createElement("div")
        for (let thing of data) {
            let noteItem = document.createElement ("p")
            noteItem.dataset.id = thing.id 
            noteItem.innerText = thing.item
            note.appendChild(noteItem)
            let deleteIcon = document.createElement('span')
            deleteIcon.id = 'delete'
            deleteIcon.classList.add('fa', 'fa-trash', 'mar-l-xs')
            noteItem.appendChild(deleteIcon)
            note.appendChild(noteItem)
        }
        noteForm.quearySelector(note)
    })
}