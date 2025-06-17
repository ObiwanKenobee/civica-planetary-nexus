import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell, Settings, Menu, X, Compass,
  Heart, MessageCircle, Eye, Hand
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlyphLogo from './GlyphLogo';
import ClusterCompass from './ClusterCompass';
import RitualInput from './RitualInput';
import PresenceOrb from './PresenceOrb';
import { NavigationOracleState, ArrivalChoice, RoleMenuConfig, SacredPulse } from '@/types/navigation';
import { ARRIVAL_CHOICES, ROLE_MENU_CONFIGS, SAMPLE_SACRED_PULSES } from '@/data/navigationData';

interface NavigationOracleProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onRoleSelect?: (role: string) => void;
  onArrivalChoice?: (choice: string) => void;
  className?: string;
}

const NavigationOracle = ({
  isAuthenticated = false,
  userRole,
  onRoleSelect,
  onArrivalChoice,
  className = ""
}: NavigationOracleProps) => {
  const navigate = useNavigate();
  const [oracleState, setOracleState] = useState<NavigationOracleState>({
    mode: isAuthenticated ? 'authenticated' : 'arrival',
    selectedRole: userRole || null,
    activeCluster: null,
    ritualPhase: 'preparation',
    cosmicAlignment: {
      lunarPhase: 'full',
      timeOfDay: 'midday',
      season: 'spring',
      sacredEvents: [],
      planetaryEnergy: 0.7,
    },
    intentionFocus: null,
  });

  const [showCompass, setShowCompass] = useState(false);
  const [showPulses, setShowPulses] = useState(false);
  const [activePulses, setActivePulses] = useState<SacredPulse[]>(SAMPLE_SACRED_PULSES);
  const [currentLunarPhase, setCurrentLunarPhase] = useState<'new' | 'waxing' | 'full' | 'waning'>('full');

  // Update cosmic alignment based on real time
  useEffect(() => {
    const updateCosmicAlignment = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDate();

      let timeOfDay: 'dawn' | 'midday' | 'dusk' | 'midnight';
      if (hour >= 5 && hour < 9) timeOfDay = 'dawn';
      else if (hour >= 9 && hour < 17) timeOfDay = 'midday';
      else if (hour >= 17 && hour < 21) timeOfDay = 'dusk';
      else timeOfDay = 'midnight';

      // Simplified lunar phase calculation
      const lunarCycle = ((day % 28) / 28) * 4;
      let lunarPhase: 'new' | 'waxing' | 'full' | 'waning';
      if (lunarCycle < 1) lunarPhase = 'new';
      else if (lunarCycle < 2) lunarPhase = 'waxing';
      else if (lunarCycle < 3) lunarPhase = 'full';
      else lunarPhase = 'waning';

      setCurrentLunarPhase(lunarPhase);
      setOracleState(prev => ({
        ...prev,
        cosmicAlignment: {
          ...prev.cosmicAlignment,
          timeOfDay,
          lunarPhase,
          planetaryEnergy: Math.sin(Date.now() * 0.0001) * 0.3 + 0.7,
        },
      }));
    };

    updateCosmicAlignment();
    const interval = setInterval(updateCosmicAlignment, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Update authentication state
  useEffect(() => {
    setOracleState(prev => ({
      ...prev,
      mode: isAuthenticated ? 'authenticated' : 'arrival',
      selectedRole: userRole || null,
    }));
  }, [isAuthenticated, userRole]);

  const handleArrivalChoice = (choice: ArrivalChoice) => {
    onArrivalChoice?.(choice.id);

    // Navigate based on choice
    switch (choice.portal.type) {
      case 'ritual_library':
        navigate('/dashboard?focus=rituals');
        break;
      case 'copilot_council':
        navigate('/dashboard?focus=copilots');
        break;
      case 'scroll_forge':
        navigate('/dashboard?focus=scrolls');
        break;
      case 'atlas_constellation':
        navigate('/dashboard?focus=atlas');
        break;
      case 'flourish_garden':
        navigate('/billing');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const handleRoleAction = (action: any) => {
    console.log(`Performing action: ${action.verb}`, action);
    navigate(action.destination);
  };

  const handleClusterSelect = (clusterId: string) => {
    setOracleState(prev => ({ ...prev, activeCluster: clusterId }));
    setShowCompass(false);

    // Navigate based on cluster
    const clusterRoutes: Record<string, string> = {
      intelligence: '/dashboard',
      governance: '/governance',
      economics: '/billing',
      technology: '/technology',
      rituals: '/rituals',
      infrastructure: '/infrastructure',
      bioregional: '/bioregional',
      education: '/education',
      health: '/health',
      culture: '/culture',
      communication: '/communication',
      ritual_tech: '/ritual-technologist',
      research: '/research',
    };

    const route = clusterRoutes[clusterId];
    if (route) {
      navigate(route);
    }
    };

    return (
      <div
        className={`relative bg-black/40 backdrop-blur-md border-b border-white/20 ${className}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Glyph Logo and Main Navigation */}
            <div className="flex items-center space-x-8">
              <GlyphLogo
                variant={userRole || 'base'}
              lunarPhase={currentLunarPhase}
              size={48}
              energyLevel={oracleState.cosmicAlignment.planetaryEnergy}
              interactive={true}
            />
            <div className="hidden md:block">
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CIVICA 144+
              </div>
              <div className="text-xs text-gray-400 capitalize">
                {oracleState.cosmicAlignment.timeOfDay} • {oracleState.cosmicAlignment.lunarPhase} moon
              </div>
            </div>
          </motion.div>

          {/* Center: Context-Aware Navigation */}
          <div className="flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              {oracleState.mode === 'arrival' && (
                <motion.div
                  key="arrival"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <h2 className="text-lg text-white">What brings you here today?</h2>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {ARRIVAL_CHOICES.map((choice) => (
                      <motion.button
                        key={choice.id}
                        className={`
                          px-4 py-2 rounded-lg border border-white/20
                          bg-gradient-to-r ${choice.color} bg-opacity-20
                          hover:bg-opacity-40 transition-all
                          flex items-center space-x-2
                        `}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleArrivalChoice(choice)}
                      >
                        <span className="text-lg">{choice.glyph}</span>
                        <span className="text-sm text-white">{choice.intention}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {oracleState.mode === 'authenticated' && roleConfig && (
                <motion.div
                  key="authenticated"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center space-x-6"
                >
                  {/* Role-based action menu */}
                  <div className="flex items-center space-x-3">
                    {roleConfig.actions.slice(0, 4).map((action) => (
                      <motion.button
                        key={action.id}
                        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center space-x-2"
                        style={{
                          borderColor: roleConfig.primaryColor,
                          color: roleConfig.primaryColor
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoleAction(action)}
                      >
                        <span className="text-sm">{action.icon}</span>
                        <span className="text-sm font-medium">{action.verb}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Sacred input */}
                  <div className="min-w-80">
                    <RitualInput
                      mode="intention"
                      onIntention={handleIntention}
                      size="sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Cluster Compass, Pulses, and Presence Orb */}
          <div className="flex items-center space-x-4">
            {/* Cluster Compass Toggle */}
            <motion.button
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCompass(!showCompass)}
            >
              <Compass className="w-5 h-5 text-cyan-400" />
            </motion.button>

            {/* Sacred Pulses */}
            <motion.button
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPulses(!showPulses)}
            >
              <Bell className="w-5 h-5 text-purple-400" />
              {activePulses.filter(p => p.urgency === 'urgent' || p.urgency === 'important').length > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>

            {/* Presence Orb */}
            {isAuthenticated && (
              <PresenceOrb
                userRole={userRole}
                activeCluster={oracleState.activeCluster || undefined}
                ritualStatus={oracleState.ritualPhase !== 'preparation' ? 'Active Ceremony' : undefined}
                size="md"
                onLogoutClick={() => navigate('/auth')}
                onSettingsClick={() => navigate('/settings')}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Cluster Compass */}
      <AnimatePresence>
        {showCompass && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-full right-6 mt-2 z-50"
          >
            <Card className="bg-black/80 border-white/20 backdrop-blur-md p-4">
              <CardContent className="p-0">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Intelligence Compass</h3>
                  <p className="text-xs text-gray-400">Navigate the 12 sacred clusters</p>
                </div>
                <ClusterCompass
                  selectedCluster={oracleState.activeCluster || undefined}
                  onClusterSelect={handleClusterSelect}
                  size={120}
                  showLabels={true}
                  energyFlow={true}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sacred Pulses Panel */}
      <AnimatePresence>
        {showPulses && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-full right-6 mt-2 z-50"
            style={{ width: 320 }}
          >
            <Card className="bg-black/80 border-white/20 backdrop-blur-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-400">Sacred Pulses</h3>
                  <Badge variant="outline" className="text-xs">
                    {activePulses.length} active
                  </Badge>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {activePulses.map((pulse) => (
                    <motion.div
                      key={pulse.id}
                      className={`
                        p-3 rounded-lg border transition-all cursor-pointer
                        ${pulse.urgency === 'urgent' ? 'border-red-400 bg-red-500/10' :
                          pulse.urgency === 'important' ? 'border-yellow-400 bg-yellow-500/10' :
                          'border-white/20 bg-white/5'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{pulse.energySignature}</span>
                            <h4 className="text-sm font-semibold text-white">{pulse.title}</h4>
                          </div>
                          <p className="text-xs text-gray-300">{pulse.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{pulse.source}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                pulse.urgency === 'urgent' ? 'border-red-400 text-red-400' :
                                pulse.urgency === 'important' ? 'border-yellow-400 text-yellow-400' :
                                'border-gray-400 text-gray-400'
                              }`}
                            >
                              {pulse.urgency}
                            </Badge>
                          </div>
                          {pulse.actions && (
                            <div className="flex space-x-2 mt-2">
                              {pulse.actions.map((action, index) => (
                                <button
                                  key={index}
                                  className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition-colors"
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavigationOracle;