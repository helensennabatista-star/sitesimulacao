# Simulado Lei Seca

Este é um simulado interativo para a Lei Seca, desenvolvido em React. Ele permite que o usuário preencha as respostas em campos interativos e, em seguida, gere um PDF com suas respostas para correção.

## Funcionalidades

- **Simulado Completo:** Contém todas as 50 questões do documento original.
- **Campos Interativos:** Permite preencher as respostas diretamente na página.
- **Salvar/Carregar Progresso:** Salva e carrega o progresso do simulado localmente no navegador.
- **Geração de PDF:** Gera um PDF com as respostas preenchidas para facilitar a correção.

## Como Executar Localmente

Para executar este projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd simulado-lei-seca
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou se preferir pnpm
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou se preferir pnpm
    pnpm run dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:5173/` (ou a porta que for indicada no terminal, caso a 5173 esteja em uso).

## Estrutura do Projeto

- `src/App.jsx`: Componente principal da aplicação, contendo a lógica das questões, respostas e geração de PDF.
- `src/components/ui`: Componentes de UI reutilizáveis (shadcn/ui).
- `public`: Arquivos estáticos.
- `vite.config.js`: Configuração do Vite.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.


