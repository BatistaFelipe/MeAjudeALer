# MeAjudeALer 📖

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind"/>
</div>

<br/>

**MeAjudeALer** é uma ferramenta web gratuita e acessível desenvolvida para ajudar pessoas com dislexia a ler textos com mais conforto e facilidade. A aplicação oferece recursos de acessibilidade comprovadamente eficazes, incluindo fontes especializadas, régua de leitura interativa e formatação otimizada.

<div align="center">
  <a href="https://github.com/BatistaFelipe/MeAjudeALer">🌐 Demo Online</a> •
  <a href="#-recursos">Recursos</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-como-usar">Como Usar</a>
</div>

---

## ✨ Recursos

### 🔤 **Fontes Especializadas**

Seleção de 5 fontes recomendadas para pessoas com dislexia:

- **OpenDyslexic** - Criada especificamente para dislexia
- **Lexend** - Baseada em pesquisas de legibilidade
- **Comic Sans MS** - Comprovadamente eficaz para dislexia
- **Arial** - Simples e clara
- **Verdana** - Excelente legibilidade em telas

### 📏 **Régua de Leitura Interativa**

- Régua visual que acompanha o movimento do mouse ou toque na tela
- Destaca a linha atual com fundo semitransparente
- Ajuda a manter o foco e reduzir a perda de linha durante a leitura

### 🎨 **Formatação Otimizada**

- Espaçamento aumentado entre linhas (line-height: 1.8)
- Espaçamento entre letras (letter-spacing: 0.05em)
- Fundo em cor creme (#f5f5dc) para reduzir cansaço visual
- Tamanho de fonte adequado (18px)
- Largura de linha limitada (80ch) para facilitar a leitura

### 📱 **Interface Responsiva**

- Totalmente adaptável para desktop, tablet e mobile
- Suporte a touch para dispositivos móveis
- Design limpo e intuitivo

---

## 🛠 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

| Tecnologia       | Versão  | Descrição                                |
| ---------------- | ------- | ---------------------------------------- |
| **Next.js**      | 16.1.4  | Framework React para produção            |
| **React**        | 19.2.3  | Biblioteca para interfaces de usuário    |
| **TypeScript**   | 5.x     | Superset JavaScript com tipagem estática |
| **Tailwind CSS** | 4.x     | Framework CSS utility-first              |
| **Lucide React** | 0.562.0 | Biblioteca de ícones                     |

---

## 📦 Instalação

### Pré-requisitos

- Node.js 20.x ou superior
- npm, yarn, pnpm ou bun

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/BatistaFelipe/MeAjudeALer.git
cd MeAjudeALer
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📜 Scripts Disponíveis

| Script    | Comando         | Descrição                                |
| --------- | --------------- | ---------------------------------------- |
| **dev**   | `npm run dev`   | Inicia o servidor de desenvolvimento     |
| **build** | `npm run build` | Cria build otimizado para produção       |
| **start** | `npm run start` | Inicia o servidor de produção            |
| **lint**  | `npm run lint`  | Executa verificação de código com ESLint |

---

## 🎯 Como Usar

1. **Cole ou digite seu texto** na área "Texto Original" à esquerda
2. **Selecione uma fonte** usando o seletor no topo da área "Leitura Facilitada"
3. **Mova o mouse ou toque na tela** sobre o texto formatado para ativar a régua de leitura
4. **Leia com mais conforto** aproveitando a formatação otimizada

### Dicas de Uso

- Experimente diferentes fontes para descobrir qual funciona melhor para você
- Use a régua de leitura movendo o mouse lentamente sobre o texto
- Em dispositivos móveis, deslize o dedo sobre o texto para ativar a régua
- Use o botão "Limpar" para remover o texto e começar novamente

---

## 📁 Estrutura do Projeto

```
MeAjudeALer/
├── app/
│   ├── layout.tsx          # Layout raiz da aplicação
│   └── page.tsx            # Página principal (DyslexiaReader)
├── public/
│   ├── css/
│   │   └── globals.css     # Estilos globais
│   └── images/             # Imagens e ícones
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.js      # Configuração Tailwind CSS
├── next.config.ts          # Configuração Next.js
└── README.md               # Documentação
```

---

## 🎨 Recursos de Acessibilidade

### Cores e Contraste

- Fundo creme (#f5f5dc) que reduz o brilho da tela
- Texto em cinza escuro (#333) para bom contraste sem ser preto puro
- Régua de leitura com destaque amarelo suave

### Tipografia

- Todas as fontes foram selecionadas com base em pesquisas sobre legibilidade para dislexia
- Tamanho de fonte generoso (18px)
- Espaçamento adequado entre caracteres e linhas

### Usabilidade

- Interface intuitiva sem necessidade de tutorial
- Suporte completo a teclado e leitores de tela
- Sem anúncios ou distrações

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Se você deseja melhorar o MeAjudeALer:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feat/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feat/nova-funcionalidade`)
5. Abra um Pull Request

### Formato de Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `refactor:` Refatoração de código
- `docs:` Mudanças na documentação
- `test:` Adição ou modificação de testes
- `chore:` Tarefas de manutenção

---

## 📄 Licença

Este projeto é de código aberto e está disponível gratuitamente para uso pessoal e educacional.

---

## 👤 Autor

**Felipe Batista**

- Website: [felipebatista.dev](https://felipebatista.dev)
- GitHub: [@BatistaFelipe](https://github.com/BatistaFelipe)

---

## 💙 Agradecimentos

Obrigado por usar o MeAjudeALer! Esta ferramenta foi criada com carinho para ajudar a tornar a leitura mais acessível para todos.

Se este projeto te ajudou, considere dar uma ⭐ no repositório!

## 🤝 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/CarlosEduJs">
        <img src="https://github.com/CarlosEduJs.png" width="100px;" alt="Foto do CarlosEduJs"/><br />
        <sub><b>CarlosEduJs</b></sub>
      </a>
    </td>
  </tr>
</table>

<div align="center">
  <sub>Feito com ❤️ por <a href="https://felipebatista.dev">Felipe Batista</a></sub>
</div>
