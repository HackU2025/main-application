import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  User, 
  Trophy, 
  Star, 
  Crown,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Zap
} from 'lucide-react'

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('stats')

  // ダミーデータ
  const gameHistory = [
    {
      id: 1,
      opponent: 'ウィットな対戦相手',
      result: 'win',
      myScore: 87,
      opponentScore: 72,
      date: '2025-09-12',
      duration: '4分32秒'
    },
    {
      id: 2,
      opponent: '辛辣な評論家',
      result: 'lose',
      myScore: 65,
      opponentScore: 89,
      date: '2025-09-11',
      duration: '5分18秒'
    },
    {
      id: 3,
      opponent: 'エレガントマスター',
      result: 'win',
      myScore: 94,
      opponentScore: 78,
      date: '2025-09-10',
      duration: '3分45秒'
    }
  ]

  const achievements = [
    {
      id: 1,
      name: '初勝利',
      description: '初めてゲームに勝利する',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      unlocked: true,
      date: '2025-09-01'
    },
    {
      id: 2,
      name: '連勝記録',
      description: '3連勝を達成する',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      unlocked: true,
      date: '2025-09-05'
    },
    {
      id: 3,
      name: 'エレガンスマスター',
      description: 'エレガンス点で満点を取る',
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      unlocked: false,
      date: null
    },
    {
      id: 4,
      name: '皮肉の達人',
      description: '皮肉点で10点満点を5回取る',
      icon: <Target className="w-6 h-6 text-red-500" />,
      unlocked: false,
      date: null
    }
  ]

  const titles = [
    {
      id: 1,
      name: '上品な皮肉家',
      description: '皮肉を上品に使いこなす',
      rarity: 2,
      current: true
    },
    {
      id: 2,
      name: '新人レスバー',
      description: '初心者向けの称号',
      rarity: 1,
      current: false
    },
    {
      id: 3,
      name: 'ウィットマスター',
      description: 'ユーモアの達人',
      rarity: 3,
      current: false
    }
  ]

  const stats = [
    { label: '総ゲーム数', value: user?.total_games || 0, icon: <Target className="w-5 h-5 text-blue-600" /> },
    { label: '勝利数', value: user?.total_wins || 0, icon: <Trophy className="w-5 h-5 text-yellow-600" /> },
    { label: '勝率', value: `${user?.win_rate || 0}%`, icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
    { label: '平均スコア', value: '78.5', icon: <Star className="w-5 h-5 text-purple-600" /> },
    { label: '最高スコア', value: '94', icon: <Crown className="w-5 h-5 text-pink-600" /> },
    { label: '連勝記録', value: '3', icon: <Zap className="w-5 h-5 text-orange-600" /> }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* プロフィールヘッダー */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.display_name}</h1>
              <div className="flex items-center gap-4 mb-3">
                <Badge className="bg-purple-100 text-purple-700">
                  <Crown className="w-4 h-4 mr-1" />
                  {user?.current_title}
                </Badge>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                エレガントレスバの世界へようこそ。上品な言葉の戦いを楽しみましょう。
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* タブナビゲーション */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'stats', label: '統計', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'history', label: '対戦履歴', icon: <Calendar className="w-4 h-4" /> },
          { id: 'achievements', label: '実績', icon: <Award className="w-4 h-4" /> },
          { id: 'titles', label: '称号', icon: <Crown className="w-4 h-4" /> }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* 統計タブ */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 対戦履歴タブ */}
      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>最近の対戦履歴</CardTitle>
            <CardDescription>直近の対戦結果を表示しています</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gameHistory.map((game) => (
                <div key={game.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${game.result === 'win' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium">vs {game.opponent}</p>
                      <p className="text-sm text-gray-600">{game.date} • {game.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      <span className={game.result === 'win' ? 'text-green-600' : 'text-gray-600'}>{game.myScore}</span>
                      <span className="text-gray-400 mx-2">-</span>
                      <span className={game.result === 'lose' ? 'text-red-600' : 'text-gray-600'}>{game.opponentScore}</span>
                    </p>
                    <Badge variant={game.result === 'win' ? 'default' : 'secondary'} className={game.result === 'win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {game.result === 'win' ? '勝利' : '敗北'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 実績タブ */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                      {achievement.name}
                    </CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-100 text-green-700">
                      解除済み
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {achievement.unlocked && achievement.date && (
                <CardContent>
                  <p className="text-sm text-gray-600">解除日: {achievement.date}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* 称号タブ */}
      {activeTab === 'titles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.map((title) => (
            <Card key={title.id} className={`${title.current ? 'bg-purple-50 border-purple-200' : 'hover:shadow-lg transition-shadow'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`${title.current ? 'text-purple-700' : 'text-gray-800'}`}>
                    {title.name}
                  </CardTitle>
                  {title.current && (
                    <Badge className="bg-purple-100 text-purple-700">
                      使用中
                    </Badge>
                  )}
                </div>
                <CardDescription>{title.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: title.rarity }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {!title.current && (
                    <Button variant="outline" size="sm">
                      使用する
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile

