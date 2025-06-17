import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Globe,
  Heart,
  Code,
  Zap,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  DollarSign,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  Clock,
  Award,
  Target,
  TrendingUp,
  Shield,
  Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SacredPortal from "@/components/SacredPortal";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import {
  RITUAL_TECH_PROFILE,
  SERVICE_OFFERINGS,
  SERVICE_PACKAGES,
  CASE_STUDIES,
  PAYMENT_OPTIONS,
  BLOG_POSTS,
} from "@/data/ritualTechData";
import { ServiceOffering, CaseStudy } from "@/types/ritualTech";

const RitualTech = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] =
    useState<ServiceOffering | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<
    "dawn" | "midday" | "dusk" | "midnight"
  >("midday");
  const [flourishValue, setFlourishValue] = useState(0);

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
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // Cycle testimonials
  useEffect(() => {
    const testimonials = SERVICE_OFFERINGS.flatMap((s) => s.testimonials);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total Flourish generated
  useEffect(() => {
    const total = CASE_STUDIES.reduce(
      (sum, study) => sum + study.flourishGenerated,
      0,
    );
    setFlourishValue(total);
  }, []);

  const getTimeBasedTheme = () => {
    const themes = {
      dawn: {
        bg: "from-orange-900 via-amber-900 to-yellow-900",
        accent: "from-amber-400 to-orange-500",
        text: "Sacred Morning - Time for New Beginnings",
      },
      midday: {
        bg: "from-blue-900 via-indigo-900 to-purple-900",
        accent: "from-cyan-400 to-blue-500",
        text: "Active Creation - Manifesting Sacred Technology",
      },
      dusk: {
        bg: "from-purple-900 via-pink-900 to-indigo-900",
        accent: "from-purple-400 to-pink-500",
        text: "Integration Time - Reflecting on Sacred Work",
      },
      midnight: {
        bg: "from-slate-900 via-gray-900 to-indigo-900",
        accent: "from-indigo-400 to-purple-500",
        text: "Deep Wisdom - Consulting the Sacred Codes",
      },
    };
    return themes[timeOfDay];
  };

  const theme = getTimeBasedTheme();
  const testimonials = SERVICE_OFFERINGS.flatMap((s) => s.testimonials);

  const handleServiceSelect = (service: ServiceOffering) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = () => {
    // In real implementation, this would integrate with booking system
    console.log("Booking submitted for:", selectedService?.name);
    setShowBookingModal(false);
    setSelectedService(null);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.bg} text-white overflow-x-hidden`}
    >
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-20">
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

      {/* Navigation */}
      <NavigationOracle
        isAuthenticated={false}
        onArrivalChoice={(choice) => {
          console.log("Linking to CIVICA via:", choice);
          navigate("/");
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Profile & Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1
                  className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  Ritual Technologist
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-200">
                  {RITUAL_TECH_PROFILE.title}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {RITUAL_TECH_PROFILE.bio}
                </p>
              </div>

              {/* Sacred Statistics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    {flourishValue}
                  </div>
                  <div className="text-sm text-gray-400">
                    Flourish Generated
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    {SERVICE_OFFERINGS.length}
                  </div>
                  <div className="text-sm text-gray-400">Sacred Services</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    12
                  </div>
                  <div className="text-sm text-gray-400">SDG Clusters</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${theme.accent} hover:opacity-90 text-black font-semibold`}
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Sacred Services
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Begin Sacred Consultation
                </Button>
              </div>

              {/* Cosmic Status */}
              <div className="p-4 bg-black/20 rounded-lg border border-white/20">
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.accent}`}
                  ></div>
                  <span className="text-gray-300">{theme.text}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Available for sacred collaborations • Response time:{" "}
                  {RITUAL_TECH_PROFILE.responseTime}
                </div>
              </div>
            </motion.div>

            {/* Right: Sacred Portal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative">
                <SacredPortal
                  type="mandala"
                  size={400}
                  intensity={0.8}
                  timeOfDay={timeOfDay}
                  interactive={true}
                />

                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8">
                  <Badge className="bg-purple-500/20 text-purple-400 backdrop-blur-sm">
                    <Code className="w-3 h-3 mr-1" />
                    Sacred Code
                  </Badge>
                </div>
                <div className="absolute -bottom-8 -right-8">
                  <Badge className="bg-green-500/20 text-green-400 backdrop-blur-sm">
                    <Heart className="w-3 h-3 mr-1" />
                    Regenerative Tech
                  </Badge>
                </div>
                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
                  <Badge className="bg-blue-500/20 text-blue-400 backdrop-blur-sm">
                    <Users className="w-3 h-3 mr-1" />
                    Collective Wisdom
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sacred Offerings
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Technology services aligned with planetary intelligence and
              ancient wisdom
            </p>
          </motion.div>

          {/* Service Packages */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {SERVICE_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {pkg.mostPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <Star className="w-3 h-3 mr-1" />
                      Most Sacred
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full transition-all duration-300 ${
                    pkg.mostPopular
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 ring-2 ring-purple-400/30"
                      : "bg-black/40 border-white/20 hover:border-white/40"
                  } backdrop-blur-md`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-white text-xl">
                      {pkg.name}
                    </CardTitle>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyan-400">
                        ${pkg.bundlePrice}
                      </div>
                      <div className="text-sm text-gray-400">
                        Save ${pkg.savings}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-center">
                      {pkg.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-cyan-400 text-sm">
                        Includes:
                      </h4>
                      {pkg.services.map((serviceId) => {
                        const service = SERVICE_OFFERINGS.find(
                          (s) => s.id === serviceId,
                        );
                        return service ? (
                          <div
                            key={serviceId}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">
                              {service.name}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="text-center pt-4">
                      <div className="text-xs text-gray-400 mb-2">
                        Duration: {pkg.duration}
                      </div>
                      <Button
                        className={`w-full ${
                          pkg.mostPopular
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        }`}
                        onClick={() => setShowBookingModal(true)}
                      >
                        Begin Sacred Partnership
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Individual Services */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {SERVICE_OFFERINGS.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cursor-pointer"
                onClick={() => handleServiceSelect(service)}
              >
                <Card className="h-full bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs uppercase">
                        {service.tier.replace("_", " ")}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold text-cyan-400">
                          ${service.basePrice}
                        </div>
                        <div className="text-xs text-gray-400">
                          {service.currency}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-400 text-sm">
                        Sacred Deliverables:
                      </h4>
                      <div className="space-y-1">
                        {service.deliverables
                          .slice(0, 3)
                          .map((deliverable, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-xs"
                            >
                              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                              <span className="text-gray-400">
                                {deliverable}
                              </span>
                            </div>
                          ))}
                        {service.deliverables.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{service.deliverables.length - 3} more...
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">
                          {service.flourishAlternative?.amount} Flourish
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                      size="sm"
                    >
                      <ArrowRight className="w-3 h-3 mr-2" />
                      Explore Sacred Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sacred Transformations
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real projects where technology and wisdom create lasting positive
              change
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {CASE_STUDIES.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {study.client}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">
                          {study.flourishGenerated}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl">
                      {study.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">{study.subtitle}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">
                        Challenge:
                      </h4>
                      <p className="text-gray-300 text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">
                        Sacred Approach:
                      </h4>
                      <p className="text-gray-300 text-sm">{study.approach}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">
                        Ritual Elements:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {study.ritualElements.map((element, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 text-xs"
                          >
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-gray-400">{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">
                        Sacred Outcomes:
                      </h4>
                      <div className="space-y-2">
                        {study.outcomes.map((outcome, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-300">
                              {outcome.metric}:
                            </span>
                            <span className="text-sm font-semibold text-purple-400">
                              {outcome.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg">
                      <p className="text-sm italic text-gray-300">
                        "{study.testimonial.quote}"
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        — {study.testimonial.author}, {study.testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Ticker */}
      <section className="relative py-16 bg-black/20">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl italic text-gray-300 mb-4">
                  "{testimonials[currentTestimonial]?.quote}"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <p className="font-semibold text-white">
                      {testimonials[currentTestimonial]?.author}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentTestimonial]?.role} •{" "}
                      {testimonials[currentTestimonial]?.organization}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">
                      {testimonials[currentTestimonial]?.flourishGenerated}{" "}
                      Flourish
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Payment Options */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sacred Exchange
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multiple pathways for value exchange aligned with regenerative
              economics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PAYMENT_OPTIONS.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-4">{option.icon}</div>
                    <h3 className="font-semibold text-white mb-2">
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {option.description}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Processing Fee:</span>
                        <span className="text-white">
                          {option.processingFee
                            ? `${option.processingFee * 100}%`
                            : "Free"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Approval:</span>
                        <span className="text-white">
                          {option.instantApproval ? "Instant" : "Manual"}
                        </span>
                      </div>
                      {option.ritualRequired && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Includes:</span>
                          <span className="text-purple-400">
                            Sacred Ceremony
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Begin Sacred Collaboration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your technology through ritual and regenerative
              principles?
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Sacred Consultation Process
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-400">
                          Initial Sacred Listening
                        </h4>
                        <p className="text-sm text-gray-300">
                          30-minute ceremony to understand your vision and needs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-cyan-400">
                          Sacred Proposal
                        </h4>
                        <p className="text-sm text-gray-300">
                          Custom ceremonial proposal with ritual elements and
                          pricing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400">
                          Covenant Creation
                        </h4>
                        <p className="text-sm text-gray-300">
                          Sacred agreement setting intentions and expectations
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Connect Directly
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:sacred@ritual.tech"
                    className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-all"
                  >
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">sacred@ritual.tech</span>
                  </a>
                  <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white">
                      Response time: {RITUAL_TECH_PROFILE.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                    <Globe className="w-5 h-5 text-green-400" />
                    <span className="text-white">
                      Timezone: {RITUAL_TECH_PROFILE.timezone}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CIVICA Link */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-400/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    CIVICA 144 Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    This external node is spiritually aligned with the CIVICA
                    144 planetary intelligence system. All services integrate
                    with sacred SDG clusters and Flourish economy protocols.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-cyan-400">
                      Sacred Linkages:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300">
                          Ritual libraries cross-linked
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300">
                          Flourish wallet integration
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300">
                          SDG cluster tagging
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300">
                          Sacred scroll mirroring
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/")}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Enter CIVICA 144 Portal
                  </Button>
                </CardContent>
              </Card>

              {/* Blog Preview */}
              <Card className="mt-8 bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Sacred Wisdom Scrolls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {BLOG_POSTS.slice(0, 2).map((post) => (
                    <div key={post.id} className="p-3 bg-black/20 rounded-lg">
                      <h4 className="font-semibold text-white text-sm">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {post.excerpt.slice(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {post.readTime} min read
                        </span>
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400 text-xs">
                            {post.flourishValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-400/50 text-orange-400"
                  >
                    Read All Sacred Scrolls
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/60 border border-white/20 rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedService
                  ? `Book: ${selectedService.name}`
                  : "Sacred Booking"}
              </h3>

              {selectedService && (
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">
                      Service Details:
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {selectedService.longDescription}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-white">
                        Investment: ${selectedService.basePrice}{" "}
                        {selectedService.currency}
                      </span>
                      <span className="text-gray-400">
                        Duration: {selectedService.duration}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Sacred Name"
                      className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="Sacred Email"
                      className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                    <textarea
                      placeholder="Describe your sacred intention and project vision..."
                      rows={4}
                      className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBookingSubmit}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                    >
                      Begin Sacred Consultation
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RitualTech;
