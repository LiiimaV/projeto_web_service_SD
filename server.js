const net = require('net');

const filmesDisponiveis = {
  'A Baleia': {
    '10:00': {
      'A1': { preco: 10 },
      'A2': { preco: 10 },
      'A3': { preco: 10 },
      'B1': { preco: 8 },
      'B2': { preco: 8 },
      'B3': { preco: 8 }
    },
    '14:00': {
      'C1': { preco: 12 },
      'C2': { preco: 12 },
      'C3': { preco: 12 },
      'D1': { preco: 10 },
      'D2': { preco: 10 },
      'D3': { preco: 10 }
    }
  },
  'Homem-Aranha: Sem Volta Pra Casa': {
    '16:00': {
      'E1': { preco: 15 },
      'E2': { preco: 15 },
      'E3': { preco: 15 },
      'F1': { preco: 12 },
      'F2': { preco: 12 },
      'F3': { preco: 12 }
    },
    '20:00': {
      'G1': { preco: 18 },
      'G2': { preco: 18 },
      'G3': { preco: 18 },
      'H1': { preco: 15 },
      'H2': { preco: 15 },
      'H3': { preco: 15 }
    }
  }
};

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const mensagem = data.toString();
    const [nomeFilme, horaSessao, idPoltrona] = mensagem.split(',');

    if (filmesDisponiveis.hasOwnProperty(nomeFilme) &&
        filmesDisponiveis[nomeFilme].hasOwnProperty(horaSessao) &&
        filmesDisponiveis[nomeFilme][horaSessao].hasOwnProperty(idPoltrona)) {
      const preco = filmesDisponiveis[nomeFilme][horaSessao][idPoltrona].preco;
      socket.write(`Disponível. Preço do ingresso: R$${preco},00`);
    } else {
      socket.write('Indisponível');
    }

    socket.end();
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('starter server on port 3000');
});
