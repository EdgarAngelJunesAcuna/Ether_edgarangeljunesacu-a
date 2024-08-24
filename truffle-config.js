module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Dirección de tu localhost
      port: 8545,            // Puerto estándar de Ethereum que usa Ganache
      network_id: "*",       // Conéctate a cualquier red disponible
    },
  },

  // Configura otros aspectos de Truffle aquí...
  
  compilers: {
    solc: {
      version: "0.8.21",      // Especifica la versión del compilador Solidity
    }
  }
};
