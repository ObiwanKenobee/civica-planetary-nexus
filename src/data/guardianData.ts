import {
  BalanceAlert,
  RegionalMetrics,
  AuditEntry,
  AIEthicsAlert,
  DisputeCase,
  RitualFailsafe,
  RevOpsMetrics,
  MetaCoPilotInsight,
  CovenantContract,
} from "../types/guardian";

export const DEMO_CREDENTIALS = {
  username: "guardian-demo",
  password: "sacred-oversight-2024",
};

export const mockBalanceAlerts: BalanceAlert[] = [
  {
    id: "alert-001",
    type: "financial_centralization",
    severity: "high",
    description:
      "Unusual concentration of Flourish tokens in Pacific Northwest bioregion",
    affectedRegions: ["PNW-001", "PNW-002"],
    flourishValue: 12500,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "active",
  },
  {
    id: "alert-002",
    type: "governance_capture",
    severity: "medium",
    description:
      "Single user account controlling 15% of voting power in Regenerative Tech cluster",
    affectedRegions: ["REGEN-TECH"],
    flourishValue: 8900,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "investigating",
  },
  {
    id: "alert-003",
    type: "wealth_concentration",
    severity: "critical",
    description:
      "Top 5% of users hold 60% of platform value - triggering redistribution ceremony",
    affectedRegions: ["GLOBAL"],
    flourishValue: 45000,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "active",
  },
];

export const mockRegionalMetrics: RegionalMetrics[] = [
  {
    regionId: "PNW-001",
    name: "Cascadian Bioregion",
    fundingLevel: "overfunded",
    extractionRatio: 0.3,
    flourishFlow: 15600,
    sdgAlignment: 85,
    lastAudit: new Date(Date.now() - 24 * 60 * 60 * 1000),
    alerts: ["Excess tech concentration", "Low indigenous representation"],
  },
  {
    regionId: "AFR-001",
    name: "East African Highlands",
    fundingLevel: "underfunded",
    extractionRatio: 2.1,
    flourishFlow: 3200,
    sdgAlignment: 92,
    lastAudit: new Date(Date.now() - 48 * 60 * 60 * 1000),
    alerts: ["Critical funding gap", "High extraction ratio"],
  },
  {
    regionId: "AMZ-001",
    name: "Amazon Basin Network",
    fundingLevel: "balanced",
    extractionRatio: 0.8,
    flourishFlow: 8900,
    sdgAlignment: 88,
    lastAudit: new Date(Date.now() - 12 * 60 * 60 * 1000),
    alerts: [],
  },
];

export const mockAuditEntries: AuditEntry[] = [
  {
    id: "audit-001",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    action: "scroll_purchase",
    actor: "user:maya.earth",
    target: "scroll:permaculture-design-101",
    value: 222,
    currency: "fiat",
    consent: true,
    signature: "0x1234567890abcdef",
    metadata: {
      intention: "Learning regenerative design",
      cluster: "REGEN-TECH",
    },
  },
  {
    id: "audit-002",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    action: "flourish_distribution",
    actor: "system:guardian",
    target: "region:AFR-001",
    value: 1500,
    currency: "flourish",
    consent: true,
    signature: "0xabcdef1234567890",
    metadata: { reason: "SDG alignment bonus", ceremony: "monthly_blessing" },
  },
  {
    id: "audit-003",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    action: "ritual_tech_booking",
    actor: "user:collective.rainbow",
    target: "service:systems-design",
    value: 888,
    currency: "fiat",
    consent: true,
    signature: "0x567890abcdef1234",
    metadata: { intention: "Sacred architecture project", duration_hours: 8 },
  },
];

export const mockAIEthicsAlerts: AIEthicsAlert[] = [
  {
    id: "ai-001",
    type: "bias_detected",
    aiSystem: "Flourish Distribution Algorithm",
    description:
      "Algorithm showing preference for tech-focused projects over traditional ecological knowledge",
    riskScore: 75,
    recommendedAction: "Rebalance training data with indigenous wisdom sources",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    status: "pending",
  },
  {
    id: "ai-002",
    type: "burnout_warning",
    aiSystem: "Ritual Technologist Matching",
    description:
      "User maya.earth showing signs of overcommitment - 60+ hours/week",
    riskScore: 60,
    recommendedAction: "Suggest ritual rest period and workload redistribution",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: "acknowledged",
  },
];

