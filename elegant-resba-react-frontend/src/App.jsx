import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Crown, Sparkles, Star } from 'lucide-react'
import './App.css'

// コンポーネントのインポート
import HomePage from './components/HomePage'
import GameLobby from './components/GameLobby'
import GameRoom from './components/GameRoom'
import Profile from './components/Profile'
import Leaderboard from './components/Leaderboard'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ユーザー認証状態をチェック
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // 実際の実装では認証APIを呼び出し
      // 今回はダミーユーザーを設定
      setTimeout(() => {
        setUser({
          id: '1',
          username: 'elegant_player',
          display_name: 'エレガントプレイヤー',
          total_games: 15,
          total_wins: 9,
          win_rate: 60,
          current_title: '上品な皮肉家'
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('認証エラー:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">エレガントレスバを読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* ナビゲーションヘッダー */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  エレガントレスバ
                </h1>
              </div>
              
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    <Star className="w-4 h-4 mr-1 inline" />
                    {user.current_title}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{user.display_name}</p>
                    <p className="text-sm text-gray-500">勝率 {user.win_rate}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/lobby" element={<GameLobby user={user} />} />
            <Route path="/game/:gameId" element={<GameRoom user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* フッター */}
        <footer className="bg-white/50 border-t border-purple-100 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            <p>© 2025 エレガントレスバ - 上品な皮肉とユーモアで競い合うゲーム</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

