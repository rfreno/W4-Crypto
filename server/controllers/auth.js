const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password, users[i].pass)
        if (users[i].username === username && existing) {
          console.log('we got a match')
          console.log(users[i])
          let usrReturn = {...users[i]}
          delete usrReturn.pass
          console.log(usrReturn)
          res.status(200).send(usrReturn)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password,salt)

        let usrObj = {
          username,
          email,
          firstName,
          lastName,
          pass: passHash
        }

        users.push(usrObj)

        let objToReturn = {...usrObj}
        delete objToReturn.pass
        res.status(200).send(objToReturn)
    }
}