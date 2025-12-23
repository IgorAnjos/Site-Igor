# 🎨 Portfólio Moderno - Igor Macedo

Portfólio profissional reestruturado com HTML5 moderno, CSS com variáveis para temas e JavaScript com boas práticas.

## ✨ Características

### 🎯 HTML5 Semântico
- Uso correto de tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Estrutura clara e organizada
- Meta tags otimizadas para SEO
- Acessibilidade com ARIA labels

### 🎨 CSS Moderno
- **Sistema de Variáveis CSS**: Temas claro e escuro
- **Design Responsivo**: Mobile-first approach
- **Utilidades Modernas**: Flexbox e Grid
- **Componentes Reutilizáveis**: Cards, botões, formulários
- **Animações Suaves**: Transições e scroll reveal

### ⚡ JavaScript com Boas Práticas
- **ES6+ Features**: Classes, arrow functions, destructuring
- **Modular**: Código organizado em classes
- **Performance**: Debounce e throttle
- **Acessibilidade**: Suporte a teclado e screen readers
- **Error Handling**: Tratamento robusto de erros

## 🚀 Funcionalidades

### 🌓 Tema Claro/Escuro
- Alternância automática entre temas
- Persistência da preferência do usuário
- Detecção de preferência do sistema
- Transições suaves

### 📱 Menu Responsivo
- Menu mobile com hamburger
- Smooth scroll para seções
- Destaque da seção ativa
- Fecha automaticamente ao clicar fora

### 🎬 Animações
- Scroll reveal com Intersection Observer
- Fade in, slide in effects
- Otimizado para performance
- Respeita preferências de movimento reduzido

### 📧 Formulário de Contato
- Validação em tempo real
- Feedback visual
- Integração com Google Scripts
- Mensagens de erro amigáveis

## 📁 Estrutura do Projeto

```
Site-Igor/
├── index.html                 # HTML principal
├── css/
│   ├── variables.css          # Variáveis CSS e temas
│   ├── modern-reset.css       # Reset moderno
│   ├── modern-layout.css      # Sistema de layout
│   └── modern-components.css  # Componentes
├── js/
│   └── app.js                 # JavaScript principal
├── imagem/                    # Imagens do site
└── README.md                  # Documentação
```

## 🎨 Sistema de Temas

### Variáveis CSS Principais

```css
/* Cores Primárias */
--color-primary: #2563eb;
--color-secondary: #8b5cf6;
--color-accent: #f59e0b;

/* Espaçamento */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2rem;

/* Tipografia */
--font-family-base: 'Inter', sans-serif;
--font-family-heading: 'Poppins', sans-serif;
```

### Como Alternar Tema

O tema pode ser alternado de 3 formas:

1. **Botão de alternância**: Clique no botão de sol/lua no navbar
2. **Preferência do sistema**: O site detecta automaticamente
3. **localStorage**: A preferência é salva para próximas visitas

## 🔧 Classes Utilitárias

### Layout
```html
<div class="container">          <!-- Container responsivo -->
<div class="section">             <!-- Seção com espaçamento -->
<div class="grid md:grid-cols-2"> <!-- Grid responsivo -->
<div class="flex gap-md">         <!-- Flexbox com gap -->
```

### Espaçamento
```html
<div class="p-lg">     <!-- Padding large -->
<div class="m-xl">     <!-- Margin extra-large -->
<div class="gap-md">   <!-- Gap medium -->
```

### Componentes
```html
<button class="btn btn-primary">    <!-- Botão primário -->
<div class="card">                  <!-- Card -->
<input class="form-input">          <!-- Input de formulário -->
```

## 🎯 Boas Práticas Implementadas

### HTML
- ✅ Doctype correto e lang definido
- ✅ Meta tags para SEO e social media
- ✅ Estrutura semântica
- ✅ Atributos ARIA para acessibilidade
- ✅ Alt text em todas as imagens

### CSS
- ✅ Variáveis CSS para consistência
- ✅ Mobile-first approach
- ✅ Uso de custom properties
- ✅ BEM-like naming convention
- ✅ Animações com prefers-reduced-motion

### JavaScript
- ✅ Strict mode
- ✅ Classes ES6
- ✅ Event delegation
- ✅ Debounce/throttle
- ✅ Error handling
- ✅ Comments e documentação
- ✅ Intersection Observer API
- ✅ LocalStorage com try-catch

## 📱 Responsividade

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Exemplo de Uso
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 coluna no mobile, 2 no tablet, 3 no desktop -->
</div>
```

## ⚡ Performance

### Otimizações
- Preconnect para Google Fonts
- JavaScript com defer
- Lazy loading implícito de imagens
- CSS minimalista
- Intersection Observer para animações

### Acessibilidade
- Suporte completo a teclado
- ARIA labels
- Contraste adequado
- Focus visible
- Screen reader friendly

## 🌐 Navegadores Suportados

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)

## 📝 Licença

© 2017-2025 Igor Macedo dos Anjos - Todos os direitos reservados

## 🤝 Contato

- **Email**: igor.omax@gmail.com
- **WhatsApp**: (11) 94825-5689
- **LinkedIn**: [igor-macedo-4a60b779](https://www.linkedin.com/in/igor-macedo-4a60b779/)
- **Facebook**: [igor.omax](https://www.facebook.com/igor.omax)

---

Desenvolvido com ❤️ por Igor Macedo
