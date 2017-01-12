export class Connection {
    dbName = "loans"
    dbVersion = 4

    db

    open = onOpen => {
        let DBOpenRequest = window.indexedDB.open(this.dbName, this.dbVersion)

        DBOpenRequest.onerror = ev => {
            console.error("db:open", ev)
        }

        DBOpenRequest.onsuccess = ev => {
            console.log("db:open", ev)

            this.db = DBOpenRequest.result

            onOpen(this)
            this.readDataFromStore(console.log)
        }

        DBOpenRequest.onupgradeneeded = ev => {
            this.db = ev.target.result;

            this.db.onerror = ev => console.error("db:load", ev)

            this.db.createObjectStore(this.dbName, {keyPath: "id"})

            console.log("db:created", ev)

/*
            onOpen(this)
            this.readDataFromStore(console.log)
*/
        }
    }

    transaction = mode => {
        let transaction = this.db.transaction([this.dbName], mode);

        transaction.oncomplete = ev => {
            console.log("db:transaction", ev)
        }

        transaction.onerror = ev => {
            console.error("db:transaction", ev)
        }

        return transaction
    }

    listenToUpdates = onChange => {
        onChange()

        setInterval(onChange, 1000)
    }

    readDataFromStore = onSuccess => {
        const objectStore = this.transaction("readonly").objectStore(this.dbName)

        let objectStoreRequest = objectStore.getAll()

        objectStoreRequest.onsuccess = ev => {
            console.log("db:transaction", ev)

            onSuccess(ev.target.result)
        }
    }

    updateLoan = loan => {
        const objectStore = this.transaction("readwrite").objectStore(this.dbName)

        let objectStoreRequest = objectStore.put(loan.toJS())

        objectStoreRequest.onsuccess = ev => {
            console.log("db:transaction", ev)
        }
    }
}