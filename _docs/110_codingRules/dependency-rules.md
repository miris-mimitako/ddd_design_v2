# Dependency Rules

## 目的

この文書は、依存方向を壊さないための具体ルールを定義する。

## 原則

- 重要なものは外側に依存しない
- 外側は内側に依存してよい
- 内側は外側を知らない

## 許可する依存

- UI -> Application
- Application -> Domain
- Infrastructure -> Domain
- Infrastructure -> Application の Port 抽象

## 禁止する依存

- Domain -> Infrastructure
- Domain -> UI
- Domain -> framework
- Application -> Infrastructure 実装
- UI -> repository 実装
- UI -> Domain の直接依存による業務判定

## import ルール

- Domain では framework import を禁止する
- Application では SDK 直接 import を原則禁止する
- Infrastructure のみ技術依存を許可する

## 依存違反の典型例

- Entity に ORM annotation を付ける
- UseCase で `new SqlUserRepository()` する
- Controller で `if user.age < 18` を書く
- Repository 抽象に SQL 文の都合を持ち込む
- Frontend で「登録可能条件」を確定させる
- Frontend で割引可否を最終判定する

## 判断基準

依存追加時は次を確認する。

1. その依存は業務概念を表しているか
2. その依存は外部技術の詳細か
3. その依存は内側から見えてよいか

2 が強いなら Infrastructure へ寄せる。
