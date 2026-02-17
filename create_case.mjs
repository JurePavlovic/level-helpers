import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "http://127.0.0.1:54321";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const HONO_FUNCTION_URL = "http://127.0.0.1:54321/functions/v1";
const baseClaimant = `${HONO_FUNCTION_URL}/level-app/case/claimant`;
const baseRespondent = `${HONO_FUNCTION_URL}/level-app/case/respondent`;
const baseCase = `${HONO_FUNCTION_URL}/level-app/case`;
const baseProfiles = `${HONO_FUNCTION_URL}/level-app/profiles`;
const password = "Test123";

const newUsers = [
  {
    email: "test-user@email.com",
    password: "Test123",
    firstName: "Testko",
    lastName: "Testić",
  },
  {
    email: "jurck222@gmail.com",
    password: "Test123",
    firstName: "Jure",
    lastName: "Pavlovic",
  },
  {
    email: "jure@thecalda.com",
    password: "Test123",
    firstName: "Jezus",
    lastName: "Kristus",
  },
  {
    email: "jure@caldausa.com",
    password: "Test123",
    firstName: "Jožef",
    lastName: "K",
  },
  {
    email: "jablana@email.com",
    password: "Test123",
    firstName: "Tvoja",
    lastName: "Mami",
  },
  {
    email: "mikic@email.com",
    password: "Test123",
    firstName: "Milan",
    lastName: "Mikić",
  },
];

