let uid = null

window.onload = () => {
   firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid
    console.log(`logged in as ${user.displayName}`)
    getNotes(uid)
  } else {
    window.location = "index.html"
}
});
}

const getNotes = () => {
    const notesRef = firebase.database().ref(`users/${uid}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        renderDataAsHTML(data)
    })
}

const label = document.querySelector('#label')

label.addEventListener('change', (e) => {
    const userLabel = e.target.value
    const notesRef = firebase.database().ref(`users/${uid}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        if(userLabel === "All") {
            renderDataAsHTML(data)
            return
        }
        let cards = ``
        for (let noteID in data) {
            if(data[noteID].label === userLabel) {
            const note = data[noteID]
            cards += createCard(note)
            }
        }
        document.querySelector('#app').innerHTML = cards
    })   

})

const renderDataAsHTML = (data) => {
    let cards = ``
    for (let noteID in data) {
        const note = data[noteID]
        cards += createCard(note)
    }
    document.querySelector('#app').innerHTML = cards
}

const createCard = (note) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16)
    return (
        `
        <div class="column is-one quarter">
            <div style="background-color:#${randomColor};" class="card has-text-white">
                <header class="card-header>
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                    <div class="content">${note.label}</div>
                </div>
            </div>
        </div>
        `
    )
}





