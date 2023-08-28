import { Jogo } from "./JogoTermo.js";

class TelaTermo {

    jogo: Jogo;
    linhas: NodeListOf<HTMLDivElement>;
    pnlTeclado: HTMLDivElement;
    btnEnter: HTMLButtonElement;
    contador: number = 0;
    pnlTermo: HTMLDivElement;
    btnReset: HTMLButtonElement;
    btnApagar: HTMLButtonElement;
    estatistica: Array<number>;
    pnlEstatisticas: HTMLDivElement;
    pnlContainerEstatistica: NodeListOf<HTMLDivElement>;


    constructor() {

        this.pnlTermo = document.querySelector('#pnlTermo') as HTMLDivElement;

        this.linhas = document.querySelectorAll('#pnlTermo > .linha');

        this.pnlTeclado = document.querySelector('#pnlTeclado') as HTMLDivElement;

        this.pnlEstatisticas = document.querySelector('.estatisticas') as HTMLDivElement;

        this.pnlContainerEstatistica = document.querySelectorAll('.estatisticas > .container-estatistica > .resultado')

        this.btnEnter = document.querySelector('#btnEnter') as HTMLButtonElement;

        this.btnReset = document.querySelector('.btn-Reset') as HTMLButtonElement;

        this.btnApagar = document.querySelector('.btnApagar') as HTMLButtonElement;

        this.estatistica = this.PegarValorEstatistica();

        this.jogo = new Jogo();

        this.RegistarEventos();

        this.ArrumarTelaEstatistica();
    }

    PegarValorEstatistica(): Array<number>{
        let arraystr = localStorage.getItem('estatistica');
        
        if(arraystr !== null){
            let arrayEstatistica : Array<number> = JSON.parse(arraystr);
            return arrayEstatistica; 
        }
        else{
            return [0, 0, 0, 0, 0, 0];
        }
    }

    ArrumarTelaEstatistica(){

        for(let i = 0; i < 6; i++){
            let colunaTentativa = this.pnlContainerEstatistica[i];

            colunaTentativa.textContent = this.estatistica[i].toString();

            if(this.estatistica[i] > 0){
                colunaTentativa.style.backgroundColor = 'blue';
            }
        }
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

    Reset(): void{

        console.log('a');

        this.jogo = new Jogo();

        this.contador = 0;

        for(let linhaFor = 0; linhaFor < 5; linhaFor++){

            const linha: HTMLDivElement = this.linhas[linhaFor];

            for(let quadrado = 0; quadrado < 5; quadrado++){

                const QuadradoVez: HTMLElement = linha.children[quadrado] as HTMLElement;

                QuadradoVez.textContent = '';
                QuadradoVez.style.backgroundColor = '#bebebe'
            }
        }

        this.pnlTermo.querySelector('.notificacao')?.remove();

    }

    Apagar() : void {

        if(this.contador > 0)
            this.contador--
        else
            return;

        const linha: HTMLDivElement = this.linhas[this.jogo.linha];

        const QuadradoVez: HTMLElement = linha.children[this.contador] as HTMLElement;

        QuadradoVez.textContent = '';   
    }

    VerificarChute(): void {

        if (this.contador < 5)
            return;

        let palavraChutada = this.PegarPalavraChutada();

        let posicoesCorretas: Array<number> = this.jogo.VerificarAcerto(palavraChutada);

        this.TrocarCorDiv(posicoesCorretas);

        if (this.jogo.JogadorGanhou(palavraChutada)) {
            this.MostrarMensagemFinal('Parabens, Você Venceu!!', 'notificacao-vitoria');

            this.AdicionarLocalStorage();
        }

        else if(this.jogo.JogadorPerdeu()){
            this.MostrarMensagemFinal('Infelizmente, Você Perdeu :(', 'notificacao-derrota');

            this.AdicionarLocalStorage();
        }

        this.contador = 0;
    }

    private AdicionarLocalStorage() {
        
        if(this.jogo.JogadorPerdeu())
            this.estatistica[this.estatistica.length - 1]++;
        else{
            this.estatistica[this.jogo.linha - 1]++;
        }

        let strEstatistica = JSON.stringify(this.estatistica);

        localStorage.setItem('estatistica', strEstatistica);

        this.ArrumarTelaEstatistica();
    }

    private MostrarMensagemFinal(mesangem: string, classificao: string) {

        const lblMensagemFinal: HTMLParagraphElement = document.createElement('p');

        lblMensagemFinal.classList.add(classificao);
        lblMensagemFinal.classList.add('notificacao');

        lblMensagemFinal.textContent = mesangem;
        this.pnlTermo.appendChild(lblMensagemFinal);
    }

    TrocarCorDiv(posicoesCorretas: Array<number>) {

        const linha: HTMLDivElement = this.linhas[this.jogo.linha - 1];

        for (let i = 0; i < posicoesCorretas.length; i++) {

            if (posicoesCorretas[i] == 1) {
                (linha.children[i] as HTMLDivElement).style.backgroundColor = "green";
            }
            else if (posicoesCorretas[i] == 2)
                (linha.children[i] as HTMLDivElement).style.backgroundColor = "yellow";
            else
                (linha.children[i] as HTMLDivElement).style.backgroundColor = "grey";

        }
    }

    PegarPalavraChutada(): string {
        const linha: HTMLDivElement = this.linhas[this.jogo.linha];

        let ArrayPalavras = [];

        for (let i = 0; i < linha.childElementCount; i++)
            ArrayPalavras.push(linha.children[i].textContent);

        return ArrayPalavras.join("");
    }

    EscreverTela(sender: Event): void {

        if (this.contador == 5)
            return;

        const linha: HTMLDivElement = this.linhas[this.jogo.linha];

        const QuadradoVez: HTMLElement = linha.children[this.contador] as HTMLElement;

        const botaoClicado = sender.target as HTMLButtonElement;

        if (botaoClicado.className === "btnApagar" || botaoClicado.textContent === 'Enter') {
            return;
        }

        const palpite = botaoClicado.textContent![0];

        QuadradoVez.textContent = palpite;

        this.contador++;
    }

    AtualizarBotoesPainel(sender: Event): void {

        if (this.contador == 5)
            return;

        const botaoClicado = sender.target as HTMLButtonElement;

        botaoClicado.disabled = true;
    }
}

window.addEventListener('load', () => new TelaTermo())