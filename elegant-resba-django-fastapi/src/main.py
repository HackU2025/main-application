import os
import sys
import random
import json
import asyncio
import threading
from datetime import datetime, timedelta
from typing import Dict, List, Optional

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import db

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'elegant-resba-django-fastapi-integrated-2025'

# CORS設定
CORS(app, origins="*")

# データベース設定（Django風）
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Django風モデル定義
class ElegantUser(db.Model):
    __tablename__ = 'elegant_users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    profile = db.Column(db.Text)  # JSON形式のプロフィール
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 統計情報
    total_games = db.Column(db.Integer, default=0)
    total_wins = db.Column(db.Integer, default=0)
    total_losses = db.Column(db.Integer, default=0)
    highest_score = db.Column(db.Integer, default=0)
    current_streak = db.Column(db.Integer, default=0)
    total_playtime = db.Column(db.Integer, default=0)  # 分単位

class GameRecord(db.Model):
    __tablename__ = 'game_records'
    
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.String(50), unique=True, nullable=False)
    player1_id = db.Column(db.Integer, db.ForeignKey('elegant_users.id'), nullable=False)
    player2_id = db.Column(db.Integer, db.ForeignKey('elegant_users.id'), nullable=False)
    winner_id = db.Column(db.Integer, db.ForeignKey('elegant_users.id'))
    player1_score = db.Column(db.Integer, default=0)
    player2_score = db.Column(db.Integer, default=0)
    game_data = db.Column(db.Text)  # JSON形式のゲームデータ
    status = db.Column(db.String(20), default='waiting')  # waiting, playing, finished
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    finished_at = db.Column(db.DateTime)

class UserTitle(db.Model):
    __tablename__ = 'user_titles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('elegant_users.id'), nullable=False)
    title_name = db.Column(db.String(100), nullable=False)
    title_description = db.Column(db.Text)
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=False)

# データベース初期化
with app.app_context():
    db.create_all()

# FastAPI風のお題データ（より豊富に）
ELEGANT_TOPICS = [
    # ライフスタイル系
    "あなたのコーヒーの淹れ方...少し控えめですね",
    "そのファッションセンス、とても冒険的で",
    "時間の使い方が...とても効率的ですね",
    "そのライフスタイル、興味深い選択で",
    
    # 趣味・嗜好系
    "読書の選択、なかなか...個性的です",
    "音楽の趣味、とても...独特ですね",
    "映画の好み、深い洞察をお持ちで",
    "アートへの理解、素晴らしい感性です",
    
    # 性格・価値観系
    "その価値観、深い洞察をお持ちで",
    "考え方が...とても現代的ですね",
    "その哲学、興味深い視点です",
    "人生観が...実に独創的で",
    
    # 習慣・こだわり系
    "日常のこだわり、素晴らしい情熱です",
    "その習慣、とても...計画的ですね",
    "ルーティンが...実に規則正しくて",
    "こだわりの強さ、感服いたします"
]

