const express = require('express')
const app = express()
const mariadb = require('mariadb')
const cors = require('cors')
const port = 4000


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())


const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bug_tracking',
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email) return
    if (!password) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        const rows = await cnx.query(`SELECT id,email,type,project_team from users WHERE email=? and password=?`, [email, password])
        return res.status(200).json({ user: rows })
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/register', async (req, res) => {
    let { email, password, type, pTeam } = req.body

    if (!email) return
    if (!password) return
    if (!type) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        let rows = await cnx.query(`SELECT * FROM users WHERE email=?`, [email])
        if (rows.length) return res.status(200).json({ exist: true })
        await cnx.query(`INSERT INTO users (email, password,type,project_team) VALUES (?,?,?,?)`, [email, password, type, pTeam])
        rows = await cnx.query(`SELECT id,email,type,project_team FROM users WHERE email=?`, [email])
        return res.status(200).json({ user: rows })
    }
    catch (err) {
        console.log(err)
    }
})


app.get('/projects', async (req, res) => {
    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        const rows = await cnx.query(`SELECT * FROM projects`)
        return res.status(200).json(rows)
    }
    catch (err) {
        console.log(err)
    }

})

app.post('/addproject', async (req, res) => {
    const { desc, repo, pTeam, id } = req.body

    if (!desc) return
    if (!repo) return
    if (!pTeam) return
    if (!id) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        const rows = await cnx.query(`INSERT INTO projects (pmId,description,repository,project_team) VALUES (?,?,?,?)`, [id, desc, repo, pTeam])
        return res.status(200).json(rows)
    }
    catch (err) {
        console.log(err)
    }

})

app.post('/addbug', async (req, res) => {
    const { severity, desc, cLink, projectId } = req.body

    if (!severity) return
    if (!desc) return
    if (!cLink) return
    if (!projectId) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        const rows = cnx.query(`INSERT INTO bugs (severity,description,commit_link,projectId) VALUES (?,?,?,?)`, [severity, desc, cLink, projectId])
        return res.status(200).json({ rows })
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/getbugs', async (req, res) => {
    const { project_team } = req.body

    if (!project_team) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        const rows = await cnx.query('SELECT bugs.* FROM bugs INNER JOIN projects ON project_team = ? WHERE bugs.projectId = projects.id', [project_team])
        return res.status(200).json({ rows })
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/selfalocate', async (req, res) => {
    const { id, bugId, project_team, action } = req.body
    if (!id) return
    if (!bugId) return
    if (!project_team) return
    if (!action) return
    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        let rows
        if (action === 'add')
            rows = await cnx.query('UPDATE bugs SET pmId = ? WHERE id = ?', [id, bugId])
        else
            rows = await cnx.query('UPDATE bugs SET pmId = NULL WHERE id = ?', [bugId])
        rows = await cnx.query('SELECT bugs.* FROM bugs INNER JOIN projects ON project_team = ? WHERE bugs.projectId = projects.id', [project_team])
        return res.status(200).json({ rows })
    }
    catch (err) {
        console.log(err)
    }
})


app.post('/addstatus', async (req, res) => {
    const { bugId, status, project_team, commitLink } = req.body

    if (!status) return
    if (!project_team) return
    if (!commitLink) return

    try {
        const cnx = await pool.getConnection()
        await cnx.release()
        let rows = await cnx.query('UPDATE bugs SET status = ? , commit_link = ? WHERE id = ?', [status, commitLink, bugId])
        rows = await cnx.query('SELECT bugs.* FROM bugs INNER JOIN projects ON project_team = ? WHERE bugs.projectId = projects.id', [project_team])
        return res.status(200).json({ rows })
    }
    catch (err) {
        console.log(err)
    }
})


app.listen(port, () => {
    console.log(`Renning at ${port}`)
})