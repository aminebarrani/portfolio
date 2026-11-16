import type { Content } from './types'

// Single source of truth for the whole site.
// Every fact comes from the CV — edit text here, never inside components.
export const SITE_URL = 'https://aminebarrani.github.io/' // TODO: replace with your real GitHub Pages URL

export const content: Content = {
  meta: {
    title: 'Mohamed Amine Barrani — Full-Stack & IA Générative',
    description: {
      fr: 'Étudiant ingénieur en informatique (ESPRIT). Je conçois des plateformes web microservices qui embarquent des agents IA. PFE 6 mois dès janvier 2027.',
      en: 'Software engineering student (ESPRIT). I build microservice web platforms that ship with AI agents inside. 6-month internship from January 2027.',
    },
    url: SITE_URL,
  },

  profile: {
    name: 'Mohamed Amine Barrani',
    firstName: 'Mohamed Amine',
    lastName: 'Barrani',
    initials: 'AB',
    location: { fr: 'Ariana, Tunisie', en: 'Ariana, Tunisia' },
    availability: {
      fr: 'PFE 6 mois — dès janvier 2027',
      en: '6-month internship — from January 2027',
    },
    headline: {
      fr: 'Je construis des plateformes web qui embarquent des agents IA.',
      en: 'I build web platforms that ship with AI agents inside.',
    },
    roles: [
      { fr: 'Étudiant ingénieur — ESPRIT', en: 'Engineering student — ESPRIT' },
      { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
      { fr: 'IA générative & agents LLM', en: 'Generative AI & LLM agents' },
      { fr: 'Spring Boot · React · FastAPI', en: 'Spring Boot · React · FastAPI' },
    ],
    story: {
      fr: "Dernière année du cycle ingénieur en informatique (ESPRIT), orienté développement full-stack (Spring Boot, Angular/React, FastAPI) et IA générative. J'ai conçu seul une plateforme de télésuivi multi-rôles (microservices, JWT, PostgreSQL) avec prédiction de risque explicable (Random Forest, SHAP) et agent LLM (Google Gemini), déployée via CI/CD, ainsi qu'un module Flutter à base de LLM. Rigoureux et autonome, je recherche un PFE de 6 mois sur des plateformes web intégrant des agents IA.",
      en: 'Final year of the software engineering cycle (ESPRIT), focused on full-stack development (Spring Boot, Angular/React, FastAPI) and generative AI. I single-handedly designed a multi-role remote patient monitoring platform (microservices, JWT, PostgreSQL) with explainable risk prediction (Random Forest, SHAP) and an LLM agent (Google Gemini), deployed via CI/CD, plus an LLM-powered Flutter module. Rigorous and autonomous, I am looking for a 6-month graduation internship on web platforms integrating AI agents.',
    },
    socials: [
      { label: 'amine.barrani@esprit.tn', url: 'mailto:amine.barrani@esprit.tn', kind: 'email' },
      { label: '+216 99 128 294', url: 'tel:+21699128294', kind: 'phone' },
      { label: 'github.com/aminebarrani', url: 'https://github.com/aminebarrani', kind: 'github' },
      { label: 'linkedin.com/in/amine-barrani', url: 'https://linkedin.com/in/amine-barrani', kind: 'linkedin' },
    ],
  },

  loader: {
    lines: [
      { fr: '> init portfolio', en: '> init portfolio' },
      { fr: '> chargement du parcours…', en: '> loading background…' },
      { fr: '> services en ligne', en: '> services online' },
      { fr: '> agents IA prêts', en: '> AI agents ready' },
    ],
    skip: { fr: 'Appuyez pour passer', en: 'Press to skip' },
  },

  nav: {
    items: [
      { id: 'about', label: { fr: 'À propos', en: 'About' } },
      { id: 'projects', label: { fr: 'Projets', en: 'Projects' } },
      { id: 'experience', label: { fr: 'Expérience', en: 'Experience' } },
      { id: 'skills', label: { fr: 'Compétences', en: 'Skills' } },
      { id: 'certifications', label: { fr: 'Certifications', en: 'Certifications' } },
      { id: 'contact', label: { fr: 'Contact', en: 'Contact' } },
    ],
    menu: { fr: 'Menu', en: 'Menu' },
    close: { fr: 'Fermer', en: 'Close' },
  },

  about: {
    sectionLabel: { fr: 'À propos', en: 'About' },
    title: {
      fr: 'De la conception au déploiement, avec l\'IA au milieu.',
      en: 'From design to deployment, with AI in the middle.',
    },
    paragraphs: [
      {
        fr: "Étudiant en dernière année du cycle ingénieur en informatique à l'ESPRIT (Ariana), je me concentre sur les plateformes web complètes : architecture microservices, authentification robuste, qualité testée et pipelines CI/CD — avec une couche d'IA qui apporte une vraie valeur : prédiction explicable et agents LLM.",
        en: 'A final-year software engineering student at ESPRIT (Ariana), I focus on complete web platforms: microservice architecture, robust authentication, tested quality and CI/CD pipelines — with an AI layer that brings real value: explainable prediction and LLM agents.',
      },
      {
        fr: "Mon projet principal, MediSuivi, a été réalisé seul de la conception au déploiement en Scrum : 6 sprints, 15 user stories, des microservices Spring Cloud, un modèle Random Forest expliqué par SHAP, et un agent Gemini qui produit une synthèse claire du risque pour le patient.",
        en: 'My main project, MediSuivi, was built alone from design to deployment using Scrum: 6 sprints, 15 user stories, Spring Cloud microservices, a Random Forest model explained with SHAP, and a Gemini agent producing a clear risk summary for the patient.',
      },
      {
        fr: 'Autonomie, rigueur (tests automatisés et Quality Gate SonarQube à chaque build), communication (revues de sprint, rapport technique, documentation) et résolution de problèmes (repli par règles pour garantir la continuité de service) définissent ma façon de travailler.',
        en: 'Autonomy, rigor (automated tests and a SonarQube Quality Gate on every build), communication (sprint reviews, technical report, documentation) and problem solving (rule-based fallbacks to guarantee service continuity) define how I work.',
      },
    ],
    stats: [
      { value: 15, label: { fr: 'user stories livrées (Scrum)', en: 'user stories delivered (Scrum)' } },
      { value: 6, label: { fr: 'sprints, projet mené seul', en: 'sprints, solo project' } },
      { value: 12, suffix: '+', label: { fr: 'endpoints REST (ArabSoft)', en: 'REST endpoints (ArabSoft)' } },
      { value: 7, label: { fr: 'images Docker publiées', en: 'Docker images published' } },
      { value: 3, label: { fr: 'pipelines Jenkins', en: 'Jenkins pipelines' } },
      { value: 40, suffix: '%', label: { fr: 'de code répétitif en moins (JPA)', en: 'less repetitive code (JPA)' } },
    ],
    photoAlt: {
      fr: 'Portrait de Mohamed Amine Barrani',
      en: 'Portrait of Mohamed Amine Barrani',
    },
  },

  projectsSection: {
    sectionLabel: { fr: 'Projets', en: 'Projects' },
    title: { fr: 'Projets sélectionnés', en: 'Featured projects' },
    intro: {
      fr: 'Chaque projet raconte la même histoire : une plateforme web qui ship, avec des agents IA dedans.',
      en: 'Every project tells the same story: a web platform that ships, with AI agents inside.',
    },
    viewCase: { fr: 'Voir l\'étude de cas', en: 'View case study' },
    back: { fr: 'Retour aux projets', en: 'Back to projects' },
    scrollHint: { fr: 'Faites défiler pour explorer', en: 'Scroll to explore' },
  },

  projects: [
    {
      id: 'medisuivi',
      index: '01',
      title: 'MediSuivi',
      tagline: {
        fr: 'Plateforme de télésuivi patient multi-rôles avec prédiction de risque explicable et agent LLM.',
        en: 'Multi-role remote patient monitoring platform with explainable risk prediction and an LLM agent.',
      },
      period: '2026',
      stack: ['Spring Cloud', 'FastAPI', 'scikit-learn', 'SHAP', 'PostgreSQL', 'React', 'React Native', 'Gemini', 'Jenkins', 'Docker', 'SonarQube'],
      repoUrl: 'https://github.com/aminebarrani/medisuivi-web-mobile-devops',
      isMain: true,
      problem: {
        fr: "Le patient saisit ses constantes et déclenche une alerte SOS ; le médecin doit suivre, prioriser et anticiper le risque. La plateforme devait garantir la continuité de service même si l'IA tombe, et rendre chaque prédiction explicable.",
        en: 'The patient records vitals and can trigger an SOS alert; the doctor must monitor, prioritize and anticipate risk. The platform had to guarantee service continuity even if the AI goes down, and make every prediction explainable.',
      },
      role: {
        fr: 'Projet réalisé seul, de la conception au déploiement, en Scrum : 6 sprints, 15 user stories. Backend, IA, clients web/mobile et DevOps.',
        en: 'Built alone, from design to deployment, in Scrum: 6 sprints, 15 user stories. Backend, AI, web/mobile clients and DevOps.',
      },
      decisions: [
        {
          fr: 'Microservices Spring Cloud (Config Server, Eureka, API Gateway, user-service, patient-service) avec authentification JWT/BCrypt et une base PostgreSQL par service.',
          en: 'Spring Cloud microservices (Config Server, Eureka, API Gateway, user-service, patient-service) with JWT/BCrypt authentication and one PostgreSQL database per service.',
        },
        {
          fr: 'API FastAPI servant un Random Forest qui prédit la gravité à partir de 10 features (tendances sur 14 jours, symptômes sur 7 jours), avec explications SHAP.',
          en: 'FastAPI serving a Random Forest that predicts severity from 10 features (14-day trends, 7-day symptoms), with SHAP explanations.',
        },
        {
          fr: "Repli par règles cliniques si le service ML est indisponible — la prédiction ne disparaît jamais, elle dégrade proprement.",
          en: 'Rule-based clinical fallback when the ML service is unavailable — prediction never disappears, it degrades gracefully.',
        },
        {
          fr: "Agent « MediSuivi AI » (Google Gemini, repli local) qui produit une synthèse claire du risque pour le patient.",
          en: '"MediSuivi AI" agent (Google Gemini, local fallback) producing a clear risk summary for the patient.',
        },
        {
          fr: 'Alertes automatiques sur dépassement de seuils cliniques côté patient-service.',
          en: 'Automatic alerts on clinical threshold breaches in the patient-service.',
        },
      ],
      outcomes: [
        {
          fr: 'Portail médecin React/TypeScript (Vite, Tailwind) et application patient React Native (Expo).',
          en: 'Doctor portal in React/TypeScript (Vite, Tailwind) and patient app in React Native (Expo).',
        },
        {
          fr: '3 pipelines Jenkins, SonarQube, tests JUnit/Vitest/pytest/Jest, 7 images Docker publiées sur Docker Hub.',
          en: '3 Jenkins pipelines, SonarQube, JUnit/Vitest/pytest/Jest tests, 7 Docker images published on Docker Hub.',
        },
      ],
      demo: {
        title: { fr: 'Démo réelle', en: 'Real demo' },
        note: {
          fr: 'Vidéos et captures enregistrées sur le projet réellement déployé.',
          en: 'Videos and screenshots recorded from the actually deployed project.',
        },
        webCaption: {
          fr: 'Portail médecin — React/TypeScript (Vite, Tailwind)',
          en: 'Doctor portal — React/TypeScript (Vite, Tailwind)',
        },
        mobileCaption: {
          fr: 'Application patient — React Native (Expo)',
          en: 'Patient app — React Native (Expo)',
        },
        webVideo: 'demo/web-demo.mp4',
        mobileVideo: 'demo/mobile-demo.mp4',
        webPoster: 'demo/web-poster.png',
        mobilePoster: 'demo/mobile-poster.png',
        webShots: [
          { src: 'demo/web-01.png', caption: { fr: 'Tableau de bord médecin', en: 'Doctor dashboard' } },
          { src: 'demo/web-02.png', caption: { fr: 'Suivi patient (constantes)', en: 'Patient follow-up (vitals)' } },
          { src: 'demo/web-03.png', caption: { fr: 'Prédiction + explication SHAP', en: 'Prediction + SHAP explanation' } },
          { src: 'demo/web-04.png', caption: { fr: 'Alertes cliniques', en: 'Clinical alerts' } },
        ],
        mobileShots: [
          { src: 'demo/mobile-01.png', caption: { fr: 'Dashboard patient', en: 'Patient dashboard' } },
          { src: 'demo/mobile-02.png', caption: { fr: 'Connexion', en: 'Login' } },
          { src: 'demo/mobile-03.png', caption: { fr: 'Saisie des constantes', en: 'Vitals entry' } },
          { src: 'demo/mobile-04.png', caption: { fr: 'Alertes & SOS', en: 'Alerts & SOS' } },
        ],
      },
      diagram: {
        nodes: [
          {
            id: 'doctor-portal', label: 'Portail médecin', x: 30, y: 140, w: 160, h: 64, kind: 'client',
            description: {
              fr: 'Portail médecin React/TypeScript (Vite, Tailwind) : suit les patients, priorise les alertes et anticipe le risque.',
              en: 'React/TypeScript doctor portal (Vite, Tailwind): monitors patients, prioritizes alerts and anticipates risk.',
            },
          },
          {
            id: 'patient-app', label: 'App patient · Expo', x: 30, y: 300, w: 160, h: 70, kind: 'client',
            description: {
              fr: 'Application patient React Native (Expo) : saisie des constantes, déclenchement de l\'alerte SOS, et synthèse claire du risque produite par l\'agent Gemini.',
              en: 'React Native (Expo) patient app: vitals entry, SOS alert trigger, and the clear risk summary produced by the Gemini agent.',
            },
          },
          {
            id: 'gateway', label: 'API Gateway', x: 265, y: 250, w: 150, h: 60, kind: 'gateway',
            description: {
              fr: 'Point d\'entrée unique (Spring Cloud Gateway) : route les requêtes vers les services, applique l\'authentification JWT en bordure.',
              en: 'Single entry point (Spring Cloud Gateway): routes requests to services, enforces JWT authentication at the edge.',
            },
          },
          {
            id: 'config', label: 'Config · Eureka', x: 265, y: 60, w: 150, h: 56, kind: 'infra',
            description: {
              fr: 'Config Server pour la configuration centralisée et Eureka pour la découverte de services.',
              en: 'Config Server for centralized configuration and Eureka for service discovery.',
            },
          },
          {
            id: 'user-service', label: 'user-service', x: 495, y: 130, w: 165, h: 60, kind: 'service',
            description: {
              fr: 'Gestion des comptes et authentification JWT/BCrypt. Sa propre base PostgreSQL (une base par service).',
              en: 'Account management and JWT/BCrypt authentication. Its own PostgreSQL database (one database per service).',
            },
          },
          {
            id: 'patient-service', label: 'patient-service', x: 495, y: 330, w: 165, h: 60, kind: 'service',
            description: {
              fr: 'Constantes vitales, alerte SOS et alertes automatiques sur dépassement de seuils cliniques. Sa propre base PostgreSQL.',
              en: 'Vitals, SOS alert and automatic alerts on clinical threshold breaches. Its own PostgreSQL database.',
            },
          },
          {
            id: 'pg-user', label: 'PostgreSQL', x: 755, y: 40, w: 155, h: 52, kind: 'data',
            description: {
              fr: 'Base dédiée au user-service — isolation des données par service.',
              en: 'Dedicated user-service database — data isolation per service.',
            },
          },
          {
            id: 'pg-patient', label: 'PostgreSQL', x: 755, y: 225, w: 155, h: 52, kind: 'data',
            description: {
              fr: 'Base dédiée au patient-service — constantes, historique et alertes.',
              en: 'Dedicated patient-service database — vitals, history and alerts.',
            },
          },
          {
            id: 'ml-service', label: 'ML service · FastAPI', x: 755, y: 340, w: 200, h: 64, kind: 'ai',
            description: {
              fr: 'Random Forest (scikit-learn) servi par FastAPI : prédit la gravité à partir de 10 features (tendances 14 jours, symptômes 7 jours), explications SHAP, repli par règles cliniques si indisponible.',
              en: 'Random Forest (scikit-learn) served by FastAPI: predicts severity from 10 features (14-day trends, 7-day symptoms), SHAP explanations, rule-based clinical fallback when unavailable.',
            },
          },
          {
            id: 'llm-agent', label: 'MediSuivi AI · Gemini', x: 755, y: 450, w: 200, h: 60, kind: 'ai',
            description: {
              fr: 'Agent LLM (Google Gemini, repli local) qui transforme la prédiction en synthèse claire du risque pour le patient.',
              en: 'LLM agent (Google Gemini, local fallback) turning the prediction into a clear risk summary for the patient.',
            },
          },
          {
            id: 'devops', label: 'CI/CD · DevOps', x: 30, y: 450, w: 160, h: 70, kind: 'infra',
            description: {
              fr: '3 pipelines Jenkins, SonarQube (Quality Gate), tests JUnit/Vitest/pytest/Jest, 7 images Docker publiées sur Docker Hub.',
              en: '3 Jenkins pipelines, SonarQube (Quality Gate), JUnit/Vitest/pytest/Jest tests, 7 Docker images published on Docker Hub.',
            },
          },
        ],
        edges: [
          { from: 'doctor-portal', to: 'gateway', label: { fr: 'suivi · priorisation', en: 'monitoring · triage' } },
          { from: 'patient-app', to: 'gateway', label: { fr: 'constantes · alerte SOS', en: 'vitals · SOS alert' } },
          { from: 'gateway', to: 'user-service' },
          { from: 'gateway', to: 'patient-service' },
          { from: 'user-service', to: 'pg-user' },
          { from: 'patient-service', to: 'pg-patient' },
          { from: 'patient-service', to: 'ml-service', label: { fr: 'features (10)', en: 'features (10)' } },
          { from: 'patient-service', to: 'llm-agent' },
          { from: 'config', to: 'gateway', dashed: true },
          { from: 'config', to: 'user-service', dashed: true },
          { from: 'config', to: 'patient-service', dashed: true },
          { from: 'devops', to: 'gateway', dashed: true },
          { from: 'devops', to: 'patient-service', dashed: true },
        ],
      },
    },
    {
      id: 'jungleinenglish',
      index: '02',
      title: 'JungleInEnglish',
      tagline: {
        fr: "Plateforme d'événements et billetterie : microservices sécurisés, détection de conflits en temps réel, recommandation ML.",
        en: 'Events and ticketing platform: secure microservices, real-time conflict detection, ML recommendation.',
      },
      period: '2024 — 2025',
      stack: ['Spring Boot', 'Spring Cloud', 'Keycloak', 'Python', 'FastAPI', 'Docker', 'MySQL', 'ZXing'],
      repoUrl: 'https://github.com/aminebarrani/jungleinenglish',
      problem: {
        fr: "Gérer des événements et une billetterie en ligne de bout en bout : sécurité, conflits de réservation en temps réel, capacité, paiement et check-in sans contact — plus une recommandation de cours personnalisée.",
        en: 'Run events and online ticketing end to end: security, real-time booking conflicts, capacity, payment and contactless check-in — plus personalized course recommendation.',
      },
      role: {
        fr: 'Conception et développement du backend microservices, du module de recommandation ML et de la billetterie.',
        en: 'Design and development of the microservices backend, the ML recommendation module and ticketing.',
      },
      decisions: [
        {
          fr: 'Backend microservices sécurisé avec Keycloak (OAuth2/JWT), orchestré par Docker Compose.',
          en: 'Secure microservices backend with Keycloak (OAuth2/JWT), orchestrated with Docker Compose.',
        },
        {
          fr: 'Détection de conflits d\'événements en temps réel et suivi de capacité.',
          en: 'Real-time event conflict detection and capacity tracking.',
        },
        {
          fr: 'Module de recommandation de cours en machine learning (Python), exposé via une API FastAPI et intégré à la plateforme.',
          en: 'Machine-learning course recommendation module (Python), exposed via a FastAPI and integrated into the platform.',
        },
        {
          fr: 'Tickets QR code (ZXing, jetons UUID) et paiement en ligne.',
          en: 'QR-code tickets (ZXing, UUID tokens) and online payment.',
        },
      ],
      outcomes: [
        {
          fr: 'Check-in sans contact par scan QR.',
          en: 'Contactless check-in by QR scan.',
        },
        {
          fr: 'Tests JUnit 5 et Mockito.',
          en: 'JUnit 5 and Mockito tests.',
        },
      ],
    },
    {
      id: 'ressources-flutter',
      index: '03',
      title: 'Module Gestion des Ressources',
      tagline: {
        fr: "Module Flutter d'une plateforme pédagogique ESPRIT : ressources PDF/PPTX, droits par groupe, résumés et flashcards générés par Gemini.",
        en: 'Flutter module of an ESPRIT learning platform: PDF/PPTX resources, group-based access rights, Gemini-generated summaries and flashcards.',
      },
      period: '2025 — 2026',
      stack: ['Flutter', 'Dart', 'SQLite (sqflite)', 'MVVM', 'Google Gemini', 'Firebase AI Logic'],
      problem: {
        fr: "Dans une plateforme pédagogique multi-rôles, permettre aux enseignants de publier des ressources (PDF/PPTX) publiques, privées ou réservées à un groupe — et les rendre utiles grâce à l'IA : résumés automatiques et flashcards.",
        en: 'In a multi-role learning platform, let teachers publish resources (PDF/PPTX) that are public, private or group-restricted — and make them useful with AI: automatic summaries and flashcards.',
      },
      role: {
        fr: "Responsable du module Gestion des Ressources : architecture, données, droits d'accès, génération IA et tests.",
        en: 'Owner of the Resource Management module: architecture, data, access rights, AI generation and tests.',
      },
      decisions: [
        {
          fr: 'Architecture MVVM par features, persistance SQLite mobile + web ; fichiers PDF/PPTX stockés hors base pour contourner la limite CursorWindow de 2 Mo.',
          en: 'Feature-based MVVM architecture, SQLite persistence on mobile + web; PDF/PPTX files stored outside the database to work around the 2 MB CursorWindow limit.',
        },
        {
          fr: "Règle d'accès centralisée (canView) : ressources publiques, privées ou réservées à un groupe ; CRUD réservé à l'enseignant propriétaire.",
          en: 'Centralized access rule (canView): public, private or group-restricted resources; CRUD reserved to the owning teacher.',
        },
        {
          fr: "Inversion de dépendances (GroupMembershipSource) : l'accès se met à jour en temps réel quand l'étudiant rejoint ou quitte un groupe.",
          en: 'Dependency inversion (GroupMembershipSource): access updates in real time when a student joins or leaves a group.',
        },
        {
          fr: 'Résumés et flashcards générés par Gemini (JSON structuré via responseSchema) à partir des PDF/PPTX joints, avec repli multi-modèles et retries ; clé API gardée hors du code source.',
          en: 'Summaries and flashcards generated by Gemini (structured JSON via responseSchema) from attached PDF/PPTX files, with multi-model fallback and retries; API key kept out of source code.',
        },
      ],
      outcomes: [
        {
          fr: "Tests d'intégration : visibilité par groupe, adhésions, permissions.",
          en: 'Integration tests: group visibility, memberships, permissions.',
        },
        {
          fr: 'Analyse statique sans erreur.',
          en: 'Static analysis with zero errors.',
        },
      ],
    },
  ],

  experience: {
    sectionLabel: { fr: 'Expérience', en: 'Experience' },
    title: { fr: 'Parcours', en: 'Journey' },
    entries: [
      {
        id: 'medisuivi-internship',
        role: { fr: 'Stage académique — MediSuivi (télésuivi patient)', en: 'Academic internship — MediSuivi (patient monitoring)' },
        company: 'ESPRIT',
        location: { fr: 'Ariana', en: 'Ariana' },
        period: '07 — 09 · 2026',
        stack: ['Spring Cloud', 'FastAPI', 'scikit-learn', 'SHAP', 'PostgreSQL', 'React', 'React Native', 'Gemini', 'Jenkins', 'Docker', 'SonarQube'],
        repoUrl: 'https://github.com/aminebarrani/medisuivi-web-mobile-devops',
        bullets: [
          {
            fr: 'Projet réalisé seul, de la conception au déploiement, en Scrum (6 sprints, 15 user stories) : le patient saisit ses constantes et déclenche une alerte SOS, le médecin suit, priorise et anticipe le risque.',
            en: 'Built alone from design to deployment in Scrum (6 sprints, 15 user stories): the patient records vitals and triggers an SOS alert, the doctor monitors, prioritizes and anticipates risk.',
          },
          {
            fr: 'Backend microservices Spring Cloud (Config Server, Eureka, API Gateway, user-service, patient-service), JWT/BCrypt, une base PostgreSQL par service, alertes automatiques sur dépassement de seuils cliniques.',
            en: 'Spring Cloud microservices backend (Config Server, Eureka, API Gateway, user-service, patient-service), JWT/BCrypt, one PostgreSQL database per service, automatic alerts on clinical threshold breaches.',
          },
          {
            fr: 'IA : API FastAPI servant un Random Forest (gravité prédite à partir de 10 features), explicable avec SHAP, repli par règles cliniques. Agent « MediSuivi AI » (Gemini, repli local) pour la synthèse du risque.',
            en: 'AI: FastAPI serving a Random Forest (severity predicted from 10 features), explainable with SHAP, rule-based clinical fallback. "MediSuivi AI" agent (Gemini, local fallback) for the risk summary.',
          },
          {
            fr: 'Clients : portail médecin React/TypeScript (Vite, Tailwind) et application patient React Native (Expo). DevOps : 3 pipelines Jenkins, SonarQube, tests JUnit/Vitest/pytest/Jest, 7 images Docker sur Docker Hub.',
            en: 'Clients: React/TypeScript doctor portal (Vite, Tailwind) and React Native (Expo) patient app. DevOps: 3 Jenkins pipelines, SonarQube, JUnit/Vitest/pytest/Jest tests, 7 Docker images on Docker Hub.',
          },
        ],
      },
      {
        id: 'arabsoft',
        role: { fr: 'Stagiaire développeur full-stack', en: 'Full-stack developer intern' },
        company: 'ArabSoft',
        location: { fr: 'Tunis', en: 'Tunis' },
        period: '06 — 08 · 2025',
        stack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JPA/Hibernate', 'JWT'],
        bullets: [
          {
            fr: "Plateforme de gestion de tâches (Spring Boot, Angular) adoptée en usage interne quotidien, avec contrôle d'accès par rôles et mises à jour en temps réel.",
            en: 'Task management platform (Spring Boot, Angular) adopted for daily internal use, with role-based access control and real-time updates.',
          },
          {
            fr: '12+ endpoints REST, PostgreSQL via JPA/Hibernate (−40 % de code répétitif) ; formulaires Angular sécurisés par JWT et route guards.',
            en: '12+ REST endpoints, PostgreSQL via JPA/Hibernate (−40% repetitive code); Angular forms secured with JWT and route guards.',
          },
        ],
      },
      {
        id: 'cpg-gafsa',
        role: { fr: 'Stagiaire développeur web', en: 'Web developer intern' },
        company: 'CPG Gafsa',
        location: { fr: 'Gafsa', en: 'Gafsa' },
        period: '07 · 2023',
        stack: ['Laravel', 'PHP'],
        bullets: [
          {
            fr: 'Remplacement de processus Excel manuels par un site interne de reporting (Laravel/PHP).',
            en: 'Replaced manual Excel processes with an internal reporting website (Laravel/PHP).',
          },
        ],
      },
    ],
  },

  education: {
    sectionLabel: { fr: 'Formation', en: 'Education' },
    school: 'ESPRIT',
    degree: {
      fr: 'Cycle ingénieur en informatique (5 ans)',
      en: 'Software engineering cycle (5 years)',
    },
    period: '2022 — 2027',
    detail: {
      fr: 'Dernière année, diplôme en 2027 — Baccalauréat Mathématiques.',
      en: 'Final year, graduating 2027 — Mathematics Baccalaureate.',
    },
    modules: {
      fr: 'Modules clés : microservices, développement web et mobile, bases de données, DevOps & CI/CD, machine learning appliqué.',
      en: 'Key modules: microservices, web and mobile development, databases, DevOps & CI/CD, applied machine learning.',
    },
  },

  skills: {
    sectionLabel: { fr: 'Compétences', en: 'Skills' },
    title: { fr: 'Stack technique', en: 'Technical stack' },
    intro: {
      fr: 'Survolez un groupe pour le mettre en avant. Tout vient de projets réellement livrés.',
      en: 'Hover a group to highlight it. Everything comes from projects actually shipped.',
    },
    groups: [
      {
        id: 'backend',
        title: { fr: 'Backend & langages', en: 'Backend & languages' },
        items: ['Java 17', 'Spring Boot', 'Spring Cloud', 'Keycloak (OAuth2/JWT)', 'JPA/Hibernate', 'API REST/OpenAPI', 'SQL', 'C/C++', 'PHP'],
      },
      {
        id: 'ai',
        title: { fr: 'IA générative & ML', en: 'Generative AI & ML' },
        items: [{ fr: 'Google Gemini (agents, JSON structuré)', en: 'Google Gemini (agents, structured JSON)' }, 'Python (FastAPI)', 'scikit-learn (Random Forest)', 'SHAP'],
      },
      {
        id: 'devops',
        title: { fr: 'DevOps & outils', en: 'DevOps & tools' },
        items: ['Git/GitHub', 'Jenkins (CI/CD)', 'Docker', 'Docker Compose', 'SonarQube'],
      },
      {
        id: 'frontend',
        title: { fr: 'Frontend & mobile', en: 'Frontend & mobile' },
        items: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'React Native', 'Flutter/Dart', 'Tailwind CSS'],
      },
      {
        id: 'data-tests',
        title: { fr: 'Données & tests', en: 'Data & testing' },
        items: ['PostgreSQL', 'MySQL', 'SQLite', 'H2', 'JUnit', 'Mockito', 'Pytest', 'Jest', 'JaCoCo', 'Postman', 'Swagger'],
      },
    ],
    softSkillsTitle: { fr: 'Savoir-être', en: 'Soft skills' },
    softSkills: [
      {
        title: { fr: 'Autonomie', en: 'Autonomy' },
        detail: { fr: 'projet de bout en bout, de la conception au déploiement', en: 'end-to-end project, from design to deployment' },
      },
      {
        title: { fr: 'Rigueur', en: 'Rigor' },
        detail: { fr: 'tests automatisés et Quality Gate SonarQube à chaque build', en: 'automated tests and SonarQube Quality Gate on every build' },
      },
      {
        title: { fr: 'Communication', en: 'Communication' },
        detail: { fr: 'revues de sprint, rapport technique et documentation', en: 'sprint reviews, technical report and documentation' },
      },
      {
        title: { fr: 'Résolution de problèmes', en: 'Problem solving' },
        detail: { fr: 'repli par règles pour garantir la continuité de service', en: 'rule-based fallbacks to guarantee service continuity' },
      },
      {
        title: { fr: 'Esprit d\'équipe & adaptabilité', en: 'Teamwork & adaptability' },
        detail: { fr: 'Scrum, apprentissage rapide (FastAPI, ML, Flutter)', en: 'Scrum, fast learning (FastAPI, ML, Flutter)' },
      },
    ],
    spokenLanguages: { fr: 'Langues', en: 'Languages' },
    languages: [
      { name: { fr: 'Arabe', en: 'Arabic' }, level: { fr: 'langue maternelle', en: 'native' } },
      { name: { fr: 'Français', en: 'French' }, level: { fr: 'courant', en: 'fluent' } },
      { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'professionnel', en: 'professional' } },
    ],
  },

  certifications: {
    sectionLabel: { fr: 'Certifications', en: 'Certifications' },
    title: { fr: 'Certifications', en: 'Certifications' },
    items: [
      {
        id: 'hcda',
        name: 'Hedera Certified Developer Associate (HCDA)',
        issuer: 'The Hashgraph Association',
        date: { fr: 'novembre 2026', en: 'November 2026' },
      },
      {
        id: 'hcf',
        name: 'Hedera Certified Foundation (HCF)',
        issuer: 'The Hashgraph Association',
        date: { fr: 'novembre 2026', en: 'November 2026' },
      },
      {
        id: 'aws-cloud-foundations',
        name: 'AWS Academy Graduate — Cloud Foundations (Training Badge)',
        issuer: 'Amazon Web Services',
        date: { fr: 'novembre 2026', en: 'November 2026' },
      },
    ],
  },

  contact: {
    sectionLabel: { fr: 'Contact', en: 'Contact' },
    title: {
      fr: 'Un PFE en Full-Stack + IA générative ?',
      en: 'A Full-Stack + GenAI internship?',
    },
    intro: {
      fr: 'Je recherche un stage de fin d\'études de 6 mois à partir de janvier 2027, sur des plateformes web intégrant des agents IA. Écrivez-moi — je réponds vite.',
      en: 'I am looking for a 6-month end-of-studies internship starting January 2027, on web platforms integrating AI agents. Write to me — I reply fast.',
    },
    cta: { fr: 'Envoyer un email', en: 'Send an email' },
    copy: { fr: 'Copier l\'email', en: 'Copy email' },
    copied: { fr: 'Email copié dans le presse-papiers', en: 'Email copied to clipboard' },
  },

  footer: {
    builtWith: {
      fr: 'Conçu et développé par Mohamed Amine Barrani — React, TypeScript, Tailwind, Framer Motion, GSAP, Lenis.',
      en: 'Designed and built by Mohamed Amine Barrani — React, TypeScript, Tailwind, Framer Motion, GSAP, Lenis.',
    },
    rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
    backToTop: { fr: 'Retour en haut', en: 'Back to top' },
  },

  marquee: [
    'Java 17', 'Spring Boot', 'Spring Cloud', 'Keycloak', 'FastAPI', 'Python', 'scikit-learn', 'SHAP',
    'Google Gemini', 'React', 'TypeScript', 'Angular', 'React Native', 'Flutter', 'Tailwind CSS',
    'PostgreSQL', 'MySQL', 'SQLite', 'Docker', 'Jenkins', 'SonarQube', 'Git',
  ],
}
