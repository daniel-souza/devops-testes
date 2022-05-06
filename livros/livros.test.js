const livros = require('./livros');


describe("Cadastramento de livros", () => {
    it("Inserir novo livro - Para cada novo livro, deve inserir apenas o nome e a categoria, o livro deve inicializar com um nova id e sua conclusão deve ser inicializada com false", () => {
        const resultado = livros.cadastrar({ nome: 'Dom Casmurro', categoria: 'Literatura' });
        expect(resultado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: 'Dom Casmurro',
                categoria: 'Literatura',
                concluido: false
            })
        );
    });

    it("Inserir novo livro - Nome deve ser obrigatório", () => {
        const resultado = livros.cadastrar({ categoria: 'Literatura' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'nome' é obrigatório!"
            })
        );
    });

    it("Inserir novo livro - Categoria deve ser obrigatório", () => {
        const resultado = livros.cadastrar({ nome: 'Javascript' });
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'categoria' é obrigatório!"
            })
        );
    });

    it("Inserir novo livro - Categoria deve ser apenas 'Literatura' ou 'Didático'", () => {
        const resultado_1 = livros.cadastrar({ nome: 'As 48 leis do poder', categoria: 'Auto ajuda'  });
        const resultado_2 = livros.cadastrar({ nome: 'Javascript', categoria: 'Didático' });
        const resultado_3 = livros.cadastrar({ nome: 'Dom Casmurro', categoria: 'Literatura' });
        
        expect(resultado_1).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Campo 'categoria' deve ser apenas 'Literatura' ou 'Didático'!"
            })
        );
        // Garantia de que o cadastramento é realizado com as categorias 'Didático' e 'Lazer'
        expect(resultado_2.categoria).toEqual('Didático');
        expect(resultado_3.categoria).toEqual('Literatura');
    });

    it("Inserir novo livro - Garantir que o novo livro foi adicionado no array data", () =>{
        const resultado = livros.cadastrar({ nome: 'Guia PMBOK', categoria: 'Didático' });
        expect(livros.listarPorId(resultado.id)).toEqual(
            expect.objectContaining(resultado)
        );
    });
});

describe('Listagem de livros', () => {
    it("Listar todas as livros - Deve retornar um array contendo todas as livros", () => {
        const resultado = livros.listar();
        expect(resultado).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    categoria: expect.any(String),
                    concluido: expect.any(Boolean)
                })
            ])
        );
    });

    it("Listar livros por id - Deve retornar umo livro por id", () => {
        const resultado = livros.listarPorId(2);
        expect(resultado).toEqual(
            expect.objectContaining({
                id: 2,
                nome: expect.any(String),
                categoria: expect.any(String),
                concluido: expect.any(Boolean)
            })
        );
    });

    it("Listar livros por id - Deve retornar que o livro não foi encontrada", () => {
        const resultado = livros.listarPorId(99999999);
        expect(resultado).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "livro não encontrado!"
            })
        );
    });

    it("Listar livros por conclusão - Deve retornar ou um array de livros concluídos ou de não concluídos", () => {
        // Garantia de que é obtido as listas de livros concluídos e não concluídos
        const resultado_1 = livros.listarPorConclusao(true);
        const resultado_2 = livros.listarPorConclusao(false);
        expect(resultado_1).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    categoria: expect.any(String),
                    concluido: true
                })
            ])
        );
        expect(resultado_2).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nome: expect.any(String),
                    categoria: expect.any(String),
                    concluido: false
                })
            ])
        );
    });

    it("Listar livros por conclusão - Deve retornar um array contendo apenas livro por sua conclusão passada por parâmetro", () => {
        const resultado_1 = livros.listarPorConclusao("erro");
        
        expect(resultado_1).toEqual(
            expect.objectContaining({
                erro: true,
                mensagem: "Valor de 'concluido' deve ser 'true' ou 'false'!"
            })
        );
    });
});

