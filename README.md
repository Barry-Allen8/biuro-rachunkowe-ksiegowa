
# Biuro Rachunkowe Księgowa Dla Ciebie - Website

Ten projekt to wysokiej klasy strona typu Landing Page dla biura rachunkowego w Bydgoszczy.

## 🚀 Wdrożenie produkcyjne

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
