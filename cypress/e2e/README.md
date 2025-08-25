# 🧪 Testes E2E Simplificados - Medical Vide

## 📋 Visão Geral

Este projeto utiliza **Cypress** para testes end-to-end simplificados, focando apenas nas funcionalidades essenciais. Os testes foram projetados para serem **mínimos e eficientes** enquanto garantem a funcionalidade básica do aplicativo.

## 🎯 Princípios de Simplificação

1. **Foco no Essencial**
   - Testar apenas os fluxos principais de cada funcionalidade
   - Reduzir a quantidade de testes para maior eficiência
   - Manter o padrão de nomeação "NOME DA ROTA - NOME DO TESTE" para screenshots

2. **Objetividade**
   - Usar seletores flexíveis com expressões regulares (ex: `/Agendar|Agendar Consulta/i`)
   - Evitar testes de navegação que possam falhar devido a mudanças na UI
   - Verificar apenas elementos e comportamentos críticos

3. **Robustez**
   - Evitar dependência de textos exatos que podem mudar
   - Focar em seletores de elementos mais estáveis
   - Limpar adequadamente o estado entre testes

## 🚀 Testes Essenciais

### 🔐 **Autenticação**
- **Login**: Validação de formulário, login com diferentes papéis
- **Registro**: Validação de formulário, criação de conta
- **Esqueci a Senha**: Submissão de e-mail, reenvio de e-mail

### 👤 **Área do Paciente**
- **Dashboard**: Exibição de elementos principais (sem testes de navegação)
- **Informações Complementares**: Preenchimento e submissão do formulário
- **Agendamento**: Seleção de especialidade, médico e horário

### 👨‍⚕️ **Área do Médico**
- **Dashboard**: Exibição de elementos principais (calendário e configurações)
- **Informações Complementares**: Preenchimento e submissão do formulário profissional

### 👑 **Área do Admin**
- **Dashboard**: Exibição da interface de gerenciamento de usuários
- **Criar Usuário**: Preenchimento e submissão do formulário de criação
- **Formulário de Usuário**: Validação e interação com o formulário

## 📸 Screenshots nos Testes

Todos os testes utilizam a função `cy.screenshotStep()` para capturar imagens em momentos importantes:

```typescript
// Exemplo de uso
cy.screenshotStep('pagina-inicial');
```

Os screenshots seguem o padrão de nomeação:
- `general/<spec> - <nome do teste>/<etapa>.png`

Exemplos:
- `general/login - should display login form and validate inputs/pagina-inicial.png`
- `general/dashboard - should display dashboard elements/dashboard-inicial.png`

## 🛠️ Como Executar os Testes

### **Executar apenas os testes essenciais:**

```bash
make cypress-essential
```

### **Modo interativo (desenvolvimento):**

```bash
make cypress
```

## 💡 Boas Práticas

1. **Teste apenas o fluxo principal** (happy path)
2. **Use seletores flexíveis** que não dependam de texto exato
3. **Evite testes de navegação** que podem falhar com mudanças na UI
4. **Adicione screenshots** em pontos importantes com nomes descritivos:
   ```typescript
   // Nomeia o screenshot como "spec - nome do teste/etapa"
   cy.screenshotStep('etapa-do-teste');
   ```
5. **Mantenha os testes independentes** com limpeza adequada no `beforeEach`

---

**⚠️ Nota**: Estes testes foram simplificados para maior eficiência e estabilidade. Eles focam apenas na verificação de funcionalidades essenciais e evitam testes de navegação complexos que podem falhar devido a mudanças na UI.
