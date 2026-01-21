# CLAUDE.md - Diretrizes do Projeto

## Comandos de Build e Teste
- Instalar dependências: `npm install`
- Rodar o projeto: `npm run dev`
- Linter/Formatação: `npm run lint` ou `npx prettier --write .`
- Priorizar código modular em vez de arquivos gigantes
- Seguir o estilo de imutabilidade e organização clara de arquivos
- **Não usar emojis** em nenhuma parte do código ou mensagens de commit
- Remover todos os `console.log` antes de finalizar qualquer tarefa

## Padrões de Código
- **Estilo**: Use TypeScript com tipagem rigorosa; evite `any`.
- **Arquitetura**: Prefira componentes pequenos e funções puras (S.O.L.I.D.).
- **Nomenclatura**: Variáveis e funções em camelCase, componentes em PascalCase.
- **Tratamento de Erros**: Sempre use blocos try/catch em operações assíncronas.

## Fluxo de Trabalho
- Mensagens de commit devem seguir o padrão Conventional Commits (ex: `feat:`, `fix:`, `chore:`)
- Mensagens de commit não devem ter corpo, seguir o formato `<type>: <description>`.
- Sempre verifique se os testes passam antes de sugerir para um commit.
- **Documentação**: Manter o `README.md` sempre atualizado após mudanças significativas

## Preferências de Resposta
- Seja curto e direto ao ponto.
- Evite jargões desnecessários.
- Se houver mais de uma solução, apresente a mais simples primeiro.

## Memória e contexto
- Se a tarefa for complexa, sugira o uso de um **subagente** (`@planner` ou `@architect`)
- Se o contexto estiver muito alto, execute `/compact`
- Utilize `mgrep` para buscas locais e `mgrep-web` para pesquisas na internet
