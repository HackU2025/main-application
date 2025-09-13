# エレガントレスバ API仕様書

## 📡 API概要

エレガントレスバのRESTful APIは、Django風のユーザー管理とFastAPI風のゲームロジックを統合したシステムです。

### ベースURL
- **開発環境**: `http://localhost:5000`
- **本番環境**: `https://j6h5i7cg8nel.manus.space`

### 認証方式
- **セッションベース認証**（Flask-Session）
- **CSRF保護**: 有効
- **CORS**: 設定済み

### レスポンス形式
- **Content-Type**: `application/json`
- **文字エンコーディング**: UTF-8

## 🔐 認証API（Django風）

### ユーザー登録

```http
POST /api/auth/register
```

#### リクエスト
```json
{
  "username": "elegant_player",
  "email": "player@example.com",
  "password": "secure_password123",
  "profile": {
    "favorite_style": "humor",
    "experience_level": "beginner"
  }
}
```

#### レスポンス（成功）
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "elegant_player",
    "email": "player@example.com",
    "created_at": "2025-09-12T15:30:00.000Z"
  }
}
```

#### レスポンス（エラー）
```json
{
  "success": false,
  "error": "ユーザー名が既に使用されています"
}
```

### ユーザーログイン

```http
POST /api/auth/login
```

#### リクエスト
```json
{
  "username": "elegant_player",
  "password": "secure_password123"
}
```

#### レスポンス（成功）
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "elegant_player",
    "email": "player@example.com"
  }
}
```

#### レスポンス（エラー）
```json
{
  "success": false,
  "error": "ユーザー名またはパスワードが正しくありません"
}
```

### ユーザーログアウト

```http
POST /api/auth/logout
```

#### レスポンス
```json
{
  "success": true,
  "message": "ログアウトしました"
}
```

### ユーザープロフィール取得

```http
GET /api/users/profile
```

**認証**: 必須

