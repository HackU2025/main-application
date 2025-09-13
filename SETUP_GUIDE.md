# エレガントレスバ セットアップガイド

## 🚀 クイックスタート

### 必要な環境
- **Python**: 3.11以上
- **Node.js**: 18以上
- **Git**: 最新版
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+

## 📦 1. プロジェクトの取得

### ダウンロード方法
1. ZIPファイルをダウンロード
2. 任意のディレクトリに解凍
3. ターミナル/コマンドプロンプトでプロジェクトディレクトリに移動

```bash
cd elegant-resba-download
```

## 🐍 2. バックエンドセットアップ（Django+FastAPI統合）

### 2.1 Python仮想環境の作成

#### Windows
```cmd
cd elegant-resba-django-fastapi
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux
```bash
cd elegant-resba-django-fastapi
python3 -m venv venv
source venv/bin/activate
```

### 2.2 依存関係のインストール

```bash
pip install -r requirements.txt
```

### 2.3 データベースの初期化

```bash
# データベースファイルが自動作成されます
python src/main.py
```

### 2.4 バックエンドサーバーの起動

```bash
python src/main.py
```

**起動確認**: http://localhost:5000 にアクセス

### 2.5 API動作確認

以下のURLで各APIをテストできます：

- お題生成: http://localhost:5000/api/topics/random
- カード取得: http://localhost:5000/api/cards/random
- 統計情報: http://localhost:5000/api/stats/demo

## ⚛️ 3. フロントエンドセットアップ（React）

### 3.1 新しいターミナルを開く

バックエンドサーバーを起動したまま、新しいターミナル/コマンドプロンプトを開きます。

### 3.2 フロントエンドディレクトリに移動

```bash
cd elegant-resba-react-frontend
```

### 3.3 Node.js依存関係のインストール

#### npm使用の場合
```bash
npm install
```

#### yarn使用の場合
```bash
yarn install
```

### 3.4 フロントエンドサーバーの起動

#### npm使用の場合
```bash
npm run dev
```

#### yarn使用の場合
```bash
yarn dev
```

**起動確認**: http://localhost:5173 にアクセス

## 🔧 4. 設定のカスタマイズ

### 4.1 バックエンド設定

`elegant-resba-django-fastapi/src/main.py` の設定項目：

```python
# セキュリティキー（本番環境では変更必須）
app.config['SECRET_KEY'] = 'elegant-resba-django-fastapi-integrated-2025'

# データベース設定
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"

# CORS設定
CORS(app, origins="*")  # 本番環境では特定のドメインに制限
```

### 4.2 フロントエンド設定

`elegant-resba-react-frontend/src/App.jsx` のAPI設定：

```javascript
// APIベースURL（必要に応じて変更）
const API_BASE_URL = 'http://localhost:5000';
```

### 4.3 ポート設定の変更

#### バックエンドポート変更
`src/main.py` の最後の行を変更：

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)  # ポート8000に変更
```

#### フロントエンドポート変更
`vite.config.js` を編集：

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // ポート3000に変更
    host: true
  }
})
```

## 🗄️ 5. データベース設定

### 5.1 SQLite（デフォルト）
- 設定不要
- `src/database/app.db` に自動作成
- 開発・テスト用に最適

### 5.2 PostgreSQL使用の場合

#### 依存関係追加
```bash
pip install psycopg2-binary
```

#### 設定変更
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/elegant_resba'
```

### 5.3 MySQL使用の場合

#### 依存関係追加
```bash
pip install PyMySQL
```

#### 設定変更
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/elegant_resba'
```

## 🔐 6. セキュリティ設定

### 6.1 本番環境用設定

#### 環境変数の使用
`.env` ファイルを作成：

```env
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=your-database-url-here
CORS_ORIGINS=https://yourdomain.com
DEBUG=False
```

#### 設定ファイルの更新
```python
import os
from dotenv import load_dotenv

load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['DEBUG'] = os.getenv('DEBUG', 'False').lower() == 'true'
```

### 6.2 CORS設定の制限

```python
# 本番環境では特定のドメインのみ許可
CORS(app, origins=["https://yourdomain.com", "https://www.yourdomain.com"])
```

## 🚀 7. 本番デプロイ

### 7.1 Heroku デプロイ

#### 必要ファイルの作成

`Procfile`:
```
web: python src/main.py
```

`runtime.txt`:
```
python-3.11.0
```

#### デプロイコマンド
```bash
heroku create your-app-name
git add .
git commit -m "Initial commit"
git push heroku main
```

### 7.2 Vercel デプロイ（フロントエンド）

```bash
npm install -g vercel
vercel --prod
```

### 7.3 Docker デプロイ

#### Dockerfile作成
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "src/main.py"]
```

#### ビルド・実行
```bash
docker build -t elegant-resba .
docker run -p 5000:5000 elegant-resba
```

## 🐛 8. トラブルシューティング

### 8.1 よくある問題

#### Python仮想環境が作成できない
```bash
# Python3を明示的に指定
python3 -m venv venv

# または pip で virtualenv をインストール
pip install virtualenv
virtualenv venv
```

#### ポートが使用中エラー
```bash
# プロセスを確認
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# プロセスを終了
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### Node.js依存関係のインストールエラー
```bash
# キャッシュをクリア
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# または yarn使用
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

#### データベース接続エラー
```bash
# データベースディレクトリを作成
mkdir -p src/database

# 権限を確認
chmod 755 src/database
```

### 8.2 ログの確認

#### バックエンドログ
```bash
# デバッグモードで起動
python src/main.py
```

#### フロントエンドログ
```bash
# 詳細ログで起動
npm run dev -- --verbose
```

### 8.3 パフォーマンス最適化

#### バックエンド最適化
```python
# 本番環境ではデバッグモードを無効化
app.run(host='0.0.0.0', port=5000, debug=False)

# Gunicorn使用（推奨）
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

#### フロントエンド最適化
```bash
# 本番ビルド
npm run build

# ビルドファイルの確認
ls -la dist/
```

## 📞 9. サポート

### 9.1 ドキュメント
- `API_SPECIFICATION.md` - API詳細仕様
- `DEVELOPMENT_GUIDE.md` - 開発ガイド
- `DEPLOYMENT_GUIDE.md` - デプロイガイド

### 9.2 コミュニティ
- GitHub Issues
- 開発者フォーラム
- Discord コミュニティ

### 9.3 技術サポート
- バグ報告: GitHub Issues
- 機能要望: GitHub Discussions
- セキュリティ問題: security@example.com

---

**最終更新**: 2025年9月12日  
**バージョン**: 2.0.0

このガイドに従って、エレガントレスバを正常にセットアップできます。問題が発生した場合は、トラブルシューティングセクションを参照するか、サポートにお問い合わせください。