const neutralUsers = [
  {
    email: "neutral1@example.com",
    password,
    firstName: "Ana",
    lastName: "Arbiter",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Mediator focused on family law and neighbor disputes with a calm, structured approach.",
        firstPracticeYear: 2004,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Certified Family Mediator",
          "LL.M. in Dispute Resolution",
        ],
        hourlyRate: "350.00",
        halfDayRate: "1400.00",
        fullDayRate: "2600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I help families and neighbors resolve emotionally charged conflicts with clarity and empathy, keeping children’s and community interests at the center.",
        shortProfessionalDescription:
          "Family and neighbor disputes specialist.",
        resumeUrl: "https://example.com/resume_ana_arbiter.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_ana_arbiter.pdf",
        linkedEngagementLetter: "https://test-url.si/ana",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator with experience in structured hearings and written awards for civil disputes.",
        firstPracticeYear: 2006,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Arbitration Fundamentals Training",
          "Award Writing Workshop",
        ],
        hourlyRate: "450.00",
        halfDayRate: "1800.00",
        fullDayRate: "3400.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I run efficient arbitrations with clear procedure, tight issue framing, and timely reasoned awards.",
        shortProfessionalDescription: "Civil disputes arbitrator.",
        resumeUrl: "https://example.com/resume_ana_arbiter_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral2@example.com",
    password,
    firstName: "Boris",
    lastName: "Balance",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Specialist in commercial and small business disputes with strong financial literacy.",
        firstPracticeYear: 2010,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Commercial Mediation Certificate"],
        hourlyRate: "420.00",
        halfDayRate: "1700.00",
        fullDayRate: "3200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I work with SMEs and founders to resolve partnership, shareholder, and supplier disputes quickly so they can get back to building their businesses.",
        shortProfessionalDescription: "Commercial and business mediator.",
        resumeUrl: "https://example.com/resume_boris_balance.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_boris_balance.pdf",
        linkedEngagementLetter: "https://test-url.si/boris",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator for business disputes with emphasis on clean record building and enforceable awards.",
        firstPracticeYear: 2011,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Business Arbitration Certificate",
          "Evidentiary Hearing Management",
        ],
        hourlyRate: "520.00",
        halfDayRate: "2100.00",
        fullDayRate: "3900.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate partnership and contract disputes with disciplined schedules, focused hearings, and practical, reasoned decisions.",
        shortProfessionalDescription: "Business disputes arbitrator.",
        resumeUrl: "https://example.com/resume_boris_balance_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral3@example.com",
    password,
    firstName: "Cvetka",
    lastName: "Calm",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Employment and workplace mediator with experience in HR and labor relations.",
        firstPracticeYear: 2008,
        yearsWithoutPracticing: 1,
        relevantQualifications: ["Workplace Mediation Diploma"],
        hourlyRate: "300.00",
        halfDayRate: "1200.00",
        fullDayRate: "2200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I help employers and employees resolve conflicts around performance, discrimination claims, and team dynamics before they escalate.",
        shortProfessionalDescription: "Employment and workplace mediator.",
        resumeUrl: "https://example.com/resume_cvetka_calm.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_cvetka_calm.pdf",
        linkedEngagementLetter: "https://test-url.si/cvetka",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator for workplace and employment disputes with procedural fairness focus.",
        firstPracticeYear: 2009,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Employment Arbitration Training",
          "Decision Drafting Intensive",
        ],
        hourlyRate: "410.00",
        halfDayRate: "1600.00",
        fullDayRate: "3000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I deliver clear schedules and balanced hearings for employment disputes, aiming for timely, well-structured awards.",
        shortProfessionalDescription: "Employment disputes arbitrator.",
        resumeUrl: "https://example.com/resume_cvetka_calm_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral4@example.com",
    password,
    firstName: "David",
    lastName: "Decision",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Former in-house counsel with focus on tech and IP-related disputes.",
        firstPracticeYear: 2012,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["IP Mediation Training", "Bar Admission"],
        hourlyRate: "480.00",
        halfDayRate: "1900.00",
        fullDayRate: "3600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I support startups and technology companies in resolving IP, licensing, and founder disputes without derailing product roadmaps.",
        shortProfessionalDescription: "Tech and IP disputes mediator.",
        resumeUrl: "https://example.com/resume_david_decision.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl:
          "https://example.com/engagement_david_decision.pdf",
        linkedEngagementLetter: "https://test-url.si/david",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Tech/IP arbitrator experienced with licensing, SaaS, and founder disputes.",
        firstPracticeYear: 2013,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "IP Arbitration Seminar",
          "Technology Contracts Workshop",
        ],
        hourlyRate: "620.00",
        halfDayRate: "2400.00",
        fullDayRate: "4600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate tech and IP disputes with crisp issue lists, scoped discovery, and fast awards that map directly to contract terms.",
        shortProfessionalDescription: "Tech/IP disputes arbitrator.",
        resumeUrl: "https://example.com/resume_david_decision_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral5@example.com",
    password,
    firstName: "Eva",
    lastName: "Equity",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Mediator with background in discrimination and human rights cases.",
        firstPracticeYear: 2006,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Human Rights Mediation Training"],
        hourlyRate: "330.00",
        halfDayRate: "1350.00",
        fullDayRate: "2500.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate sensitive disputes involving discrimination, harassment, and access to services with trauma-informed practice.",
        shortProfessionalDescription:
          "Discrimination and human rights mediator.",
        resumeUrl: "https://example.com/resume_eva_equity.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_eva_equity.pdf",
        linkedEngagementLetter: "https://test-url.si/eva",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator for civil rights and discrimination disputes with fairness-first procedure.",
        firstPracticeYear: 2007,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Discrimination Arbitration Program",
          "Hearing Officer Training",
        ],
        hourlyRate: "470.00",
        halfDayRate: "1850.00",
        fullDayRate: "3500.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate sensitive matters with structured processes that prioritize dignity, clarity, and a complete record.",
        shortProfessionalDescription: "Civil rights arbitrator.",
        resumeUrl: "https://example.com/resume_eva_equity_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral6@example.com",
    password,
    firstName: "Filip",
    lastName: "Fair",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Construction and real estate disputes mediator with engineering background.",
        firstPracticeYear: 2003,
        yearsWithoutPracticing: 2,
        relevantQualifications: ["Construction Mediation Certificate"],
        hourlyRate: "500.00",
        halfDayRate: "2000.00",
        fullDayRate: "3800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I help owners, contractors, and HOAs resolve disputes over delays, defects, and contracts with a practical, project-focused approach.",
        shortProfessionalDescription: "Construction and real estate mediator.",
        resumeUrl: "https://example.com/resume_filip_fair.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_filip_fair.pdf",
        linkedEngagementLetter: "https://test-url.si/filip",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Construction arbitrator with engineering literacy and scheduling discipline.",
        firstPracticeYear: 2004,
        yearsWithoutPracticing: 1,
        relevantQualifications: [
          "Construction Arbitration Certificate",
          "Delay & Quantum Workshop",
        ],
        hourlyRate: "690.00",
        halfDayRate: "2700.00",
        fullDayRate: "5200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate construction disputes with tight timetables, focused technical evidence, and clear awards tied to project documents.",
        shortProfessionalDescription: "Construction disputes arbitrator.",
        resumeUrl: "https://example.com/resume_filip_fair_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral7@example.com",
    password,
    firstName: "Gaja",
    lastName: "Guide",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Community and non-profit sector mediator experienced with multi-party processes.",
        firstPracticeYear: 2015,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Community Mediation Program"],
        hourlyRate: "250.00",
        halfDayRate: "950.00",
        fullDayRate: "1800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I facilitate complex conversations between residents, NGOs, and public institutions where many voices need to be heard.",
        shortProfessionalDescription: "Community and NGO mediator.",
        resumeUrl: "https://example.com/resume_gaja_guide.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_gaja_guide.pdf",
        linkedEngagementLetter: "https://test-url.si/gaja",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator for community/non-profit disputes, designed for multi-party fairness and clarity.",
        firstPracticeYear: 2016,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Multi-Party Arbitration Workshop",
          "Procedural Order Drafting",
        ],
        hourlyRate: "360.00",
        halfDayRate: "1400.00",
        fullDayRate: "2600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate complex community and governance disputes with transparent processes and awards written for non-lawyer stakeholders too.",
        shortProfessionalDescription: "Community disputes arbitrator.",
        resumeUrl: "https://example.com/resume_gaja_guide_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral8@example.com",
    password,
    firstName: "Hrvoje",
    lastName: "Harmony",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Cross-border commercial mediator fluent in multiple languages.",
        firstPracticeYear: 2009,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["International Mediation Certification"],
        hourlyRate: "550.00",
        halfDayRate: "2100.00",
        fullDayRate: "4000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I support companies involved in cross-border trade, logistics, and distribution to resolve disputes efficiently across jurisdictions.",
        shortProfessionalDescription: "Cross-border commercial mediator.",
        resumeUrl: "https://example.com/resume_hrvoje_harmony.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl:
          "https://example.com/engagement_hrvoje_harmony.pdf",
        linkedEngagementLetter: "https://test-url.si/hrvoje",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Cross-border commercial arbitrator with focus on enforceability and efficient procedure.",
        firstPracticeYear: 2010,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "International Arbitration Certificate",
          "Enforcement & Awards Seminar",
        ],
        hourlyRate: "780.00",
        halfDayRate: "3000.00",
        fullDayRate: "5800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate cross-border commercial disputes with strong procedural orders, scoped evidence, and awards drafted for enforcement.",
        shortProfessionalDescription: "International arbitrator.",
        resumeUrl: "https://example.com/resume_hrvoje_harmony_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral9@example.com",
    password,
    firstName: "Irena",
    lastName: "Insight",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Mediator with psychology background focusing on high-conflict divorces.",
        firstPracticeYear: 2007,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Family Mediation License", "MSc Psychology"],
        hourlyRate: "380.00",
        halfDayRate: "1500.00",
        fullDayRate: "2800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I work with couples in high-conflict separations, helping them reach structured parenting and property agreements.",
        shortProfessionalDescription: "High-conflict divorce mediator.",
        resumeUrl: "https://example.com/resume_irena_insight.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_irena_insight.pdf",
        linkedEngagementLetter: "https://test-url.si/irena",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Arbitrator experienced in family-adjacent financial and property issues with trauma-aware hearings.",
        firstPracticeYear: 2008,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Arbitration Hearing Skills",
          "Trauma-Informed Practice",
        ],
        hourlyRate: "520.00",
        halfDayRate: "2000.00",
        fullDayRate: "3800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I conduct calm, structured hearings for sensitive disputes, keeping the record clean and decisions clearly reasoned.",
        shortProfessionalDescription: "Sensitive disputes arbitrator.",
        resumeUrl: "https://example.com/resume_irena_insight_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral10@example.com",
    password,
    firstName: "Jaka",
    lastName: "Justice",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Former judge now mediating civil and commercial cases.",
        firstPracticeYear: 2000,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Former District Court Judge"],
        hourlyRate: "600.00",
        halfDayRate: "2300.00",
        fullDayRate: "4300.00",
        judgeStatus: "Previous",
        judicialPositions: "District Court Judge, Civil Division",
        professionalDescription:
          "After 15+ years on the bench, I now help parties resolve disputes with a realistic view of likely court outcomes.",
        shortProfessionalDescription:
          "Previous judge, civil and commercial mediator.",
        resumeUrl: "https://example.com/resume_jaka_justice.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_jaka_justice.pdf",
        linkedEngagementLetter: "https://test-url.si/jaka",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Former judge acting as arbitrator for civil/commercial disputes with rigorous case management.",
        firstPracticeYear: 2000,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Former District Court Judge",
          "Complex Case Management Training",
        ],
        hourlyRate: "950.00",
        halfDayRate: "3600.00",
        fullDayRate: "6800.00",
        judgeStatus: "Previous",
        judicialPositions: "District Court Judge, Civil Division",
        professionalDescription:
          "I arbitrate civil and commercial cases with firm schedules, narrow issues early, and issue awards that reflect a court-tested approach.",
        shortProfessionalDescription: "Former judge arbitrator.",
        resumeUrl: "https://example.com/resume_jaka_justice_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral11@example.com",
    password,
    firstName: "Katarina",
    lastName: "Knight",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Healthcare disputes mediator with nursing and legal background.",
        firstPracticeYear: 2011,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Healthcare Mediation Certificate", "RN, JD"],
        hourlyRate: "400.00",
        halfDayRate: "1600.00",
        fullDayRate: "3000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes between healthcare providers, patients, and insurers with deep understanding of medical terminology and care standards.",
        shortProfessionalDescription: "Healthcare disputes mediator.",
        resumeUrl: "https://example.com/resume_katarina_knight.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl:
          "https://example.com/engagement_katarina_knight.pdf",
        linkedEngagementLetter: "https://test-url.si/katarina",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Healthcare arbitrator with clinical and legal expertise.",
        firstPracticeYear: 2012,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Healthcare Arbitration Training",
          "Medical-Legal Certificate",
        ],
        hourlyRate: "550.00",
        halfDayRate: "2200.00",
        fullDayRate: "4200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate healthcare disputes with attention to clinical standards and regulatory requirements.",
        shortProfessionalDescription: "Healthcare disputes arbitrator.",
        resumeUrl: "https://example.com/resume_katarina_knight_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    expertProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Expert witness in medical malpractice and healthcare standard of care cases.",
        firstPracticeYear: 2010,
        yearsWithoutPracticing: 0,
        relevantQualifications: "RN, JD, Certified Legal Nurse Consultant",
        hourlyRate: "350.00",
        halfDayRate: "1400.00",
        fullDayRate: "2600.00",
        judgeStatusId: null,
        judicialPositions: null,
        professionalDescription:
          "Expert witness providing opinions on nursing standards of care, medical record analysis, and healthcare compliance in litigation.",
        shortProfessionalDescription: "Medical malpractice expert witness",
        resumeUrl: "https://example.com/resume_katarina_knight_expert.pdf",
        agreedToEthicsPolicy: true,
        mainAreaOfExpertise: "Healthcare & Medical Malpractice",
        professionalDesignations: "RN, JD, CLNC",
        professionalOrganizations: [
          "American Association of Legal Nurse Consultants",
          "American Bar Association Health Law Section",
        ],
        licenseDateIssue: "2010-03-15T00:00:00.000Z",
      },
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral12@example.com",
    password,
    firstName: "Luka",
    lastName: "Ledger",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Financial services mediator with CPA background.",
        firstPracticeYear: 2008,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Financial Mediation Certificate", "CPA"],
        hourlyRate: "450.00",
        halfDayRate: "1800.00",
        fullDayRate: "3400.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I help resolve disputes involving accounting, financial reporting, and fiduciary duties with technical precision.",
        shortProfessionalDescription: "Financial services mediator.",
        resumeUrl: "https://example.com/resume_luka_ledger.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_luka_ledger.pdf",
        linkedEngagementLetter: "https://test-url.si/luka",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Financial disputes arbitrator with deep accounting knowledge.",
        firstPracticeYear: 2009,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Financial Arbitration Program",
          "Forensic Accounting Certificate",
        ],
        hourlyRate: "600.00",
        halfDayRate: "2400.00",
        fullDayRate: "4600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate complex financial disputes with clear analysis of accounting issues and financial evidence.",
        shortProfessionalDescription: "Financial disputes arbitrator.",
        resumeUrl: "https://example.com/resume_luka_ledger_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    expertProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Forensic accounting expert with 15+ years in financial litigation support.",
        firstPracticeYear: 2006,
        yearsWithoutPracticing: 0,
        relevantQualifications: "CPA, CFF, MBA in Finance",
        hourlyRate: "400.00",
        halfDayRate: "1600.00",
        fullDayRate: "3000.00",
        judgeStatusId: null,
        judicialPositions: null,
        professionalDescription:
          "Expert witness in forensic accounting, business valuation, economic damages calculation, and fraud investigation matters.",
        shortProfessionalDescription: "Forensic accounting expert witness",
        resumeUrl: "https://example.com/resume_luka_ledger_expert.pdf",
        agreedToEthicsPolicy: true,
        mainAreaOfExpertise: "Forensic Accounting & Financial Disputes",
        professionalDesignations: "CPA, CFF, CFE",
        professionalOrganizations: [
          "American Institute of CPAs",
          "Association of Certified Fraud Examiners",
        ],
        licenseDateIssue: "2006-09-01T00:00:00.000Z",
      },
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral13@example.com",
    password,
    firstName: "Maja",
    lastName: "Meridian",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Environmental and land use disputes mediator.",
        firstPracticeYear: 2010,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Environmental Mediation Training",
          "MS Environmental Science",
        ],
        hourlyRate: "380.00",
        halfDayRate: "1500.00",
        fullDayRate: "2800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes involving environmental compliance, land use, and natural resource conflicts between stakeholders.",
        shortProfessionalDescription: "Environmental disputes mediator.",
        resumeUrl: "https://example.com/resume_maja_meridian.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_maja_meridian.pdf",
        linkedEngagementLetter: "https://test-url.si/maja",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Environmental arbitrator with scientific and regulatory expertise.",
        firstPracticeYear: 2011,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Environmental Arbitration Certificate",
          "Regulatory Compliance Training",
        ],
        hourlyRate: "520.00",
        halfDayRate: "2100.00",
        fullDayRate: "4000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate environmental and land use disputes with attention to scientific evidence and regulatory frameworks.",
        shortProfessionalDescription: "Environmental disputes arbitrator.",
        resumeUrl: "https://example.com/resume_maja_meridian_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral14@example.com",
    password,
    firstName: "Nik",
    lastName: "Noble",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Insurance disputes mediator with claims adjusting background.",
        firstPracticeYear: 2005,
        yearsWithoutPracticing: 1,
        relevantQualifications: ["Insurance Mediation Certificate", "CPCU"],
        hourlyRate: "420.00",
        halfDayRate: "1700.00",
        fullDayRate: "3200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate coverage disputes, bad faith claims, and policyholder-insurer conflicts with industry insight.",
        shortProfessionalDescription: "Insurance disputes mediator.",
        resumeUrl: "https://example.com/resume_nik_noble.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_nik_noble.pdf",
        linkedEngagementLetter: "https://test-url.si/nik",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Insurance arbitrator with decades of industry experience.",
        firstPracticeYear: 2006,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Insurance Arbitration Program",
          "Coverage Analysis Training",
        ],
        hourlyRate: "580.00",
        halfDayRate: "2300.00",
        fullDayRate: "4400.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate insurance disputes with clear policy interpretation and industry-standard analysis.",
        shortProfessionalDescription: "Insurance disputes arbitrator.",
        resumeUrl: "https://example.com/resume_nik_noble_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral15@example.com",
    password,
    firstName: "Olga",
    lastName: "Oracle",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Data privacy and cybersecurity disputes mediator.",
        firstPracticeYear: 2014,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Technology Mediation Training", "CIPP/US"],
        hourlyRate: "500.00",
        halfDayRate: "2000.00",
        fullDayRate: "3800.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes involving data breaches, privacy violations, and cybersecurity incidents between affected parties.",
        shortProfessionalDescription: "Data privacy disputes mediator.",
        resumeUrl: "https://example.com/resume_olga_oracle.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_olga_oracle.pdf",
        linkedEngagementLetter: "https://test-url.si/olga",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Cybersecurity and data privacy arbitrator with technical background.",
        firstPracticeYear: 2015,
        yearsWithoutPracticing: 0,
        relevantQualifications: ["Technology Arbitration Certificate", "CISSP"],
        hourlyRate: "650.00",
        halfDayRate: "2600.00",
        fullDayRate: "5000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate cybersecurity and data privacy disputes with technical understanding and regulatory awareness.",
        shortProfessionalDescription: "Cybersecurity disputes arbitrator.",
        resumeUrl: "https://example.com/resume_olga_oracle_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    expertProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Cybersecurity expert with extensive incident response and forensics experience.",
        firstPracticeYear: 2012,
        yearsWithoutPracticing: 0,
        relevantQualifications: "MS Cybersecurity, CISSP, CIPP/US, CEH",
        hourlyRate: "450.00",
        halfDayRate: "1800.00",
        fullDayRate: "3400.00",
        judgeStatusId: null,
        judicialPositions: null,
        professionalDescription:
          "Expert witness in cybersecurity incidents, data breach analysis, digital forensics, and privacy compliance matters.",
        shortProfessionalDescription: "Cybersecurity expert witness",
        resumeUrl: "https://example.com/resume_olga_oracle_expert.pdf",
        agreedToEthicsPolicy: true,
        mainAreaOfExpertise: "Cybersecurity & Data Privacy",
        professionalDesignations: "CISSP, CIPP/US, CEH, GCFE",
        professionalOrganizations: [
          "ISACA",
          "International Association of Privacy Professionals",
        ],
        licenseDateIssue: "2012-06-20T00:00:00.000Z",
      },
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral16@example.com",
    password,
    firstName: "Peter",
    lastName: "Paragon",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Maritime and shipping disputes mediator with admiralty law experience.",
        firstPracticeYear: 2002,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Maritime Mediation Certificate",
          "Admiralty Law Specialist",
        ],
        hourlyRate: "550.00",
        halfDayRate: "2200.00",
        fullDayRate: "4200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes involving cargo claims, charter party issues, and vessel operations with deep maritime industry knowledge.",
        shortProfessionalDescription: "Maritime disputes mediator.",
        resumeUrl: "https://example.com/resume_peter_paragon.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_peter_paragon.pdf",
        linkedEngagementLetter: "https://test-url.si/peter",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Maritime arbitrator with shipping industry and admiralty law expertise.",
        firstPracticeYear: 2003,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Maritime Arbitration Certificate",
          "London Maritime Arbitrators Association Member",
        ],
        hourlyRate: "720.00",
        halfDayRate: "2900.00",
        fullDayRate: "5500.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate maritime disputes with industry-standard procedures and knowledge of international shipping conventions.",
        shortProfessionalDescription: "Maritime disputes arbitrator.",
        resumeUrl: "https://example.com/resume_peter_paragon_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral17@example.com",
    password,
    firstName: "Renata",
    lastName: "Resolve",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Estate and probate disputes mediator with trust administration experience.",
        firstPracticeYear: 2009,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Estate Mediation Certificate",
          "Certified Trust & Financial Advisor",
        ],
        hourlyRate: "440.00",
        halfDayRate: "1750.00",
        fullDayRate: "3300.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I help families resolve disputes over estates, trusts, and inheritances while preserving relationships where possible.",
        shortProfessionalDescription: "Estate and probate mediator.",
        resumeUrl: "https://example.com/resume_renata_resolve.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl:
          "https://example.com/engagement_renata_resolve.pdf",
        linkedEngagementLetter: "https://test-url.si/renata",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Estate and trust arbitrator with fiduciary litigation experience.",
        firstPracticeYear: 2010,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Trust & Estate Arbitration Training",
          "Fiduciary Litigation Certificate",
        ],
        hourlyRate: "590.00",
        halfDayRate: "2350.00",
        fullDayRate: "4500.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate estate and trust disputes with sensitivity to family dynamics and clear application of fiduciary principles.",
        shortProfessionalDescription: "Estate disputes arbitrator.",
        resumeUrl: "https://example.com/resume_renata_resolve_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral18@example.com",
    password,
    firstName: "Simon",
    lastName: "Scales",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Securities and investment disputes mediator with FINRA experience.",
        firstPracticeYear: 2007,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Securities Mediation Training",
          "Series 7, 66",
        ],
        hourlyRate: "520.00",
        halfDayRate: "2100.00",
        fullDayRate: "4000.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes between investors, brokers, and firms involving suitability, churning, and other securities issues.",
        shortProfessionalDescription: "Securities disputes mediator.",
        resumeUrl: "https://example.com/resume_simon_scales.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_simon_scales.pdf",
        linkedEngagementLetter: "https://test-url.si/simon",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Securities arbitrator with broker-dealer and compliance background.",
        firstPracticeYear: 2008,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "FINRA Arbitrator Training",
          "Securities Compliance Certificate",
        ],
        hourlyRate: "680.00",
        halfDayRate: "2700.00",
        fullDayRate: "5200.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate securities disputes with knowledge of FINRA rules, industry practices, and investor protection standards.",
        shortProfessionalDescription: "Securities disputes arbitrator.",
        resumeUrl: "https://example.com/resume_simon_scales_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    expertProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Securities industry expert with 20+ years in compliance and broker supervision.",
        firstPracticeYear: 2004,
        yearsWithoutPracticing: 0,
        relevantQualifications:
          "MBA Finance, Series 7, 24, 66, Former Chief Compliance Officer",
        hourlyRate: "500.00",
        halfDayRate: "2000.00",
        fullDayRate: "3800.00",
        judgeStatusId: null,
        judicialPositions: null,
        professionalDescription:
          "Expert witness in securities litigation, broker misconduct, suitability analysis, and compliance failures.",
        shortProfessionalDescription: "Securities industry expert witness",
        resumeUrl: "https://example.com/resume_simon_scales_expert.pdf",
        agreedToEthicsPolicy: true,
        mainAreaOfExpertise: "Securities & Investment Disputes",
        professionalDesignations: "Series 7, 24, 66, CCO",
        professionalOrganizations: [
          "Securities Industry and Financial Markets Association",
          "National Society of Compliance Professionals",
        ],
        licenseDateIssue: "2004-01-10T00:00:00.000Z",
      },
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral19@example.com",
    password,
    firstName: "Tina",
    lastName: "Templar",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Sports and entertainment disputes mediator with agent experience.",
        firstPracticeYear: 2013,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Sports Mediation Certificate",
          "Entertainment Law Background",
        ],
        hourlyRate: "480.00",
        halfDayRate: "1900.00",
        fullDayRate: "3600.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes involving athlete contracts, endorsements, and entertainment agreements with industry insight.",
        shortProfessionalDescription: "Sports and entertainment mediator.",
        resumeUrl: "https://example.com/resume_tina_templar.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_tina_templar.pdf",
        linkedEngagementLetter: "https://test-url.si/tina",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Sports and entertainment arbitrator with contract and IP expertise.",
        firstPracticeYear: 2014,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Sports Arbitration Training",
          "Entertainment Industry Certificate",
        ],
        hourlyRate: "640.00",
        halfDayRate: "2550.00",
        fullDayRate: "4900.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate sports and entertainment disputes with understanding of talent agreements, league rules, and IP rights.",
        shortProfessionalDescription: "Sports/entertainment arbitrator.",
        resumeUrl: "https://example.com/resume_tina_templar_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
  {
    email: "neutral20@example.com",
    password,
    firstName: "Urban",
    lastName: "Unity",
    mediatorProfileBody: {
      profile: {
        enableOffers: true,
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Franchise and distribution disputes mediator with business operations background.",
        firstPracticeYear: 2006,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Franchise Mediation Training",
          "MBA Operations",
        ],
        hourlyRate: "460.00",
        halfDayRate: "1850.00",
        fullDayRate: "3500.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I mediate disputes between franchisors, franchisees, and distributors with focus on ongoing business relationships.",
        shortProfessionalDescription: "Franchise disputes mediator.",
        resumeUrl: "https://example.com/resume_urban_unity.pdf",
        agreedToEthicsPolicy: true,
        engagementLetterUrl: "https://example.com/engagement_urban_unity.pdf",
        linkedEngagementLetter: "https://test-url.si/urban",
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    arbitratorProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Franchise and distribution arbitrator with contract and regulatory expertise.",
        firstPracticeYear: 2007,
        yearsWithoutPracticing: 0,
        relevantQualifications: [
          "Franchise Arbitration Certificate",
          "Distribution Law Training",
        ],
        hourlyRate: "620.00",
        halfDayRate: "2450.00",
        fullDayRate: "4700.00",
        judgeStatus: "N/A",
        judicialPositions: null,
        professionalDescription:
          "I arbitrate franchise and distribution disputes with attention to disclosure requirements and relationship dynamics.",
        shortProfessionalDescription: "Franchise disputes arbitrator.",
        resumeUrl: "https://example.com/resume_urban_unity_arbitration.pdf",
        agreedToEthicsPolicy: false,
      },
      states: [1],
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
    expertProfileBody: {
      profile: {
        qualified: true,
        descriptionOfQualificationsInternalOnly:
          "Franchise operations expert with experience as franchisor executive and consultant.",
        firstPracticeYear: 2003,
        yearsWithoutPracticing: 0,
        relevantQualifications:
          "MBA, CFE (Certified Franchise Executive), Former VP Franchise Operations",
        hourlyRate: "425.00",
        halfDayRate: "1700.00",
        fullDayRate: "3200.00",
        judgeStatusId: null,
        judicialPositions: null,
        professionalDescription:
          "Expert witness in franchise disputes, FDD analysis, encroachment claims, and system standards enforcement.",
        shortProfessionalDescription: "Franchise operations expert witness",
        resumeUrl: "https://example.com/resume_urban_unity_expert.pdf",
        agreedToEthicsPolicy: true,
        mainAreaOfExpertise: "Franchise & Distribution",
        professionalDesignations: "CFE, MBA",
        professionalOrganizations: [
          "International Franchise Association",
          "American Association of Franchisees and Dealers",
        ],
        licenseDateIssue: "2003-11-05T00:00:00.000Z",
      },
      areasOfExpertise: ["06f4e277-3f27-48d9-915c-2c212daa49c8"],
    },
  },
];

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function throwError(res, expectedStatus) {
  if (res.status !== expectedStatus) {
    console.log(res.url);
    let body;
    try {
      body = await res.json();
    } catch {
      body = { raw: await res.text() };
    }
    console.error("❌ Error:", JSON.stringify(body, null, 2));
    process.exit(1);
  }
}

