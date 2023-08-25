export class Jogo {
    constructor() {
        this.palavras = ["ácido", "adiar", "ímpar", "algar", "amado", "amigo", "anexo", "anuir", "aonde", "apelo",
            "aquém", "argil", "arroz", "assar", "atrás", "ávido", "azeri", "babar", "bagre", "banho",
            "barco", "bicho", "bolor", "brasa", "brava", "brisa", "bruto", "bulir", "caixa", "cansa",
            "chato", "chave", "chefe", "choro", "chulo", "claro", "cobre", "corte", "curar", "deixo",
            "dizer", "dogma", "dores", "duque", "enfim", "estou", "exame", "falar", "fardo", "farto",
            "fatal", "feliz", "ficar", "fogue", "força", "forno", "fraco", "fugir", "fundo", "fúria",
            "gaita", "gasto", "geada", "gelar", "gosto", "grito", "gueto", "honra", "humor", "idade",
            "ideia", "ídolo", "igual", "imune", "índio", "íngua", "irado", "isola", "janta", "jovem",
            "juizo", "largo", "laser", "leite", "lento", "lerdo", "levar", "lidar", "lindo", "lírio",
            "longe", "luzes", "magro", "maior", "malte", "mamar", "manto", "marca", "matar", "meigo",
            "meios", "melão", "mesmo", "metro", "mimos", "moeda", "moita", "molho", "morno", "morro",
            "motim", "muito", "mural", "naipe", "nasci", "natal", "naval", "ninar", "nível", "nobre",
            "noite", "norte", "nuvem", "oeste", "ombro", "ordem", "órgão", "ósseo", "ossos", "outro",
            "ouvir", "palma", "pardo", "passe", "pátio", "peito", "pêlos", "perdo", "períl", "perto",
            "pezar", "piano", "picar", "pilar", "pingo", "pione", "pista", "poder", "porém", "prado",
            "prato", "prazo", "preço", "prima", "primo", "pular", "quero", "quota", "raiva", "rampa",
            "rango", "reais", "reino", "rezar", "risco", "roçar", "rosto", "roubo", "russo", "saber",
            "sacar", "salto", "samba", "santo", "selar", "selos", "senso", "serão", "serra", "servo",
            "sexta", "sinal", "sobra", "sobre", "sócio", "sorte", "subir", "sujei", "sujos", "talão",
            "talha", "tanga", "tarde", "tempo", "tenho", "terço", "terra", "tesão", "tocar", "lacre",
            "laico", "lamba", "lambo", "largo", "larva", "lasca", "laser", "laura", "lavra", "leigo",
            "leite", "leito", "leiva", "lenho", "lento", "leque", "lerdo", "lesão", "lesma", "levar",
            "libra", "limbo", "lindo", "líneo", "lírio", "lisar", "lista", "livro", "logar", "lombo",
            "lotes", "louca", "louco", "louro", "lugar", "luzes", "macio", "maçom", "maior", "malha",
            "malte", "mamar", "mamãe", "manto", "março", "maria", "marra", "marta", "matar", "medir",
            "meigo", "meios", "melão", "menta", "menti", "mesmo", "metro", "miado", "mídia", "mielo",
            "mielo", "milho", "mimos", "minar", "minha", "miolo", "mirar", "missa", "mitos", "moeda",
            "moído", "moita", "molde", "molho", "monar", "monja", "moral", "morar", "morda", "morfo",
            "morte", "mosca", "mosco", "motim", "motor", "mudar", "muito", "mular", "mulas", "múmia",
            "mural", "extra", "falar", "falta", "fardo", "farol", "farto", "fatal", "feixe", "festa",
            "feudo", "fezes", "fiapo", "fibra", "ficha", "fidel", "filão", "filho", "firma", "fisco",
            "fisga", "fluir", "força", "forma", "forte", "fraco", "frade", "friso", "frito", "fugaz",
            "fugir", "fundo", "furor", "furto", "fuzil", "gabar", "gaita", "galho", "ganho", "garoa",
            "garra", "garro", "garvo", "gasto", "gaupe", "gazua", "geada", "gemer", "germe", "gigas",
            "girar", "gizar", "globo", "gosto", "grãos", "graça", "grava", "grito", "grude", "haver",
            "haver", "hiato", "hidra", "hífen", "hímel", "horas", "hotel", "humor", "ideal", "ídolo",
            "igual", "ileso", "imune", "irado", "isola", "jarra", "jaula", "jegue", "jeito", "jogar",
            "jovem", "juíza", "juizo", "julho", "junho", "jurar", "justa"];
        this.linha = 0;
        this.palavraSecreta = '';
        this.palavraSecreta = this.SortearPalavra();
        console.log(this.palavraSecreta);
    }
    SortearPalavra() {
        let valorAleatorio = Math.floor(Math.random() * this.palavras.length);
        this.palavraSecreta = this.palavras[valorAleatorio];
        return this.palavraSecreta;
    }
    VerificarAcerto(palavraChutada) {
        this.linha++;
        let palavraChutadaLower = palavraChutada.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let palabraSecretaNormalized = this.palavraSecreta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let avaliacoes = [];
        for (let i = 0; i < this.palavraSecreta.length; i++) {
            if (palavraChutadaLower[i] == palabraSecretaNormalized[i])
                avaliacoes[i] = 1; //correta = 1
            else if (palabraSecretaNormalized.includes(palavraChutadaLower[i]))
                avaliacoes[i] = 2; //possuir = 2
            else
                avaliacoes[i] = 3; // nao possui = 3
        }
        return avaliacoes;
    }
    JogadorGanhou(palavra) {
        if (palavra.toLowerCase() == this.palavraSecreta)
            return true;
        else
            return false;
    }
    JogadorPerdeu() {
        if (this.linha > 4)
            return true;
        else
            return false;
    }
}
//# sourceMappingURL=JogoTermo.js.map