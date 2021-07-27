window.onload = () => {
   firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`logged in as ${user.displayName}`)
    const uid = user.uid;
    getNotes(uid)
  } else {
    window.location = "index.html"
}
});
}

const getNotes = (uid) => {
    const notesRef = firebase.database().ref(`users/${uid}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        renderDataAsHTML(data)
    })
}

const renderDataAsHTML = (data) => {
    let cards = ``
    for (let noteID in data) {
        const note = data[noteID]
        cards += createCard(note)
    }
    document.querySelector('#app').innerHTML = cards
}

const createCard = (note) => {
    return (
        `
        <div class="column is-one quarter">
            <div class="card">
                <header class="card-header>
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
        `
    )
}