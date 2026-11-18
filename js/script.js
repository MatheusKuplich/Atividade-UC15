const FAVORITES_KEY = "yggdrasil-favoritos";

function showSiteFeedback(message) {
  const feedback = document.querySelector(".site-feedback");

  if (feedback) {
    feedback.textContent = message;
  }
}

function readFavorites() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (!Array.isArray(favorites) || favorites.some((favorite) => typeof favorite !== "string")) {
      throw new Error("Os favoritos salvos não estão em um formato válido.");
    }

    return favorites;
  } catch (error) {
    console.error("Não foi possível ler os favoritos salvos.", error);
    showSiteFeedback("Não foi possível carregar os favoritos salvos neste navegador.");
    return [];
  }
}

function updateFavoriteButtons(favorites) {
  document.querySelectorAll(".favorite-button").forEach((button) => {
    const isFavorite = favorites.includes(button.dataset.character);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos";
  });
}

function setupFavorites() {
  if (!document.querySelector(".favorite-button")) {
    return;
  }

  let favorites = readFavorites();
  updateFavoriteButtons(favorites);

  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const character = button.dataset.character;
      const isFavorite = favorites.includes(character);

      favorites = isFavorite
        ? favorites.filter((favorite) => favorite !== character)
        : [...favorites, character];

      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Não foi possível salvar os favoritos neste navegador.", error);
        showSiteFeedback("Não foi possível salvar seus favoritos. Verifique as permissões de armazenamento do navegador.");
        favorites = readFavorites();
        updateFavoriteButtons(favorites);
        return;
      }

      updateFavoriteButtons(favorites);
      showSiteFeedback(
        isFavorite
          ? `${character} removido dos favoritos.`
          : `${character} adicionado aos favoritos.`
      );
    });
  });
}

function setupCharacterSearch() {
  const searchInput = document.querySelector("#pesquisa-personagens");
  const cards = document.querySelectorAll("[data-character-card]");
  const resultMessage = document.querySelector("#resultado-pesquisa");
  const emptyMessage = document.querySelector("#sem-resultados");

  if (!searchInput || !resultMessage || !emptyMessage || cards.length === 0) {
    return;
  }

  function filterCharacters() {
    const searchText = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = card.textContent.toLocaleLowerCase("pt-BR").includes(searchText);
      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    resultMessage.textContent = searchText
      ? `${visibleCount} ${visibleCount === 1 ? "personagem encontrado" : "personagens encontrados"}.`
      : `${visibleCount} personagens disponíveis.`;
    emptyMessage.hidden = visibleCount > 0;
  }

  searchInput.addEventListener("input", filterCharacters);
  filterCharacters();
}

function setupContactForm() {
  const form = document.querySelector("#formulario-contato");
  const status = document.querySelector("#status-formulario");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [
      form.elements.namedItem("nome"),
      form.elements.namedItem("email"),
      form.elements.namedItem("assunto"),
      form.elements.namedItem("mensagem")
    ];
    const emptyField = fields.find((field) => !field.value.trim());

    if (emptyField) {
      status.textContent = "Preencha todos os campos antes de enviar.";
      emptyField.focus();
      return;
    }

    const email = form.elements.namedItem("email");

    if (email.validity.typeMismatch) {
      status.textContent = "Digite um endereço de e-mail válido.";
      email.focus();
      return;
    }

    form.reset();
    status.textContent = "Mensagem validada. O envio foi simulado e nenhuma informação foi transmitida.";
    status.focus();
  });
}

function setupJQueryInformationPanel() {
  const button = document.querySelector("#botao-como-funciona");
  const panel = document.querySelector("#detalhes-portal");

  if (!button || !panel) {
    return;
  }

  if (!window.jQuery) {
    console.error("jQuery não foi carregado; a seção de informações não pode ser aberta.");
    button.disabled = true;
    return;
  }

  const $panel = window.jQuery(panel);

  button.addEventListener("click", () => {
    const showPanel = panel.hidden;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animationDuration = motionPreference ? 0 : 180;

    $panel.stop(true, true);

    if (showPanel) {
      panel.hidden = false;
      button.setAttribute("aria-expanded", "true");
      $panel.hide().slideDown(animationDuration);
    } else {
      button.setAttribute("aria-expanded", "false");
      $panel.slideUp(animationDuration, () => {
        panel.hidden = true;
      });
    }
  });
}

setupFavorites();
setupCharacterSearch();
setupContactForm();
setupJQueryInformationPanel();
