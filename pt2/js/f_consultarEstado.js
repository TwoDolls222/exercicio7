import { Estado } from './c_estado.js';
// import { PrevisaoDotempo } from './f_previsaoTempo.js';
import { dadosEstados } from './v_dadosEstados.js';

const apiKey = '87d2bf52';
const historico = [];

async function consultarEstado() {
    const sigla = document.getElementById('estado').value;
    if (!sigla) {
        alert('Selecione um estado.');
        return;
    }

    try {
        const dados = dadosEstados[sigla];
        const estado = new Estado(
            dados.nome,
            sigla,
            dados.regiao,
            dados.populacao,
            dados.capital // Agora incluindo a capital
        );

        const [clima, info] = await Promise.all([
            estado.previsaoDoTempo(apiKey),
            estado.informacoes()
        ]);

        document.getElementById('resultado').innerHTML = `
            <div class="info-estado">
                <h3>${dados.nome}</h3>
                <p><strong>Capital:</strong> ${dados.capital}</p>
                <p><strong>Região:</strong> ${dados.regiao}</p>
                <p><strong>População:</strong> ${dados.populacao.toLocaleString('pt-BR')}</p>
            </div>
            <div class="previsao-tempo">
                <h4>Previsão na Capital</h4>
                <pre>${clima}</pre>
            </div>
        `;
        // PrevisaoDoTempo(capital);
        historico.unshift(`${dados.nome} - ${new Date().toLocaleString()}`);
        atualizarHistorico();

    } catch (error) {
        document.getElementById('resultado').innerHTML = `
            <p class="error">Erro ao consultar: ${error.message}</p>
        `;
    }
}

function atualizarHistorico() {
    const lista = document.getElementById('listaHistorico');
    lista.innerHTML = '';

    // Limita o histórico aos 5 últimos itens
    const historicoRecente = historico.slice(0, 5);

    historicoRecente.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        lista.appendChild(li);
    });
}

function selectDinamico() {
    const selectEstado = document.getElementById('estado');

    // Preenche o dropdown com todos os estados
    for (const sigla in dadosEstados) {
        const option = document.createElement('option');
        option.value = sigla;
        option.textContent = dadosEstados[sigla].nome;
        selectEstado.appendChild(option);
    }

    // Adiciona o event listener ao botão
    document.getElementById("consultar").addEventListener("click", consultarEstado);

}
document.addEventListener("DOMContentLoaded", selectDinamico);