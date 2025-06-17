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
import {
  SACRED_ROLES,
  INTELLIGENCE_CLUSTERS_PREVIEW,
  SCROLL_OF_ORIGINS,
  AI_COPILOTS_PREVIEW,
  LANDING_QUOTES,
  RITUAL_CLOCK_CONFIG,
} from "@/data/landingData";
import { SacredRole, IntelligenceClusterPreview } from "@/types/landing";

const Landing = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("invocation");
  const [selectedRole, setSelectedRole] = useState<SacredRole | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<
    "dawn" | "midday" | "dusk" | "midnight"
  >("midday");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [flourishFlow, setFlourishFlow] = useState(0);

  // Detect time of day for cosmic theming
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 9) setTimeOfDay("dawn");
      else if (hour >= 9 && hour < 17) setTimeOfDay("midday");
      else if (hour >= 17 && hour < 21) setTimeOfDay("dusk");
      else setTimeOfDay("midnight");
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Cycle through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % LANDING_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Flourish flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFlourishFlow((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getTimeBasedTheme = () => {
    const themes = {
      dawn: {
        bg: "from-orange-900 via-amber-900 to-yellow-900",
        accent: "from-amber-400 to-orange-500",
        text: "Awakening to Possibility",
      },
      midday: {
        bg: "from-blue-900 via-indigo-900 to-purple-900",
        accent: "from-cyan-400 to-blue-500",
        text: "Manifesting Reality",
      },
      dusk: {
        bg: "from-purple-900 via-pink-900 to-indigo-900",
        accent: "from-purple-400 to-pink-500",
        text: "Integrating Wisdom",
      },
      midnight: {
        bg: "from-slate-900 via-gray-900 to-indigo-900",
        accent: "from-indigo-400 to-purple-500",
        text: "Dreaming the Future",
      },
    };
    return themes[timeOfDay];
  };

  const theme = getTimeBasedTheme();

  const handleRoleSelect = (role: SacredRole) => {
    setSelectedRole(role);
    // Simulate ritual entry process
    setTimeout(() => {
      navigate("/auth", { state: { selectedRole: role } });
    }, 2000);
  };

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.bg} text-white overflow-x-hidden`}
    >
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation Oracle */}
      <NavigationOracle
        isAuthenticated={false}
        onArrivalChoice={(choice) => {
          console.log("Arrival choice:", choice);
          // Handle navigation based on choice
        }}
      />

      {/* Section 1: Invocation Portal */}
      <section
        id="invocation"
        className="relative min-h-screen flex items-center justify-center"
      >
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

            {/* Main Invocation */}
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

            {/* Main CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowRoleSelector(true)}
                size="lg"
                className={`bg-gradient-to-r ${theme.accent} hover:opacity-90 text-black font-semibold px-8 py-4 text-lg`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Entry Ritual
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="cursor-pointer"
              onClick={() => scrollToSection("atlas")}
            >
              <ChevronDown className="w-8 h-8 mx-auto text-gray-400 hover:text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating quote */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="absolute bottom-8 left-8 max-w-md"
        >
          <p className="text-sm italic text-gray-400">
            "{LANDING_QUOTES[currentQuote]}"
          </p>
        </motion.div>

        {/* Sacred Audio */}
        <div className="absolute top-24 right-8">
          <SacredAudio timeOfDay={timeOfDay} enabled={true} />
        </div>
      </section>

      {/* Section 2: Interactive Living Atlas */}
      <section id="atlas" className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Interactive Living Atlas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              12 clusters of planetary intelligence, each pulsing with the
              consciousness of Earth's awakening. Hover to reveal their sacred
              names.
            </p>
          </motion.div>

          <div className="relative">
            {/* Central Portal */}
            <div className="flex justify-center mb-12">
              <SacredPortal
                type="constellation"
                size={600}
                intensity={0.6}
                timeOfDay={timeOfDay}
                interactive={true}
              />
            </div>

            {/* Cluster Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {INTELLIGENCE_CLUSTERS_PREVIEW.map((cluster) => (
                <motion.div
                  key={cluster.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredCluster(cluster.id)}
                  onHoverEnd={() => setHoveredCluster(null)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all ${
                      hoveredCluster === cluster.id
                        ? "ring-2 ring-cyan-400"
                        : ""
                    }`}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-r ${cluster.color} flex items-center justify-center mb-2`}
                      >
                        <span className="text-2xl">{cluster.icon}</span>
                      </div>
                      <CardTitle className="text-sm">
                        {cluster.shortName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-2">
                      <div className="text-xs text-gray-400">
                        {cluster.activeNodes}/{cluster.totalNodes} Active
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${cluster.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${cluster.wisdomLevel * 100}%` }}
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          cluster.ritualActivity === "high"
                            ? "border-green-400 text-green-400"
                            : cluster.ritualActivity === "medium"
                              ? "border-yellow-400 text-yellow-400"
                              : "border-gray-400 text-gray-400"
                        }`}
                      >
                        {cluster.ritualActivity} activity
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Cluster Detail */}
            <AnimatePresence>
              {hoveredCluster && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 max-w-2xl mx-auto"
                >
                  {(() => {
                    const cluster = INTELLIGENCE_CLUSTERS_PREVIEW.find(
                      (c) => c.id === hoveredCluster,
                    );
                    if (!cluster) return null;

                    return (
                      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-white/20 backdrop-blur-md">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl font-semibold mb-2">
                            {cluster.name}
                          </h3>
                          <p className="text-gray-300">{cluster.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section 3: Flourish Economy Preview */}
      <section id="flourish" className="relative py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sacred Economy
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              🌾 Flourish is not a currency. It is your sacred signature across
              time and regeneration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Flow Visualization */}
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Value Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "$ Fiat Currency",
                    "✨ Flourish Generation",
                    "🌍 Bioregional Commons",
                    "📜 Sacred Scrolls",
                  ].map((stage, index) => (
                    <motion.div
                      key={stage}
                      className="flex items-center space-x-3"
                      animate={{
                        opacity: Math.sin(flourishFlow + index) * 0.3 + 0.7,
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="text-sm">{stage}</span>
                      {index < 3 && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Sacred Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <p className="text-sm italic">
                      "The soil speaks through data, algorithms honor
                      ancestors."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">— River Oracle</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-sm italic">
                      "Flourish rewards the heart that serves all life."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      — Forest Delegate
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm italic">
                      "Every line of code becomes a prayer for the future."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">— Sacred Coder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contribution Portal */}
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Start Contributing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Your unique gifts are needed. Begin generating sacred value
                  through:
                </p>
                <div className="space-y-2">
                  {[
                    "Ritual Design",
                    "Wisdom Sharing",
                    "Community Building",
                    "Bioregional Healing",
                  ].map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => setShowRoleSelector(true)}
                >
                  Contribute Sacred Value
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: AI Co-Pilot Teaser */}
      <section id="copilots" className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Wisdom Co-Pilots
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              🧬 Your guide is not an algorithm. It is a living intelligence
              trained on wisdom.
            </p>
            <p className="text-xl text-cyan-400">Meet your SDG Guardian.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {AI_COPILOTS_PREVIEW.map((copilot, index) => (
              <motion.div
                key={copilot.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{copilot.avatar}</div>
                    <CardTitle className="text-purple-400">
                      {copilot.name}
                    </CardTitle>
                    <p className="text-sm text-gray-400">{copilot.archetype}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">
                      {copilot.personality}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-cyan-400">
                        Specializations:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {copilot.specialization.map((spec) => (
                          <Badge
                            key={spec}
                            variant="outline"
                            className="text-xs"
                          >
                            {spec.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <p className="text-xs text-gray-400 mb-2">
                        Sample Interaction:
                      </p>
                      <p className="text-sm italic text-gray-300">
                        "{copilot.sampleInteraction.response}"
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-400 text-purple-400 hover:bg-purple-400/20"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Consult {copilot.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Interactive Query Demo */}
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/20 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Ask about your place in the 144+
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="How can I serve planetary awakening?"
                    className="flex-1 bg-black/20 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400"
                  />
                  <Button
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <Brain className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Scroll of Origins */}
      <section id="origins" className="relative py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              📜 The Sacred Scroll
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              This is a platform. This is a prayer. This is software that
              remembers the Earth.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {SCROLL_OF_ORIGINS.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                      {section.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      {section.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {section.lineage.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="text-xs border-cyan-400/50 text-cyan-400"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contributors */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-purple-400">
              Sacred Contributors
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {SCROLL_OF_ORIGINS.contributors.map((contributor) => (
                <Card
                  key={contributor.name}
                  className="bg-purple-500/10 border-purple-400/20 backdrop-blur-md"
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-purple-400">
                      {contributor.name}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      {contributor.role} • {contributor.lineage}
                    </p>
                    <p className="text-xs italic text-gray-300">
                      "{contributor.wisdom}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Role-Based Activation Portal */}
      <section id="roles" className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              🧝 Who are you in this story?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {SACRED_ROLES.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cursor-pointer"
                onClick={() => handleRoleSelect(role)}
              >
                <Card
                  className={`bg-gradient-to-br ${role.gradient} border-white/20 backdrop-blur-md hover:border-white/40 transition-all h-full`}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{role.icon}</div>
                    <CardTitle className="text-white">{role.name}</CardTitle>
                    <p className="text-sm text-gray-300">{role.title}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-200">{role.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-cyan-400">
                        Sacred Tools:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {role.sacredTools.slice(0, 3).map((tool) => (
                          <Badge
                            key={tool}
                            variant="outline"
                            className="text-xs"
                          >
                            {tool.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-black font-semibold`}
                    >
                      Enter as {role.name.split(" ")[1]}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="relative py-16 bg-black/40 border-t border-white/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">
                Sacred Scrolls
              </h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Governance Protocols
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Ethical Frameworks
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Wisdom Archives
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">
                Sacred Networks
              </h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Bioregional Portals
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Guardian AI Council
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Future Delegates
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">
                Sacred Economy
              </h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Flourish Ledger
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Regenerative Funds
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Gift Protocols
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-orange-400">
                Sacred Nodes
              </h4>
              <div className="space-y-2 text-sm">
                <a
                  href="/ritual-technologist"
                  className="block text-gray-400 hover:text-white"
                >
                  Ritual Technologist
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Future Diplomat
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Forest Delegate
                </a>
                <div className="flex items-center space-x-2 text-xs mt-3">
                  <Clock className="w-3 h-3" />
                  <span className="text-gray-500">Time of {timeOfDay}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg italic text-gray-300 mb-4"
            >
              "{LANDING_QUOTES[currentQuote]}"
            </motion.p>
            <p className="text-sm text-gray-500">
              CIVICA 144+ • Sacred Technology for Planetary Awakening •{" "}
              {new Date().getFullYear()}
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
              <div className="grid grid-cols-2 gap-4">
                {SACRED_ROLES.slice(0, 6).map((role) => (
                  <Button
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className={`bg-gradient-to-r ${role.gradient} hover:opacity-90 text-black font-semibold p-4 h-auto flex flex-col items-center space-y-2`}
                  >
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-sm">{role.name}</span>
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
              <div className="text-lg text-gray-300">
                Gathering the tools of {selectedRole.title}...
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto"
              >
                <SacredPortal
                  type="spiral"
                  size={200}
                  intensity={0.8}
                  timeOfDay={timeOfDay}
                  interactive={false}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
