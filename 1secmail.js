class TempMail {
    static async createMailbox() {
        /**
         * Retourne le mail créé.
         */
        const req = await fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox")
        if(req.headers.get("content-type") != "application/json") return this.createMailbox()
        const res = await req.json()

        return new MailBox(res[0])
    }
}

class MailBox {
    constructor(email) {
        this.email = email
        this._login = email.split("@")[0]
        this._domain = email.split("@")[1]
    }
    async getMails() {
        const req = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${this._login}&domain=${this._domain}`)
        if(req.headers.get("content-type") != "application/json") return this.getMails()
        const res = await req.json()
        return res
    }
    async fetchMessage(id) {
        const req = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${this._login}&domain=${this._domain}&id=${id}`)
        if(req.headers.get("content-type") != "application/json") return this.fetchMessage(id)
        const res = await req.json()
        return res
    }
    async waitForMessage(timeout = 60000) {
        return new Promise((resolve, reject) => {
            const checkInbox = setInterval(async() => {
                const mailBox = await this.getMails()
                if(!mailBox.length) return console.log(mailBox)
                clearInterval(checkInbox)
                clearTimeout(_timeout)
                resolve(this.fetchMessage(mailBox[0].id))
            }, 1000)
            const _timeout = setTimeout(() => {
                clearInterval(checkInbox)
                reject("Erreur: Timeout dépassé")
            }, timeout)
        })
    } 
}

module.exports = TempMail