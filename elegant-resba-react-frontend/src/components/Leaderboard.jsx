import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Trophy, 
  Crown, 
  Star, 
  TrendingUp,
  Medal,
  Users,
  Target,
  Zap
} from 'lucide-react'

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('overall')

  // ダミーランキングデータ
  const overallRanking = [
    {
      rank: 1,
      username: 'エレガントマスター',
      display_name: 'エレガントマスター',
      title: '至高の皮肉家',
      total_games: 127,
      total_wins: 98,
      win_rate: 77.2,
      total_score: 9847,
      average_score: 87.3
    },
    {
      rank: 2,
      username: 'witty_genius',
      display_name: 'ウィットの天才',
      title: '辛辣な評論家',
      total_games: 89,
      total_wins: 67,
      win_rate: 75.3,
      total_score: 7234,
      average_score: 81.2
    },
    {
      rank: 3,
      username: 'sarcasm_queen',
      display_name: '皮肉の女王',
      title: '上品な毒舌家',
      total_games: 156,
      total_wins: 112,
      win_rate: 71.8,
      total_score: 11203,
      average_score: 79.8
    },
    {
      rank: 4,
      username: 'elegant_player',
      display_name: 'エレガントプレイヤー',
      title: '上品な皮肉家',
      total_games: 15,
      total_wins: 9,
      win_rate: 60.0,
      total_score: 1178,
      average_score: 78.5
    },
    {
      rank: 5,
      username: 'humor_master',
      display_name: 'ユーモアマスター',
      title: '知的な道化師',
      total_games: 203,
      total_wins: 121,
      win_rate: 59.6,
      total_score: 15234,
      average_score: 75.0
    }
  ]

  const weeklyRanking = [
    {
      rank: 1,
      username: 'rising_star',
      display_name: 'ライジングスター',
      title: '新進気鋭',
      weekly_games: 23,
      weekly_wins: 19,
      weekly_score: 1847
    },
    {
      rank: 2,
      username: 'elegant_player',
      display_name: 'エレガントプレイヤー',
      title: '上品な皮肉家',
      weekly_games: 8,
      weekly_wins: 6,
      weekly_score: 628
    },
    {
      rank: 3,
      username: 'quick_wit',
      display_name: 'クイックウィット',
      title: '機転の利く者',
      weekly_games: 15,
      weekly_wins: 10,
      weekly_score: 1203
    }
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</div>
    }
  }

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 2:
        return 'bg-gray-100 text-gray-700 border-gray-300'
      case 3:
        return 'bg-amber-100 text-amber-700 border-amber-300'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300'
    }
  }

  const getTitleRarityStars = (title) => {
    // タイトルに基づいてレア度を決定（簡易版）
    const rarity = title.includes('至高') ? 5 : 
                  title.includes('天才') || title.includes('女王') ? 4 :
                  title.includes('マスター') ? 3 : 2
    
    return Array.from({ length: rarity }, (_, i) => (
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
    ))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          ランキング
        </h1>
        <p className="text-gray-600 text-lg">
          エレガントレスバの頂点を目指すプレイヤーたち
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">1,247</div>
            <div className="text-sm text-gray-600">総プレイヤー数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">8,934</div>
            <div className="text-sm text-gray-600">総ゲーム数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">156</div>
            <div className="text-sm text-gray-600">今日のゲーム数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">82.4</div>
            <div className="text-sm text-gray-600">平均スコア</div>
          </CardContent>
        </Card>
      </div>

      {/* タブナビゲーション */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overall', label: '総合ランキング', icon: <Trophy className="w-4 h-4" /> },
          { id: 'weekly', label: '週間ランキング', icon: <Star className="w-4 h-4" /> }
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

      {/* 総合ランキング */}
      {activeTab === 'overall' && (
        <div className="space-y-4">
          {/* トップ3の特別表示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {overallRanking.slice(0, 3).map((player) => (
              <Card key={player.rank} className={`${player.rank === 1 ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : player.rank === 2 ? 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    {getRankIcon(player.rank)}
                  </div>
                  <CardTitle className="text-lg">{player.display_name}</CardTitle>
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {getTitleRarityStars(player.title)}
                  </div>
                  <Badge variant="outline" className={getRankBadgeColor(player.rank)}>
                    {player.title}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-lg">{player.win_rate}%</div>
                      <div className="text-gray-600">勝率</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{player.average_score}</div>
                      <div className="text-gray-600">平均スコア</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {player.total_wins}勝 / {player.total_games}戦
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 4位以下のリスト表示 */}
          <Card>
            <CardHeader>
              <CardTitle>4位以下のランキング</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overallRanking.slice(3).map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-700 font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <h3 className="font-semibold">{player.display_name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {player.title}
                          </Badge>
                          <div className="flex">
                            {getTitleRarityStars(player.title)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-bold">{player.win_rate}%</div>
                          <div className="text-gray-600 text-xs">勝率</div>
                        </div>
                        <div>
                          <div className="font-bold">{player.average_score}</div>
                          <div className="text-gray-600 text-xs">平均</div>
                        </div>
                        <div>
                          <div className="font-bold">{player.total_games}</div>
                          <div className="text-gray-600 text-xs">試合数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 週間ランキング */}
      {activeTab === 'weekly' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              今週の活躍プレイヤー
            </CardTitle>
            <CardDescription>
              今週（9月8日〜9月14日）の成績によるランキング
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyRanking.map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{player.display_name}</h3>
                      <Badge variant="outline" className={getRankBadgeColor(player.rank)}>
                        {player.title}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">{player.weekly_score}</div>
                        <div className="text-sm text-gray-600">週間スコア</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{player.weekly_wins}</div>
                        <div className="text-sm text-gray-600">週間勝利</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">{player.weekly_games}</div>
                        <div className="text-sm text-gray-600">週間試合</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Leaderboard

