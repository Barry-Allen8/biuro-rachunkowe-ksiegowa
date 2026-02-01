
# Biuro Rachunkowe Księgowa Dla Ciebie - Website

Ten projekt to wysokiej klasy strona typu Landing Page dla biura rachunkowego w Bydgoszczy.

## 🛠 Stos Technologiczny

### Główne Technologie (stan na luty 2026)

#### Frontend Framework
- **React** `^19.2.4` (najnowsza wersja stabilna)
  - react-dom `^19.2.4`
  - Wsparcie: Active & Security support
  - Nowości w React 19: View transitions, Activity APIs, ulepszone concurrent features

#### Build Tool
- **Vite** `^7.3.1` (najnowsza wersja stabilna)
  - Ultra-szybki development server
  - Optymalizacja produkcyjna z rollup
  - Hot Module Replacement (HMR)

#### TypeScript
- **TypeScript** `~5.9.3` (najnowsza wersja stabilna)
  - Pełne typowanie dla bezpieczeństwa kodu
  - Niebawem: TypeScript 6.0 i 7.0 (2026)

#### Stylizacja
- **Tailwind CSS** `^4.1.18` (najnowsza wersja stabilna)
  - Nowości w v4: CSS-first configuration
  - Oxide performance engine dla szybszych buildów
  - OKLCH kolory domyślnie
  - Wsparcie: Safari 16.4+, Chrome 111+, Firefox 128+

#### Animacje i Interakcje
- **Framer Motion** `^12.29.2` (najnowsza wersja stabilna)
  - Płynne animacje i przejścia
  - Optymalizacja wydajności

### Narzędzia Deweloperskie

#### CSS Processing
- **PostCSS** `^8.5.6` (najnowsza wersja stabilna)
- **Autoprefixer** `^10.4.24` (najnowsza wersja stabilna)
  - Automatyczne dodawanie vendor prefixes
  - Wsparcie dla starszych przeglądarek

#### TypeScript & Node
- **@types/node** `^22.14.0`
- **@vitejs/plugin-react** `^5.0.0`

### Wymagania Systemowe
- **Node.js**: v18.0.0 lub wyżej (zalecane: v20+ LTS)
- **npm**: v9.0.0 lub wyżej
- **Przeglądarki**: 
  - Safari 16.4+
  - Chrome 111+
  - Firefox 128+

## ⚠️ Uwagi dotyczące aktualizacji

### Tailwind CSS v4 - Ważne zmiany

**Tailwind CSS v4** wprowadza **breaking changes** (zmiany niekompatybilne wstecz):

> [!WARNING]
> **CSS-first Configuration**: Tailwind v4 używa konfiguracji opartej na CSS zamiast JavaScript. 
> Plik `tailwind.config.js` zostanie zastąpiony dyrektywą `@theme` bezpośrednio w CSS.

#### Kroki migracji z v3 do v4:
1. **Użyj oficjalnego narzędzia migracji**: Tailwind dostarcza upgrade tool
2. **Konfiguracja przenoszona do CSS**: Design tokens z `tailwind.config.js` migrują do `@theme` w CSS
3. **Zmienne CSS**: Wszystkie tokeny są teraz dostępne jako natywne zmienne CSS
4. **Wsparcie przeglądarek**: Wymaga Safari 16.4+, Chrome 111+, Firefox 128+

**Jeśli potrzebujesz wsparcia dla starszych przeglądarek**, pozostań na Tailwind CSS v3.4.

#### Linki pomocnicze:
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind CSS v4 Migration Tool](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool)

## � Instalacja i aktualizacja zależności

### Instalacja projektu
```bash
# Instalacja wszystkich zależności
npm install
```

### Aktualizacja do najnowszych wersji
```bash
# Aktualizacja wszystkich pakietów do najnowszych wersji
npm update

# Lub użyj narzędzia do aktualizacji interaktywnej
npx npm-check-updates -u
npm install
```

### Uruchomienie lokalnie
```bash
# Uruchomienie development servera
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

## �🚀 Wdrożenie produkcyjne

Strona jest przygotowana do wdrożenia na darmowych lub tanich platformach typu **Vercel**, **Netlify** lub **GitHub Pages**.

1. Wgraj pliki do repozytorium GitHub.
2. Podłącz repozytorium do Vercel.com.
3. Strona zostanie automatycznie opublikowana z certyfikatem SSL.

## 🛠 Edycja treści (bez programisty)

Wszystkie kluczowe informacje znajdują się w pliku `data/content.ts`. Możesz tam edytować:
- Nazwę firmy i dane kontaktowe
- Godziny otwarcia
- Opisy usług
- Argumenty "Dlaczego my?"

## 🧮 Kalkulator

Logika kalkulatora znajduje się w `components/Calculator.tsx`. Ceny są obliczane dynamicznie na podstawie typu działalności, liczby faktur i pracowników. Algorytm można łatwo dostosować zmieniając wartości `base` w funkcji `useMemo`.

## 📈 SEO

Strona posiada wbudowaną strukturę JSON-LD (Schema.org), która pomaga Google wyświetlać biuro w mapach i wynikach lokalnych dla fraz takich jak "Księgowa Bydgoszcz" czy "Biuro rachunkowe Nakielska".
