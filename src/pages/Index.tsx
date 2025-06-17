import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Brain,
  Zap,
  Heart,
  Users,
  Layers,
  Puzzle,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

import AtlasOfIntelligence from "@/components/AtlasOfIntelligence";
import PatternRecognition from "@/components/PatternRecognition";
import SDGIntelligence from "@/components/SDGIntelligence";
import CollaborativeBuilder from "@/components/CollaborativeBuilder";
import FlourishDisplay from "@/components/FlourishDisplay";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import CommunityHub from "@/components/CommunityHub";
import SacredCalendar from "@/components/SacredCalendar";
import WisdomLibrary from "@/components/WisdomLibrary";
import SDGIntelligence from "@/components/SDGIntelligence";
import SDGNetworkBuilder from "@/components/SDGNetworkBuilder";
import CollaborativeBuilder from "@/components/CollaborativeBuilder";
import PatternRecognition from "@/components/PatternRecognition";
import {
  intelligenceClusters,
  getClusterById,
} from "@/data/intelligenceClusters";

import SacredNavigation from "@/components/SacredNavigation";
import FlourishDisplay from "@/components/FlourishDisplay";
import NavigationOracle from "@/components/navigation/NavigationOracle";

const Index = () => {
  const [activeCluster, setActiveCluster] = useState<number>(0);
  const [planetRotation, setPlanetRotation] = useState(0);
  const [showSDGDetails, setShowSDGDetails] = useState(false);
  const [activeNetworkView, setActiveNetworkView] = useState("atlas");

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanetRotation((prev) => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleClusterSelect = (clusterId: number) => {
    setActiveCluster(clusterId);
    setShowSDGDetails(clusterId > 0);
  };

  const handlePatternComplete = (pattern: any[]) => {
    console.log("Pattern completed:", pattern);
    // Add pattern completion logic here
  };

  const selectedCluster =
    activeCluster > 0 ? getClusterById(activeCluster) : null;

  const globalStats = {
    totalProgress: Math.round(
      intelligenceClusters.reduce(
        (sum, cluster) => sum + cluster.totalProgress,
        0,
      ) / intelligenceClusters.length,
    ),
    activeNodes: intelligenceClusters.reduce(
      (sum, cluster) =>
        sum + cluster.nodes.filter((node) => node.status === "active").length,
      0,
    ),
    totalRituals: intelligenceClusters.reduce(
      (sum, cluster) => sum + cluster.activeRituals,
      0,
    ),
    aiCoPilots: intelligenceClusters.reduce(
      (sum, cluster) => sum + cluster.aiCoPilots,
      0,
    ),
  };

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
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation Oracle Header */}
      <NavigationOracle
        isAuthenticated={true}
        userRole="ritual_designer" // This should come from auth context
        onRoleSelect={(role) => console.log("Role selected:", role)}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {!showSDGDetails ? (
          <Tabs defaultValue="atlas" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
              <TabsTrigger
                value="atlas"
                className="data-[state=active]:bg-cyan-500/50"
              >
                <Globe className="w-4 h-4 mr-2" />
                Atlas
              </TabsTrigger>
              <TabsTrigger
                value="builder"
                className="data-[state=active]:bg-purple-500/50"
              >
                <Layers className="w-4 h-4 mr-2" />
                Network Builder
              </TabsTrigger>
              <TabsTrigger
                value="collaborative"
                className="data-[state=active]:bg-green-500/50"
              >
                <Users className="w-4 h-4 mr-2" />
                Collaborative
              </TabsTrigger>
              <TabsTrigger
                value="patterns"
                className="data-[state=active]:bg-orange-500/50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Pattern Recognition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="atlas" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Atlas of Intelligence */}
                <div className="lg:col-span-2 space-y-6">
                  <AtlasOfIntelligence
                    onSelectCluster={handleClusterSelect}
                    selectedCluster={activeCluster}
                  />

                  {/* Global Intelligence Dashboard */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-green-400">
                          Planetary Pulse
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Ecological Intelligence</span>
                            <span className="text-green-400">67%</span>
                          </div>
                          <Progress value={67} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Social Harmony</span>
                            <span className="text-blue-400">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Cosmic Consciousness</span>
                            <span className="text-purple-400">43%</span>
                          </div>
                          <Progress value={43} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-cyan-400">
                          Network Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-400">
                              {globalStats.activeNodes}
                            </div>
                            <div className="text-xs text-gray-400">
                              Active SDGs
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-400">
                              {globalStats.totalRituals}
                            </div>
                            <div className="text-xs text-gray-400">
                              Live Rituals
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-400">
                              {globalStats.aiCoPilots}
                            </div>
                            <div className="text-xs text-gray-400">
                              AI Co-Pilots
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-400">
                              12
                            </div>
                            <div className="text-xs text-gray-400">
                              Clusters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                          "The Earth does not belong to us; we belong to the
                          Earth. All things are connected like the blood that
                          unites one family."
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          — Chief Seattle (Wisdom Archive)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-cyan-400">
                          Active Sacred Protocols
                        </h4>
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
                            <span>Intergenerational Council</span>
                            <span className="text-purple-400">
                              📅 Scheduled
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cosmic Consciousness Grid</span>
                            <span className="text-blue-400">🌌 Emerging</span>
                          </div>
                        </div>
                      </div>

                      <FlourishDisplay />

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Users className="w-4 h-4 mr-2" />
                        Join Sacred Council
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-orange-400">
                        Intelligence Clusters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {intelligenceClusters.slice(0, 6).map((cluster) => (
                        <div
                          key={cluster.id}
                          className="flex justify-between items-center p-2 hover:bg-white/5 rounded cursor-pointer"
                          onClick={() => handleClusterSelect(cluster.id)}
                        >
                          <span className="text-sm">
                            {cluster.name.split(" & ")[0]}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={cluster.totalProgress}
                              className="w-12 h-1"
                            />
                            <span className="text-xs text-gray-400">
                              {cluster.totalProgress}%
                            </span>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full text-cyan-400 hover:bg-cyan-400/20"
                        onClick={() => setShowSDGDetails(false)}
                      >
                        View All 12 Clusters
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="builder" className="space-y-6">
              <SDGNetworkBuilder onPatternComplete={handlePatternComplete} />
            </TabsContent>

            <TabsContent value="collaborative" className="space-y-6">
              <CollaborativeBuilder />
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <PatternRecognition />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSDGDetails(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  ← Back to Atlas
                </Button>
                {selectedCluster && (
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCluster.name}
                  </h2>
                )}
              </div>
            </div>

            {selectedCluster && (
              <SDGIntelligence
                sdgId={selectedCluster.id}
                title={selectedCluster.name}
                color={`${selectedCluster.color}`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
