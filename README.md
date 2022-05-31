# Newsletter

## Wymagane

- Postgres 14.3
- Node >=16


## Przed uruchomieniem projektu

- Stworzyć pustą bazę danych
- Zaktualizować konfiguracje w /backend/src/data-source.ts

## Uruchomienie projektu

### Backend
Przejść do folderu /backend i wykonać komendy:

    npm i
    npm run start

### Frontend
Przejść do folderu /frontend i wykonać komendy:

    npm i
    npm run dev

## Migracja bazy danych
Generowanie migracji na podstawie zaktualizowanego modelu:

    npm run generate

Wykonywanie migracji na bazie danych:

    npm run migrate

Cofanie wykonanych migracji:

    npm run revert