export async function loginTestUser(account) {
  const { data, error } = await admin.auth.signInWithPassword(account);

  if (error) {
    throw new Error(`Login failed for ${account.email}: ${error.message}`);
  }

  return {
    user: data.user,
    session: data.session,
    token: data.session?.access_token,
  };
}

async function claimantsOnboarding() {
  const claimant = await loginTestUser({
    email: "test-user@email.com",
    password,
  });
  const claimantToken = claimant.token;

  const res = await fetch(`${baseClaimant}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${claimantToken}`,
    },
    body: JSON.stringify({ userCaseType: "INDIVIDUAL" }),
  });
  const body = await res.json();
  const caseId = body.data.id;
  await throwError(res, 201);

  const addClaimantInfoRes = await fetch(
    `${baseClaimant}/${caseId}/claimant-info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${claimantToken}`,
      },
      body: JSON.stringify({
        email: "test-user@email.com",
        fullName: "Jure Pavlovic",
        isAttorney: false,
        attorney: {
          email: "jure@caldausa.com",
          fullName: "Jezus Kristus",
        },
        additionalClaimants: [
          {
            email: "jablana@email.com",
            fullName: "Claimant Viewer",
          },
        ],
      }),
    },
  );

  await throwError(addClaimantInfoRes, 201);

  const addRespondentInfoRes = await fetch(
    `${baseClaimant}/${caseId}/respondent-info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${claimantToken}`,
      },
      body: JSON.stringify({
        email: "jure@thecalda.com",
        fullName: "Janez Kranjski",
        isAttorney: false,
        attorney: {
          email: "jurck222@gmail.com",
          fullName: "Jožef K",
        },
      }),
    },
  );

  await throwError(addRespondentInfoRes, 201);

  const addIncidentInfoRes = await fetch(`${baseClaimant}/${caseId}/incident`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${claimantToken}`,
    },
    body: JSON.stringify({
      incidentLocation: "Remote",
      incidentStatus: "DONE",
      incidentStartDate: "2025-08-19T06:07:33.530Z",
      incidentEndDate: "2025-08-19T06:07:33.567Z",
    }),
  });

  await throwError(addIncidentInfoRes, 200);

  const addClaimantSubmissions = await fetch(
    `${baseClaimant}/${caseId}/submission`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${claimantToken}`,
      },
      body: JSON.stringify({
        petitionSchema: {
          petition: "This is a petition",
          petitionSummary: "This is a petition summary",
          petitionType: "typed",
        },
        submissionFiles: [
          {
            name: "testFile",
            fileUrl: "https://test-file.si",
            fileType: "exhibit",
          },
          {
            name: "testFile",
            fileUrl: "test/example.png",
            fileType: "contract",
            disputeResolutionLevelAgreed: true,
          },
        ],
        submissionPeople: [
          {
            fullName: "Željko Bebek",
            email: "zeljko.bebek@hotmail.com",
            phoneNumber: "+38651212176",
            description: "This is Željko Bebek",
            type: "expert",
          },
          {
            fullName: "Tvoja Mami",
            email: "tvoja.mami@hotmail.com",
            phoneNumber: "+38651212176",
            description: "This is Tvoja Mami",
            type: "witness",
          },
        ],
      }),
    },
  );

  await throwError(addClaimantSubmissions, 200);

  const addClaimantDamages = await fetch(`${baseClaimant}/${caseId}/damages`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${claimantToken}`,
    },
    body: JSON.stringify({
      damages: 5000,
      description: "For the kids",
      governingLaw: "Texas",
    }),
  });

  await throwError(addClaimantDamages, 200);

  const claimantPaysRes = await fetch(
    `${baseClaimant}/${caseId}/pay-filing-fee`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${claimantToken}`,
      },
    },
  );

  await throwError(claimantPaysRes, 200);

  return caseId;
}

