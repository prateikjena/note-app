const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })   
        saveNotes(notes)

        console.log(chalk.green.inverse('Note added'))
    } else {
        console.log(chalk.red.inverse('Title already exists... \n Please give a new title.'))
    }

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('database.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('database.json', dataJson)
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const newArray = notes.filter((note) => note.title !== title )

    if (notes.length !== newArray.length) {
        console.log(chalk.green.inverse('Note removed...'))
        saveNotes(newArray)
    } else {
        console.log(chalk.red.inverse('No note removed...'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes...'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const getNote = notes.find((note) => note.title === title)

    if (getNote) {

        console.log(chalk.inverse(getNote.title))
        console.log(getNote.body)

    } else {
        console.log(chalk.red.inverse('No note found...'))
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}