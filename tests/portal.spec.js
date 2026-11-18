const { test, expect } = require("@playwright/test");

test("a página inicial apresenta o portal e o personagem em destaque", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Yggdrasil | Início");
  await expect(page.getByRole("heading", { name: "Conecte-se aos mundos da Marvel" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Doutor Destino" })).toBeVisible();
});

test("o botão principal da página inicial leva à seção de personagens", async ({ page }) => {
  await page.goto("/");
  const exploreLink = page.getByRole("link", { name: "Explorar personagens" });

  await expect(exploreLink).toHaveAttribute("href", "#personagens");
  await exploreLink.click();
  await expect(page).toHaveURL(/#personagens$/);
  await expect(page.locator("#personagens")).toBeInViewport();
});

test("o link de pular conteúdo recebe foco e leva ao conteúdo principal", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo principal" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo-principal")).toBeFocused();
});

test("a navegação leva às páginas de personagens, contato e início", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Personagens", exact: true }).click();
  await expect(page).toHaveURL(/eventos\.html$/);
  await page.getByRole("link", { name: "Sobre e contato" }).click();
  await expect(page).toHaveURL(/contato\.html$/);
  await page.getByRole("link", { name: "Início" }).click();
  await expect(page).toHaveURL(/index\.html$/);
});

test("as três páginas carregam sem erros de JavaScript", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of ["/", "/eventos.html", "/contato.html"]) {
    await page.goto(route);
  }

  expect(errors).toEqual([]);
});

test("as páginas não criam rolagem horizontal nas larguras previstas", async ({ page }) => {
  const widths = [320, 375, 768, 1024, 1440];
  const routes = ["/", "/eventos.html", "/contato.html"];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await page.goto(route);
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHorizontalOverflow, `${route} com ${width}px`).toBe(false);
    }
  }
});

test("a navbar Bootstrap abre no celular e o painel jQuery pode ser alternado", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contato.html");

  const menuButton = page.getByRole("button", { name: "Abrir ou fechar navegação" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Personagens", exact: true })).toBeVisible();

  const infoButton = page.getByRole("button", { name: "Como funciona o portal?" });
  await infoButton.click();
  await expect(infoButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#detalhes-portal")).toBeVisible();
  await infoButton.click();
  await expect(infoButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#detalhes-portal")).toBeHidden();
});

test("a pesquisa filtra personagens e informa quando não encontra resultados", async ({ page }) => {
  await page.goto("/eventos.html");
  const search = page.getByRole("searchbox", { name: "Pesquisar personagens" });

  await search.fill("Thor");
  await expect(page.locator("[data-character-card]:visible")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Thor", exact: true })).toBeVisible();

  await search.fill("personagem inexistente");
  await expect(page.locator("[data-character-card]:visible")).toHaveCount(0);
  await expect(page.locator("#sem-resultados")).toBeVisible();
});

test("as imagens do catálogo mantêm proporção uniforme e carregam por inteiro", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/eventos.html");

    const images = await page.locator("#grade-personagens .character-image").evaluateAll((elements) =>
      elements.map((image) => {
        const bounds = image.getBoundingClientRect();
        return {
          loaded: image.complete && image.naturalWidth > 0,
          alt: image.alt,
          objectFit: getComputedStyle(image).objectFit,
          width: Math.round(bounds.width),
          height: Math.round(bounds.height)
        };
      })
    );

    expect(images).toHaveLength(5);
    expect(images.every((image) => image.loaded)).toBe(true);
    expect(images.map((image) => image.alt)).toEqual([
      "Doutor Destino",
      "Homem de Ferro",
      "Thor",
      "Doutor Estranho",
      "Homem-Aranha"
    ]);
    expect(images.every((image) => image.objectFit === "contain")).toBe(true);
    expect(new Set(images.map((image) => image.height)).size).toBe(1);
    expect(images.every((image) => Math.abs(image.width / image.height - 4 / 3) < 0.02)).toBe(true);
  }
});

test("as imagens da página inicial carregam e têm textos alternativos correspondentes", async ({ page }) => {
  await page.goto("/");
  const images = await page.locator("main img").evaluateAll((elements) =>
    elements.map((image) => ({
      loaded: image.complete && image.naturalWidth > 0,
      alt: image.alt
    }))
  );

  expect(images.map((image) => image.alt)).toEqual([
    "Doutor Destino",
    "Homem de Ferro",
    "Thor",
    "Doutor Estranho"
  ]);
  expect(images.every((image) => image.loaded)).toBe(true);
});

test("favoritos permanecem salvos após atualizar a página", async ({ page }) => {
  await page.goto("/eventos.html");
  const favoriteButton = page.getByRole("button", { name: "Adicionar aos favoritos" }).first();

  await favoriteButton.click();
  await expect(page.getByRole("button", { name: "Remover dos favoritos" }).first()).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.getByRole("button", { name: "Remover dos favoritos" }).first()).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Remover dos favoritos" }).first().click();
  await expect(page.getByRole("button", { name: "Adicionar aos favoritos" }).first()).toHaveAttribute("aria-pressed", "false");
});

test("os favoritos identificam cada personagem individualmente entre páginas", async ({ page }) => {
  await page.goto("/");
  const doomButtons = page.locator('.favorite-button[data-character="Doutor Destino"]');
  await doomButtons.click();
  await expect(doomButtons).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("link", { name: "Personagens", exact: true }).click();
  await expect(page.locator('.favorite-button[data-character="Doutor Destino"]')).toHaveAttribute("aria-pressed", "true");
  const ironManButton = page.locator('.favorite-button[data-character="Homem de Ferro"]');
  const thorButton = page.locator('.favorite-button[data-character="Thor"]');
  await expect(ironManButton).toHaveAttribute("aria-pressed", "false");

  await thorButton.click();
  await expect(thorButton).toHaveAttribute("aria-pressed", "true");
  await expect(ironManButton).toHaveAttribute("aria-pressed", "false");
});

test("o formulário valida dados e informa que o envio é simulado", async ({ page }) => {
  await page.goto("/contato.html");
  await page.getByRole("button", { name: "Simular envio" }).click();
  await expect(page.locator("#status-formulario")).toContainText("Preencha todos os campos");

  await page.getByLabel("Nome").fill("Pessoa Teste");
  await page.getByLabel("E-mail").fill("pessoa@example.com");
  await page.getByRole("button", { name: "Simular envio" }).click();
  await expect(page.locator("#status-formulario")).toContainText("Preencha todos os campos");
  await expect(page.getByLabel("Assunto")).toBeFocused();

  await page.getByLabel("E-mail").fill("email-invalido");
  await page.getByLabel("Assunto").fill("Dúvida");
  await page.getByLabel("Mensagem").fill("Olá");
  await page.getByRole("button", { name: "Simular envio" }).click();
  await expect(page.locator("#status-formulario")).toContainText("e-mail válido");

  await page.getByLabel("E-mail").fill("pessoa@example.com");
  await page.getByRole("button", { name: "Simular envio" }).click();
  await expect(page.locator("#status-formulario")).toContainText("envio foi simulado");
  await expect(page.getByLabel("Nome")).toHaveValue("");
  await expect(page.getByLabel("E-mail")).toHaveValue("");
  await expect(page.getByLabel("Assunto")).toHaveValue("");
  await expect(page.getByLabel("Mensagem")).toHaveValue("");
});