#### レスポンス
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "elegant_player",
    "email": "player@example.com",
    "profile": {
      "favorite_style": "humor",
      "experience_level": "beginner"
    },
    "stats": {
      "total_games": 15,
      "total_wins": 9,
      "total_losses": 6,
      "win_rate": 60.0,
      "highest_score": 94,
      "current_streak": 3,
      "total_playtime": "2時間15分"
    },
    "titles": [
      {
        "name": "エレガント初心者",
        "description": "初回ゲーム完了",
        "active": true
      }
    ]
  }
}
```

## 🎮 ゲームAPI（FastAPI風）

### ランダムお題取得

```http
GET /api/topics/random
```

#### レスポンス
```json
{
  "success": true,
  "topic": "あなたのコーヒーの淹れ方...少し控えめですね",
  "category": "lifestyle",
  "timestamp": "2025-09-12T15:30:00.000Z"
}
```

### お題カテゴリ一覧

```http
GET /api/topics/categories
```

#### レスポンス
```json
{
  "success": true,
  "categories": [
    {
      "id": "lifestyle",
      "name": "ライフスタイル",
      "description": "日常生活や生活習慣に関するお題"
    },
    {
      "id": "hobbies",
      "name": "趣味・嗜好",
      "description": "趣味や好みに関するお題"
    },
    {
      "id": "personality",
      "name": "性格・価値観",
      "description": "考え方や価値観に関するお題"
    },
    {
      "id": "habits",
      "name": "習慣・こだわり",
      "description": "個人的なこだわりや習慣に関するお題"
    }
  ]
}
```

### AI採点

```http
POST /api/scoring/score_response
```

#### リクエスト
```json
{
  "topic": "あなたのコーヒーの淹れ方...少し控えめですね",
  "response": "それも個性のうちですね",
  "user_profile": {
    "favorite_style": "humor",
    "experience_level": "intermediate"
  }
}
```

#### レスポンス
```json
{
  "success": true,
  "scores": {
    "humor_score": 8,
    "sarcasm_score": 6,
    "elegance_score": 7,
    "total_score": 21
  },
  "comment": "とても良い返しです。品格があります。",
  "topic": "あなたのコーヒーの淹れ方...少し控えめですね",
  "response": "それも個性のうちですね",
  "timestamp": "2025-09-12T15:30:00.000Z"
}
```

### ランダムカード取得

```http
GET /api/cards/random?count=5&rarity=3&type=humor
```

#### クエリパラメータ
- `count` (optional): 取得するカード数（デフォルト: 5）
- `rarity` (optional): レア度フィルタ（1-5）
- `type` (optional): カードタイプフィルタ

#### レスポンス
```json
{
  "success": true,
  "cards": [
    {
      "id": 1,
      "name": "上品な反論",
      "type": "humor",
      "text": "それも個性のうちですね",
      "rarity": 2,
      "effect": 5
    },
    {
      "id": 16,
      "name": "究極のエレガンス",
      "type": "legendary",
      "text": "あなたのような方がいらっしゃるから、世界は面白いのです",
      "rarity": 5,
      "effect": 12
    }
  ],
  "total_available": 18,
  "selected_count": 2
}
```

### カードタイプ一覧

```http
GET /api/cards/types
```

#### レスポンス
```json
{
  "success": true,
  "types": {
    "humor": {
      "count": 4,
      "max_rarity": 4
    },
    "sarcasm": {
      "count": 4,
      "max_rarity": 5
    },
    "metaphor": {
      "count": 4,
      "max_rarity": 5
    },
    "special": {
      "count": 3,
      "max_rarity": 3
    },
    "legendary": {
      "count": 3,
      "max_rarity": 5
    }
  },
  "total_cards": 18
}
```

### ゲーム作成

```http
POST /api/game/create
```

**認証**: 必須

#### リクエスト
```json
{
  "mode": "classic",
  "max_turns": 5
}
```

#### レスポンス
```json
{
  "success": true,
  "game": {
    "id": "game_20250912_153000_1234",
    "mode": "classic",
    "max_turns": 5,
    "status": "waiting",
    "created_at": "2025-09-12T15:30:00.000Z"
  }
}
```

### ゲーム参加

```http
POST /api/game/{game_id}/join
```

**認証**: 必須

#### レスポンス
```json
{
  "success": true,
  "message": "ゲームに参加しました",
  "game_status": "playing"
}
```

### デモゲーム情報

```http
GET /api/game/demo
```

#### レスポンス
```json
{
  "success": true,
  "game": {
    "id": "demo_game_001",
    "status": "playing",
    "current_turn": 2,
    "max_turns": 5,
    "players": [
      {
        "id": "player1",
        "name": "エレガントプレイヤー",
        "score": 18,
        "cards_remaining": 4
      },
      {
        "id": "player2",
        "name": "ウィットマスター",
        "score": 22,
        "cards_remaining": 3
      }
    ],
    "current_topic": "読書の選択、なかなか...個性的です",
    "time_remaining": 45
  }
}
```

## 📊 統計API

### デモ統計情報

```http
GET /api/stats/demo
```

#### レスポンス
```json
{
  "success": true,
  "stats": {
    "total_games": 18,
    "total_wins": 7,
    "total_losses": 11,
    "win_rate": 70.6,
    "average_score": 72.5,
    "highest_score": 89,
    "current_streak": 4,
    "favorite_card_type": "sarcasm",
    "total_playtime": "4時間42分",
    "best_category": "lifestyle",
    "average_turn_time": "31秒"
  }
}
```

## 🏆 称号・実績API

### 利用可能な称号一覧

```http
GET /api/titles/available
```

**認証**: 必須

#### レスポンス
```json
{
  "success": true,
  "titles": [
    {
      "name": "エレガント初心者",
      "description": "初回ゲーム完了",
      "condition": "first_game",
      "earned": true
    },
    {
      "name": "ウィットマスター",
      "description": "ユーモアスコア8以上を5回達成",
      "condition": "humor_master",
      "earned": false
    },
    {
      "name": "皮肉の貴公子",
      "description": "皮肉スコア9以上を3回達成",
      "condition": "sarcasm_master",
      "earned": false
    }
  ]
}
```

### リーダーボード

```http
GET /api/leaderboard
```

#### レスポンス
```json
{
  "success": true,
  "leaderboards": {
    "win_rate": [
      {
        "username": "elegant_master",
        "win_rate": 85.5,
        "total_games": 47,
        "total_wins": 40
      }
    ],
    "game_count": [
      {
        "username": "game_veteran",
        "total_games": 156,
        "total_wins": 89,
        "win_rate": 57.1
      }
    ],
    "high_score": [
      {
        "username": "perfect_player",
        "highest_score": 98,
        "total_games": 23
      }
    ]
  }
}
```

## 🌐 グローバル統計API

### グローバル統計

```http
GET /api/stats/global
```

#### レスポンス
```json
{
  "success": true,
  "global_stats": {
    "total_users": 1247,
    "total_games": 8934,
    "active_games": 23,
    "most_popular_card": "エレガントな皮肉",
    "average_game_duration": "5分",
    "daily_active_users": 156
  }
}
```

## 🚨 エラーレスポンス

### 標準エラー形式

```json
{
  "success": false,
  "error": "エラーメッセージ",
  "error_code": "ERROR_CODE",
  "timestamp": "2025-09-12T15:30:00.000Z"
}
```

### HTTPステータスコード

| コード | 説明 | 例 |
|--------|------|-----|
| 200 | 成功 | 正常なレスポンス |
| 400 | リクエストエラー | 必須パラメータ不足 |
| 401 | 認証エラー | ログインが必要 |
| 403 | 権限エラー | アクセス権限なし |
| 404 | 見つからない | リソースが存在しない |
| 409 | 競合エラー | ユーザー名重複 |
| 500 | サーバーエラー | 内部エラー |

### よくあるエラー

#### 認証エラー
```json
{
  "success": false,
  "error": "ログインが必要です",
  "error_code": "AUTH_REQUIRED"
}
```

#### バリデーションエラー
```json
{
  "success": false,
  "error": "必須項目が不足しています",
  "error_code": "VALIDATION_ERROR",
  "details": {
    "missing_fields": ["username", "email"]
  }
}
```

#### レート制限エラー
```json
{
  "success": false,
  "error": "リクエスト制限に達しました",
  "error_code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 60
}
```

## 🔧 開発者向け情報

### API制限
- **レート制限**: 1分間に60リクエスト
- **ペイロードサイズ**: 最大1MB
- **セッション有効期限**: 24時間

### セキュリティ
- **HTTPS**: 本番環境では必須
- **CSRF保護**: 有効
- **XSS保護**: 有効
- **SQL インジェクション**: SQLAlchemy ORMで保護

### キャッシュ
- **静的リソース**: 1時間
- **API レスポンス**: 5分（一部エンドポイント）
- **ユーザーセッション**: 24時間

### ログ
- **アクセスログ**: 全リクエスト
- **エラーログ**: 4xx, 5xxエラー
- **セキュリティログ**: 認証関連

---

**API バージョン**: 2.0.0  
**最終更新**: 2025年9月12日  
**サポート**: GitHub Issues

この仕様書は、エレガントレスバAPIの完全なリファレンスです。開発時の参考資料としてご活用ください。

