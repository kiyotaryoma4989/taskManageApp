# README

This README would normally document whatever steps are necessary to get the
application up and running.
# TaskFlow(タスク管理アプリ)

このアプリは Ruby on Rails と MySQL(今のところ) を用いたタスク管理システムです。  
シンプルなUIでタスクを作成・編集・削除できます。

---

## ✅ 動作環境

- Ruby: 3.2.8
- Rails: 7.1.5
- MySQL: 8.0
- Node.js: 22.17.0
- Yarn または npm

---

## 📦 セットアップ手順

```bash
git clone https://github.com/kiyotaryoma4989/taskManageApp.git
cd taskManageApp
bundle install
yarn install
cp .env.example .env   # .env を準備
rails db:setup
