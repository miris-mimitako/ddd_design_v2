# Review Checklist

## 目的

この文書は、仕様書レビュー時に確認すべき観点を定義する。

レビューの目的は、情報量を増やすことではなく、**責務分離を崩さないこと**である。

## 必須確認項目

### 1. 意図が書かれているか

- この仕様は何のために必要か
- 背景が書かれているか
- 制約理由が説明されているか

### 2. 振る舞いを書きすぎていないか

- テストで表現すべき内容を文書で詳細列挙していないか
- 正常系、異常系、境界値を文書側で抱え込みすぎていないか

### 3. 用語が一貫しているか

- `20_ubiquitousLanguage` と一致しているか
- 同じ意味に複数語を使っていないか
- UI 名、業務名、DB 名が混線していないか

### 4. 技術都合が混入していないか

- ORM や SQL の事情を業務ルールに書いていないか
- API の形式制約を業務制約として誤記していないか
- フレームワーク都合で概念を歪めていないか

### 5. 依存方向を壊していないか

- ドメイン記述に UI 都合が入っていないか
- ドメイン記述に DB 都合が入っていないか
- Application の手順を業務ルールと混同していないか

### 6. テストへ接続できるか

- 関連テストが想像できるか
- 重要ルールに対応するテストが必要だと分かるか
- 文書だけ更新して終わる構造になっていないか

### 7. 粒度が適切か

- 1文書1責務になっているか
- 1項目に複数ルールを詰め込みすぎていないか
- 読み手が判断を見失わない構成か

### 8. Application が framework 非依存になっているか

- Application が framework exception を import していないか
- HTTP status 決定を Application が持っていないか
- request / response 型を Application が知らないか

### 9. primitive 排斥が境界まで維持されているか

- Application input / output が無名 primitive へ崩れていないか
- frontend の session / api response / view model が意味のない primitive 束になっていないか
- 業務値の意味が型名または別名で保たれているか

### 10. Domain UT が存在するか

- Domain 実装の近傍に `*.spec.*` があるか
- Application test だけで Domain の正しさを代用していないか
- Domain の不変条件を直接検証できるか

### 11. Storybook の粒度が適切か

- Story が小さな component 単位から積み上がっているか
- 複合 component だけで Story を済ませていないか
- 内部 state を抱えた大きな component を最小単位として扱っていないか
- 画面を構成する主要部品まで Story で辿れるか

### 12. 自動差し戻し条件に該当していないか

- `application/logic` に `@nestjs/` import がないか
- `application/logic` に `infrastructure/logic` import がないか
- `domain/logic` に framework import がないか
- `domain/logic` に `*.spec.*` があるか
- `tests/it/` が placeholder で埋まっていないか
- `frontend/stories/` に `Input` `Button` `Field` 相当の Story があるか
- `userId: string` のような業務値 primitive が Domain / Application に残っていないか

## 差し戻し基準

次のどれかに当てはまる場合、差し戻し対象とする。

- 意図ではなく手順書になっている
- テストケース集になっている
- 用語が揺れている
- 技術実装の説明が中心になっている
- 重要な例外条件が背景なしで書かれている
- 更新しても影響範囲が追えない
- Application が framework exception に依存している
- primitive 排斥が Domain 入口で止まり、Application や frontend 境界で崩れている
- Domain 実装に対する domain 近傍 UT が存在しない
- Storybook が複合 component だけで構成され、小さな component 契約を確認できない
- placeholder test しかない IT が置かれている
- 自動差し戻し条件に該当しているのに完了扱いにしている

## レビューコメントの書き方

レビューコメントは次の観点で書く。

- 何が問題か
- それは責務分離のどこを壊すか
- どこへ移すべきか

良いコメント例:

- この段落は振る舞いの列挙なので、文書ではなく `120_testRules` に従ってテストへ寄せたほうがよい
- この用語は `20_ubiquitousLanguage` の定義と不一致
- この制約は DB 都合に見えるので、業務ルールとしては弱い

悪いコメント例:

- なんとなく違和感がある
- ちょっと細かすぎる
- わかりにくい

## 完了条件

レビュー完了とみなす条件は次の通り。

- 意図と制約が残っている
- 振る舞いは必要以上に文書化されていない
- 用語の揺れがない
- テストとの接続可能性がある
- DDD と DIP の依存方向を壊していない
- Application が framework 非依存である
- primitive 排斥が Application / frontend 境界まで維持されている
- Domain UT が domain 近傍に存在する
- Storybook が小さな component 単位から積み上がっている
- 自動差し戻し条件に 1 つも該当しない
