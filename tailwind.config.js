/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Paleta de cores personalizada para o tema
        blue: {
          400: "#4da3ff", // Azul claro para destaques
          500: "#0066ff", // Azul principal
          600: "#0055d4", // Azul médio para botões
          700: "#0044a8", // Azul escuro para hover
          800: "#003380", // Azul muito escuro
          900: "#00255c", // Azul quase preto
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Animações padrão do shadcn/ui
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Animações personalizadas
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        // Animação de flutuação para elementos
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Rotação lenta para elementos
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // Efeitos de glitch para estética tecnológica
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "glitch-layer1": {
          "0%": { transform: "translate(-2px, 2px)" },
          "25%": { transform: "translate(2px, -2px)" },
          "50%": { transform: "translate(-1px, 1px)" },
          "75%": { transform: "translate(1px, -1px)" },
          "100%": { transform: "translate(-2px, 2px)" },
        },
        "glitch-layer2": {
          "0%": { transform: "translate(2px, -2px)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(1px, -1px)" },
          "75%": { transform: "translate(-1px, 1px)" },
          "100%": { transform: "translate(2px, -2px)" },
        },
        // Efeito de cintilação de texto
        "text-flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: 1 },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: 0.33 },
        },
      },
      animation: {
        // Animações padrão do shadcn/ui
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Animações personalizadas
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "pulse-slow": "pulse-slow 3s infinite",
        "bounce-slow": "bounce-slow 3s infinite",
        "cursor-blink": "cursor-blink 1s infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 10s linear infinite",
        glitch: "glitch 0.5s ease-in-out",
        "glitch-layer1": "glitch-layer1 0.5s ease-in-out infinite",
        "glitch-layer2": "glitch-layer2 0.5s ease-in-out infinite",
        "text-flicker": "text-flicker 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

