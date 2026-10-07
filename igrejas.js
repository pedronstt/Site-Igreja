// ==========================================================
// LISTA DE IGREJAS — AD Missão Restaurando Vidas
// ----------------------------------------------------------
// Para adicionar uma igreja, copie um bloco { ... } e edite.
//   nome      Nome da igreja/congregação
//   tipo      "Sede" ou "Congregação"
//   pais      "Brasil" ou "Estados Unidos" (gera os filtros)
//   cidade    Cidade e estado
//   endereco  Endereço completo (deixe "" se ainda não souber)
//   instagram Usuário do Instagram, sem @ (deixe "" se não houver)
// ==========================================================
window.IGREJAS = [
  {
    nome: 'AD Missão Restaurando Vidas',
    tipo: 'Sede',
    pais: 'Brasil',
    cidade: 'Palmas, TO',
    endereco: '', // EDITAR: endereço da sede no Brasil
    instagram: 'admissaoprv.oficial'
  },
  {
    nome: 'AD Missão Framingham',
    tipo: 'Sede',
    pais: 'Estados Unidos',
    cidade: 'Framingham, MA',
    endereco: '59 Howard St, Framingham, MA 01702',
    instagram: 'admissaoprvusa'
  }
  // ----------------------------------------------------------
  // Congregações nos EUA. Endereços vieram de uma cópia antiga da página
  // "América do Norte" do site admissaoprv.com.br — conferir antes de
  // publicar. Preencha "instagram" quando tiver o usuário de cada uma.
  // ----------------------------------------------------------
  ,{ nome: 'AD Missão Lowell', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Lowell, MA', endereco: '101 Forest St, Lowell, MA', instagram: '' }
  ,{ nome: 'AD Missão Somerville', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Somerville, MA', endereco: '156 Highland Ave, Somerville, MA', instagram: '' }
  ,{ nome: 'AD Missão Everett', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Everett, MA', endereco: '24 Norwood St, Everett, MA', instagram: '' }
  ,{ nome: 'AD Missão Milford', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Milford, MA', endereco: '11 Jefferson St, Milford, MA', instagram: '' }
  ,{ nome: 'AD Missão Plymouth', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Plymouth, MA', endereco: '428 Court St, Plymouth, MA', instagram: '' }
  ,{ nome: 'AD Missão Brockton', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Brockton, MA', endereco: '54 Wyman St, Brockton, MA', instagram: '' }
  ,{ nome: 'AD Missão East Boston', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'East Boston, MA', endereco: '12 Bennington St, East Boston, MA', instagram: '' }
  ,{ nome: 'AD Missão Weymouth', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Weymouth, MA', endereco: '89 Washington St, Weymouth, MA', instagram: '' }
  ,{ nome: 'AD Missão Fall River', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Fall River, MA', endereco: '1367 Pleasant St, Fall River, MA', instagram: '' }
  ,{ nome: 'AD Missão Philadelphia', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Philadelphia, PA', endereco: '7800 Castor Ave, Philadelphia, PA', instagram: '' }
  ,{ nome: 'AD Missão Margate', tipo: 'Congregação', pais: 'Estados Unidos', cidade: 'Margate, FL', endereco: '', instagram: '' }

  // EDITAR: adicione aqui as demais congregações, por exemplo:
  // ,{
  //   nome: 'AD Missão Nome da Cidade',
  //   tipo: 'Congregação',
  //   pais: 'Estados Unidos',
  //   cidade: 'Cidade, UF',
  //   endereco: 'Rua, número, cidade, estado, CEP',
  //   instagram: 'usuario'
  // }
];
