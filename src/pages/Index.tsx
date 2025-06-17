
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, Brain, Sparkles, Users, TreePine, Zap, Heart, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [activeSDG, setActiveSDG] = useState(1);
  const [planetRotation, setPlanetRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanetRotation(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const sdgClusters = [
    { 
      id: 1, 
      title: "Consciousness & Well-being", 
      icon: Brain, 
      color: "from-purple-500 to-pink-500",
      progress: 73,
      nodes: ["Mental Health", "Spiritual Wellness", "Cognitive Freedom"]
    },
    { 
      id: 2, 
      title: "Ecological Symbiosis", 
      icon: TreePine, 
      color: "from-green-500 to-emerald-500",
      progress: 68,
      nodes: ["Climate Regeneration", "Biodiversity", "Sacred Geography"]
    },
    { 
      id: 3, 
      title: "Quantum Governance", 
      icon: Scale, 
      color: "from-blue-500 to-cyan-500",
      progress: 45,
      nodes: ["Polycentric Law", "Ritual Democracy", "AI Ethics"]
    },
    { 
      id: 4, 
      title: "Cosmic Economics", 
      icon: Sparkles, 
      color: "from-yellow-500 to-orange-500",
      progress: 62,
      nodes: ["Sacred Commerce", "Universal Abundance", "Wisdom Currency"]
    }
  ];

  const regions = [
    { name: "Gaia Americas", active: true, x: 25, y: 45 },
    { name: "Ubuntu Africa", active: true, x: 55, y: 60 },
    { name: "Dharma Asia", active: false, x: 75, y: 40 },
    { name: "Sophia Europa", active: true, x: 45, y: 30 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Globe className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CIVICA 144
              </h1>
              <p className="text-sm text-gray-400">Intelligent SDG Operating Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
              <Brain className="w-4 h-4 mr-2" />
              AI Co-Pilot
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8 h-full">
          {/* Atlas of Intelligence */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-cyan-400">
                  <Globe className="w-5 h-5" />
                  <span>Atlas of Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-80 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg overflow-hidden">
                  {/* Planetary Visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/30 to-green-500/30 border-2 border-cyan-400/50"
                      animate={{ rotate: planetRotation }}
                      transition={{ ease: "linear" }}
                    >
                      {/* Regional Nodes */}
                      {regions.map((region, index) => (
                        <motion.div
                          key={region.name}
                          className={`absolute w-3 h-3 rounded-full ${region.active ? 'bg-green-400' : 'bg-gray-500'} border-2 border-white`}
                          style={{
                            left: `${region.x}%`,
                            top: `${region.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          whileHover={{ scale: 1.5 }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                            {region.name}
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:0.6}} />
                            <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:0.6}} />
                          </linearGradient>
                        </defs>
                        {regions.filter(r => r.active).map((region, i, arr) => 
                          arr.slice(i + 1).map((otherRegion, j) => (
                            <motion.line
                              key={`${i}-${j}`}
                              x1={`${region.x}%`}
                              y1={`${region.y}%`}
                              x2={`${otherRegion.x}%`}
                              y2={`${otherRegion.y}%`}
                              stroke="url(#connectionGradient)"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: i * 0.5 }}
                            />
                          ))
                        )}
                      </svg>
                    </motion.div>
                  </div>

                  {/* Floating SDG Indicators */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="text-xs text-cyan-400">Active SDGs: 144</div>
                    <div className="text-xs text-green-400">Connected Regions: 3</div>
                    <div className="text-xs text-purple-400">AI Co-Pilots: 8</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SDG Cluster Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {sdgClusters.map((cluster) => {
                const IconComponent = cluster.icon;
                return (
                  <motion.div
                    key={cluster.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveSDG(cluster.id)}
                  >
                    <Card className={`cursor-pointer transition-all duration-300 ${
                      activeSDG === cluster.id 
                        ? 'bg-gradient-to-br ' + cluster.color + ' border-white/40' 
                        : 'bg-black/40 border-white/20 hover:border-white/40'
                    } backdrop-blur-md`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <IconComponent className="w-6 h-6" />
                          <h3 className="font-semibold">{cluster.title}</h3>
                        </div>
                        <Progress value={cluster.progress} className="mb-3" />
                        <div className="flex flex-wrap gap-1">
                          {cluster.nodes.map((node) => (
                            <Badge key={node} variant="secondary" className="text-xs">
                              {node}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Wisdom Panel */}
          <div className="space-y-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-400">
                  <Heart className="w-5 h-5" />
                  <span>Wisdom Commons</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <p className="text-sm italic">
                    "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family."
                  </p>
                  <p className="text-xs text-gray-400 mt-2">— Chief Seattle (Wisdom Archive)</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-400">Active Rituals</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Dawn Gratitude Circle</span>
                      <span className="text-green-400">🟢 Live</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Climate Healing Ceremony</span>
                      <span className="text-yellow-400">⏳ Starting</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Council of All Relations</span>
                      <span className="text-purple-400">📅 Scheduled</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Users className="w-4 h-4 mr-2" />
                  Join Sacred Council
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">Gaia Pulse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ocean Health</span>
                    <span className="text-blue-400">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Forest Vitality</span>
                    <span className="text-green-400">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Social Harmony</span>
                    <span className="text-purple-400">81%</span>
                  </div>
                  <Progress value={81} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
