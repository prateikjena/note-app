const yargs = require('yargs')
const note = require('./notes')

yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe:'Note Title',
            demandOption: true,
            type:'string'
        },
        body: {
            describe:'Note Body part starts from here...',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command:'remove',
    describe:'Remove an existing note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.removeNotes(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'List all the notes',
    handler() {
        note.listNotes()
    }
})

yargs.command({
    command:'read',
    describe:'Read a specific note',
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.readNotes(argv.title)
    }
})

yargs.parse()