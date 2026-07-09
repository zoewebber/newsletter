# Newsletter123

<p align="center">
  <strong>Aplikacja newsletterowa z frontem w React i backendem w Express.</strong>
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-14.3-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=222" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

---

## Spis treści

- [O projekcie](#o-projekcie)
- [Stack technologiczny](#stack-technologiczny)
- [Wymagania](#wymagania)
- [Konfiguracja](#konfiguracja)
- [Uruchomienie lokalne](#uruchomienie-lokalne)
- [Migracje bazy danych](#migracje-bazy-danych)
- [Struktura projektu](#struktura-projektu)

## O projekcie

Newsletter123 to prosta aplikacja do obsługi subskrypcji newslettera. Projekt składa się z dwóch części:

- `backend/` - API oparte o Express, TypeORM i PostgreSQL.
- `front/` - aplikacja React uruchamiana przez Vite.

## Stack technologiczny

| Warstwa | Technologie |
| --- | --- |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeORM, TypeScript |
| Baza danych | PostgreSQL |
| Testy i jakość | Vitest, Testing Library, ESLint, Prettier |

## Wymagania

Przed startem upewnij się, że masz zainstalowane:

- Node.js `>= 16`
- PostgreSQL `14.3`
- npm

## Konfiguracja

1. Utwórz pustą bazę danych PostgreSQL.
2. Skonfiguruj połączenie z bazą danych dla backendu.

Backend odczytuje konfigurację z pliku `.env` przez `dotenv`. Wartości są używane w `backend/src/data-source.ts`.

Przykładowa konfiguracja:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=newsletter
```

## Uruchomienie lokalne

### Backend

```bash
cd backend
npm i
npm run start
```

Domyślnie API startuje z pliku `src/index.ts`.

### Frontend

```bash
cd front
npm i
npm run dev
```

Po uruchomieniu Vite pokaże w terminalu lokalny adres aplikacji.

## Migracje bazy danych

Wszystkie komendy migracji uruchamiaj z katalogu `backend/`.

### Generowanie migracji

```bash
npm run generate
```

### Wykonywanie migracji

```bash
npm run migrate
```

### Cofanie ostatniej migracji

```bash
npm run revert
```

## Struktura projektu

```text
.
|-- backend/            # API, encje i migracje TypeORM
|-- front/              # Aplikacja React/Vite
|-- docker-compose.yml  # Usługi kontenerowe projektu
`-- README.md
```

---

<p align="center">
  Gotowe na czyste subskrypcje i szybkie lokalne uruchomienie.
</p>