export const mockDisputes: DisputeCase[] = [
  {
    id: "dispute-001",
    type: "refund_request",
    parties: ["user:forest.keeper", "service:ritual-tech"],
    description:
      "Incomplete delivery of regenerative systems design due to timeline misalignment",
    value: 444,
    status: "mediating",
    mediator: "guardian:wise.owl",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    id: "dispute-002",
    type: "contract_breach",
    parties: ["collective.mycelium", "collective.solar"],
    description:
      "Violation of sacred collaboration covenant in bioregional energy project",
    value: 1200,
    status: "ritual_review",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const mockFailsafes: RitualFailsafe[] = [
  {
    id: "failsafe-001",
    name: "Wealth Concentration Circuit Breaker",
    triggerCondition: "When any single entity controls >20% of total Flourish",
    action: "ceremonial_review",
    isActive: true,
    affectedSystems: ["Flourish Distribution", "Voting Mechanisms"],
  },
  {
    id: "failsafe-002",
    name: "Extraction Ratio Guardian",
    triggerCondition: "Regional extraction ratio exceeds 1.5x for 72 hours",
    action: "redirect",
    lastTriggered: new Date(Date.now() - 48 * 60 * 60 * 1000),
    isActive: true,
    affectedSystems: ["Regional Fund Allocation", "Payment Routing"],
  },
  {
    id: "failsafe-003",
    name: "AI Ethics Violation Pause",
    triggerCondition: "Ethics risk score exceeds 80 in any AI system",
    action: "pause",
    isActive: true,
    affectedSystems: ["Meta-Co-Pilot AI", "Automated Distributions"],
  },
];

export const mockRevOpsMetrics: RevOpsMetrics = {
  totalRevenue: 234567,
  flourishCirculation: 89432,
  activeSubscriptions: 1247,
  refundRequests: 8,
  ethicsScore: 87,
  regionBalance: 74,
  aiAlerts: 12,
  ceremonialOverrides: 3,
};

export const mockAIInsights: MetaCoPilotInsight[] = [
  {
    id: "insight-001",
    category: "watcher",
    title: "Unusual Service Cluster Activity",
    description:
      "Regenerative Tech cluster receiving 40% more Flourish than ritual alignment suggests",
    confidence: 85,
    actionRequired: true,
    suggestedAction: "Schedule alignment ceremony with cluster guardians",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "insight-002",
    category: "whisperer",
    title: "Undervalued Sacred Service",
    description:
      "User forest.keeper charging 50% below market rate for permaculture consultation",
    confidence: 92,
    actionRequired: false,
    suggestedAction:
      "Suggest pricing adjustment to honor sacred work appropriately",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "insight-003",
    category: "balancer",
    title: "Regional Redistribution Opportunity",
    description:
      "East African Highlands showing high SDG impact but low funding - recommend redistribution",
    confidence: 78,
    actionRequired: true,
    suggestedAction: "Initiate quarterly redistribution ceremony",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
];

export const mockCovenants: CovenantContract[] = [
  {
    id: "covenant-001",
    title: "Platform Sacred Operating Covenant",
    description:
      "Core moral operating system governing all platform interactions and value flows",
    parties: ["CIVICA-144-PLATFORM", "ALL-PARTICIPANTS"],
    terms: [
      "No individual or entity shall control more than 20% of total platform value",
      "All AI systems must maintain ethical alignment score above 70",
      "Regional extraction ratios must remain below 1.0 averaged over 30 days",
      "All major decisions affecting >1000 users require ceremonial consensus",
    ],
    status: "active",
    signedAt: new Date("2024-01-01"),
    linkedBilling: true,
  },
  {
    id: "covenant-002",
    title: "Bioregional Flourish Distribution Accord",
    description:
      "Agreement governing fair distribution of Flourish tokens across bioregions",
    parties: ["ALL-BIOREGIONS", "GUARDIAN-COUNCIL"],
    terms: [
      "Minimum 30% of Flourish flows to Global South bioregions",
      "SDG alignment scores weight distribution algorithms",
      "Indigenous knowledge holders receive priority funding streams",
      "Monthly redistribution ceremonies balance wealth concentration",
    ],
    status: "active",
    signedAt: new Date("2024-03-15"),
    linkedBilling: true,
  },
];

export const guardianModules = [
  {
    id: "balance",
    name: "Balance",
    icon: "⚖️",
    description: "Prevents financial centralization or governance capture",
    revOpsBinding: "RevOps Dashboard, Flourish Ledger Watcher",
  },
  {
    id: "regional",
    name: "Regional Oversight",
    icon: "🌍",
    description: "Flags underfunded or overextracted bioregions",
    revOpsBinding: "Bioregional Flow Monitor, Flourish Allocation Router",
  },
  {
    id: "audit",
    name: "Audit & Consent Logs",
    icon: "🧾",
    description: "Tracks all economic and governance actions",
    revOpsBinding: "Consentful Billing Log, Sacred Transaction Archive",
  },
  {
    id: "ai-ethics",
    name: "AI Ethics Enforcement",
    icon: "🧠",
    description: "Ensures AI & revenue logic follow moral code",
    revOpsBinding: "AI Co-Pilot Ethics Layer, Subscription Trigger Guard",
  },
  {
    id: "mediation",
    name: "Dispute Mediation",
    icon: "🕊️",
    description: "Initiates reconciliation between users, nodes, or contracts",
    revOpsBinding: "Ritual Refund Engine, Scroll-Based Adjudication",
  },
  {
    id: "failsafes",
    name: "Ritualized Failsafes",
    icon: "🛡️",
    description: "Pauses systems ritually when misalignment is detected",
    revOpsBinding: "Smart Kill-Switch via Sacred Covenant Contract",
  },
];
