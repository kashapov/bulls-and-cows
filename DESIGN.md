# DESIGN.md

## 1. Структуры данных и алгоритмы

### Состояние игры

Игра хранится в иммутабельном объекте `GameState` (`src/game/types.ts`):

- `status`: `'idle' | 'playing' | 'won'` — явный этап раунда;
- `settings`: `{ length, base } | null` — настройки текущего раунда;
- `secret`: строка цифр (не число), чтобы корректно держать лидирующие нули вроде `0123`;
- `history`: массив `HistoryEntry` `{ guess, bulls, cows }`;
- `startedAt` / `finishedAt`: метки времени для подсчёта длительности.

Почему так:

- строковый секрет и попытки одинаково работают для bin/oct/dec/hex;
- история — массив записей, а не мутируемый список: каждое обновление создаёт новый массив (`[...history, entry]` в `submitGuess`, `src/game/state.ts`);
- статус отделён от UI: логика в `src/game/state.ts` не знает про DOM.

Таблица рекордов — массив `LeaderboardEntry` (`attempts`, `elapsedMs`, `length`, `base`, `recordedAt`). Один общий топ-10 сортируется по попыткам, при равенстве — по времени (`src/game/leaderboard.ts`), у каждой записи бейдж настроек.

### Алгоритм `evaluateGuess`

Файл: `src/game/evaluateGuess.ts`.

1. Нормализуем `secret` и `guess` через `toLowerCase` (hex `A`/`a` — одна цифра).
2. **Bulls**: `filter` по позициям, где цифры совпали.
3. Собираем позиции без bulls для секрета и попытки.
4. **Cows**: цифры попытки без bulls, которые есть среди оставшихся цифр секрета (`filter` + `includes`).

Цифры в секрете уникальны, поэтому отдельный учёт кратностей не нужен.

### Алгоритм `countPossibleSecrets`

Файл: `src/game/countPossibleSecrets.ts`.

Считаем число размещений без повторений `P(base, length) = base! / (base − length)!` рекурсией:

```
countPossibleSecrets(length, base) = base * countPossibleSecrets(length - 1, base - 1)
```

Базовые случаи:

- `length === 0` → `1` (одна пустая выборка);
- `length > base` / отрицательные аргументы → `0`.

Результат мемоизируется в `Map` по ключу `` `${length}:${base}` ``, потому что значение дергается при каждом открытии/смене настроек.

## 2. Сложность (Big O)

Пусть `n` — длина секрета/попытки (`length`, 2…6), `b` — основание системы (`base`, 2…16).

### `generateSecret` — `src/game/generateSecret.ts`

- Время: **O(n · b)**. Делаем `n` шагов; на шаге копируем/фильтруем текущий пул цифр размера до `b`.
- Память: **O(b)** на пул и накопленные цифры.

### `evaluateGuess` — `src/game/evaluateGuess.ts`

- Время: **O(n²)** в худшем случае: несколько проходов `O(n)` плюс для cows до `n` проверок `includes` по массиву длины до `n`.
- Память: **O(n)** на массивы цифр.

Для игровых ограничений `n ≤ 6` это практически константа, но асимптотика именно квадратичная из‑за `includes`.

### `isValidGuess` — `src/game/isValidGuess.ts`

- Время: **O(n · b)**. Проверка длины `O(1)`, затем `every` по `n` символам; предикат `createDigitValidator` ищет символ в алфавите длины `b`. Уникальность через `Set` — `O(n)`.
- Память: **O(n)** на массив символов и множество.

### `countPossibleSecrets` — `src/game/countPossibleSecrets.ts`

- Первый расчёт пары `(length, base)`: **O(n)** по времени (цепочка из `n` рекурсивных умножений) и **O(n)** по стеку.
- Повторный вызов той же пары: **O(1)** благодаря `Map`-кэшу.
- Память кэша растёт с числом различных запрошенных пар `(length, base)`; в рамках UI это небольшой константный набор.

## 3. Принципы чистого кода

Примеры из этого проекта (не абстрактно):

1. **Meaningful names** — `evaluateGuess`, `createDigitValidator`, `countPossibleSecrets`, `submitGuess` прямо называют намерение; поля `bulls`/`cows` совпадают с предметной областью.
2. **Small / single-purpose functions** — валидация цифры (`createDigitValidator`), валидация попытки (`isValidGuess`), сравнение (`evaluateGuess`) и обновление состояния (`submitGuess`) разведены по разным модулям в `src/game/`.
3. **DRY** — алфавит системы один раз в `getAlphabet` (`src/game/alphabet.ts`) и переиспользуется валидатором и генератором секрета; подписи bin/oct/dec/hex — в `BASE_OPTIONS` (`src/ui/settings.ts`).
4. **Pure functions / no unexpected side effects** — ядро игры не трогает DOM; `generateSecret` получает `random` параметром, поэтому детерминированно тестируется.
5. **Immutability** — `submitGuess` возвращает новый `GameState` и новый `history`, без `push` по существующему массиву (`src/game/state.ts`).
6. **Separation of concerns** — `src/game/*` (логика) отделён от `src/ui/*` (рендер через DOM API без `innerHTML`); persist рекордов изолирован в `src/game/leaderboard.ts`.
7. **Fail fast / guard clauses** — в `isValidGuess` сразу отказ при неверной длине; в `submitGuess` ранний выход, если статус не `playing` или попытка уже была.
