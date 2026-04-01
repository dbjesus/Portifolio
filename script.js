let dados = [];

async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        document.getElementById("resultados-container").innerHTML = 
            '<p style="text-align: center; color: red;">Erro ao carregar projetos. Tente recarregar a página.</p>';
    }
}

function renderizarCards(lista) {
    const container = document.getElementById("resultados-container");
    
    if (!container) return;
    
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--tertiary-color); margin-top: 4rem;">Nenhum projeto encontrado.</p>';
        return;
    }

    lista.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p><strong>Tools:</strong> ${item.tools}</p>
            <p><strong>Skills:</strong> ${item.skills}</p>
            <div class="card-buttons">
                ${item.project_page ? `<a href="${item.project_page}" class="btn btn-primary">📄 Ver Projeto</a>` : ''}
                ${item.pdf ? `<a href="${item.pdf}" class="btn btn-secondary" target="_blank">📑 PDF</a>` : ''}
                ${item.dashboard ? `<a href="${item.dashboard}" class="btn btn-dashboard">📊 Dashboard</a>` : ''}
                ${item.link ? `<a href="${item.link}" class="btn btn-link" target="_blank">🔗 Link Externo</a>` : ''}
            </div>
        `;

        container.appendChild(card);
    });
}

function realizarBusca() {
    const termo = document.getElementById("campo-busca").value.toLowerCase();
    
    if (!termo.trim()) {
        renderizarCards(dados);
        return;
    }
    
    const resultados = dados.filter(item => {
        return item.name.toLowerCase().includes(termo) ||
               item.description.toLowerCase().includes(termo) ||
               item.tools.toLowerCase().includes(termo) ||
               item.skills.toLowerCase().includes(termo);
    });
    
    renderizarCards(resultados);
}

// Configurar eventos
document.addEventListener("DOMContentLoaded", () => {
    iniciarBusca();
    
    const botaoBusca = document.getElementById("botao-busca");
    const campoBusca = document.getElementById("campo-busca");
    
    if (botaoBusca) botaoBusca.onclick = realizarBusca;
    if (campoBusca) campoBusca.onkeyup = (e) => { if (e.key === 'Enter') realizarBusca(); };
});
