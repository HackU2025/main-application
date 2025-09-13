import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Clock, 
  Star, 
  Zap, 
  Trophy,
  MessageCircle,
  Target,
  Sparkles,
  Crown,
  ArrowRight
} from 'lucide-react'

const GameRoom = ({ user }) => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  
  const [gameState, setGameState] = useState('playing') // playing, finished
  const [currentTurn, setCurrentTurn] = useState(1)
  const [maxTurns] = useState(5)
  const [timeLeft, setTimeLeft] = useState(30)
  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("あなたのコーヒーの淹れ方...少し控えめですね")
  const [lastScores, setLastScores] = useState(null)

  // ダミーの対戦相手データ
  const opponent = {
    display_name: 'ウィットな対戦相手',
    current_title: '辛辣な評論家'
  }

  // ダミーの手持ちカード
  const handCards = [
    {
      id: 1,
      name: "上品な反論",
      type: "humor",
      text: "それも個性のうちですね",
      rarity: 2,
      effect_value: 3
    },
    {
      id: 2,
      name: "エレガントな皮肉",
      type: "sarcasm", 
      text: "控えめすぎて拍手が必要です",
      rarity: 3,
      effect_value: 4
    },
    {
      id: 3,
      name: "詩的な比喩",
      type: "metaphor",
      text: "まるで雪解けの川のように淡泊",
      rarity: 2,
      effect_value: 3
    },
    {
      id: 4,
      name: "知的なユーモア",
      type: "humor",
      text: "そのセンス、とても...独特ですね",
      rarity: 1,
      effect_value: 2
    },
    {
      id: 5,
      name: "上級者の返し",
      type: "sarcasm",
      text: "完璧すぎて言葉が見つかりません",
      rarity: 4,
      effect_value: 5
    }
  ]

  // タイマー
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      // 時間切れの処理
      handleAutoSubmit()
    }
  }, [timeLeft, gameState])

  const handleAutoSubmit = () => {
    // 自動でランダムなカードを選択
    const randomCard = handCards[Math.floor(Math.random() * handCards.length)]
    handleSubmitResponse(randomCard)
  }

  const handleSubmitResponse = async (card) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setSelectedCard(card)
    
    // AIスコアリングをシミュレート
    setTimeout(() => {
      const scores = {
        humor: Math.floor(Math.random() * 10) + 1,
        sarcasm: Math.floor(Math.random() * 10) + 1,
        elegance: Math.floor(Math.random() * 10) + 1
      }
      scores.total = scores.humor + scores.sarcasm + scores.elegance
      
      setLastScores(scores)
      setMyScore(prev => prev + scores.total)
      setOpponentScore(prev => prev + Math.floor(Math.random() * 25) + 5) // 相手のスコアもランダム
      
      setTimeout(() => {
        if (currentTurn >= maxTurns) {
          setGameState('finished')
        } else {
          // 次のターンへ
          setCurrentTurn(prev => prev + 1)
          setTimeLeft(30)
          setSelectedCard(null)
          setLastScores(null)
          setIsSubmitting(false)
          
          // 新しいお題を生成
          const topics = [
            "そのファッションセンス...とても冒険的ですね",
            "あなたの音楽の趣味、なかなか...個性的です",
            "その読書の選択、深い洞察をお持ちで",
            "コーヒーへのこだわり、素晴らしい情熱です",
            "時間の使い方が...とても効率的ですね"
          ]
          setCurrentTopic(topics[Math.floor(Math.random() * topics.length)])
        }
      }, 3000)
    }, 2000)
  }

  const getCardTypeColor = (type) => {
    switch (type) {
      case 'humor': return 'bg-green-100 text-green-700 border-green-300'
      case 'sarcasm': return 'bg-red-100 text-red-700 border-red-300'
      case 'metaphor': return 'bg-blue-100 text-blue-700 border-blue-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getCardTypeName = (type) => {
    switch (type) {
      case 'humor': return 'ユーモア'
      case 'sarcasm': return '皮肉'
      case 'metaphor': return '比喩'
      default: return '不明'
    }
  }

  const getRarityStars = (rarity) => {
    return Array.from({ length: rarity }, (_, i) => (
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
    ))
  }

  if (gameState === 'finished') {
    const isWinner = myScore > opponentScore
    
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className={`text-center ${isWinner ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <CardHeader>
            <div className="flex justify-center mb-4">
              {isWinner ? (
                <Crown className="w-16 h-16 text-yellow-500" />
              ) : (
                <Trophy className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <CardTitle className={`text-3xl ${isWinner ? 'text-green-700' : 'text-red-700'}`}>
              {isWinner ? '勝利！' : '敗北...'}
            </CardTitle>
            <CardDescription className="text-lg">
              {isWinner ? 'あなたのエレガンスが勝利しました！' : '次回はもっとエレガントに...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="font-semibold text-gray-700 mb-2">あなた</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">{myScore}</div>
                <Badge className="bg-purple-100 text-purple-700">{user?.display_name}</Badge>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-700 mb-2">相手</h3>
                <div className="text-4xl font-bold text-pink-600 mb-2">{opponentScore}</div>
                <Badge className="bg-pink-100 text-pink-700">{opponent.display_name}</Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => navigate('/lobby')}
              >
                もう一度プレイ
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
              >
                ホームに戻る
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ゲーム状態ヘッダー */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{currentTurn}/{maxTurns}</div>
            <div className="text-sm text-gray-600">ターン</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
              {timeLeft}
            </div>
            <div className="text-sm text-gray-600">秒</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{myScore}</div>
                <div className="text-xs text-gray-600">あなた</div>
              </div>
              <div className="text-gray-400">VS</div>
              <div className="text-center">
                <div className="text-lg font-bold text-pink-600">{opponentScore}</div>
                <div className="text-xs text-gray-600">相手</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* お題表示 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            お題
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-medium text-gray-800 text-center py-4">
            "{currentTopic}"
          </div>
          <div className="text-center text-sm text-gray-600">
            相手: {opponent.display_name} ({opponent.current_title})
          </div>
        </CardContent>
      </Card>

      {/* 前回のスコア表示 */}
      {lastScores && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Target className="w-5 h-5" />
              前回のスコア
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{lastScores.humor}</div>
                <div className="text-sm text-gray-600">ユーモア</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{lastScores.sarcasm}</div>
                <div className="text-sm text-gray-600">皮肉</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{lastScores.elegance}</div>
                <div className="text-sm text-gray-600">エレガンス</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{lastScores.total}</div>
                <div className="text-sm text-gray-600">合計</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 手札 */}
      {!isSubmitting && !selectedCard && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              手札から返しを選択
            </CardTitle>
            <CardDescription>
              最適なカードを選んで、エレガントに返しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {handCards.map((card) => (
                <Card 
                  key={card.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-purple-300"
                  onClick={() => handleSubmitResponse(card)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{card.name}</CardTitle>
                      <div className="flex">
                        {getRarityStars(card.rarity)}
                      </div>
                    </div>
                    <Badge className={getCardTypeColor(card.type)} variant="outline">
                      {getCardTypeName(card.type)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-gray-700 italic text-sm mb-3">
                      "{card.text}"
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>効果値: {card.effect_value}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 選択されたカード表示 */}
      {selectedCard && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Zap className="w-5 h-5" />
              選択したカード
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{selectedCard.name}</h3>
              <p className="text-xl italic text-gray-700 mb-4">
                "{selectedCard.text}"
              </p>
              {isSubmitting && (
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span>AI採点中...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GameRoom

