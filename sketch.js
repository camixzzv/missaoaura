const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções. Gosta de construir, corrigir falhas e encontrar soluções práticas.",
        imagem: "perfil-1.jpg",
        recomendacao: "Você será responsável por construir equipamentos, reparar sistemas e garantir o funcionamento da nave."
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar, analisar evidências e descobrir como as coisas funcionam.",
        imagem: "perfil-2.jpg",
        recomendacao: "Você deverá investigar o planeta, analisar amostras e descobrir os mistérios desse novo ambiente."
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Gosta de descobrir lugares, experimentar alternativas e lidar com situações novas.",
        imagem: "perfil-3.jpg",
        recomendacao: "Você ficará responsável por explorar o território, encontrar caminhos e descobrir novos lugares."
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Gosta de organizar informações, coordenar pessoas e decidir os próximos passos.",
        imagem: "perfil-4.jpg",
        recomendacao: "Você deverá organizar a equipe, analisar os riscos e planejar as próximas etapas da missão."
    }
];

// Cada pergunta possui uma distribuição de pontos.
// O número selecionado indica qual perfil recebe o ponto.
const pontuacaoPerguntas = [
    { 1: 3, 2: 2, 3: 1, 4: 4 },
    { 1: 3, 2: 1, 3: 2, 4: 4 },
    { 1: 2, 2: 3, 3: 1, 4: 4 },
    { 1: 4, 2: 1, 3: 2, 4: 3 }
];

const formulario = document.querySelector("form");
console.log(formulario);
// Cria a área de resultado
const resultado = document.createElement("section");
resultado.id = "resultado";
resultado.style.display = "none";
formulario.after(resultado);

// Adiciona o texto obrigatório aura67
const aura = document.createElement("p");
aura.textContent = "aura67";
aura.id = "aura67";
document.querySelector("main").appendChild(aura);

// Calcula a idade
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento + "T00:00:00");

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() < nascimento.getDate());

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;
}

// Evento do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;

    const perguntas = formulario.querySelectorAll("select");

    // Validação dos campos
    if (nome === "" || nascimento === "") {
        alert("Preencha seu nome e sua data de nascimento!");
        return;
    }

    const dataEscolhida = new Date(nascimento + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataEscolhida > hoje) {
        alert("A data de nascimento não pode ser futura!");
        return;
    }

    // Verifica se todas as perguntas foram respondidas
    for (let pergunta of perguntas) {
        if (pergunta.value === "") {
            alert("Responda todas as perguntas!");
            return;
        }
    }

    const idade = calcularIdade(nascimento);

    // Inicializa a pontuação dos perfis
    let pontos = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

    // Soma os pontos de cada resposta
    perguntas.forEach((pergunta, indice) => {
        const resposta = pergunta.value;
        const perfilEscolhido = pontuacaoPerguntas[indice][resposta];

        pontos[perfilEscolhido]++;
    });

    // Descobre a maior pontuação
    const maiorPontuacao = Math.max(...Object.values(pontos));

    // Identifica os perfis empatados
    const empatados = Object.keys(pontos).filter(id => {
        return pontos[id] === maiorPontuacao;
    });

    let perfilId;
    let mensagemEmpate = "";

    if (empatados.length > 1) {
        // Em caso de empate, utiliza a última resposta
        const ultimaResposta = perguntas[3].value;
        const desempate = pontuacaoPerguntas[3][ultimaResposta];

        perfilId = empatados.includes(String(desempate))
            ? desempate
            : Number(empatados[0]);

        mensagemEmpate = "Você teve um empate entre alguns perfis! Seu resultado foi definido considerando sua última resposta.";
    } else {
        perfilId = Number(empatados[0]);
    }

    // Localiza o perfil no array
    const perfil = perfis.find(item => item.id === perfilId);

    // Exibe o resultado
    resultado.innerHTML = `
        <h2>Resultado da Missão Aura!</h2>

        <p><strong>Participante:</strong> ${nome}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>

        <h3>Seu perfil é: ${perfil.nome}</h3>

        <p><strong>Categoria:</strong> ${perfil.categoria}</p>

        <p>${perfil.descricao}</p>

        ${mensagemEmpate ? `<p>${mensagemEmpate}</p>` : ""}

        <h3>Sua recomendação para a missão:</h3>
        <p>${perfil.recomendacao}</p>

        <img src="${perfil.imagem}"
             alt="${perfil.nome}"
             style="width: 100%; max-width: 350px; border-radius: 15px;"
             onerror="this.alt='Imagem do perfil não encontrada'; this.style.display='none';">

        <button type="button" id="btn-refazer">
            Refazer o teste
        </button>
    `;

    resultado.style.display = "block";

    // Esconde o formulário após o resultado
    formulario.style.display = "none";

    // Botão para refazer o teste
    document.getElementById("btn-refazer").addEventListener("click", function() {
        formulario.reset();
        formulario.style.display = "block";
        resultado.style.display = "none";
        window.scrollTo(0, 0);
    });

    resultado.scrollIntoView({ behavior: "smooth" });
});
