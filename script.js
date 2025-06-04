function carregar(pagina) {
    document.getElementById("conteudo").src = pagina;
};

// Precisa ATUALIZAR ESTES ARRAYS manualmente
// cada vez que adicionar ou remover arquivos das suas pastas.
const carrosselData = {
    "Apresentações": [
        "foto1.png",
        "video1.mp4"
        // Adicione outros arquivos da pasta Apresentações aqui
    ],
    "Novidades": [
        "video2.mp4"
        // Exemplo: "video_lancamento.mp4"
        // Adicione todos os arquivos da pasta Novidades aqui
    ],
    "Resultados": [
        "video3.mp4"
        // Exemplo: "relatorio_final.mp4"
        // Adicione todos os arquivos da pasta Resultados aqui
    ]
};

// Esta função inicializa o carrossel para uma PASTA ESPECÍFICA,
// lendo os dados diretamente do objeto carrosselData.
function initCarrossel(pasta) {
    const carrosselItem = document.getElementById("carrosselItem");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carrosselInfo = document.getElementById("carrosselInfo");
    const tituloCarrossel = document.getElementById("tituloCarrossel");

    // Tenta obter a lista de arquivos da pasta especificada
    let arquivosMidea = carrosselData[pasta] || [];

    let currentIndex = 0;

    // Opcional: Atualizar o título da página do carrossel
    if (tituloCarrossel) {
        tituloCarrossel.textContent = pasta.charAt(0).toUpperCase() + pasta.slice(1);
    }

    // Função para exibir o item de mídia atual
    function displayCurrentMedia() {
        if (arquivosMidea.length === 0) {
            carrosselItem.innerHTML = "<p>Nenhum item encontrado.</p>";
            carrosselInfo.textContent = "";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        const arquivo = arquivosMidea[currentIndex];
        const ext = arquivo.split('.').pop().toLowerCase();
        // O caminho usa a 'pasta' que foi passada como argumento para initCarrossel
        const caminho = `../${pasta}/${arquivo}`;

        carrosselItem.innerHTML = ''; // Limpa o conteúdo anterior

        if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
            const img = document.createElement("img");
            img.src = caminho;
            img.alt = `Slide ${currentIndex + 1}`;
            carrosselItem.appendChild(img);
        } else if (["mp4", "webm"].includes(ext)) {
            const video = document.createElement("video");
            video.src = caminho;
            video.controls = true;
            video.autoplay = false;
            video.loop = false;
            carrosselItem.appendChild(video);
        } else {
            carrosselItem.innerHTML = `<p>Formato não suportado: ${arquivo}</p>`;
        }

        carrosselInfo.textContent = `${currentIndex + 1} de ${arquivosMidea.length}`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === arquivosMidea.length - 1;
    }

    // Event Listeners para os botões
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayCurrentMedia();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < arquivosMidea.length - 1) {
            currentIndex++;
            displayCurrentMedia();
        }
    });

    // Como não estamos usando fetch, inicializamos o carrossel diretamente
    if (arquivosMidea.length > 0) {
        currentIndex = 0;
        displayCurrentMedia();
    } else {
        carrosselItem.innerHTML = `<p>Nenhum arquivo válido encontrado na lista para '${pasta}'.</p>`;
        carrosselInfo.textContent = "";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }
}