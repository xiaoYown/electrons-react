const networkInterfaces = require('os').networkInterfaces();
const isPro = process.env.NODE_ENV == 'production';
const port = 3010;

function getIPAdress () {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address
      }
    })
  })
  return IP;
}

let ip = getIPAdress()

module.exports = {
	port: port,
	pathUrl: `http://${ip}:${port}`,
	apiUrl: isPro ? 'http://192.168.0.188:5000' : '/api',
	api: 'http://192.168.0.188:5000',
	end: 'dev'
}