# エレガントレスバ - Django+FastAPI 統合版

上品な皮肉とユーモアで競い合う Web アプリケーション

## 📋 プロジェクト概要

「エレガントレスバ」は、下品な罵倒ではなく、知的で洗練された表現で相手を打ち負かすことを目的としたゲームです。Django 風のユーザー管理と FastAPI 風の高性能ゲームロジックを統合した革新的な Web アプリケーションです。

## 🏗️ アーキテクチャ

### 技術スタック

- **バックエンド**: Flask（Django+FastAPI 統合）
- **フロントエンド**: React + Tailwind CSS
- **データベース**: SQLite（SQLAlchemy ORM）
- **認証**: Flask-Session + Werkzeug Security
- **API**: RESTful JSON API

### プロジェクト構成

```
elegant-resba-download/
├── elegant-resba-django-fastapi/    # Django+FastAPI統合バックエンド
│   ├── src/
│   │   ├── main.py                  # メインアプリケーション
│   │   ├── models/                  # データベースモデル
│   │   ├── routes/                  # APIルート
│   │   └── static/                  # 静的ファイル
│   ├── venv/                        # Python仮想環境
│   └── requirements.txt             # Python依存関係
├── elegant-resba-react-frontend/    # Reactフロントエンド
│   ├── src/
│   │   ├── App.jsx                  # メインコンポーネント
│   │   └── components/              # Reactコンポーネント
│   ├── package.json                 # Node.js依存関係
│   └── vite.config.js               # Vite設定
└── docs/                            # ドキュメント
```

## 🚀 セットアップ手順

### 1. 必要な環境

- Python 3.11 以上
- Node.js 18 以上
- npm または yarn

### 2. バックエンドセットアップ

```bash
# プロジェクトディレクトリに移動
cd elegant-resba-django-fastapi

# 仮想環境を作成・有効化
python -m venv venv
source venv/bin/activate  # Linux/Mac
# または
venv\Scripts\activate     # Windows

# 依存関係をインストール
pip install -r requirements.txt

# アプリケーションを起動
python src/main.py
```

バックエンドは http://localhost:5000 で起動します。

### 3. フロントエンドセットアップ

```bash
# フロントエンドディレクトリに移動
cd elegant-resba-react-frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

フロントエンドは http://localhost:5173 で起動します。

## 🎮 ゲーム機能

### 1. お題生成システム

- **16 種類のエレガントなお題**
- **4 つのカテゴリ**: ライフスタイル、趣味・嗜好、性格・価値観、習慣・こだわり
- **自動カテゴリ判定**

### 2. カードシステム

- **18 種類の返しカード**
- **5 段階のレア度システム**（効果値 2-13）
- **カードタイプ**: ユーモア、皮肉、比喩、特殊、レジェンド

### 3. AI 採点システム

- **3 軸評価**: ユーモア、皮肉、エレガンス（各 4-10 点）
- **総合スコア**: 12-30 点
- **コンテンツ分析**: キーワードによる補正
- **長さ補正**: 文章の長さによる調整

### 4. ユーザー管理（Django 風）

- ユーザー登録・ログイン・ログアウト
- プロフィール管理
- 統計情報（勝率、平均スコア、連勝記録）
- 称号・実績システム

## 📡 API エンドポイント

### 認証系

- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン
- `POST /api/auth/logout` - ログアウト
- `GET /api/users/profile` - プロフィール取得

### ゲーム系

- `GET /api/topics/random` - ランダムお題生成
- `GET /api/topics/categories` - カテゴリ一覧
- `POST /api/scoring/score_response` - AI 採点
- `GET /api/cards/random` - ランダムカード取得
- `GET /api/game/demo` - デモゲーム情報

### 統計系

- `GET /api/stats/demo` - デモ統計情報

## 🎯 ゲームの特徴

### エレガントなポイント

1. **上品な表現**: 罵倒や下品ワードは一切使用しない
2. **知的なユーモア**: 機知に富んだ表現で勝負
3. **洗練された皮肉**: 品のある辛辣さ
4. **比喩の美学**: 詩的で美しい表現

### ゲームフロー

1. **マッチング**: 好きと嫌いが正反対のペア同士
2. **お題生成**: 相手の特徴を反映した自動生成
3. **カード選択**: 手持ちカードから最適な返しを選択
4. **AI 採点**: 3 つの観点で多角的評価
5. **勝敗決定**: 5 ターン終了後の総合得点で判定

## 🔧 開発・カスタマイズ

### バックエンド開発

- `src/main.py`: メインアプリケーション
- Django 風モデル定義でデータベース設計
- FastAPI 風の高性能 API 実装
- SQLAlchemy ORM によるデータ操作

### フロントエンド開発

- React + Vite による高速開発
- Tailwind CSS によるレスポンシブデザイン
- コンポーネントベースの設計
- API 連携による動的コンテンツ

### データベース

- SQLite（開発用）
- PostgreSQL/MySQL 対応可能
- マイグレーション機能
- 管理画面対応

## 🚀 デプロイ

### 本番環境

- **現在のデプロイ URL**: https://j6h5i7cg8nel.manus.space
- **プラットフォーム**: Manus Cloud
- **HTTPS 対応**: 完了
- **CORS 設定**: フロントエンド統合対応

### 他のプラットフォームへのデプロイ

- Heroku
- Vercel
- AWS
- Google Cloud Platform
- Docker 対応

## 📚 ドキュメント

### 開発ドキュメント

- `docs/API_SPECIFICATION.md` - API 仕様書
- `docs/SETUP_GUIDE.md` - 詳細セットアップガイド
- `docs/DEVELOPMENT_GUIDE.md` - 開発ガイド
- `docs/DEPLOYMENT_GUIDE.md` - デプロイガイド

### ゲーム仕様

- `docs/GAME_RULES.md` - ゲームルール詳細
- `docs/CARD_SYSTEM.md` - カードシステム仕様
- `docs/SCORING_SYSTEM.md` - 採点システム仕様

## 🤝 コントリビューション

### 開発に参加する

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 報告・提案

- バグ報告
- 機能提案
- ドキュメント改善
- UI/UX 改善

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🙏 謝辞

- Django コミュニティ
- FastAPI コミュニティ
- React コミュニティ
- オープンソースコミュニティ

## 📞 サポート

### 技術サポート

- GitHub Issues
- 開発者コミュニティ
- ドキュメント

### ゲームサポート

- ゲームルール説明
- 戦略ガイド
- コミュニティフォーラム

---

**開発者**: Manus AI Agent  
**バージョン**: 2.0.0 (Django+FastAPI 統合版)  
**最終更新**: 2025 年 9 月 12 日

上品で知的なレスバゲームをお楽しみください！
