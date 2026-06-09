import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const AREAS = [
  {
    id: "A",
    label: "Credential Assessment & Verification",
    short: "Credential",
    color: "#1B3A6B",
    factors: [
      {
        id: "A1",
        label: "CPD Credit Evaluation Accuracy",
        weight: 0.51,
        questions: [
          {
            id: "A1Q1",
            text: "Consistency across professions and providers",
            options: [
              "Different rules in training crediting are followed per profession",
              "There is partial consistency by using informal guidelines between professions",
              "There is a standardized procedure in evaluating credit across professions",
              "A unified program ensures consistency in the computation of credit while auditing of evaluation is routinely performed",
              "Uses a centralized validation system that guarantees cross-profession crediting uniformity",
            ],
          },
          {
            id: "A1Q2",
            text: "System Auditing",
            options: [
              "No formal auditing of evaluated credentials",
              "Audits are done manually and irregularly, usually after inconsistencies are found",
              "Audits follow a documented process and schedule",
              "Digital audit systems monitor evaluation accuracy and produce periodic reports",
              "Auditing is fully integrated with external compliance systems, providing real-time transparency and traceability across the CPD credentialing process",
            ],
          },
        ],
      },
      {
        id: "A2",
        label: "CPD Evaluation Process Consistency",
        weight: 0.351,
        questions: [
          {
            id: "A2Q1",
            text: "System Uptime and Reliability",
            options: [
              "The platform experiences frequent downtime (~99% availability) with no defined service continuity or recovery plan",
              "System uptime is generally acceptable (~99.9% availability); however, monitoring is limited and performance becomes unreliable under increased load",
              "Service-level standards for uptime (~99.99% availability) are formally documented and monitored, though largely through manual processes",
              "Cloud-based infrastructure is implemented with automated backup and recovery mechanisms to support system availability and resilience",
              "The system integrates real-time monitoring, predictive analytics, and continuity planning to ensure uninterrupted service and transparent performance reporting",
            ],
          },
          {
            id: "A2Q2",
            text: "Platform Performance Monitoring",
            options: [
              "There is no formal system for monitoring CPD platform performance or service reliability",
              "Monitoring activities occur irregularly and rely on manual reports",
              "Performance indicators (e.g., uptime, response rate, submissions processed) are regularly reviewed and documented",
              "The organization maintains a centralized monitoring mechanism with clear reporting lines and personnel accountability for system performance",
              "Performance oversight is institutionalized, with continuous data-driven reporting that informs leadership decisions and policy adjustments",
            ],
          },
        ],
      },
      {
        id: "A3",
        label: "External Lifelong Learning Platform Interoperability",
        weight: 0.139,
        questions: [
          {
            id: "A3Q1",
            text: "Coordination with External CPD and Learning Providers",
            options: [
              "Coordination with external CPD providers is done manually and on a case-by-case basis",
              "The organization accepts digital submissions but reviews and validates them through manual processes",
              "Formal procedures are in place for data sharing and validation with recognized external providers",
              "The organization maintains structured partnerships and data exchange agreements with accredited lifelong learning institutions",
              "A policy-backed coordination framework is in place that ensures seamless collaboration with CPD providers and credentialing bodies",
            ],
          },
          {
            id: "A3Q2",
            text: "Alignment with International Credentialing Standards",
            options: [
              "The organization has no established alignment with international credentialing frameworks",
              "There is basic awareness of international standards, but no formal adoption policy",
              "Pilot alignment or partial adoption of global frameworks (e.g., W3C Verifiable Credentials, Europass) has been implemented",
              "The organization is fully compliant with recognized international credentialing standards",
              "The organization actively participates in the development or advocacy of international standards, ensuring regional and global interoperability",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "B",
    label: "Operational Support & Process Efficiency",
    short: "Operations",
    color: "#C4782A",
    factors: [
      {
        id: "B1",
        label: "Proactive User Assistance and Support",
        weight: 0.236,
        questions: [
          {
            id: "B1Q1",
            text: "User Assistance Platform",
            options: [
              "No formal structure exists for receiving feedback; input is typically conveyed verbally or through manual paper-based drop boxes",
              "Basic digital support tools (e.g., email or standalone helpdesk) are available but operate independently per department with limited functionality",
              "A centralized support platform is implemented, enabling structured logging and management of user inquiries",
              "Integrated support platforms enable centralized logging, tracking, and automated escalation of inquiries across interconnected systems",
              "The support system utilizes real-time monitoring, automated ticket routing, and cross-system data integration to proactively identify and initiate resolution of user issues prior to escalation",
            ],
          },
          {
            id: "B1Q2",
            text: "Responsiveness and Service Performance",
            options: [
              "No defined response timelines or procedures; inquiries are handled without a structured process and may remain unattended",
              "Basic response practices exist; however, response times are inconsistent, with no formal monitoring or enforcement of timelines",
              "Defined response procedures are in place, with most inquiries addressed within acceptable timeframes, though monitoring remains limited",
              "Response performance is monitored against defined service-level targets, ensuring timely handling of inquiries",
              "Real-time monitoring and performance analytics enable immediate response, continuous optimization, and consistently high service reliability",
            ],
          },
        ],
      },
      {
        id: "B2",
        label: "CPD Credential Issuance Automation",
        weight: 0.289,
        questions: [
          {
            id: "B2Q1",
            text: "Automation of Credit Evaluation Process",
            options: [
              "Completely manual credit evaluation, no digital process. Paper-based record keeping",
              "Partially digitized validation processes (e.g., spreadsheets) for credit evaluation, with primary reliance on manual verification",
              "Standardized digital systems compute CPD credits with integrated recording; however, manual confirmation is still required",
              "The system performs automated validation with minimal human intervention, supported by real-time centralized recording and system integration",
              "Fully automated validation with synchronous recording on a blockchain ledger",
            ],
          },
        ],
      },
      {
        id: "B3",
        label: "Multi-platform Information Dissemination",
        weight: 0.281,
        questions: [
          {
            id: "B3Q1",
            text: "Communication Channel Diversity and Consistency",
            options: [
              "Information is disseminated through a single communication channel (e.g., email or bulletin), with no integration across platforms",
              "Multiple communication channels are used; however, updates are irregular and information is not consistently synchronized across platforms",
              "Standardized procedures are established to coordinate information updates across platforms, ensuring consistency in content dissemination",
              "Systems support cross-platform synchronization, with validation processes and analytics used to verify accuracy prior to publication",
              "A unified digital ecosystem automates content dissemination across multiple platforms, with real-time validation mechanisms ensuring accurate and transparent public communication",
            ],
          },
        ],
      },
      {
        id: "B4",
        label: "Physical Document Handling and Traceability",
        weight: 0.194,
        questions: [
          {
            id: "B4Q1",
            text: "Tracking and Record Management",
            options: [
              "No system exists for monitoring or tracking the movement of physical documents",
              "Manual logbooks are used to record document movement; however, records are prone to gaps and inconsistencies",
              "Standardized tracking forms or registers are consistently used to document and monitor physical records",
              "Digitally enabled tracking (e.g., barcoding or scanning) is implemented, with records captured in a centralized system",
              "An integrated tracking system synchronizes physical and digital records, utilizing technologies (e.g., OCR) enabling real-time visibility and end-to-end traceability",
            ],
          },
          {
            id: "B4Q2",
            text: "Security Policy and Access Control",
            options: [
              "No formal security policies or procedures exist for handling, storing, or accessing physical or digital documents",
              "Basic security practices are applied informally, with limited and inconsistently enforced access restrictions for sensitive documents",
              "A formal document security policy and role-based access control procedures are established, documented, and communicated to personnel",
              "Security policies are systematically enforced through access control mechanisms (e.g., RBAC, user authentication), with audit logs and periodic compliance reviews",
              "An integrated security framework enforces role-based and system-controlled access, with automated monitoring, audit trails, and continuous policy refinement",
            ],
          },
          {
            id: "B4Q3",
            text: "Compliance with Data Privacy and Records Regulations",
            options: [
              "No defined policies or practices exist to address data privacy and records management compliance requirements",
              "Awareness of data privacy and records regulations exists; however, procedures are informal and inconsistently applied",
              "Formal compliance policies and procedures are established and implemented across relevant organizational units",
              "Compliance with data privacy and records regulations is monitored through regular audits, with documented evidence of adherence",
              "The organization maintains continuous compliance through automated monitoring, reporting systems, and transparent data governance practices aligned with regulatory standards",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "C",
    label: "IT Infrastructure & Security Management",
    short: "IT & Security",
    color: "#2A6B4A",
    factors: [
      {
        id: "C1",
        label: "Cloud Infrastructure Provisioning",
        weight: 0.215,
        questions: [
          {
            id: "C1Q1",
            text: "Extent of Cloud Utilization",
            options: [
              "No cloud infrastructure is implemented; all data are stored and managed locally",
              "Limited cloud usage exists, primarily for file storage or backup purposes, with no integration into core systems",
              "Cloud services are utilized for selected CPD functions, but integration across systems remains partial",
              "Cloud infrastructure supports core CPD operations, enabling scalable access, system availability, and centralized data management",
              "A comprehensive, policy-compliant cloud ecosystem is fully integrated across all CPD systems, enabling secure, scalable, and interoperable operations",
            ],
          },
          {
            id: "C1Q2",
            text: "Data Accessibility Across Units",
            options: [
              "Data are stored in isolated systems within individual offices or divisions, with no mechanism for cross-unit access",
              "Data sharing between units is possible through manual requests or file transfers, with no centralized access mechanism",
              "A centralized data repository is established, providing secure access to authorized personnel through authenticated log-in systems",
              "Authorized personnel can retrieve and share data in real time using managed accounts, standardized access protocols, and system-based controls",
              "A unified data governance framework enables seamless, role-based access across all CPD systems, supported by integrated platforms and policy-enforced controls",
            ],
          },
        ],
      },
      {
        id: "C2",
        label: "CPD Data Analytics Capability",
        weight: 0.2,
        questions: [
          {
            id: "C2Q1",
            text: "Utilization of Analytics Tools",
            options: [
              "Reports are generated manually using spreadsheets, with no dedicated analytics tools or automated data processing",
              "Basic reporting tools are used to track CPD activities (e.g., attendance, submissions), with limited analytical capability",
              "Analytical tools are implemented to process data and identify patterns, but outputs require manual interpretation",
              "Interactive dashboards are utilized to visualize data, enabling systematic monitoring and supporting planning and decision-making",
              "Advanced analytics systems provide real-time data processing and automatically generate insights to support continuous improvement",
            ],
          },
          {
            id: "C2Q2",
            text: "Decision-Making Based on Data",
            options: [
              "Decisions are primarily based on experience or intuition, with little to no use of data",
              "Reports and basic statistics are used to support decisions; however, their application is inconsistent and not standardized",
              "Data are regularly reviewed and incorporated into management discussions and operational planning processes",
              "Data analytics are systematically applied to inform policies, program design, and resource allocation",
              "Predictive and evidence-based analytics continuously inform strategic decisions and policy adjustments through automated decision-support systems",
            ],
          },
        ],
      },
      {
        id: "C3",
        label: "In-house IT Infrastructure Adequacy",
        weight: 0.157,
        questions: [
          {
            id: "C3Q1",
            text: "Sufficiency of IT Equipment and Facilities",
            options: [
              "IT equipment is obsolete or insufficient (<1 computer per 2–3 staff, processors below Intel i3/equivalent, <4GB RAM, no dedicated servers), limiting ability to run modern systems",
              "Basic IT resources are available (1 computer per staff, Intel i3/i5, 4–8GB RAM, standard internet); however, no dedicated servers exist and performance degrades during peak usage",
              "IT infrastructure supports operations (1 computer per staff with Intel i5/i7, 8–16GB RAM, centralized storage or entry-level server/cloud instance), though limitations may occur during high-demand periods",
              "IT resources are provisioned based on capacity planning (high-performance workstations with ≥16GB RAM, dedicated servers or scalable cloud instances, managed switches, backup systems)",
              "Scalable, enterprise-grade infrastructure is implemented (cloud-integrated architecture, load-balanced servers, high-speed networks ≥1 Gbps, redundant systems, on-demand resource scaling)",
            ],
          },
          {
            id: "C3Q2",
            text: "Network Stability and Connectivity",
            options: [
              "Network connectivity is unstable (frequent outages, >10% downtime, speeds <10–20 Mbps), with no monitoring tools, maintenance procedures, or designated technical support",
              "Network experiences occasional disruptions, with basic connectivity (20–50 Mbps). Monitoring is informal and issue resolution is reactive with minimal documentation",
              "Network stability is supported by documented procedures and assigned technical personnel, with basic monitoring tools and consistent connectivity (≥50–100 Mbps)",
              "Network performance is continuously monitored using system tools, with issues logged, tracked, and resolved within defined processes. Infrastructure supports stable connectivity (≥100 Mbps–1 Gbps)",
              "A redundant and high-availability network infrastructure is implemented (dual ISPs, failover systems, load balancing, enterprise monitoring tools), ensuring continuous high-speed connectivity (≥1 Gbps)",
            ],
          },
          {
            id: "C3Q3",
            text: "Maintenance of IT Assets",
            options: [
              "No structured maintenance procedures or schedule exist; IT assets are not regularly inspected or documented",
              "Maintenance is performed only when issues occur, with no preventive planning; records of repairs and servicing are limited or not maintained",
              "A preventive maintenance plan is implemented (scheduled inspections, software updates, hardware servicing), with basic documentation of maintenance activities",
              "An IT asset management system is used to track inventory, maintenance schedules, service history, and asset status (lifecycle stage, warranty, utilization)",
              "Predictive maintenance is enabled through system monitoring and analytics (performance metrics, failure trends), allowing proactive scheduling and optimization of asset performance",
            ],
          },
        ],
      },
      {
        id: "C4",
        label: "CPD Platform IT Infrastructure Development Roadmap",
        weight: 0.172,
        questions: [
          {
            id: "C4Q1",
            text: "Development Plan Implementation and Monitoring",
            options: [
              "No formal IT infrastructure plan exists; development activities are uncoordinated and reactive (ad hoc procurement, no documented plans, no tracking of progress or outcomes)",
              "Short-term IT initiatives are implemented independently, with limited documentation and no formal monitoring tools (no KPIs, dashboards, or progress tracking reports)",
              "A formal IT roadmap is established, outlining infrastructure goals, timelines, and milestones, with progress monitored through periodic reports",
              "The IT roadmap is aligned with CPD strategy and resource allocation, with structured governance mechanisms (IT steering committees, project management tools, performance dashboards)",
              "A dynamic and continuously updated IT roadmap integrates performance analytics, risk management, and emerging technologies, supported by real-time monitoring and data-driven decision-making",
            ],
          },
          {
            id: "C4Q2",
            text: "Alignment of IT Infrastructure with Organizational Strategy",
            options: [
              "IT initiatives are independent of organizational strategy, with no defined linkage to CPD or institutional goals",
              "Some IT initiatives support organizational objectives, but alignment is informal and inconsistent",
              "The IT roadmap is partially aligned with organizational strategy, with documented links to specific goals (improving CPD access, efficiency, or compliance)",
              "IT infrastructure planning is fully aligned with institutional strategy, with coordinated budgeting, KPIs, and governance structures ensuring strategic consistency",
              "IT infrastructure continuously enables strategic innovation (new digital services, policy reforms), with feedback loops ensuring alignment with evolving organizational priorities",
            ],
          },
        ],
      },
      {
        id: "C5",
        label: "CPD Platform Cybersecurity Robustness",
        weight: 0.255,
        questions: [
          {
            id: "C5Q1",
            text: "Security Policy and Governance",
            options: [
              "No formal cybersecurity policy exists, and security practices are handled informally",
              "Basic security rules are defined (e.g., password requirements, data sharing guidelines); however, they are not standardized, documented, or consistently enforced",
              "A formal cybersecurity policy is documented, with clearly assigned roles and responsibilities, and communicated to relevant personnel",
              "A comprehensive cybersecurity governance framework is implemented, including defined procedures (access control, incident response), regular compliance audits, and staff training programs",
              "An institutionalized cybersecurity management system is aligned with recognized standards (e.g., ISO/IEC 27001, NIST), supported by continuous monitoring, risk assessment, and ongoing policy improvement",
            ],
          },
          {
            id: "C5Q2",
            text: "Threat Detection Technology",
            options: [
              "No tools or systems are in place for threat detection or prevention; protection relies on basic device-level measures with no centralized monitoring",
              "Basic security tools are deployed (e.g., standalone antivirus, endpoint firewalls); however, detection is limited to individual devices with no centralized logging or real-time alerting",
              "Structured security controls are implemented (centralized antivirus management, network firewalls, IDS, log collection), enabling basic threat detection across systems",
              "Advanced detection and prevention technologies are deployed (SIEM, IPS, EDR), enabling real-time monitoring, threat correlation, and automated alerting across integrated systems",
              "An intelligence-driven security ecosystem is established (SIEM with SOAR, threat intelligence platforms, behavioral analytics, AI-based anomaly detection), enabling proactive threat hunting and automated response",
            ],
          },
          {
            id: "C5Q3",
            text: "Data Protection and Encryption",
            options: [
              "No formal data protection controls are implemented; data is stored and transmitted without encryption or access restrictions",
              "Basic protection mechanisms are applied (e.g., password-protected files); however, encryption is not implemented and controls are inconsistently enforced",
              "Data protection measures are implemented for critical assets, including encryption at rest and in transit (HTTPS/SSL), along with role-based access control (RBAC)",
              "Comprehensive data protection is enforced across systems, including standardized encryption protocols (AES-256, TLS), secure storage environments, and regular security audits",
              "An organization-wide data protection framework is implemented, integrating end-to-end encryption, privacy-by-design principles, automated data classification, and compliance with data privacy regulations",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "D",
    label: "Organizational Effectiveness & External Engagement",
    short: "Org. Effectiveness",
    color: "#6B1B3A",
    factors: [
      {
        id: "D1",
        label: "CPD Governance Policy Framework",
        weight: 0.239,
        questions: [
          {
            id: "D1Q1",
            text: "Policy Development",
            options: [
              "No documented CPD governance policy exists; procedures vary across offices with no standard templates, repository, or version control system",
              "Draft or partial policy documents exist (e.g., memos, guidelines), but lack standardized structure, version control, or formal review workflows",
              "A formally documented CPD governance policy is maintained in a centralized repository, with defined scope, version control, and scheduled internal reviews",
              "A comprehensive policy framework is implemented, including clearly defined roles and responsibilities, supported by structured review workflows, stakeholder consultations, and data-informed revisions",
              "Policy development is institutionalized through integrated systems (digital policy management platforms), enabling continuous updates based on benchmarking, research inputs, system analytics, and real-time stakeholder feedback",
            ],
          },
          {
            id: "D1Q2",
            text: "Policy Communication, Implementation, and Monitoring",
            options: [
              "CPD policies are not systematically communicated or implemented; no official dissemination channels, training records, or monitoring mechanisms exist",
              "Policies are shared through informal channels (e.g., emails, meetings, memos), with limited documentation of dissemination and no structured monitoring of implementation",
              "Policies are formally disseminated through official channels (e.g., websites, portals, circulars), with documented implementation procedures and periodic internal assessments",
              "Implementation is supported by structured communication plans, defined performance indicators, and monitoring systems (dashboards, audit logs) that track policy adherence and outcomes",
              "A fully integrated communication and monitoring framework is in place, utilizing digital platforms, real-time analytics, and feedback systems to continuously evaluate, refine, and optimize policy implementation",
            ],
          },
        ],
      },
      {
        id: "D2",
        label: "External Regulatory Audit Readiness",
        weight: 0.2,
        questions: [
          {
            id: "D2Q1",
            text: "Frequency and Formality of External Audits",
            options: [
              "No external compliance audits are conducted; CPD compliance is self-reported with no third-party validation, audit reports, or documented verification processes",
              "External audits are conducted on an ad hoc or irregular basis, with limited standardization, incomplete documentation, and no formal tracking of findings or follow-up actions",
              "Regular external compliance audits are conducted by authorized bodies, following documented standards, audit schedules, and reporting formats, with formal audit reports generated",
              "Comprehensive third-party audits are conducted periodically, with structured audit frameworks, documented findings, defined corrective actions, and tracked resolution through compliance monitoring systems",
              "The audit ecosystem is digitally integrated with continuous compliance monitoring (real-time dashboards, automated audit logs), enabling transparency, traceability, and proactive regulatory compliance",
            ],
          },
          {
            id: "D2Q2",
            text: "Corrective Action and Follow-up",
            options: [
              "Non-compliance issues are not systematically documented or addressed; no formal corrective action process or tracking mechanism exists",
              "Corrective actions are occasionally initiated (e.g., based on audit findings), but are inconsistently documented, with no tracking system, timelines, or accountability assigned",
              "Standard corrective action procedures are established, including documentation of findings, assigned responsibilities, defined timelines, and periodic monitoring of resolution status",
              "Corrective actions are systematically tracked using compliance management systems, with regular reviews, status updates, and validation by internal and/or external auditors",
              "The compliance management system automates corrective action tracking, reporting, and escalation, enabling continuous feedback, accountability, and sustained regulatory compliance",
            ],
          },
        ],
      },
      {
        id: "D3",
        label: "Internal CPD Operational Standards",
        weight: 0.261,
        questions: [
          {
            id: "D3Q1",
            text: "Existence of Internal Compliance Standards",
            options: [
              "No documented internal compliance standards exist for CPD operations; procedures vary across units with no standard templates, guidelines, or reference documents",
              "Informal rules or checklists are used, but are not standardized, centrally stored, or version-controlled",
              "Formal internal compliance standards are documented (e.g., manuals, SOPs) and stored in a centralized repository, with defined scope, version control, and implementation across units",
              "Compliance standards are regularly reviewed and updated through structured processes, with documented revisions and version history",
              "An integrated compliance management system enforces standards through automated controls, real-time monitoring, and system-linked workflows",
            ],
          },
          {
            id: "D3Q2",
            text: "Internal Compliance Monitoring and Accountability",
            options: [
              "Compliance is not formally monitored; no designated personnel, unit, or system is assigned to oversee CPD compliance activities",
              "Monitoring occurs on an irregular basis (e.g., after incidents or complaints), with responsibilities informally assigned and no structured documentation or tracking system",
              "Periodic internal compliance audits are conducted (e.g., quarterly/annual), with documented reports, defined checklists, and designated compliance officers responsible for oversight",
              "A structured compliance framework is implemented, supported by monitoring systems (compliance dashboards, audit logs), defined roles and responsibilities, and regular reporting",
              "Institutionalized compliance governance system integrates real-time monitoring, defined KPIs, automated alerts, and analytics-driven insights to ensure continuous accountability and proactive compliance management",
            ],
          },
        ],
      },
      {
        id: "D4",
        label: "External Institutional Partnership Development",
        weight: 0.145,
        questions: [
          {
            id: "D4Q1",
            text: "Engagement with Partner Agencies for CPD Strengthening",
            options: [
              "No formal collaboration exists with external agencies; no MOA/MOU, joint programs, or shared resources support CPD implementation",
              "Collaboration occurs on a project or event basis, but without formal agreements, defined objectives, or continuity",
              "Formal partnerships are established through documented agreements (e.g., MOA/MOU), with defined scope, roles, and expected outputs",
              "Ongoing partnerships are operationalized through structured programs (joint training, system support, data sharing), with defined work plans and performance tracking",
              "Institutionalized partnerships are managed through integrated collaboration frameworks, enabling co-development, resource sharing, and continuous innovation in CPD systems",
            ],
          },
          {
            id: "D4Q2",
            text: "Evaluation and Impact of Collaboration",
            options: [
              "No formal evaluation of partnerships is conducted; no reports, indicators, or feedback mechanisms exist to assess outcomes",
              "Partnership outcomes are reviewed informally, with no defined metrics, documentation standards, or reporting structure",
              "Formal evaluation reports are produced using defined indicators, with documented findings and recommendations",
              "Evaluation results are systematically used to improve CPD programs, system performance, and resource allocation, supported by monitoring tools and periodic review cycles",
              "Evaluation mechanisms are embedded within partnership agreements, with continuous data collection informing partnership renewal, scaling, and co-development of CPD initiatives",
            ],
          },
        ],
      },
      {
        id: "D5",
        label: "CPD Stakeholder Engagement Mechanisms",
        weight: 0.156,
        questions: [
          {
            id: "D5Q1",
            text: "Stakeholder Participation and Engagement",
            options: [
              "Stakeholders are not formally involved in CPD policy development or decision-making; no consultation mechanisms, records, or communication channels are established",
              "Stakeholders are consulted on an occasional basis, but engagement is informal, with no defined representation, documentation of inputs, or tracking of participation",
              "Key stakeholder groups are regularly engaged through structured consultations (e.g., meetings, surveys), with feedback documented and considered in policy discussions",
              "Formal engagement structures (e.g., committees, working groups) are established, ensuring inclusive representation, defined roles, and sustained two-way communication supported by digital platforms",
              "Multi-stakeholder governance model is institutionalized, enabling co-creation of CPD policies and programs through real-time digital collaboration platforms, with transparent decision tracking and shared accountability mechanisms",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "E",
    label: "Workforce Development & Adaptive Strategies",
    short: "Workforce",
    color: "#4A2A6B",
    factors: [
      {
        id: "E1",
        label: "Personnel Role and Responsibility for CPD Governance",
        weight: 0.318,
        questions: [
          {
            id: "E1Q1",
            text: "Clarity of Roles",
            options: [
              "Roles and responsibilities for CPD activities are not defined; tasks are assigned informally with no job descriptions, role documentation, or accountability structure",
              "Some roles are identified, but responsibilities overlap or leave gaps; no standardized job descriptions or role-mapping documents are maintained",
              "Formal job descriptions and role definitions are documented and explicitly linked to CPD governance processes (e.g., accreditation, crediting, monitoring)",
              "Roles and responsibilities are coordinated across departments using formal mechanisms (e.g., RACI matrices, process maps), aligned with organizational objectives",
              "Role structures are regularly reviewed and refined based on system performance, workload analysis, and strategic priorities, supported by digital HR or workflow systems",
            ],
          },
          {
            id: "E1Q2",
            text: "Coordination Across Departments",
            options: [
              "Departments operate independently with no defined coordination mechanisms for CPD activities; no shared processes, systems, or communication channels exist",
              "Coordination occurs on an occasional basis, but lacks formal procedures, defined workflows, or documentation of inter-department activities",
              "Cross-department coordination is formalized through documented procedures (SOPs), regular meetings, and shared communication channels, with defined roles in CPD processes",
              "Inter-department coordination is systematic and monitored using integrated workflows and tools, with defined KPIs and regular reporting",
              "CPD governance processes are fully integrated across departments through interconnected systems, enabling seamless coordination, real-time communication, and synchronized operations",
            ],
          },
        ],
      },
      {
        id: "E2",
        label: "Staff Competency and Systems Training",
        weight: 0.32,
        questions: [
          {
            id: "E2Q1",
            text: "Availability of Training Programs",
            options: [
              "No formal training or orientation programs exist; no training plans, materials, or records are maintained for CPD operations",
              "Training is conducted on an irregular basis, with no standardized curriculum, training modules, or documentation of attendance and outcomes",
              "Regular training programs are implemented with standardized content (modules on CPD processes, systems, and tools), supported by training schedules, materials, and attendance records",
              "Structured capacity-building programs are implemented (technical and managerial training tracks), supported by training plans, competency-based modules, and evaluation tools",
              "Continuous professional development programs are institutionalized, supported by digital learning systems (e.g., LMS platforms), updated content aligned with emerging CPD technologies, and tracked through training analytics",
            ],
          },
          {
            id: "E2Q2",
            text: "Staff Competency Evaluation",
            options: [
              "No formal assessment of staff competency exists; no evaluation tools, criteria, or performance records are maintained",
              "Competency is assessed informally (e.g., supervisor feedback), with no standardized evaluation criteria, documentation, or tracking system",
              "Periodic competency evaluations are conducted using defined criteria, with documented results (evaluation forms, reports)",
              "Competency frameworks (skill matrices, role-based standards) and formal performance review systems are implemented, linking evaluation results to training plans, promotions, and role assignments",
              "Continuous competency monitoring is enabled through digital HR or performance systems (dashboards, analytics), tracking skill development, identifying gaps, and supporting readiness for system innovation",
            ],
          },
          {
            id: "E2Q3",
            text: "Knowledge Transfer and Succession Planning",
            options: [
              "No formal knowledge-sharing or succession mechanisms exist; critical knowledge is not documented or systematically transferred",
              "Knowledge sharing occurs informally, with no documentation or structured succession planning",
              "Knowledge transfer is facilitated through structured activities (e.g., mentoring programs, internal workshops), with basic documentation",
              "Formal knowledge management and succession planning programs are implemented, with documented procedures, knowledge repositories, and identified successors for key roles",
              "Adoption of digital knowledge management system (e.g., centralized repository, intranet, knowledge base) supports continuous knowledge sharing, version control, and succession planning",
            ],
          },
        ],
      },
      {
        id: "E3",
        label: "Work Environment",
        weight: 0.148,
        questions: [
          {
            id: "E3Q1",
            text: "Collaboration and Teamwork",
            options: [
              "No formal collaboration mechanisms exist; communication is siloed, with no shared platforms, cross-functional meetings, or documented coordination processes",
              "Collaboration occurs on an occasional basis, but without defined structures, shared tools, or documentation of joint activities",
              "Team-based collaboration is supported through structured activities (scheduled meetings, joint projects), with use of shared tools and documented outputs",
              "Interdepartmental collaboration is formalized and incentivized through defined processes (cross-functional teams, collaboration KPIs), supported by digital tools (project management systems, collaboration platforms)",
              "Collaboration is embedded in organizational systems and culture, supported by integrated digital platforms, real-time coordination, and measurable outcomes driving CPD innovation",
            ],
          },
          {
            id: "E3Q2",
            text: "Employee Well-being and Support",
            options: [
              "No formal employee well-being initiatives exist; no programs, policies, or records related to staff support are maintained",
              "Basic support is provided, but without structured programs, monitoring systems, or documented participation",
              "Employee support programs are implemented (assistance programs, welfare activities), with scheduled activities, assigned coordinators, and records of participation",
              "Structured well-being and engagement programs are implemented, with monitoring tools (surveys, participation tracking, performance indicators) to assess effectiveness",
              "A comprehensive well-being framework is institutionalized, supported by digital systems (HR platforms, feedback dashboards), continuous monitoring, and data-driven interventions to sustain productivity",
            ],
          },
          {
            id: "E3Q3",
            text: "Communication and Feedback Channels",
            options: [
              "Communication is primarily top-down and irregular, with no formal channels (no scheduled meetings, internal platforms, or documented communication processes)",
              "Basic communication and feedback channels exist, but usage is inconsistent, with no structured mechanisms for collecting, documenting, or tracking feedback",
              "Open communication is supported through structured channels (regular meetings, internal messaging platforms, feedback forms), with documented inputs and participation across teams",
              "Formal feedback mechanisms (surveys, reporting systems, feedback logs) are implemented, with results analyzed and used to inform operational decisions",
              "Integrated digital communication and feedback systems enable two-way communication, with analytics used to monitor engagement, track issues, and drive continuous organizational improvement",
            ],
          },
        ],
      },
      {
        id: "E4",
        label: "Leadership Support for CPD Initiatives",
        weight: 0.214,
        questions: [
          {
            id: "E4Q1",
            text: "Leadership Commitment to CPD",
            options: [
              "Leadership involvement in CPD is minimal; no documented participation in CPD activities, decision-making, or program oversight",
              "Leadership provides limited support primarily for compliance, with no formal initiatives, monitoring mechanisms, or strategic direction for CPD",
              "Leadership allocates resources and formally endorses CPD initiatives, with documented involvement in planning and review meetings",
              "Leadership actively promotes CPD through structured initiatives (mentoring programs, participation in training, strategic directives), supported by monitoring mechanisms aligned with organizational priorities",
              "Leadership institutionalizes CPD through formal policies, strategic plans, and performance systems, demonstrating continuous engagement, role modeling, and data-driven decision-making to sustain a learning culture",
            ],
          },
          {
            id: "E4Q2",
            text: "Resource Allocation and Investment",
            options: [
              "No dedicated budget, personnel, or infrastructure is allocated for CPD activities; resources are not planned or documented",
              "Limited resources are provided on a reactive basis, with no formal budgeting, planning, or tracking mechanisms",
              "CPD activities are included in annual budgets and operational plans, with allocated funds, personnel, and basic tracking of expenditures and outputs",
              "Sustained funding supports regular CPD programs, with financial tracking systems and alignment with organizational priorities and performance targets",
              "Long-term investment planning is institutionalized, supporting continuous improvement and digital transformation of CPD systems, with resource allocation guided by data and strategic outcomes",
            ],
          },
          {
            id: "E4Q3",
            text: "Leadership Accountability for CPD Outcomes",
            options: [
              "No formal mechanism exists to assess leadership contribution to CPD outcomes; no performance indicators, evaluation tools, or documented assessments are in place",
              "Leadership evaluation includes limited CPD-related indicators, but metrics are not standardized and results are not systematically tracked or reported",
              "Performance appraisal systems partially incorporate CPD-related indicators, with documented evaluation results and periodic review",
              "Leadership performance is systematically assessed using defined CPD outcome metrics (training completion rates, staff competency improvement, system utilization), integrated into formal appraisal systems",
              "Integrated leadership accountability system links CPD performance metrics, policy outcomes, and institutional targets, supported by real-time dashboards, data analytics, and continuous performance monitoring",
            ],
          },
        ],
      },
    ],
  },
];

// ─── SCORE HELPERS ────────────────────────────────────────────────────────────

function computeScores(answers) {
  const areaScores = {};
  for (const area of AREAS) {
    let areaScore = 0;
    const factorDetails = [];
    for (const factor of area.factors) {
      const qs = factor.questions;
      const scores = qs.map((q) => (answers[q.id] !== undefined ? answers[q.id] + 1 : null));
      const answered = scores.filter((s) => s !== null);
      if (answered.length === 0) {
        factorDetails.push({ id: factor.id, label: factor.label, weight: factor.weight, score: null, weighted: null });
        continue;
      }
      const factorScore = answered.reduce((a, b) => a + b, 0) / answered.length;
      const weighted = factorScore * factor.weight;
      areaScore += weighted;
      factorDetails.push({ id: factor.id, label: factor.label, weight: factor.weight, score: factorScore, weighted });
    }
    areaScores[area.id] = { score: areaScore, factors: factorDetails, label: area.label };
  }
  const validAreas = Object.values(areaScores).filter((a) => a.score > 0);
  const overall = validAreas.length > 0 ? validAreas.reduce((s, a) => s + a.score, 0) / validAreas.length : 0;
  return { areas: areaScores, overall };
}

function getLevel(score) {
  if (score < 1.81) return { level: 1, label: "Limited", desc: "Processes are informal and manual. Activities are carried out without standard and digital support." };
  if (score < 2.61) return { level: 2, label: "Emerging", desc: "Partial adoption of digital tools, but practices remain inconsistent." };
  if (score < 3.41) return { level: 3, label: "Defined", desc: "Processes and roles are formally documented. Consistent implementation using basic digital tools." };
  if (score < 4.21) return { level: 4, label: "Managed", desc: "Full adoption of digital tools. Operations are integrated and monitored. There is high stakeholder engagement." };
  return { level: 5, label: "Optimized", desc: "Systems focused on CPD are institutionalized and data-driven. Systems are interoperable and continuously improved through innovation." };
}

function countAnswered(answers) {
  let total = 0, answered = 0;
  for (const area of AREAS)
    for (const factor of area.factors)
      for (const q of factor.questions) {
        total++;
        if (answers[q.id] !== undefined) answered++;
      }
  return { total, answered };
}

// ─── STORAGE ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "dcmm-assessment-v1";

async function loadAnswers() {
  try {
    const res = await window.storage.get(STORAGE_KEY);
    return res ? JSON.parse(res.value) : {};
  } catch { return {}; }
}

async function saveAnswers(answers) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(answers));
  } catch {}
}

// ─── PDF GENERATION ───────────────────────────────────────────────────────────

function generatePDFContent(answers, orgName) {
  const { areas, overall } = computeScores(answers);
  const overallLevel = getLevel(overall);

  const strengthAreas = Object.values(areas).filter(a => a.score >= 3.41);
  const weakAreas = Object.values(areas).filter(a => a.score > 0 && a.score < 2.61);
  const midAreas = Object.values(areas).filter(a => a.score >= 2.61 && a.score < 3.41);

  const recommendations = {
    1: "Prioritize digitization of core CPD processes. Begin by documenting existing workflows and establishing basic digital tools for credentialing. Develop a formal governance policy and assign clear roles and responsibilities for CPD activities.",
    2: "Formalize existing digital practices into standardized procedures. Develop organization-wide policies and ensure consistent adoption of digital tools. Focus on staff training and establishing clear accountability structures.",
    3: "Integrate existing digital systems across departments. Establish performance monitoring mechanisms and develop data-driven decision-making processes. Strengthen external partnerships and stakeholder engagement structures.",
    4: "Optimize system integration and automation capabilities. Leverage advanced analytics for continuous improvement. Focus on interoperability with external platforms and implement predictive monitoring across all CPD operations.",
    5: "Maintain and continuously innovate current best practices. Benchmark against international standards, contribute to policy development, and share knowledge with peer organizations to advance the CPD ecosystem.",
  };

  return { areas, overall, overallLevel, strengthAreas, weakAreas, midAreas, recommendations, orgName };
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProgressBar({ answered, total }) {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 4 }}>
        <span>Assessment Progress</span>
        <span>{answered}/{total} questions ({pct}%)</span>
      </div>
      <div style={{ background: "#e8e8e8", borderRadius: 4, height: 6 }}>
        <div style={{ background: "linear-gradient(90deg, #1B3A6B, #C4782A)", borderRadius: 4, height: 6, width: `${pct}%`, transition: "width 0.4s" }} />
      </div>
    </div>
  );
}

function ScoreBadge({ score, size = "md" }) {
  if (!score) return null;
  const { label } = getLevel(score);
  const colors = { Limited: "#e74c3c", Emerging: "#e67e22", Defined: "#f1c40f", Managed: "#27ae60", Optimized: "#1B3A6B" };
  const fontSize = size === "lg" ? 13 : 11;
  return (
    <span style={{
      background: colors[label] || "#888",
      color: label === "Defined" ? "#333" : "#fff",
      borderRadius: 20,
      padding: "2px 10px",
      fontSize,
      fontWeight: 700,
      letterSpacing: 0.5,
    }}>{label} ({score.toFixed(2)})</span>
  );
}

function QuestionCard({ question, factorLabel, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{factorLabel}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>{question.text}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {question.options.map((opt, i) => {
          const selected = value === i;
          const levelColors = ["#e74c3c", "#e67e22", "#f1c40f", "#27ae60", "#1B3A6B"];
          const levelLabels = ["Level 1 – Limited", "Level 2 – Emerging", "Level 3 – Defined", "Level 4 – Managed", "Level 5 – Optimized"];
          return (
            <label key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
              padding: "12px 16px", borderRadius: 10,
              border: selected ? `2px solid ${levelColors[i]}` : "2px solid #e8e8e8",
              background: selected ? `${levelColors[i]}12` : "#fafafa",
              transition: "all 0.18s",
            }}>
              <input type="radio" name={question.id} value={i} checked={selected} onChange={() => onChange(i)}
                style={{ marginTop: 2, accentColor: levelColors[i], flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: levelColors[i], marginBottom: 2 }}>{levelLabels[i]}</div>
                <div style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>{opt}</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ResultsPanel({ answers, orgName }) {
  const { areas, overall } = computeScores(answers);
  const overallLevel = getLevel(overall);
  const levelColors = { 1: "#e74c3c", 2: "#e67e22", 3: "#f1c40f", 4: "#27ae60", 5: "#1B3A6B" };
  const areaList = AREAS.map(a => ({ ...a, ...areas[a.id] }));

  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{
        background: "linear-gradient(135deg, #1B3A6B, #2a5298)",
        borderRadius: 16, padding: "28px 32px", marginBottom: 24, color: "#fff",
      }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>OVERALL MATURITY LEVEL</div>
        <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1 }}>{overallLevel.label}</div>
        <div style={{ fontSize: 26, fontWeight: 300, opacity: 0.9 }}>Score: {overall.toFixed(2)} / 5.00</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8, maxWidth: 480 }}>{overallLevel.desc}</div>
        {orgName && <div style={{ marginTop: 12, fontSize: 14, opacity: 0.7 }}>Organization: <strong>{orgName}</strong></div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {areaList.map(area => {
          const lv = getLevel(area.score || 0);
          const pct = area.score ? ((area.score - 1) / 4) * 100 : 0;
          return (
            <div key={area.id} style={{
              background: "#fff", border: "1px solid #e8e8e8",
              borderRadius: 12, padding: "16px 18px",
              borderLeft: `4px solid ${area.color}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: area.color, marginBottom: 2 }}>{area.short || area.label}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>{area.score ? area.score.toFixed(2) : "–"}</span>
                <ScoreBadge score={area.score} />
              </div>
              <div style={{ background: "#f0f0f0", borderRadius: 4, height: 5 }}>
                <div style={{ background: area.color, borderRadius: 4, height: 5, width: `${pct}%`, transition: "width 0.5s" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>Factor Breakdown</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f8f8" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", color: "#555", fontWeight: 700 }}>Factor</th>
              <th style={{ padding: "8px 10px", textAlign: "center", color: "#555", fontWeight: 700 }}>Weight</th>
              <th style={{ padding: "8px 10px", textAlign: "center", color: "#555", fontWeight: 700 }}>Score</th>
              <th style={{ padding: "8px 10px", textAlign: "center", color: "#555", fontWeight: 700 }}>Level</th>
            </tr>
          </thead>
          <tbody>
            {areaList.map(area =>
              area.factors.map((f, fi) => {
                const lv = f.score ? getLevel(f.score) : null;
                return (
                  <tr key={f.id} style={{ borderTop: fi === 0 ? `2px solid ${area.color}` : "1px solid #f0f0f0", background: fi === 0 ? `${area.color}08` : "#fff" }}>
                    <td style={{ padding: "7px 10px", color: "#333" }}>
                      {fi === 0 && <span style={{ fontSize: 10, fontWeight: 800, color: area.color, display: "block", marginBottom: 1 }}>{area.short}</span>}
                      {f.label}
                    </td>
                    <td style={{ padding: "7px 10px", textAlign: "center", color: "#777" }}>{(f.weight * 100).toFixed(1)}%</td>
                    <td style={{ padding: "7px 10px", textAlign: "center", fontWeight: 700 }}>{f.score ? f.score.toFixed(2) : "–"}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center" }}>{lv ? <ScoreBadge score={f.score} /> : <span style={{ color: "#bbb", fontSize: 12 }}>N/A</span>}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PRINT/PDF STYLES ─────────────────────────────────────────────────────────
const PRINT_STYLES = `
  @media print {
    body * { visibility: hidden; }
    #pdf-report, #pdf-report * { visibility: visible; }
    #pdf-report { position: absolute; left: 0; top: 0; width: 100%; }
    @page { margin: 15mm; }
  }
`;

function ReportView({ answers, orgName, onClose }) {
  const { areas, overall } = computeScores(answers);
  const overallLevel = getLevel(overall);
  const areaList = AREAS.map(a => ({ ...a, ...areas[a.id] }));

  const strengths = areaList.filter(a => a.score >= 3.41);
  const improvements = areaList.filter(a => a.score > 0 && a.score < 3.41).sort((a, b) => a.score - b.score);

  const recMap = {
    1: "Initiate formal documentation of all CPD credentialing processes. Assign dedicated personnel to CPD governance roles and begin evaluating basic digital tools appropriate for your organization's size and readiness.",
    2: "Formalize existing informal practices into documented procedures. Develop an organization-wide policy framework, ensure consistent staff training, and establish basic performance monitoring mechanisms.",
    3: "Focus on system integration across departments. Develop real-time monitoring dashboards, deepen stakeholder engagement through structured consultation mechanisms, and begin aligning with external regulatory standards.",
    4: "Advance automation and predictive analytics across CPD operations. Explore interoperability with external credentialing ecosystems and implement continuous improvement cycles informed by performance data.",
    5: "Maintain excellence through benchmarking and innovation. Participate in industry standard-setting, mentor peer organizations, and continuously refine systems based on emerging technologies and stakeholder feedback.",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, overflowY: "auto", padding: 20 }}>
      <style>{PRINT_STYLES}</style>
      <div id="pdf-report" style={{ maxWidth: 820, margin: "0 auto", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)", padding: "40px 48px", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, opacity: 0.7, marginBottom: 8 }}>ASSESSMENT REPORT</div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Digital Credentialing</h1>
              <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900 }}>Maturity Model</h1>
              {orgName && <div style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>Organization: <strong>{orgName}</strong></div>}
              <div style={{ marginTop: 4, fontSize: 13, opacity: 0.7 }}>Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>OVERALL LEVEL</div>
              <div style={{ fontSize: 44, fontWeight: 900 }}>{overallLevel.level}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{overallLevel.label}</div>
              <div style={{ fontSize: 24, opacity: 0.9 }}>{overall.toFixed(2)} / 5.00</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "36px 48px" }}>
          {/* Level Description */}
          <div style={{ background: "#f4f7fb", borderRadius: 10, padding: "18px 22px", marginBottom: 28, borderLeft: "4px solid #1B3A6B" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1B3A6B", marginBottom: 6 }}>LEVEL {overallLevel.level} — {overallLevel.label.toUpperCase()}</div>
            <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{overallLevel.desc}</div>
          </div>

          {/* Area Scores Table */}
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14, borderBottom: "2px solid #f0f0f0", paddingBottom: 8 }}>Area Maturity Scores</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28, fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1B3A6B", color: "#fff" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700 }}>Area</th>
                <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700 }}>Score</th>
                <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700 }}>Maturity Level</th>
              </tr>
            </thead>
            <tbody>
              {areaList.map((area, i) => {
                const lv = getLevel(area.score || 0);
                return (
                  <tr key={area.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px 14px", color: "#333", fontWeight: 500 }}>
                      <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: area.color, marginRight: 8, verticalAlign: "middle" }} />
                      {area.label}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "center", fontWeight: 800, color: "#1a1a2e" }}>{area.score ? area.score.toFixed(2) : "–"}</td>
                    <td style={{ padding: "10px 14px", textAlign: "center" }}><ScoreBadge score={area.score} /></td>
                  </tr>
                );
              })}
              <tr style={{ background: "#1B3A6B", color: "#fff", fontWeight: 800 }}>
                <td style={{ padding: "12px 14px" }}>OVERALL</td>
                <td style={{ padding: "12px 14px", textAlign: "center" }}>{overall.toFixed(2)}</td>
                <td style={{ padding: "12px 14px", textAlign: "center" }}>{overallLevel.label}</td>
              </tr>
            </tbody>
          </table>

          {/* Strengths */}
          {strengths.length > 0 && (
            <>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14, borderBottom: "2px solid #f0f0f0", paddingBottom: 8 }}>Key Strengths</h2>
              {strengths.map(area => (
                <div key={area.id} style={{ marginBottom: 14, padding: "14px 18px", background: "#f0faf4", borderRadius: 8, borderLeft: `4px solid ${area.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: area.color, marginBottom: 4 }}>{area.label} — {getLevel(area.score).label} (Score: {area.score.toFixed(2)})</div>
                  <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                    This area demonstrates solid capability. The organization has established {area.score >= 4.21 ? "highly advanced, data-driven, and institutionalized" : "well-managed and integrated"} practices in {area.short || area.label.toLowerCase()}, contributing positively to overall digital credentialing maturity.
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Improvement Areas */}
          {improvements.length > 0 && (
            <>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14, borderBottom: "2px solid #f0f0f0", paddingBottom: 8, marginTop: 28 }}>Areas for Improvement</h2>
              {improvements.map(area => (
                <div key={area.id} style={{ marginBottom: 14, padding: "14px 18px", background: "#fff8f4", borderRadius: 8, borderLeft: `4px solid ${area.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: area.color, marginBottom: 4 }}>{area.label} — {getLevel(area.score).label} (Score: {area.score.toFixed(2)})</div>
                  <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                    This area requires focused attention. Key gaps include inconsistencies in {area.short?.toLowerCase() || "this domain"}-related processes that limit overall organizational effectiveness. Prioritizing improvements here will significantly advance the organization's maturity profile.
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Recommendations */}
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14, borderBottom: "2px solid #f0f0f0", paddingBottom: 8, marginTop: 28 }}>Strategic Recommendations</h2>
          <div style={{ background: "#f4f7fb", borderRadius: 10, padding: "18px 22px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1B3A6B", marginBottom: 8 }}>PATHWAY TO NEXT LEVEL: {overallLevel.label} → {getLevel(Math.min(overall + 0.8, 5)).label}</div>
            <div style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{recMap[overallLevel.level]}</div>
          </div>

          {/* Factor Details */}
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 14, borderBottom: "2px solid #f0f0f0", paddingBottom: 8, marginTop: 28 }}>Detailed Factor Analysis</h2>
          {areaList.map(area => (
            <div key={area.id} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: area.color, marginBottom: 8, padding: "6px 12px", background: `${area.color}15`, borderRadius: 6 }}>{area.label}</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#f8f8f8" }}>
                    <th style={{ padding: "7px 10px", textAlign: "left", color: "#666" }}>Factor</th>
                    <th style={{ padding: "7px 10px", textAlign: "center", color: "#666" }}>Weight</th>
                    <th style={{ padding: "7px 10px", textAlign: "center", color: "#666" }}>Score</th>
                    <th style={{ padding: "7px 10px", textAlign: "center", color: "#666" }}>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {area.factors.map(f => (
                    <tr key={f.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "7px 10px", color: "#333" }}>{f.label}</td>
                      <td style={{ padding: "7px 10px", textAlign: "center", color: "#666" }}>{(f.weight * 100).toFixed(1)}%</td>
                      <td style={{ padding: "7px 10px", textAlign: "center", fontWeight: 700 }}>{f.score ? f.score.toFixed(2) : "–"}</td>
                      <td style={{ padding: "7px 10px", textAlign: "center" }}>{f.score ? <ScoreBadge score={f.score} /> : <span style={{ color: "#bbb" }}>–</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Footer */}
          <div style={{ borderTop: "2px solid #f0f0f0", paddingTop: 20, marginTop: 28, fontSize: 12, color: "#999", textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: "#1B3A6B", marginBottom: 4 }}>Digital Credentialing Maturity Model (DCMM)</div>
            <div>Developed by Pricilla Faye T. Simon, Dr. Chutiporn Anutariya, Dr. Gaurav Dixit</div>
            <div style={{ marginTop: 4 }}>Asian Institute of Technology · Indian Institute of Technology · CONFIDENTIAL</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
        <button onClick={() => window.print()} style={{
          background: "#1B3A6B", color: "#fff", border: "none", borderRadius: 8,
          padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>🖨 Print / Save as PDF</button>
        <button onClick={onClose} style={{
          background: "#fff", color: "#333", border: "2px solid #ddd", borderRadius: 8,
          padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>Close</button>
      </div>
    </div>
  );
}

// ─── WELCOME SCREEN ───────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #0d2447 0%, #1B3A6B 50%, #2a5298 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif",
    }}>
      <div style={{ position: "fixed", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(196,120,42,0.12)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 560, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 14, height: 48, background: "#C4782A", borderRadius: 3 }} />
            <div style={{ width: 8, height: 36, background: "rgba(255,255,255,0.3)", borderRadius: 3 }} />
            <div style={{ width: 14, height: 58, background: "#fff", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>RESEARCH ASSESSMENT TOOL</div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>Digital Credentialing</h1>
          <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 900, color: "#C4782A" }}>Maturity Model</h1>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Assessor Evaluation Platform</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 44px", boxShadow: "0 32px 80px rgba(0,0,0,0.35)" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>Welcome, Assessor</h2>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "#666", lineHeight: 1.7 }}>
            This tool will guide you through the DCMM assessment across <strong>5 areas</strong> and <strong>21 factors</strong>.
            Your progress is automatically saved, so you can pause and continue at any time.
          </p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: "#1B3A6B", letterSpacing: 1, display: "block", marginBottom: 6 }}>
              ASSESSOR NAME <span style={{ color: "#bbb", fontWeight: 400 }}>(optional)</span>
            </label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Dr. Juan Dela Cruz"
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "2px solid #e8e8e8", fontSize: 14, outline: "none", fontFamily: "Georgia, serif", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: "#1B3A6B", letterSpacing: 1, display: "block", marginBottom: 6 }}>
              ORGANIZATION NAME <span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <input value={org} onChange={e => setOrg(e.target.value)}
              placeholder="e.g. Professional Regulation Commission"
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${org.trim() ? "#1B3A6B" : "#e8e8e8"}`, fontSize: 14, outline: "none", fontFamily: "Georgia, serif", boxSizing: "border-box" }}
              onKeyDown={e => e.key === "Enter" && org.trim() && onStart(org.trim(), name.trim())}
            />
            {!org.trim() && <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Required to begin the assessment</div>}
          </div>

          <button
            onClick={() => org.trim() && onStart(org.trim(), name.trim())}
            disabled={!org.trim()}
            style={{
              width: "100%", padding: "15px", borderRadius: 12, border: "none",
              background: org.trim() ? "linear-gradient(135deg, #1B3A6B, #2a5298)" : "#e0e0e0",
              color: org.trim() ? "#fff" : "#aaa", fontSize: 16, fontWeight: 900,
              cursor: org.trim() ? "pointer" : "not-allowed", letterSpacing: 0.5,
              boxShadow: org.trim() ? "0 6px 20px rgba(27,58,107,0.35)" : "none",
            }}
          >
            Start Evaluation →
          </button>

          <div style={{ marginTop: 20, padding: "14px 16px", background: "#f8f8fb", borderRadius: 10, fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>How it works:</strong> Answer all questions across 5 areas. Each area ends with a Submit button.
            After submitting the last area, your scores and a downloadable report will be generated automatically.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
          Pricilla Faye T. Simon · Dr. Chutiporn Anutariya · Dr. Gaurav Dixit<br />
          Asian Institute of Technology · Indian Institute of Technology
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("A");
  const [loaded, setLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    loadAnswers().then(saved => {
      setAnswers(saved.answers || {});
      setOrgName(saved.orgName || "");
      setAssessorName(saved.assessorName || "");
      if (saved.orgName) setStarted(true);
      setLoaded(true);
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnswer = useCallback(async (qid, val) => {
    setAnswers(prev => {
      const next = { ...prev, [qid]: val };
      saveAnswers({ answers: next, orgName, assessorName }).then(() => {
        setSaveStatus("Saved \u2713");
        setTimeout(() => setSaveStatus(""), 2000);
      });
      return next;
    });
  }, [orgName, assessorName]);

  const handleStart = (org, assessor) => {
    setOrgName(org);
    setAssessorName(assessor);
    setStarted(true);
    saveAnswers({ answers, orgName: org, assessorName: assessor });
  };

  const handleClear = () => {
    if (window.confirm("Clear all answers and return to the welcome screen? This cannot be undone.")) {
      setAnswers({});
      setOrgName("");
      setAssessorName("");
      setStarted(false);
      setShowResults(false);
      saveAnswers({ answers: {}, orgName: "", assessorName: "" });
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  const handleSubmitArea = () => {
    const idx = AREAS.findIndex(a => a.id === activeTab);
    const isLast = idx === AREAS.length - 1;
    if (isLast) {
      setShowResults(true);
      scrollToTop();
    } else {
      setActiveTab(AREAS[idx + 1].id);
      scrollToTop();
    }
  };

  const { total, answered } = countAnswered(answers);
  const { areas, overall } = computeScores(answers);
  const activeArea = AREAS.find(a => a.id === activeTab);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "Georgia, serif", color: "#1B3A6B", fontSize: 18 }}>
      Loading assessment\u2026
    </div>
  );

  if (!started) return <WelcomeScreen onStart={handleStart} />;

  const activeIdx = AREAS.findIndex(a => a.id === activeTab);
  const isLastArea = activeIdx === AREAS.length - 1;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f5f6fa", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B3A6B, #2a5298)", color: "#fff", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, opacity: 0.7 }}>DCMM ASSESSMENT</div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.5 }}>Digital Credentialing Maturity Model</div>
          {orgName && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
            {orgName}{assessorName ? ` \u00b7 Assessor: ${assessorName}` : ""}
          </div>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {saveStatus && <span style={{ fontSize: 12, color: "#a8d8a8" }}>{saveStatus}</span>}
          <button onClick={() => { setShowResults(!showResults); scrollToTop(); }} style={{
            background: showResults ? "#C4782A" : "rgba(255,255,255,0.2)", color: "#fff",
            border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>{showResults ? "\u2190 Questionnaire" : "\ud83d\udcca View Scores"}</button>
          <button onClick={() => setShowReport(true)} disabled={answered === 0} style={{
            background: answered > 0 ? "#C4782A" : "rgba(255,255,255,0.1)", color: "#fff",
            border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700,
            cursor: answered > 0 ? "pointer" : "not-allowed", opacity: answered > 0 ? 1 : 0.5,
          }}>Generate Report</button>
          <button onClick={handleClear} style={{
            background: "rgba(255,80,80,0.2)", color: "#ffaaaa",
            border: "1px solid rgba(255,80,80,0.3)", borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer",
          }}>Reset</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: "12px 32px", background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <ProgressBar answered={answered} total={total} />
      </div>

      {showResults ? (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>Assessment Results</h2>
            <button onClick={() => { setShowResults(false); scrollToTop(); }} style={{
              background: "#f4f4f4", border: "none", borderRadius: 8, padding: "8px 18px",
              fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#555",
            }}>\u2190 Back to Questionnaire</button>
          </div>
          <ResultsPanel answers={answers} orgName={orgName} />
        </div>
      ) : (
        <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto" }}>
          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0, padding: "20px 0", borderRight: "1px solid #e8e8e8", background: "#fff", minHeight: "calc(100vh - 120px)" }}>
            {AREAS.map((area, i) => {
              const aData = areas[area.id];
              const qsInArea = area.factors.flatMap(f => f.questions);
              const answeredInArea = qsInArea.filter(q => answers[q.id] !== undefined).length;
              const pct = Math.round((answeredInArea / qsInArea.length) * 100);
              const active = activeTab === area.id;
              const complete = pct === 100;
              return (
                <button key={area.id} onClick={() => handleTabChange(area.id)} style={{
                  width: "100%", textAlign: "left", padding: "14px 20px",
                  background: active ? `${area.color}12` : "transparent",
                  borderLeft: active ? `4px solid ${area.color}` : "4px solid transparent",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                  borderBottom: "1px solid #f5f5f5",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: complete ? area.color : "transparent",
                      border: `2px solid ${area.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: complete ? "#fff" : area.color, fontWeight: 900,
                    }}>{complete ? "\u2713" : i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: active ? 800 : 600, color: active ? area.color : "#444", lineHeight: 1.3 }}>{area.short || area.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 26 }}>
                    <div style={{ background: "#f0f0f0", borderRadius: 3, height: 3, flex: 1, marginRight: 8 }}>
                      <div style={{ background: area.color, borderRadius: 3, height: 3, width: `${pct}%`, transition: "width 0.3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#999" }}>{pct}%</span>
                  </div>
                  {aData?.score > 0 && <div style={{ paddingLeft: 26, marginTop: 4 }}><ScoreBadge score={aData.score} /></div>}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: "28px 32px", overflow: "auto" }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 11, color: "#999", fontWeight: 700 }}>AREA {activeIdx + 1} OF {AREAS.length}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: activeArea.color, flexShrink: 0 }} />
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>{activeArea.label}</h2>
                {areas[activeTab]?.score > 0 && <ScoreBadge score={areas[activeTab].score} size="lg" />}
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#777", lineHeight: 1.6, maxWidth: 600 }}>
                Select the statement that best describes the organization's current practice for each question. Your progress is automatically saved.
              </p>
            </div>

            {activeArea.factors.map(factor => (
              <div key={factor.id} style={{ marginBottom: 36 }}>
                <div style={{
                  background: `${activeArea.color}10`, borderRadius: 10, padding: "12px 18px", marginBottom: 18,
                  borderLeft: `4px solid ${activeArea.color}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: activeArea.color, letterSpacing: 1 }}>FACTOR {factor.id}</span>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{factor.label}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#999" }}>Weight: {(factor.weight * 100).toFixed(1)}%</div>
                    {(() => {
                      const qs = factor.questions;
                      const sc = qs.map(q => answers[q.id] !== undefined ? answers[q.id] + 1 : null).filter(s => s !== null);
                      const fs = sc.length > 0 ? sc.reduce((a, b) => a + b) / sc.length : null;
                      return fs ? <ScoreBadge score={fs} /> : null;
                    })()}
                  </div>
                </div>
                {factor.questions.map(q => (
                  <QuestionCard key={q.id} question={q} factorLabel={factor.label}
                    value={answers[q.id] !== undefined ? answers[q.id] : undefined}
                    onChange={val => handleAnswer(q.id, val)} />
                ))}
              </div>
            ))}

            {/* Navigation + Submit */}
            <div style={{
              marginTop: 16, paddingTop: 24, borderTop: "2px solid #f0f0f0",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
            }}>
              {activeIdx > 0 ? (
                <button onClick={() => handleTabChange(AREAS[activeIdx - 1].id)} style={{
                  background: "#f4f4f4", border: "none", borderRadius: 10, padding: "12px 22px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#555",
                }}>Previous Area</button>
              ) : <div />}

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {!isLastArea && (
                  <button onClick={() => handleTabChange(AREAS[activeIdx + 1].id)} style={{
                    background: `${activeArea.color}18`, border: `2px solid ${activeArea.color}`,
                    borderRadius: 10, padding: "12px 22px", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", color: activeArea.color,
                  }}>Next Area \u2192</button>
                )}
                <button onClick={handleSubmitArea} style={{
                  background: isLastArea
                    ? "linear-gradient(135deg, #C4782A, #e67e22)"
                    : `linear-gradient(135deg, ${activeArea.color}, #2a5298)`,
                  border: "none", borderRadius: 10, padding: "13px 30px",
                  fontSize: 14, fontWeight: 900, cursor: "pointer", color: "#fff",
                  boxShadow: `0 4px 16px ${isLastArea ? "rgba(196,120,42,0.4)" : "rgba(27,58,107,0.3)"}`,
                  letterSpacing: 0.3,
                }}>
                  {isLastArea ? "\u2714 Submit & View Results" : `Submit Area ${activeIdx + 1} \u2192`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReport && <ReportView answers={answers} orgName={orgName} onClose={() => setShowReport(false)} />}
    </div>
  );
}
