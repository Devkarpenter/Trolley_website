(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Integration Test', email: 'integration.test2@example.com', password: 'Password123' })
    })
    const data = await res.json()
    const fs = require('fs')
    fs.writeFileSync('./signup-response.json', JSON.stringify({ status: res.status, body: data }, null, 2))
    console.log('WROTE signup-response.json')
  } catch (err) {
    const fs = require('fs')
    fs.writeFileSync('./signup-error.txt', err.toString())
    console.error(err)
    process.exit(1)
  }
})()
