# エレガントレスバ ダウンロード・インストール手順

## 📦 ダウンロード内容

このZIPファイルには以下が含まれています：

### 📁 プロジェクト構成
```
elegant-resba-django-fastapi-complete.zip
├── elegant-resba-django-fastapi/     # Django+FastAPI統合バックエンド
├── elegant-resba-react-frontend/     # Reactフロントエンド
├── README.md                         # プロジェクト概要
├── SETUP_GUIDE.md                    # 詳細セットアップガイド
├── API_SPECIFICATION.md              # API仕様書
├── django_fastapi_integrated_summary.md  # 開発レポート
├── CHANGELOG.md                      # 変更履歴
└── DOWNLOAD_INSTRUCTIONS.md          # この手順書
```

## 🚀 クイックスタート（5分で起動）

### 1. ファイルの解凍
```bash
# ZIPファイルを任意のフォルダに解凍
unzip elegant-resba-django-fastapi-complete.zip
cd elegant-resba-download
```

### 2. バックエンドの起動
```bash
# バックエンドディレクトリに移動
cd elegant-resba-django-fastapi

# Python仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt

# サーバーを起動
python src/main.py
```

**✅ バックエンド起動完了**: http://localhost:5000

### 3. フロントエンドの起動（新しいターミナル）
```bash
# フロントエンドディレクトリに移動
cd elegant-resba-react-frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

**✅ フロントエンド起動完了**: http://localhost:5173

## 🎮 ゲームの開始

1. **ブラウザでアクセス**: http://localhost:5173
2. **ホームページ**: ゲームの説明を確認
3. **ゲームロビー**: マッチング機能を試す
4. **ゲームルーム**: 実際にプレイ
5. **プロフィール**: 統計情報を確認

## 📡 API テスト

バックエンドAPIを直接テストできます：

### お題生成
```bash
curl http://localhost:5000/api/topics/random
```

### カード取得
```bash
curl http://localhost:5000/api/cards/random
```

### 統計情報
```bash
curl http://localhost:5000/api/stats/demo
```

## 🔧 カスタマイズ

### お題の追加
`src/main.py` の `ELEGANT_TOPICS` リストに追加：

```python
ELEGANT_TOPICS = [
    "あなたのコーヒーの淹れ方...少し控えめですね",
    "新しいお題をここに追加",  # ← 追加
    # ... 他のお題
]
```

### カードの追加
`src/main.py` の `ELEGANT_CARDS` リストに追加：

```python
ELEGANT_CARDS = [
    # 既存のカード...
    {"id": 19, "name": "新しいカード", "type": "humor", "text": "新しい返し", "rarity": 3, "effect": 6},
]
```

### UI のカスタマイズ
`elegant-resba-react-frontend/src/components/` 内のファイルを編集

## 🚀 本番デプロイ

### Heroku デプロイ
```bash
# Heroku CLI をインストール後
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Vercel デプロイ（フロントエンド）
```bash
npm install -g vercel
cd elegant-resba-react-frontend
vercel --prod
```

### Docker デプロイ
```bash
# Dockerfile を作成後
docker build -t elegant-resba .
docker run -p 5000:5000 elegant-resba
```

## 📚 詳細ドキュメント

- **SETUP_GUIDE.md**: 詳細なセットアップ手順
- **API_SPECIFICATION.md**: 完全なAPI仕様
- **README.md**: プロジェクト全体の概要
- **CHANGELOG.md**: バージョン履歴

## 🐛 トラブルシューティング

### よくある問題

#### Python が見つからない
```bash
# Python3 を明示的に指定
python3 -m venv venv
```

#### ポートが使用中
```bash
# 別のポートを使用
python src/main.py  # main.py内でポート番号を変更
```

#### Node.js 依存関係エラー
```bash
# キャッシュをクリア
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### データベースエラー
```bash
# データベースディレクトリを作成
mkdir -p src/database
```

## 💡 開発のヒント

### 開発モード
- **バックエンド**: `debug=True` でホットリロード
- **フロントエンド**: `npm run dev` で自動リロード

### デバッグ
- **ブラウザ開発者ツール**: F12でコンソール確認
- **ネットワークタブ**: API通信を監視
- **Pythonログ**: ターミナルでエラー確認

### パフォーマンス
- **本番ビルド**: `npm run build` で最適化
- **Gunicorn**: 本番環境でのWSGIサーバー

## 🤝 コミュニティ

### サポート
- **GitHub Issues**: バグ報告・機能要望
- **Discord**: リアルタイムサポート
- **フォーラム**: 開発者コミュニティ

### コントリビューション
1. フォーク
2. 機能ブランチ作成
3. 変更をコミット
4. プルリクエスト作成

## 📄 ライセンス

MIT License - 自由に使用・改変・配布可能

## 🎊 完了！

これで「エレガントレスバ」の完全版があなたのパソコンで動作します！

**楽しいゲーム体験をお楽しみください！**

---

**開発者**: Manus AI Agent  
**バージョン**: 2.0.0 (Django+FastAPI統合版)  
**サポート**: GitHub Issues

何か問題が発生した場合は、SETUP_GUIDE.md の詳細手順を参照するか、サポートにお問い合わせください。

