import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Sparkles, 
  Crown, 
  Swords, 
  Users, 
  Trophy, 
  Star,
  Play,
  BookOpen,
  Target,
  Zap
} from 'lucide-react'

const HomePage = ({ user }) => {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleStartGame = () => {
    setIsAnimating(true)
    setTimeout(() => {
      navigate('/lobby')
    }, 500)
  }

  const features = [
    {
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      title: "エレガントな対戦",
      description: "下品な罵倒ではなく、ユーモアと皮肉で相手を打ち負かす上品なレスバ"
    },
    {
      icon: <Target className="w-8 h-8 text-pink-600" />,
      title: "AI採点システム",
      description: "面白さ・皮肉度・エレガンス度を総合的に評価する高精度AI"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "リアルタイム対戦",
      description: "3〜5ターンのスピーディーな対戦で、サクッと楽しめる"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      title: "称号システム",
      description: "勝利を重ねて様々な称号を獲得し、あなたのエレガンスを証明"
    }
  ]

  const cardTypes = [
    {
      type: "ユーモア系",
      description: "「それも個性のうちですね」",
      color: "bg-green-100 text-green-700"
    },
    {
      type: "皮肉系", 
      description: "「控えめすぎて拍手が必要です」",
      color: "bg-red-100 text-red-700"
    },
    {
      type: "比喩系",
      description: "「まるで雪解けの川のように淡泊」",
      color: "bg-blue-100 text-blue-700"
    }
  ]

  return (
    <div className="space-y-12">
      {/* ヒーローセクション */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Crown className="w-20 h-20 text-purple-600 animate-pulse" />
              <Sparkles className="w-8 h-8 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            エレガントレスバ
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            上品な皮肉とユーモアで競い合う、新感覚のレスバゲーム<br />
            品格を保ちながら、知的な言葉の戦いを楽しもう
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'hover:scale-105'}`}
              onClick={handleStartGame}
            >
              <Play className="w-5 h-5 mr-2" />
              ゲームを始める
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
              onClick={() => navigate('/leaderboard')}
            >
              <Trophy className="w-5 h-5 mr-2" />
              ランキング
            </Button>
          </div>
        </div>
      </section>

      {/* ユーザー統計（ログイン時のみ） */}
      {user && (
        <section className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                あなたの戦績
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{user.total_games}</div>
                  <div className="text-gray-600">総ゲーム数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">{user.total_wins}</div>
                  <div className="text-gray-600">勝利数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{user.win_rate}%</div>
                  <div className="text-gray-600">勝率</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 機能紹介 */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          ゲームの特徴
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-purple-100">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* カードタイプ紹介 */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          返しカードの種類
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardTypes.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className={card.color}>
                    {card.type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "{card.description}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ゲームの流れ */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          ゲームの流れ
        </h2>
        
        <div className="space-y-8">
          {[
            {
              step: 1,
              title: "マッチング",
              description: "好きと嫌いが正反対のプレイヤー同士でマッチング"
            },
            {
              step: 2,
              title: "お題出題",
              description: "相手の特徴を反映したお題が自動生成される"
            },
            {
              step: 3,
              title: "返し選択",
              description: "手持ちのカードから最適な返しを選択"
            },
            {
              step: 4,
              title: "AI採点",
              description: "ユーモア・皮肉・エレガンスの3要素で採点"
            },
            {
              step: 5,
              title: "勝敗決定",
              description: "5ターン終了後、総合得点で勝敗が決まる"
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

