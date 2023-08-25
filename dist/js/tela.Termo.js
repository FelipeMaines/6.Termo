import { Jogo } from "./JogoTermo.js";
class TelaTermo {
    constructor() {
        this.contador = 0;
        this.pnlTermo = document.querySelector('#pnlTermo');
        this.linhas = document.querySelectorAll('#pnlTermo > .linha');
        this.pnlTeclado = document.querySelector('#pnlTeclado');
        this.btnEnter = document.querySelector('#btnEnter');
        this.btnReset = document.querySelector('.btn-Reset');
        this.btnApagar = document.querySelector('.btnApagar');
        this.jogo = new Jogo();
        this.RegistarEventos();
    }
    RegistarEventos() {
        for (let botao of this.pnlTeclado.children) {
            botao.addEventListener("click", (sender) => this.EscreverTela(sender));
            //botao.addEventListener("click", (sender) => this.AtualizarBotoesPainel(sender));
        }
        this.btnEnter.addEventListener('click', () => this.VerificarChute());
        this.btnReset.addEventListener('click', () => this.Reset());
        this.btnApagar.addEventListener('click', () => this.Apagar());
    }
    Reset() {
        var _a;
        console.log('a');
        this.jogo = new Jogo();
        this.contador = 0;
        for (let linhaFor = 0; linhaFor < 5; linhaFor++) {
            const linha = this.linhas[linhaFor];
            for (let quadrado = 0; quadrado < 5; quadrado++) {
                const QuadradoVez = linha.children[quadrado];
                QuadradoVez.textContent = '';
                QuadradoVez.style.backgroundColor = '#bebebe';
            }
        }
        (_a = this.pnlTermo.querySelector('.notificacao')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    Apagar() {
        if (this.contador > 0)
            this.contador--;
        else
            return;
        const linha = this.linhas[this.jogo.linha];
        const QuadradoVez = linha.children[this.contador];
        QuadradoVez.textContent = '';
    }
    VerificarChute() {
        if (this.contador < 5)
            return;
        let palavraChutada = this.PegarPalavraChutada();
        let posicoesCorretas = this.jogo.VerificarAcerto(palavraChutada);
        this.TrocarCorDiv(posicoesCorretas);
        if (this.jogo.JogadorGanhou(palavraChutada))
            this.MostrarMensagemFinal('Parabens, Você Venceu!!', 'notificacao-vitoria');
        else if (this.jogo.JogadorPerdeu())
            this.MostrarMensagemFinal('Infelizmente, Você Perdeu :(', 'notificacao-derrota');
        this.contador = 0;
    }
    MostrarMensagemFinal(mesangem, classificao) {
        const lblMensagemFinal = document.createElement('p');
        lblMensagemFinal.classList.add(classificao);
        lblMensagemFinal.classList.add('notificacao');
        lblMensagemFinal.textContent = mesangem;
        this.pnlTermo.appendChild(lblMensagemFinal);
    }
    TrocarCorDiv(posicoesCorretas) {
        const linha = this.linhas[this.jogo.linha - 1];
        for (let i = 0; i < posicoesCorretas.length; i++) {
            if (posicoesCorretas[i] == 1) {
                linha.children[i].style.backgroundColor = "green";
            }
            else if (posicoesCorretas[i] == 2)
                linha.children[i].style.backgroundColor = "yellow";
            else
                linha.children[i].style.backgroundColor = "grey";
        }
    }
    PegarPalavraChutada() {
        const linha = this.linhas[this.jogo.linha];
        let ArrayPalavras = [];
        for (let i = 0; i < linha.childElementCount; i++)
            ArrayPalavras.push(linha.children[i].textContent);
        return ArrayPalavras.join("");
    }
    EscreverTela(sender) {
        if (this.contador == 5)
            return;
        const linha = this.linhas[this.jogo.linha];
        const QuadradoVez = linha.children[this.contador];
        const botaoClicado = sender.target;
        if (botaoClicado.className === "btnApagar" || botaoClicado.textContent === 'Enter') {
            return;
        }
        const palpite = botaoClicado.textContent[0];
        QuadradoVez.textContent = palpite;
        this.contador++;
    }
    AtualizarBotoesPainel(sender) {
        if (this.contador == 5)
            return;
        const botaoClicado = sender.target;
        botaoClicado.disabled = true;
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela.Termo.js.map