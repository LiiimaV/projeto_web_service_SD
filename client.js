const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected');

  rl.question('Digite o nome do filme: ', (nomeFilme) => {
    rl.question('Digite a hora da sessão: ', (horaSessao) => {
      rl.question('Digite o id da poltrona (no formato letra e número, por exemplo: A1): ', (idPoltrona) => {
        const mensagem = `${nomeFilme},${horaSessao},${idPoltrona}`;
        client.write(mensagem);
      });
    });
  });
});

client.on('data', (data) => {
  console.log(`${data.toString()}`);
  client.end();
});

client.on('end', () => {
  console.log('Disconnected');
});