async function acceptCaseInvite(email, caseId) {
  const user = await loginTestUser({
    email,
    password,
  });

  const userJwt = user.token;

  const accpetInviteRes = await fetch(`${baseCase}/invite/${caseId}/accept`, {
    method: "POST",
    headers: { Authorization: `Bearer ${userJwt}` },
  });
  await throwError(accpetInviteRes, 200);
}

async function respondentOnboarding(caseId) {
  const respondent = await loginTestUser({
    email: "jure@thecalda.com",
    password,
  });

  const respondentJwt = respondent.token;

  const accpetInviteRes = await fetch(`${baseCase}/invite/${caseId}/accept`, {
    method: "POST",
    headers: { Authorization: `Bearer ${respondentJwt}` },
  });
  await throwError(accpetInviteRes, 200);

  const addRepresentationRes = await fetch(
    `${baseRespondent}/${caseId}/representation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${respondentJwt}`,
      },
      body: JSON.stringify({
        representationType: "INDIVIDUAL",
        authorized: true,
      }),
    },
  );

  await throwError(addRepresentationRes, 201);

  const reviewClaimantRes = await fetch(
    `${baseRespondent}/${caseId}/claimant-info`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${respondentJwt}`,
      },
    },
  );

  await throwError(reviewClaimantRes, 200);

  const addRespondentRes = await fetch(
    `${baseRespondent}/${caseId}/respondent-info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${respondentJwt}`,
      },
      body: JSON.stringify({
        isAttorney: false,
        attorney: {
          email: "jurck222@gmail.com",
          fullName: "Jožef K",
        },
      }),
    },
  );

  await throwError(addRespondentRes, 201);

  const addIncidentRes = await fetch(`${baseRespondent}/${caseId}/incident`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${respondentJwt}`,
    },
    body: JSON.stringify({
      incidentLocation: "Remote",
      incidentStatus: "DONE",
      incidentStartDate: "2025-08-19T06:07:33.530Z",
      incidentEndDate: "2025-08-19T06:07:33.567Z",
    }),
  });

  await throwError(addIncidentRes, 200);

  const addSubmissionsRes = await fetch(
    `${baseRespondent}/${caseId}/submission`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${respondentJwt}`,
      },
      body: JSON.stringify({
        petitionSchema: {
          petition: "This is a petition",
          petitionSummary: "This is a petition summary",
          petitionType: "typed",
        },
        submissionFiles: [
          {
            name: "testFile",
            fileUrl: "https://test-file.si",
            fileType: "exhibit",
          },
          {
            name: "testFile",
            fileUrl: "https://test-file.si",
            fileType: "contract",
            disputeResolutionLevelAgreed: true,
          },
        ],
        submissionPeople: [
          {
            fullName: "Željko Bebek",
            email: "zeljko.bebek@hotmail.com",
            phoneNumber: "+38651212176",
            description: "This is Željko Bebek",
            type: "expert",
          },
          {
            fullName: "Tvoja Mami",
            email: "tvoja.mami@hotmail.com",
            phoneNumber: "+38651212176",
            description: "This is Tvoja Mami",
            type: "witness",
          },
        ],
      }),
    },
  );

  await throwError(addSubmissionsRes, 200);

  const addDamagesRes = await fetch(`${baseRespondent}/${caseId}/damages`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${respondentJwt}`,
    },
    body: JSON.stringify({
      damages: 400,
      description: "F them kids",
      governingLaw: "Alabama",
    }),
  });

  await throwError(addDamagesRes, 200);

  const payFillingfeeRes = await fetch(
    `${baseRespondent}/${caseId}/pay-filing-fee`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${respondentJwt}`,
      },
    },
  );

  await throwError(payFillingfeeRes, 200);
}

async function createUsers(users) {
  if (!SERVICE_ROLE_KEY) {
    throw new Error("Set SERVICE_ROLE_KEY for ADMIN_MODE");
  }

  for (const u of users) {
    try {
      const { data, error } = await admin.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: {
          first_name: u.firstName,
          last_name: u.lastName,
        },
      });

      if (error) throw error;

      console.log("✅ Admin-created & confirmed:", {
        id: data.user.id,
        email: data.user.email,
      });
    } catch (err) {
      console.error(`❌ Failed for ${u.email}:`, err?.message || err);
    }
  }
}

async function createAndCompleteMediatorProfile(token, body) {
  const createRes = await fetch(`${baseProfiles}/mediator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  await throwError(createRes, 201);

  const completeRes = await fetch(`${baseProfiles}/mediator/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await throwError(completeRes, 201);
}

async function createAndCompleteArbitratorProfile(token, body) {
  const createRes = await fetch(`${baseProfiles}/arbitrator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  await throwError(createRes, 201);

  const completeRes = await fetch(
    `${baseProfiles}/agree-to-ethics/arbitrator`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  await throwError(completeRes, 200);
}

async function createExpertProfile(token, body) {
  const createRes = await fetch(`${baseProfiles}/expert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  await throwError(createRes, 201);

  const completeRes = await fetch(`${baseProfiles}/agree-to-ethics/expert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await throwError(completeRes, 200);
}

async function createNeutralProfiles() {
  for (const u of neutralUsers) {
    const neutral = await loginTestUser({
      email: u.email,
      password: u.password,
    });

    if (!neutral.token) {
      throw new Error(`No token returned for neutral ${u.email}`);
    }

    await createAndCompleteMediatorProfile(
      neutral.token,
      u.mediatorProfileBody,
    );

    const arbitratorBody = {
      ...u.arbitratorProfileBody,
      areasOfExpertise: u.mediatorProfileBody.areasOfExpertise,
    };

    await createAndCompleteArbitratorProfile(neutral.token, arbitratorBody);

    if (u.expertProfileBody) {
      await createExpertProfile(neutral.token, u.expertProfileBody);
      console.log(
        `✅ Neutral profiles created & completed (mediator + arbitrator + expert) for ${u.email}`,
      );
    } else {
      console.log(
        `✅ Neutral profiles created & completed (mediator + arbitrator) for ${u.email}`,
      );
    }
  }
}

async function createCase() {
  const caseId = await claimantsOnboarding();
  await respondentOnboarding(caseId);

  await acceptCaseInvite("jurck222@gmail.com", caseId);
  await acceptCaseInvite("jablana@email.com", caseId);
  await acceptCaseInvite("jure@caldausa.com", caseId);

  console.log("✅ Created case with id: " + caseId);
}

await createUsers([...newUsers, ...neutralUsers]).catch((e) => {
  console.error("❌ Error:", e?.message || e);
  process.exit(1);
});

await createNeutralProfiles().catch((e) => {
  console.error("❌ Error creating neutral profiles:", e?.message || e);
  process.exit(1);
});

await createCase().catch((e) => {
  console.error("❌ Error:", e?.message || e);
  process.exit(1);
});
