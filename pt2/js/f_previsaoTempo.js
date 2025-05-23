console.log("Js funcionando e connectado");
const apiKey = '4ffe122ddc97e87cc61838e3315ca9db';
export function previsaoTempo(city) {
    if (!city) {
        document.getElementById('saida').textContent = 'Por favor, digite uma cidade.';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                const clima = data.results;
                const resultado = `\nPrevisão do tempo para ${clima.city_name}:\n────────────────────────────────\nTemperatura: ${clima.temp}°C\nCondição:    ${clima.description}\nUmidade:     ${clima.humidity}%\nVento:       ${clima.wind_speedy}`;
                document.getElementById('saida').textContent = resultado;
            } else {
                document.getElementById('saida').textContent = 'Cidade não encontrada ou erro na API.';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar a previsão do tempo:', error);
            document.getElementById('saida').textContent = 'Erro ao consultar o serviço de previsão.';
        });
}

function funcBtn1() {
    const cidade = document.getElementById('cidade').value;
    previsaoTempo(cidade);
    console.log("function btn1 funcionando certinho");
}

function funcBtn2(e) {
    if (e.key === 'Enter') {
        document.getElementById('btnPrever').click();
    }
    let minimus = e
    console.log("Function btn2 funcionando com o paramentro E certinho \n" + minimus)
}

function funcDOM() {
    document.getElementById('btnPrever').addEventListener('click', funcBtn1);
    document.getElementById('cidade').addEventListener('keypress', funcBtn2);
    console.log("function funcdom funcionando corretamente");
}

document.addEventListener('DOMContentLoaded', funcDOM);