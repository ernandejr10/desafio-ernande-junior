class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
    }

    let valorTotal = 0

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!'
    }

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',')
      const item = cardapio[codigo]

      if (!item) {
        return 'Item inválido!'
      }

      if (!item.descricao.includes('(extra')) {
        valorTotal += item.valor * parseInt(quantidade, 10)
      } else {
        const itemPrincipalCodigo = codigo.split('(')[0]
        const itemPrincipal = cardapio[itemPrincipalCodigo]
        const itemPrincipalNoPedido = itens.some(item =>
          item.startsWith(itemPrincipalCodigo)
        )
        if (!itemPrincipalNoPedido) {
          return 'Item extra não pode ser pedido sem o principal'
        }
      }
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03
    } else if (formaDePagamento !== 'debito') {
      return 'Forma de pagamento inválida!'
    }

    const valorFormatado = valorTotal.toFixed(2).replace('.', ',')
    return `R$ ${valorFormatado}`
  }
}

const caixa = new CaixaDaLanchonete()

// Exemplo 1: Compra de chantily com café
const formaDePagamento1 = 'dinheiro'
const itens1 = ['chantily,1', 'cafe,1']
const resultado1 = caixa.calcularValorDaCompra(formaDePagamento1, itens1)
console.log('Exemplo 1:', resultado1)

// Exemplo 2: Compra de chantily sem café
const formaDePagamento2 = 'debito'
const itens2 = ['chantily,1']
const resultado2 = caixa.calcularValorDaCompra(formaDePagamento2, itens2)
console.log('Exemplo 2:', resultado2)

// Exemplo 3: Compra de combo e dois cafés
const formaDePagamento3 = 'credito'
const itens3 = ['combo1,1', 'cafe,2']
const resultado3 = caixa.calcularValorDaCompra(formaDePagamento3, itens3)
console.log('Exemplo 3:', resultado3)
