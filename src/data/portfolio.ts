export interface Metric {
  label: string;
  value: string;
}

export interface ProfessionalSignal {
  index: string;
  value: string;
  valueLine1?: string;
  valueLine2?: string;
  label: string;
  sublabel?: string;
  descriptorLine1?: string;
  descriptorLine2?: string;
  type?: 'specialization' | 'academic' | 'achievement' | 'skills' | 'github' | 'internship';
  highlight?: boolean;
}

export interface ProjectItem {
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  overview?: string;
  capabilities?: string[];
  architecture?: string;
  githubUrl: string;
  liveUrl?: string;
  githubLabel?: string;
  liveLabel?: string;
  tech: string[];
  metrics: Metric[];
  type?: 'solo' | 'team';
  teamProject?: boolean;
  role?: string;
  contribution?: string;
}

export interface SkillCategory {
  number: string;
  name: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  year?: string;
  title: string;
  organization: string;
  location?: string;
  status?: string;
  description?: string;
  type: 'experience' | 'education' | 'achievement' | 'certification' | 'internship';
}

export interface CertificationItem {
  name: string;
  issuer: string;
  certificateUrl: string;
  date?: string;
}

export interface SocialLink {
  label: string;
  value: string;
  url: string;
}

export const portfolioData = {
  personal: {
    name: 'Abhay Pratap Singh',
    monogram: 'ABHAY.',
    signature: 'Abhay Pratap Singh',
    role: 'AI / ML ENGINEER · DATA SCIENTIST · DATA ANALYST',
    roleTitles: ['AI / ML ENGINEER', 'DATA SCIENTIST', 'DATA ANALYST'],
    coreTechnologies: [
      'PYTHON',
      'SQL',
      'MACHINE LEARNING',
      'GENERATIVE AI',
      'LLMS',
      'DATA ANALYTICS',
    ],
    roleSubtitles: [
      'PYTHON',
      'SQL',
      'MACHINE LEARNING',
      'GENERATIVE AI',
      'LLMS',
      'DATA ANALYTICS',
    ],
    location: 'Bareilly, Uttar Pradesh, India',
    currentRole: 'DATA SCIENCE / AI-ML INTERN · TECHIGURU',
    availabilityStatus: 'OPEN TO AI / DATA SCIENCE OPPORTUNITIES',
    tagline: 'Building intelligent, scalable, and real-world AI solutions.',
    heroDescription:
      'Specializing in Machine Learning, Generative AI, Large Language Models, and Data Analytics to engineer robust, high-performance systems.',
    heroHeadline: {
      line1: 'I BUILD',
      line2: 'INTELLIGENT',
      line3: 'AI SYSTEMS',
    },
    heroStatement: {
      line1: 'CODE IS MY CRAFT.',
      line2: 'IMPACT IS MY GOAL.',
    },
  },

  about: {
    eyebrow: '01 / ABOUT ME',
    headline: {
      line1: 'ENGINEERED FOR INTELLIGENCE.',
      line2: 'DRIVEN BY REAL-WORLD IMPACT.',
    },
    tagline: 'AI Engineer & Data Scientist',
    summary:
      'AI Engineer and Data Scientist combining analytical rigor with modern AI engineering. I specialize in designing scalable architectures, developing data products, and applying generative AI to solve complex technical challenges.',
    passion:
      'I enjoy transforming unstructured datasets into clear analytical intelligence and architecting reliable autonomous agent workflows. My work spans predictive modeling, RAG pipelines, and full-stack integration.',
    philosophy:
      'I believe in continuous learning, writing clean and scalable code, and building practical technology that creates meaningful impact. Whether developing AI systems, analyzing complex datasets, or designing robust architectures, I focus on delivering high-quality solutions.',
    location: 'Bareilly, Uttar Pradesh, India',
    professionalSignals: [
      {
        index: '01',
        value: 'AI / ML / DA',
        label: 'CORE SPECIALIZATION',
        type: 'specialization',
      },
      {
        index: '02',
        value: '3RD',
        label: 'HACKBHOOMI 2025',
        highlight: true,
        type: 'achievement',
      },
      {
        index: '03',
        value: 'AI / ML',
        label: 'INTERN',
        type: 'internship',
      },
      {
        index: '04',
        value: '2027',
        label: 'B.TECH · ARTIFICIAL INTELLIGENCE',
        highlight: true,
        type: 'academic',
      },
    ] as ProfessionalSignal[],
    metrics: [
      { value: 'AI / ML / DA', label: 'CORE SPECIALIZATION' },
      { value: '3RD', label: 'HACKBHOOMI 2025' },
      { value: 'AI / ML', label: 'INTERN' },
      { value: '2027', label: 'B.TECH · ARTIFICIAL INTELLIGENCE' },
    ],
  },

  skills: {
    eyebrow: '03 / TECH MATRIX',
    headline: {
      line1: 'VERIFIED SKILLS.',
      line2: 'PRECISION APPLIED.',
    },
    categories: [
      {
        number: '01',
        name: 'PROGRAMMING',
        items: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'SQL'],
      },
      {
        number: '02',
        name: 'AI / MACHINE LEARNING',
        items: [
          'Machine Learning',
          'Deep Learning',
          'Generative AI',
          'LLMs',
          'NLP',
          'RAG',
          'AI Agents',
          'Multi-Agent Systems',
          'Prompt Engineering',
          'Anomaly Detection',
        ],
      },
      {
        number: '03',
        name: 'DATA SCIENCE',
        items: [
          'Pandas',
          'NumPy',
          'Scikit-learn',
          'Data Analysis',
          'Data Visualization',
          'Statistical Analysis',
        ],
      },
      {
        number: '04',
        name: 'DEVELOPMENT',
        items: [
          'FastAPI',
          'REST APIs',
          'Streamlit',
          'MongoDB',
          'PostgreSQL',
          'React',
          'Tailwind CSS',
        ],
      },
      {
        number: '05',
        name: 'DATA / BI',
        items: [
          'Power BI',
          'Tableau',
          'Microsoft Excel',
          'Pandas',
          'NumPy',
          'Matplotlib',
          'Seaborn',
          'Plotly',
        ],
      },
      {
        number: '06',
        name: 'DEVELOPER TOOLS',
        items: [
          'Git',
          'GitHub',
          'Docker',
          'VS Code',
          'Antigravity',
          'Jupyter Notebook',
          'Google Colab',
          'Vite',
          'Postman',
        ],
      },
      {
        number: '07',
        name: 'DESIGN & CONTENT',
        items: [
          'Canva',
          'Graphic Designing',
          'Social Media Post Design',
          'Poster Design',
          'Presentation Design',
          'Visual Content Creation',
          'UI Visual Design',
          'Brand / Social Media Creatives',
        ],
      },
    ] as SkillCategory[],
  },

  projects: {
    eyebrow: '03 / PROJECTS',
    headline: {
      line1: 'SELECTED PROJECTS.',
      line2: 'ENGINEERED SYSTEMS. REAL-WORLD BUILDS.',
    },
    subtitle:
      'AI systems, intelligent applications, data products, and full-stack solutions built through individual and collaborative engineering work.',
    items: [
      {
        number: '01',
        title: 'Trust-Based A2A Multi-Agent Collaboration Platform',
        category: 'AI AGENTS / MULTI-AGENT ARCHITECTURE',
        description:
          'Production-ready multi-agent collaboration platform built with FastAPI, React 19, PostgreSQL, Docker, and Google Gemini. Enables secure task execution through independent verification, escrow settlement, and reputation modeling.',
        overview:
          'A decentralized multi-agent collaboration platform where independent autonomous agents communicate via REST APIs to execute, independently verify, and financially settle tasks in a zero-trust environment.',
        capabilities: [
          'Autonomous Agent-to-Agent (A2A) task negotiation & execution',
          'Independent Verifier Agent validation pipeline',
          'Escrow payment mechanism with automated funds release',
          'Reputation & trust scoring model for participating agents',
          'Real-time analytics dashboard with activity timelines & reports',
        ],
        architecture:
          'Client Agent (8000) -> Worker Agent (8001) -> Verifier Agent (8002) -> Escrow Service (8003) -> PostgreSQL (5432) + React Dashboard (4173)',
        githubUrl: 'https://github.com/Abhay-Thakur-18/trust-a2a-project-v2',
        githubLabel: 'VIEW ON GITHUB',
        liveUrl: 'https://trust-a2a-project-v2-rgwt.vercel.app/',
        liveLabel: 'VIEW LIVE',
        tech: [
          'React 19',
          'Vite',
          'FastAPI',
          'PostgreSQL',
          'SQLAlchemy',
          'Pydantic',
          'Google Gemini',
          'Docker',
          'Tailwind CSS',
          'Recharts',
        ],
        metrics: [
          { label: 'PARADIGM', value: 'Multi-Agent A2A' },
          { label: 'SECURITY', value: 'Escrow & Trust' },
          { label: 'DEPLOYMENT', value: 'Live on Vercel' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative Multi-Agent Architecture Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '02',
        title: 'AI Voice To Text',
        category: 'AI / SPEECH PROCESSING / NLP',
        description:
          'Speech-to-text transcription and sentiment analysis web application powered by OpenAI Whisper and Hugging Face Transformers for real-time audio transcription and emotional mood classification.',
        overview:
          'An AI-powered speech processing pipeline that accepts voice and audio uploads, transcribes spoken content using OpenAI Whisper (tiny), and performs sentiment polarity scoring to classify emotional mood.',
        capabilities: [
          'Automatic Speech Recognition (ASR) audio transcription',
          'Real-time sentiment analysis and mood classification',
          'Support for direct audio file upload and processing',
          'JSON REST endpoint (/analyze) with CORS support',
          'Live hosted deployment on Hugging Face Spaces',
        ],
        architecture:
          'Audio Upload -> Flask Backend -> OpenAI Whisper ASR -> Hugging Face Sentiment Analysis Pipeline -> JSON Response / Web UI',
        githubUrl: 'https://huggingface.co/spaces/abhaythakurai/AI_Voice_To_Text',
        githubLabel: 'VIEW ON HUGGING FACE',
        liveUrl: 'https://abhaythakurai-ai-voice-to-text.hf.space',
        liveLabel: 'VIEW LIVE',
        tech: [
          'Python',
          'Flask',
          'OpenAI Whisper',
          'Hugging Face Transformers',
          'Sentiment Analysis',
          'HTML/CSS',
        ],
        metrics: [
          { label: 'ASR MODEL', value: 'OpenAI Whisper' },
          { label: 'NLP PIPELINE', value: 'Sentiment Analysis' },
          { label: 'HOSTING', value: 'Hugging Face Spaces' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative AI / Speech Processing Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '03',
        title: 'SMS Spam Detector',
        category: 'MACHINE LEARNING / NLP',
        description:
          'Machine learning SMS classification application using NLTK text preprocessing, PorterStemmer, TF-IDF vectorization, and Scikit-learn predictive models in a Streamlit interface.',
        overview:
          'An end-to-end NLP classification system that preprocesses incoming SMS messages through tokenization, stopword removal, and stemming before classifying text as spam or ham using a trained machine learning model.',
        capabilities: [
          'Text normalization, lowercasing, and punctuation stripping',
          'NLTK tokenization, English stopword removal, and Porter Stemming',
          'TF-IDF feature extraction vectorizer pipeline',
          'Trained Scikit-learn classification model (model.pkl)',
          'Interactive Streamlit web application interface',
        ],
        architecture:
          'SMS Input -> NLTK Tokenization & Stemming -> TF-IDF Vectorizer -> ML Classification Model -> Streamlit UI',
        githubUrl: 'https://github.com/Abhay-Thakur-18/-SMS-Spam-Detector-Machine-Learning-Project-',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Python',
          'Scikit-learn',
          'NLTK',
          'TF-IDF Vectorizer',
          'PorterStemmer',
          'Streamlit',
        ],
        metrics: [
          { label: 'VECTORIZER', value: 'TF-IDF' },
          { label: 'PREPROCESSING', value: 'NLTK Tokenizer' },
          { label: 'INTERFACE', value: 'Streamlit' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative ML / NLP Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '04',
        title: 'Nova Sphere AI',
        category: 'AI / DISASTER MANAGEMENT / PUBLIC SAFETY',
        description:
          'AI-driven disaster management platform focused on public safety, emergency preparedness, real-time alerts, multilingual communication, and modular containerized services.',
        overview:
          'A disaster preparedness platform engineered to bridge communication and response gaps during emergencies with AI assistance, real-time alert coordination, and structured backend services.',
        capabilities: [
          'AI-driven disaster assistance and public safety guidance',
          'Real-time emergency alert and coordination architecture',
          'Multilingual text and voice communication support',
          'Relational data persistence with Flask-SQLAlchemy',
          'Containerized deployment configuration via Docker & Docker Compose',
        ],
        architecture:
          'Modular Web App -> Flask REST Services -> SQLAlchemy ORM -> SQLite/PostgreSQL Database -> Docker Environment',
        githubUrl: 'https://github.com/abhirajsingh524/nova_sphere',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Python',
          'Flask',
          'Flask-SQLAlchemy',
          'python-dotenv',
          'Docker',
          'REST API',
        ],
        metrics: [
          { label: 'DOMAIN', value: 'Disaster Safety' },
          { label: 'BACKEND', value: 'Flask & SQLAlchemy' },
          { label: 'DEPLOYMENT', value: 'Dockerized' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative AI / Disaster Management Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '05',
        title: 'Smart Learning Management System',
        category: 'EDTECH / FULL STACK / LEARNING PLATFORM',
        description:
          'Full-stack educational platform (NeuroLearnX) featuring Node.js Express REST services, Python FastAPI analytics microservice, MongoDB persistence, and role-based student/admin portals.',
        overview:
          'A comprehensive learning management system combining a Node.js Express web application with a dedicated Python FastAPI analytics microservice and MongoDB for managing courses, users, and educational workflows.',
        capabilities: [
          'Role-based authentication & authorization (Student and Admin portals)',
          'Course management, progress tracking, and student analytics',
          'Dual architecture: Node.js Express web server + FastAPI analytics microservice',
          'MongoDB & Mongoose document persistence with automated admin seeding',
          'Docker Compose multi-container orchestration (Nginx, Node, Python, MongoDB)',
        ],
        architecture:
          'Nginx Reverse Proxy -> Node.js Express App (5000) + FastAPI Analytics Service (8000) -> MongoDB (27017)',
        githubUrl: 'https://github.com/abhirajsingh524/Smart_learning_management_system',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Node.js',
          'Express',
          'FastAPI',
          'Python',
          'MongoDB',
          'Mongoose',
          'Docker Compose',
        ],
        metrics: [
          { label: 'SYSTEM', value: 'NeuroLearnX LMS' },
          { label: 'ARCHITECTURE', value: 'Node.js + FastAPI' },
          { label: 'DATABASE', value: 'MongoDB & Mongoose' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative Full-Stack EdTech Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '06',
        title: 'Multilingual Speech Translation Assistant',
        category: 'NLP / SPEECH AI / MACHINE TRANSLATION',
        description:
          'Cross-language speech translation pipeline leveraging OpenAI Whisper for speech-to-text transcription and Seq2Seq Transformer models for neural machine translation across global languages.',
        overview:
          'A speech processing and neural machine translation system that takes audio input (.wav, .mp3), transcribes spoken dialogue using OpenAI Whisper ASR, and translates the text using Hugging Face Transformer models.',
        capabilities: [
          'Automatic Speech Recognition (ASR) via OpenAI Whisper',
          'Multilingual neural machine translation with Transformer Seq2Seq models',
          'Support for multiple audio formats (.wav, .mp3) and global language pairs',
          'Modular architecture with Flask routing and custom translation services',
          'Scalable WSGI deployment configuration with Gunicorn',
        ],
        architecture:
          'Audio Input (.wav/.mp3) -> Whisper ASR -> Transcribed Text -> Transformer Translation Model -> Translated Text -> Flask UI',
        githubUrl: 'https://github.com/Omjaiswal-creator/Multilingual-Speech-Translation-Assistant',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Python',
          'PyTorch',
          'OpenAI Whisper',
          'Hugging Face Transformers',
          'Flask',
          'NumPy',
        ],
        metrics: [
          { label: 'SPEECH ASR', value: 'OpenAI Whisper' },
          { label: 'TRANSLATION', value: 'Seq2Seq Transformers' },
          { label: 'BACKEND', value: 'Flask & PyTorch' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative NLP / Speech AI Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '07',
        title: 'Data Analysis & Visualization using Python',
        category: 'DATA ANALYTICS / DATA VISUALIZATION',
        description:
          'Exploratory data analytics and visualization of global COVID-19 metrics using Python, Pandas, Seaborn, and Plotly to analyze infection trends, recovery rates, and regional distributions.',
        overview:
          'A comprehensive data analysis project examining global pandemic datasets. Involves systematic data cleaning, statistical analysis of confirmed/active/recovered cases, regional WHO breakdowns, and multi-variable correlations.',
        capabilities: [
          'Dataset cleaning, null handling, and metric feature engineering',
          'Country-level aggregation for confirmed, recovered, and active caseloads',
          'Death and recovery rate calculations across global health regions',
          'WHO regional distribution comparisons and correlation matrix analysis',
          'Interactive and publication-quality charts using Matplotlib, Seaborn, and Plotly',
        ],
        architecture:
          'Raw Pandemic Dataset -> Pandas Data Cleaning & Aggregation -> Statistical Computation -> Seaborn / Plotly Visualizations',
        githubUrl: 'https://github.com/Abhay-Thakur-18/Data-Analysis-Visualization-using-Python',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Python',
          'Pandas',
          'Matplotlib',
          'Seaborn',
          'Plotly',
          'Jupyter Notebook',
        ],
        metrics: [
          { label: 'ANALYSIS', value: 'Exploratory Data Analysis' },
          { label: 'VISUALIZATION', value: 'Seaborn & Plotly' },
          { label: 'SCOPE', value: 'Global COVID-19 Metrics' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative Data Analytics Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '08',
        title: 'AI Resume Screening & Skill Extraction',
        category: 'AI / NLP / RECRUITMENT AUTOMATION',
        description:
          'Automated candidate screening platform that parses resumes across multiple formats, extracts technical and soft skills with spaCy NER, and ranks candidates using TF-IDF and cosine similarity.',
        overview:
          'A high-precision recruitment automation system that processes candidate resumes (PDF, DOCX, TXT), performs Named Entity Recognition with spaCy to extract skills and credentials, and computes ranking scores against job descriptions.',
        capabilities: [
          'Multi-format resume parsing (PDF, DOCX, TXT) with structure preservation',
          'Named Entity Recognition (NER) for technical skills, soft skills, and education',
          'Hybrid candidate ranking algorithm via TF-IDF vectorization and cosine similarity',
          'Keyword weighting and skill gap analysis against target job descriptions',
          'Streamlit interactive analytics dashboard with candidate comparison and CSV export',
        ],
        architecture:
          'Resume Files (PDF/DOCX/TXT) -> spaCy NER & NLTK -> TF-IDF Vectorizer -> Cosine Similarity Scorer -> Streamlit UI',
        githubUrl: 'https://github.com/Abhishek-Maheshwari-778/Resume-Screening-Skill-Extraction-Ai',
        githubLabel: 'VIEW ON GITHUB',
        liveUrl: 'https://resume-screening-skill-extraction-a.vercel.app/',
        liveLabel: 'VIEW LIVE',
        tech: [
          'Python',
          'spaCy',
          'NLTK',
          'Scikit-learn',
          'TF-IDF',
          'Streamlit',
          'pypdf',
          'Pandas',
        ],
        metrics: [
          { label: 'NLP PARSER', value: 'spaCy NER & NLTK' },
          { label: 'RANKING', value: 'TF-IDF & Cosine' },
          { label: 'DEPLOYMENT', value: 'Live on Vercel' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative AI / NLP Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '09',
        title: 'Apna Hisab',
        subtitle: 'Har Paise Ka Hisab',
        category: 'FINTECH / PERSONAL FINANCE / MOBILE APPLICATION',
        description:
          'Android-first personal finance mobile application for income tracking, expense categorization, and pending Khata (ledger) management built with React Native Expo and FastAPI.',
        overview:
          'A mobile-first personal money management application designed to make daily income, expense tracking, and Khata ledger settlements quick, intuitive, and reliable with minimal typing.',
        capabilities: [
          'Mobile-first expense, income, and transaction recording',
          'Pending Khata ledger tracking for personal and business credits/debits',
          'React Native Expo frontend with TypeScript and Zustand state management',
          'FastAPI backend service with transaction APIs, business logic, and test suites',
          'MongoDB Atlas persistence with JWT authentication and financial reporting',
        ],
        architecture:
          'React Native Expo Mobile Client -> Zustand State -> FastAPI REST API -> MongoDB Atlas',
        githubUrl: 'https://github.com/Abhay-Thakur-18/Apna-Hisab',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'React Native',
          'Expo',
          'TypeScript',
          'Zustand',
          'FastAPI',
          'Python',
          'MongoDB Atlas',
        ],
        metrics: [
          { label: 'PLATFORM', value: 'React Native (Expo)' },
          { label: 'STATE', value: 'Zustand Store' },
          { label: 'BACKEND', value: 'FastAPI & MongoDB' },
        ],
        type: 'team',
        teamProject: true,
        role: 'Collaborative Mobile / FinTech Project',
        contribution: 'Collaborative project developed with a team.',
      },
      {
        number: '10',
        title: 'AI English to Hindi Translator',
        category: 'NLP / LANGUAGE TRANSLATION',
        description:
          'AI-powered English to Hindi Translator Web Application that instantly converts English text into Hindi using advanced Natural Language Processing models.',
        overview:
          'A responsive NLP web application offering accurate translation from English to Hindi with minimal latency, supporting sentence translation and formatted text preservation.',
        capabilities: [
          'Instant English to Hindi translation',
          'Clean web interface with real-time conversion',
          'Modular Python translation pipeline backend',
        ],
        architecture:
          'Web Interface -> Translation API Endpoint -> NLP Transformer Pipeline -> Hindi Text Response',
        githubUrl: 'https://github.com/Abhay-Thakur-18/ai_translator_webapp',
        githubLabel: 'VIEW ON GITHUB',
        tech: [
          'Python',
          'NLP Models',
          'Translation Pipeline',
          'Web App',
        ],
        metrics: [
          { label: 'NLP TASK', value: 'Translation' },
          { label: 'LANGUAGES', value: 'EN -> HI' },
          { label: 'FRAMEWORK', value: 'Python' },
        ],
        type: 'solo',
        teamProject: false,
      },
    ] as ProjectItem[],
  },

  experience: {
    eyebrow: '04 / JOURNEY & CREDENTIALS',
    headline: {
      line1: 'EXPERIENCE &',
      line2: 'ACADEMIC MILESTONES.',
    },
    currentRole: {
      company: 'Techiguru',
      role: 'Data Science / AI-ML Intern',
      duration: 'April 2026 – Present',
      location: 'Bareilly',
      description:
        'Impactful internship focused on enhancing practical skills in Data Science and AI/ML.',
    },
    education: {
      institution: 'Invertis University',
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Artificial Intelligence',
      duration: 'August 2023 – July 2027',
    },
    achievement: {
      title: 'HackBhoomi 2025 — 3rd Place',
      subtitle: 'Internal Smart India Hackathon',
      description:
        'Awarded 3rd place in HackBhoomi 2025 (Internal Smart India Hackathon) for building an innovative AI-powered solution.',
    },
    certifications: [
      {
        name: 'AI Tools Workshop',
        issuer: 'be10x',
        certificateUrl: '/certificates/be10x.png',
        date: 'August 2025',
      },
      {
        name: 'Getting Started with Artificial Intelligence',
        issuer: 'IBM SkillsBuild',
        certificateUrl: '/certificates/IBMai.png',
        date: 'February 2026',
      },
      {
        name: 'Data Science Master Virtual Internship',
        issuer: 'EduSkills & Altair',
        certificateUrl: '/certificates/eduskillsDataSciende.png',
        date: 'January – March 2026',
      },
      {
        name: 'SQL and Relational Databases 101',
        issuer: 'IBM & Cognitive Class',
        certificateUrl: '/certificates/IBMSQL.png',
        date: 'February 2025',
      },
      {
        name: 'Python 101 for Data Science',
        issuer: 'IBM & Cognitive Class',
        certificateUrl: '/certificates/IBMDS.png',
        date: 'February 2025',
      },
      {
        name: 'Data Science / AI-ML Internship',
        issuer: 'Techiguru',
        certificateUrl: '/certificates/AI-ML Internship.png',
        date: 'August 2026',
      },
      {
        name: 'AI-ML Virtual Internship',
        issuer: 'Google for Developers & EduSkills',
        certificateUrl: '/certificates/eduskillsAI-ML.png',
        date: 'October – December 2025',
      },
      {
        name: 'Generative AI for All',
        issuer: 'Physics Wallah & Microsoft',
        certificateUrl: '/certificates/pw.png',
        date: 'January 2026',
      },
      {
        name: 'AI Skills Passport',
        issuer: 'EY & Microsoft',
        certificateUrl: '/certificates/Microsoft.png',
        date: 'Verified Program',
      },
      {
        name: 'Prompt Engineering Applications',
        issuer: 'Simplilearn SkillUp',
        certificateUrl: '/certificates/SimplilearnPromptEng.png',
        date: 'July 2025',
      },
      {
        name: 'Get Started with Databricks for Machine Learning',
        issuer: 'Databricks & Simplilearn',
        certificateUrl: '/certificates/simplilearnML.png',
        date: 'July 2025',
      },
      {
        name: 'GenAI Powered Data Analytics Job Simulation',
        issuer: 'Tata & Forage',
        certificateUrl: '/certificates/tataDA.png',
        date: 'July 2025',
      },
      {
        name: 'Power BI Complete Course',
        issuer: 'Skill Course',
        certificateUrl: '/certificates/powerbi.png',
        date: 'July 2025',
      },
      {
        name: 'Introduction to Artificial Intelligence',
        issuer: 'Great Learning Academy',
        certificateUrl: '/certificates/GreatLearning AI.png',
        date: 'August 2024',
      },
      {
        name: 'HackBhoomi 2025 — 3rd Place',
        issuer: 'Smart India Hackathon & Invertis University',
        certificateUrl: '/certificates/hackbhoomi.png',
        date: 'SIH 2025',
      },
      {
        name: 'IEEE Xplore Training',
        issuer: 'IEEE & EBSCO',
        certificateUrl: '/certificates/IEEE.png',
        date: 'February 2025',
      },
      {
        name: 'Internship Common Aptitude Test',
        issuer: 'ICAT',
        certificateUrl: '/certificates/icat.png',
        date: 'July 2025',
      },
      {
        name: 'Robo Rumble (3rd Place) — Invertia 2024',
        issuer: 'Invertis University',
        certificateUrl: '/certificates/robo.png',
        date: 'Invertia 2024',
      },
    ] as CertificationItem[],
    timeline: [
      {
        id: '01',
        year: 'APRIL 2026 — PRESENT',
        title: 'DATA SCIENCE / AI-ML INTERN',
        organization: 'TECHIGURU · BAREILLY',
        status: 'CURRENT',
        type: 'experience',
        description:
          'Impactful internship focused on enhancing practical skills in Data Science and AI/ML.',
      },
      {
        id: '02',
        title: 'DATA SCIENCE MASTER VIRTUAL INTERNSHIP',
        organization: 'EDUSKILLS · ALTAIR',
        status: 'VIRTUAL INTERNSHIP',
        type: 'internship',
      },
      {
        id: '03',
        title: 'AI-ML VIRTUAL INTERNSHIP',
        organization: 'EDUSKILLS · GOOGLE FOR DEVELOPERS',
        status: 'VIRTUAL INTERNSHIP',
        type: 'internship',
      },
      {
        id: '04',
        title: 'HACKBHOOMI 2025 — 3RD PLACE',
        organization: 'SMART INDIA HACKATHON · INVERTIS UNIVERSITY',
        status: 'ACHIEVEMENT',
        type: 'achievement',
        description:
          'Awarded 3rd place in HackBhoomi 2025 (Internal Smart India Hackathon) for building an innovative AI-powered solution.',
      },
      {
        id: '05',
        year: '2023 — 2027',
        title: 'B.TECH IN ARTIFICIAL INTELLIGENCE',
        organization: 'INVERTIS UNIVERSITY',
        status: 'IN PROGRESS',
        type: 'education',
        description:
          'Undergraduate degree program specializing in Artificial Intelligence, Machine Learning algorithms, and computer science foundations.',
      },
    ] as ExperienceItem[],
  },

  contact: {
    eyebrow: '05 / CONTACT',
    headline: {
      line1: "LET'S BUILD",
      line2: 'SOMETHING',
      line3: 'INTELLIGENT.',
    },
    description:
      "Have a project, opportunity, or idea in mind? Send me a message and I'll get back to you.",
    email: 'iabhay.thakur18@gmail.com',
    github: 'https://github.com/Abhay-Thakur-18',
    linkedin: 'https://www.linkedin.com/in/abhay-pratap-singh-engineer/',
    location: 'Bareilly, Uttar Pradesh, India',
    socialLinks: [
      {
        label: 'EMAIL',
        value: 'iabhay.thakur18@gmail.com',
        url: 'mailto:iabhay.thakur18@gmail.com',
      },
      {
        label: 'LINKEDIN',
        value: 'abhay-pratap-singh-engineer',
        url: 'https://www.linkedin.com/in/abhay-pratap-singh-engineer/',
      },
      {
        label: 'GITHUB',
        value: 'Abhay-Thakur-18',
        url: 'https://github.com/Abhay-Thakur-18',
      },
      {
        label: 'LOCATION',
        value: 'Bareilly, UP, India',
        url: '#',
      },
    ] as SocialLink[],
  },

  navigation: [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ],
};
