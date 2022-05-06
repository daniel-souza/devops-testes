
const data = [     
    {
        id: 1,
        nome: 'O Senhor dos anéis',
        categoria: 'Literatura',
        concluido: false,
    },
    {
        id: 2,
        nome: 'Dexter',
        categoria: 'Literatura',
        concluido: true,
    },
    {
        id: 3,
        nome: 'Banco de Dados',
        categoria: 'Didático',
        concluido: false,
    },
    {
        id: 4,
        nome: 'DevOps',
        categoria: 'Didático',
        concluido: true,
    },
];

function cadastrar(livro) {

    if(livro.nome === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'nome' é obrigatório!"
        }
    }

    if(livro.categoria === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'categoria' é obrigatório!"
        }
    }

    if(livro.categoria !== 'Literatura' 
        && livro.categoria !== 'Didático') {
        return {
            erro: true,
            mensagem: "Campo 'categoria' deve ser apenas 'Literatura' ou 'Didático'!"
        }
    }

    livro.id = data.length + 1;
    livro.concluido = false;
    data.push(livro);
    return livro;

}

function listar() {
    return data;
}

// conclusão deve receber verdadeiro ou falso
function listarPorConclusao(conclusao) {

    if(conclusao !== true && conclusao !== false) {
        return {
            erro: true,
            mensagem: "Valor de 'concluido' deve ser 'true' ou 'false'!"
        }
    }

    const livrosEncontrados = data.filter(
        (livro) => livro.concluido === conclusao
    );

    return livrosEncontrados;
}

function listarPorId(id) {
    const livro = data.find((livro) => livro.id === id);
    if(!livro)
        return {
            erro: true,
            mensagem: "livro não encontrado!"
        }
    return livro;
}

module.exports = {
    cadastrar,
    listar,
    listarPorId,
    listarPorConclusao
}