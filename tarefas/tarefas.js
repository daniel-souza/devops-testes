
const data = [     
    {
        id: 1,
        nome: 'Estudar para a prova',
        categoria: 'Estudos',
        concluido: true,
    },
    {
        id: 2,
        nome: 'Ir à academia',
        categoria: 'Lazer',
        concluido: false,
    },
    {
        id: 3,
        nome: 'Fazer caminhada',
        categoria: 'Lazer',
        concluido: true,
    },
    {
        id: 4,
        nome: 'Realizar prova',
        categoria: 'Estudos',
        concluido: false,
    },
];

function cadastrar(tarefa) {

    if(tarefa.nome === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'nome' é obrigatório!"
        }
    }

    if(tarefa.categoria === undefined) {
        return {
            erro: true,
            mensagem: "Campo 'categoria' é obrigatório!"
        }
    }

    if(tarefa.categoria !== 'Lazer' && tarefa.categoria !== 'Estudos') {
        return {
            erro: true,
            mensagem: "Campo 'categoria' deve ser apenas 'Estudos' ou 'Lazer'!"
        }
    }

    tarefa.id = data.length+1;
    tarefa.concluido = false;
    data.push(tarefa);

    return tarefa;

}

function listar() {
    return data;
}

function listarPorCategoria(categoria) {
    const tarefas = data.filter((tarefa) => tarefa.categoria === categoria);
    if(tarefas.length === 0)
        return {
            erro: true,
            mensagem: "Categoria não encontrada!"
        };

    return tarefas;

}

function listarPorId(id) {
    const tarefa = data.find((tarefa) => tarefa.id === id);
    if(!tarefa)
        return {
            erro: true,
            mensagem: "Tarefa não encontrada!"
        }
    return tarefa;
}

module.exports = {
    cadastrar,
    listar,
    listarPorId,
    listarPorCategoria
}