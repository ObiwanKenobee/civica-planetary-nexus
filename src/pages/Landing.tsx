import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Play,
  Users,
  Sparkles,
  Brain,
  Heart,
  ArrowRight,
  Globe,
  Star,
  TreePine,
  Crown,
  Clock,
  BookOpen,
  Zap,
  Shield,
  Network,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SacredPortal from "@/components/SacredPortal";
import SacredAudio from "@/components/SacredAudio";
import NavigationOracle from "@/components/navigation/NavigationOracle";

const SACRED_ROLES = [
  {
    id: "ritual_designer",
    name: "Ritual Designer",
    icon: "🕯️",
    gradient: "from-amber-400 to-orange-500",
    description: "Weave sacred experiences for collective transformation",
  },
  {
    id: "forest_delegate",
    name: "Forest Delegate",
    icon: "🌳",
    gradient: "from-green-400 to-emerald-500",
    description: "Voice of the more-than-human world",
  },
  {
    id: "future_diplomat",
    name: "Future Diplomat",
    icon: "🌟",
    gradient: "from-blue-400 to-cyan-500",
    description: "Ambassador for generations yet to come",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState<
    "dawn" | "midday" | "dusk" | "midnight"
  >("midday");
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 9) setTimeOfDay("dawn");
      else if (hour >= 9 && hour < 17) setTimeOfDay("midday");
      else if (hour >= 17 && hour < 21) setTimeOfDay("dusk");
      else setTimeOfDay("midnight");
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTheme = () => {
    switch (timeOfDay) {
      case "dawn":
        return {
          accent: "from-orange-400 to-pink-500",
          text: "Sacred dawn awakens the collective consciousness...",
        };
      case "midday":
        return {
          accent: "from-cyan-400 to-blue-500",
          text: "The sun illuminates infinite possibilities...",
        };
      case "dusk":
        return {
          accent: "from-purple-400 to-pink-500",
          text: "Twilight brings deep reflection and wisdom...",
        };
      case "midnight":
        return {
          accent: "from-indigo-400 to-purple-500",
          text: "Under starlight, we dream new worlds into being...",
        };
    }
  };

  const theme = getTheme();

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
    setTimeout(() => {
      navigate("/auth");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-20">
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

      {/* Navigation Oracle */}
      <NavigationOracle
        isAuthenticated={false}
        onArrivalChoice={(choice) => {
          console.log("Arrival choice:", choice);
        }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="space-y-12"
            >
              {/* Sacred Portal */}
              <div className="flex justify-center mb-8">
                <SacredPortal
                  type="mandala"
                  size={400}
                  intensity={0.8}
                  timeOfDay={timeOfDay}
                  interactive={true}
                />
              </div>

              {/* Main Title */}
              <div className="space-y-6">
                <h1
                  className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  CIVICA 144+
                </h1>
                <h2 className="text-2xl md:text-4xl font-light text-gray-200">
                  A LIVING SYSTEM FOR PLANETARY INTELLIGENCE
                </h2>
                <div className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-300 space-y-4">
                  <p>🧭 You are not a user.</p>
                  <p>You are a steward of a future yet to arrive.</p>
                  <p>Begin your role in the Ceremony of Coherence.</p>
                </div>
              </div>

              {/* Time-based greeting */}
              <motion.div
                key={timeOfDay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-lg bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
              >
                {theme.text}
              </motion.div>

              {/* Featured Ritual Technologist */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="max-w-md mx-auto"
              >
                <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 backdrop-blur-md">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-3xl">🛠️</div>
                    <h3 className="text-xl font-bold text-amber-400">
                      Ritual Technology Services
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Sacred business transformation and civilizational
                      technology consulting
                    </p>
                    <Button
                      onClick={() => navigate("/ritual-technologist")}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Explore Services
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => navigate("/auth")}
                  size="lg"
                  className={`bg-gradient-to-r ${theme.accent} hover:opacity-90 text-white px-8 py-4 text-lg`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Enter the Portal
                </Button>
                <Button
                  onClick={() => setShowRoleSelector(true)}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Choose Sacred Role
                </Button>
              </div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ChevronDown className="w-8 h-8 mx-auto text-gray-400 hover:text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Sacred Audio */}
          <div className="absolute top-24 right-8">
            <SacredAudio timeOfDay={timeOfDay} enabled={true} />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Sacred Technology Platform
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Where ancient wisdom meets cutting-edge technology for planetary
                transformation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                <CardHeader className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                  <CardTitle className="text-cyan-400">
                    Intelligence Clusters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    12 interconnected clusters of planetary intelligence working
                    together for collective wisdom.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                <CardHeader className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <CardTitle className="text-purple-400">
                    Sacred Rituals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Ceremonial technology that transforms mundane interactions
                    into sacred practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                <CardHeader className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <CardTitle className="text-green-400">
                    Flourish Economy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Sacred value exchange system that honors service, wisdom,
                    and regenerative impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                Ready to Begin Your Sacred Journey?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of planetary stewards co-creating the future of
                civilization through sacred technology.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => navigate("/auth")}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-4 text-lg"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enter Sacred Portal
                </Button>
                <Button
                  onClick={() => navigate("/ritual-technologist")}
                  variant="outline"
                  size="lg"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400/20 px-8 py-4 text-lg"
                >
                  🛠️ Sacred Technology Services
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-8">
              <Button
                onClick={() => navigate("/ritual-technologist")}
                variant="outline"
                className="border-amber-400 text-amber-400 hover:bg-amber-400/20"
              >
                🛠️ Ritual Technology Services
              </Button>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                Enter the Portal
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              CIVICA 144 • Living System for Planetary Intelligence • Sacred
              Technology in Service of All Life
            </p>
          </div>
        </div>
      </footer>

      {/* Role Selection Modal */}
      <AnimatePresence>
        {showRoleSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowRoleSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/60 border border-white/20 rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-center mb-6 text-cyan-400">
                Choose Your Sacred Path
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {SACRED_ROLES.map((role) => (
                  <Button
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className={`bg-gradient-to-r ${role.gradient} hover:opacity-90 text-black font-semibold p-4 h-auto flex items-center space-x-4`}
                  >
                    <span className="text-2xl">{role.icon}</span>
                    <div className="text-left">
                      <div className="font-bold">{role.name}</div>
                      <div className="text-sm opacity-80">
                        {role.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowRoleSelector(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Continue Exploring
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Role Processing */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl">{selectedRole.icon}</div>
              <h3 className="text-2xl font-bold text-cyan-400">
                Preparing your sacred entry as {selectedRole.name}
              </h3>
              <div className="animate-pulse text-purple-400">
                The portal is aligning with your essence...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