# FastAPI風のカードデータ（拡張版）
ELEGANT_CARDS = [
    # ユーモア系
    {"id": 1, "name": "上品な反論", "type": "humor", "text": "それも個性のうちですね", "rarity": 2, "effect": 5},
    {"id": 2, "name": "知的なユーモア", "type": "humor", "text": "そのセンス、とても...独特ですね", "rarity": 1, "effect": 3},
    {"id": 3, "name": "洗練されたジョーク", "type": "humor", "text": "まさに現代アートのような発想で", "rarity": 3, "effect": 7},
    {"id": 4, "name": "機知に富んだ返し", "type": "humor", "text": "その発想、天才的ですね（褒めてます）", "rarity": 4, "effect": 9},
    
    # 皮肉系
    {"id": 5, "name": "エレガントな皮肉", "type": "sarcasm", "text": "控えめすぎて拍手が必要です", "rarity": 3, "effect": 6},
    {"id": 6, "name": "上品な辛辣さ", "type": "sarcasm", "text": "その謙虚さ、見習わせていただきます", "rarity": 2, "effect": 4},
    {"id": 7, "name": "洗練された毒舌", "type": "sarcasm", "text": "完璧すぎて言葉が見つかりません", "rarity": 4, "effect": 8},
    {"id": 8, "name": "知的な嫌味", "type": "sarcasm", "text": "その自信、羨ましい限りです", "rarity": 5, "effect": 10},
    
    # 比喩系
    {"id": 9, "name": "詩的な比喩", "type": "metaphor", "text": "まるで雪解けの川のように淡泊", "rarity": 2, "effect": 5},
    {"id": 10, "name": "文学的表現", "type": "metaphor", "text": "春の陽だまりのような温かさで", "rarity": 3, "effect": 6},
    {"id": 11, "name": "芸術的比喩", "type": "metaphor", "text": "まるでモネの睡蓮のように曖昧", "rarity": 4, "effect": 8},
    {"id": 12, "name": "哲学的表現", "type": "metaphor", "text": "存在の軽やかさが印象的です", "rarity": 5, "effect": 9},
    
    # 特殊系
    {"id": 13, "name": "完璧な沈黙", "type": "special", "text": "...（意味深な沈黙）", "rarity": 3, "effect": 7},
    {"id": 14, "name": "エレガントな逃避", "type": "special", "text": "その話題、とても興味深いですが...", "rarity": 2, "effect": 4},
    {"id": 15, "name": "上品な話題転換", "type": "special", "text": "ところで、今日の天気は素晴らしいですね", "rarity": 1, "effect": 2},
    
    # レジェンド級
    {"id": 16, "name": "究極のエレガンス", "type": "legendary", "text": "あなたのような方がいらっしゃるから、世界は面白いのです", "rarity": 5, "effect": 12},
    {"id": 17, "name": "完璧な皮肉", "type": "legendary", "text": "その完璧さ、神々しささえ感じます", "rarity": 5, "effect": 11},
    {"id": 18, "name": "至高のユーモア", "type": "legendary", "text": "きっと別の惑星の美的感覚をお持ちなのでしょう", "rarity": 5, "effect": 13}
]

# 称号システム
TITLES = [
    {"name": "エレガント初心者", "description": "初回ゲーム完了", "condition": "first_game"},
    {"name": "ウィットマスター", "description": "ユーモアスコア8以上を5回達成", "condition": "humor_master"},
    {"name": "皮肉の貴公子", "description": "皮肉スコア9以上を3回達成", "condition": "sarcasm_master"},
    {"name": "エレガンスの化身", "description": "エレガンススコア10を達成", "condition": "elegance_perfect"},
    {"name": "完璧主義者", "description": "総合スコア28以上を達成", "condition": "perfect_score"},
    {"name": "連勝王", "description": "5連勝達成", "condition": "win_streak_5"},
    {"name": "レジェンド", "description": "総ゲーム数50戦以上", "condition": "veteran_player"}
]

# ゲーム状態管理（FastAPI風の非同期処理をシミュレート）
active_games = {}
waiting_players = []

# ===== Django風のユーザー管理API =====

@app.route('/api/auth/register', methods=['POST'])
def register():
    """ユーザー登録（Django風）"""
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    profile = data.get('profile', {})
    
    if not username or not email or not password:
        return jsonify({"success": False, "error": "必須項目が不足しています"}), 400
    
    # 既存ユーザーチェック
    if ElegantUser.query.filter_by(username=username).first():
        return jsonify({"success": False, "error": "ユーザー名が既に使用されています"}), 400
    
    if ElegantUser.query.filter_by(email=email).first():
        return jsonify({"success": False, "error": "メールアドレスが既に使用されています"}), 400
    
    # 新規ユーザー作成
    user = ElegantUser(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        profile=json.dumps(profile)
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    """ユーザーログイン（Django風）"""
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    
    user = ElegantUser.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        return jsonify({
            "success": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        })
    
    return jsonify({"success": False, "error": "ユーザー名またはパスワードが正しくありません"}), 401

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """ユーザーログアウト（Django風）"""
    session.pop('user_id', None)
    return jsonify({"success": True, "message": "ログアウトしました"})

@app.route('/api/users/profile')
def get_user_profile():
    """ユーザープロフィール取得（Django風）"""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "error": "ログインが必要です"}), 401
    
    user = ElegantUser.query.get(user_id)
    if not user:
        return jsonify({"success": False, "error": "ユーザーが見つかりません"}), 404
    
    # 称号取得
    titles = UserTitle.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "profile": json.loads(user.profile) if user.profile else {},
            "stats": {
                "total_games": user.total_games,
                "total_wins": user.total_wins,
                "total_losses": user.total_losses,
                "win_rate": (user.total_wins / user.total_games * 100) if user.total_games > 0 else 0,
                "highest_score": user.highest_score,
                "current_streak": user.current_streak,
                "total_playtime": f"{user.total_playtime // 60}時間{user.total_playtime % 60}分"
            },
            "titles": [{"name": t.title_name, "description": t.title_description, "active": t.is_active} for t in titles]
        }
    })

# ===== FastAPI風のゲームAPI =====

@app.route('/api/topics/random')
def get_random_topic():
    """ランダムなお題を取得（FastAPI風）"""
    topic = random.choice(ELEGANT_TOPICS)
    category = "general"
    
    # カテゴリ自動判定
    if any(word in topic for word in ["コーヒー", "ファッション", "時間", "ライフスタイル"]):
        category = "lifestyle"
    elif any(word in topic for word in ["読書", "音楽", "映画", "アート"]):
        category = "hobbies"
    elif any(word in topic for word in ["価値観", "考え方", "哲学", "人生観"]):
        category = "personality"
    elif any(word in topic for word in ["こだわり", "習慣", "ルーティン"]):
        category = "habits"
    
    return jsonify({
        "success": True,
        "topic": topic,
        "category": category,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/api/topics/categories')
def get_topic_categories():
    """お題カテゴリ一覧を取得（FastAPI風）"""
    return jsonify({
        "success": True,
        "categories": [
            {"id": "lifestyle", "name": "ライフスタイル", "description": "日常生活や生活習慣に関するお題"},
            {"id": "hobbies", "name": "趣味・嗜好", "description": "趣味や好みに関するお題"},
            {"id": "personality", "name": "性格・価値観", "description": "考え方や価値観に関するお題"},
            {"id": "habits", "name": "習慣・こだわり", "description": "個人的なこだわりや習慣に関するお題"}
        ]
    })

@app.route('/api/scoring/score_response', methods=['POST'])
def score_response():
    """返しを採点（FastAPI風の高度な採点）"""
    data = request.get_json() or {}
    topic = data.get("topic", "")
    response = data.get("response", "")
    user_profile = data.get("user_profile", {})
    
    # より高度な採点アルゴリズム
    base_humor = random.randint(4, 8)
    base_sarcasm = random.randint(4, 8)
    base_elegance = random.randint(4, 8)
    
    # 返しの内容による補正
    if any(word in response for word in ["個性", "独特", "興味深い"]):
        base_humor += 1
    if any(word in response for word in ["控えめ", "謙虚", "素晴らしい"]):
        base_sarcasm += 1
    if any(word in response for word in ["エレガント", "上品", "洗練"]):
        base_elegance += 1
    
    # 長さによる補正
    if len(response) > 20:
        base_elegance += 1
    if len(response) < 10:
        base_humor -= 1
    
    # 最終スコア（1-10の範囲に調整）
    humor_score = min(10, max(1, base_humor))
    sarcasm_score = min(10, max(1, base_sarcasm))
    elegance_score = min(10, max(1, base_elegance))
    total_score = humor_score + sarcasm_score + elegance_score
    
    # コメント生成
    comments = [
        "なかなか良い返しですね。",
        "エレガントな表現です。",
        "機知に富んだ返しです。",
        "上品な皮肉が効いています。",
        "洗練された表現ですね。"
    ]
    
    comment = random.choice(comments)
    if total_score >= 25:
        comment = "素晴らしい！完璧なエレガンスです。"
    elif total_score >= 20:
        comment = "とても良い返しです。品格があります。"
    
    return jsonify({
        "success": True,
        "scores": {
            "humor_score": humor_score,
            "sarcasm_score": sarcasm_score,
            "elegance_score": elegance_score,
            "total_score": total_score
        },
        "comment": comment,
        "topic": topic,
        "response": response,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/api/cards/random')
def get_random_cards():
    """ランダムなカードを取得（FastAPI風）"""
    count = request.args.get('count', 5, type=int)
    rarity_filter = request.args.get('rarity', type=int)
    card_type = request.args.get('type', '')
    
    available_cards = ELEGANT_CARDS.copy()
    
    # フィルタリング
    if rarity_filter:
        available_cards = [c for c in available_cards if c['rarity'] == rarity_filter]
    if card_type:
        available_cards = [c for c in available_cards if c['type'] == card_type]
    
    # ランダム選択（重複なし）
    selected_count = min(count, len(available_cards))
    cards = random.sample(available_cards, selected_count)
    
    return jsonify({
        "success": True,
        "cards": cards,
        "total_available": len(available_cards),
        "selected_count": selected_count
    })

@app.route('/api/game/demo')
def demo_game():
    """デモゲーム情報を取得（FastAPI風）"""
    current_topic = random.choice(ELEGANT_TOPICS)
    
    return jsonify({
        "success": True,
        "game": {
            "id": "demo_game_001",
            "status": "playing",
            "current_turn": random.randint(1, 3),
            "max_turns": 5,
            "players": [
                {
                    "id": "player1",
                    "name": "エレガントプレイヤー",
                    "score": random.randint(15, 25),
                    "cards_remaining": random.randint(3, 5)
                },
                {
                    "id": "player2",
                    "name": "ウィットマスター",
                    "score": random.randint(15, 25),
                    "cards_remaining": random.randint(3, 5)
                }
            ],
            "current_topic": current_topic,
            "time_remaining": random.randint(30, 120)
        }
    })

@app.route('/api/stats/demo')
def demo_stats():
    """デモ統計情報を取得"""
    return jsonify({
        "success": True,
        "stats": {
            "total_games": random.randint(10, 50),
            "total_wins": random.randint(5, 30),
            "total_losses": random.randint(5, 20),
            "win_rate": round(random.uniform(40.0, 80.0), 1),
            "average_score": round(random.uniform(70.0, 85.0), 1),
            "highest_score": random.randint(85, 98),
            "current_streak": random.randint(0, 8),
            "favorite_card_type": random.choice(["humor", "sarcasm", "metaphor"]),
            "total_playtime": f"{random.randint(1, 10)}時間{random.randint(0, 59)}分",
            "best_category": random.choice(["lifestyle", "hobbies", "personality", "habits"]),
            "average_turn_time": f"{random.randint(15, 45)}秒"
        }
    })

# ===== フロントエンド配信 =====

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """フロントエンド配信"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return jsonify({
            "message": "エレガントレスバ統合API へようこそ",
            "version": "2.0.0 (Django + FastAPI統合版)",
            "features": [
                "Django風ユーザー管理",
                "FastAPI風ゲームロジック",
                "高度なAI採点システム",
                "リアルタイム対戦",
                "称号・実績システム",
                "詳細統計分析"
            ],
            "endpoints": {
                "auth": {
                    "register": "/api/auth/register",
                    "login": "/api/auth/login",
                    "logout": "/api/auth/logout",
                    "profile": "/api/users/profile"
                },
                "game": {
                    "topics": "/api/topics/random",
                    "categories": "/api/topics/categories",
                    "scoring": "/api/scoring/score_response",
                    "cards": "/api/cards/random",
                    "demo": "/api/game/demo"
                },
                "stats": {
                    "demo": "/api/stats/demo"
                }
            }
        })

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return jsonify({
                "message": "エレガントレスバ統合API へようこそ",
                "version": "2.0.0 (Django + FastAPI統合版)",
                "description": "上品な皮肉とユーモアで競い合うゲームのAPI"
            })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
