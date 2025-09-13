import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Users, 
  Search, 
  Clock, 
  Zap,
  Heart,
  X,
  Coffee,
  Music,
  Book,
  GameController2
} from 'lucide-react'

const GameLobby = ({ user }) => {
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)
  const [matchingStatus, setMatchingStatus] = useState('idle') // idle, searching, found
  const [opponent, setOpponent] = useState(null)
  const [searchTime, setSearchTime] = useState(0)

  useEffect(() => {
    let interval
    if (isSearching) {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1)
        
        // 5秒後にマッチング成功をシミュレート
        if (searchTime >= 5) {
          setMatchingStatus('found')
          setOpponent({
            id: '2',
            username: 'witty_opponent',
            display_name: 'ウィットな対戦相手',
            likes: ['クラシック音楽', '読書', '紅茶'],
            dislikes: ['騒音', 'ファストフード', 'SNS'],
            current_title: '辛辣な評論家'
          })
          setIsSearching(false)
        }
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isSearching, searchTime])

  const handleStartMatching = () => {
    setIsSearching(true)
    setMatchingStatus('searching')
    setSearchTime(0)
  }

  const handleCancelMatching = () => {
    setIsSearching(false)
    setMatchingStatus('idle')
    setSearchTime(0)
  }

  const handleStartGame = () => {
    // 実際の実装ではゲームルームを作成
    const gameId = 'game_' + Date.now()
    navigate(`/game/${gameId}`)
  }

  const userPreferences = [
    { icon: <Coffee className="w-4 h-4" />, label: 'コーヒー', type: 'like' },
    { icon: <Music className="w-4 h-4" />, label: 'ジャズ', type: 'like' },
    { icon: <Book className="w-4 h-4" />, label: '哲学書', type: 'like' },
    { icon: <X className="w-4 h-4" />, label: '早起き', type: 'dislike' },
    { icon: <X className="w-4 h-4" />, label: '満員電車', type: 'dislike' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ゲームロビー</h1>
        <p className="text-gray-600">
          あなたと正反対の好みを持つ相手を探しています
        </p>
      </div>

      {/* ユーザープロフィール */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            あなたのプロフィール
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{user?.display_name}</h3>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {user?.current_title}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">勝率</div>
              <div className="text-2xl font-bold text-purple-600">{user?.win_rate}%</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                好きなもの
              </h4>
              <div className="flex flex-wrap gap-2">
                {userPreferences.filter(p => p.type === 'like').map((pref, index) => (
                  <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                    {pref.icon}
                    <span className="ml-1">{pref.label}</span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                嫌いなもの
              </h4>
              <div className="flex flex-wrap gap-2">
                {userPreferences.filter(p => p.type === 'dislike').map((pref, index) => (
                  <Badge key={index} variant="outline" className="border-red-300 text-red-700">
                    {pref.icon}
                    <span className="ml-1">{pref.label}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* マッチング状態 */}
      {matchingStatus === 'idle' && (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              対戦相手を探す
            </CardTitle>
            <CardDescription>
              あなたと正反対の好みを持つプレイヤーとマッチングします
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={handleStartMatching}
            >
              <GameController2 className="w-5 h-5 mr-2" />
              マッチング開始
            </Button>
          </CardContent>
        </Card>
      )}

      {matchingStatus === 'searching' && (
        <Card className="text-center bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-blue-600 animate-pulse" />
              対戦相手を探しています...
            </CardTitle>
            <CardDescription>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Clock className="w-4 h-4" />
                {searchTime}秒経過
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleCancelMatching}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              キャンセル
            </Button>
          </CardContent>
        </Card>
      )}

      {matchingStatus === 'found' && opponent && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-green-700">
              <Zap className="w-5 h-5" />
              マッチング成功！
            </CardTitle>
            <CardDescription className="text-center">
              対戦相手が見つかりました
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{opponent.display_name}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {opponent.current_title}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">対戦相手</div>
                  <div className="text-lg font-bold text-green-600">準備完了</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    相手の好きなもの
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {opponent.likes.map((like, index) => (
                      <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                        {like}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    相手の嫌いなもの
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {opponent.dislikes.map((dislike, index) => (
                      <Badge key={index} variant="outline" className="border-red-300 text-red-700">
                        {dislike}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
                onClick={handleStartGame}
              >
                <Zap className="w-5 h-5 mr-2" />
                ゲーム開始
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ゲームルール */}
      <Card>
        <CardHeader>
          <CardTitle>ゲームルール</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0 mt-0.5">1</div>
              <p>5ターン制で、交互にお題を出し合います</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0 mt-0.5">2</div>
              <p>相手の好みに基づいたお題が自動生成されます</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0 mt-0.5">3</div>
              <p>手持ちのカードから最適な返しを選択してください</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0 mt-0.5">4</div>
              <p>AIがユーモア・皮肉・エレガンスの3要素で採点します</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0 mt-0.5">5</div>
              <p>総合得点の高い方が勝利となります</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GameLobby

