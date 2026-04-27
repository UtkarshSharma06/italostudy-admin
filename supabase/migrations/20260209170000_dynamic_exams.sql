-- Migration: dynamic_exams
-- Description: Creates the central exams table to store dynamic configurations.

-- Handle existing table smoothly
DO $$ 
BEGIN
    -- Rename code to slug if code exists and slug doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='code') AND 
       NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='slug') THEN
        ALTER TABLE public.exams RENAME COLUMN code TO slug;
    END IF;

    -- Create table if it doesn't exist
    CREATE TABLE IF NOT EXISTS public.exams (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        duration_minutes INTEGER NOT NULL DEFAULT 60,
        total_questions INTEGER NOT NULL DEFAULT 50,
        proctored BOOLEAN DEFAULT true,
        scoring JSONB NOT NULL DEFAULT '{"correct": 1, "incorrect": 0, "skipped": 0}',
        sections JSONB NOT NULL DEFAULT '[]',
        syllabus JSONB NOT NULL DEFAULT '{}',
        is_live BOOLEAN DEFAULT true,
        is_soon BOOLEAN DEFAULT false,
        bg_gradient TEXT DEFAULT 'from-indigo-600 to-blue-600',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Add missing columns if table already existed
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='duration_minutes') THEN
        ALTER TABLE public.exams ADD COLUMN duration_minutes INTEGER NOT NULL DEFAULT 60;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='total_questions') THEN
        ALTER TABLE public.exams ADD COLUMN total_questions INTEGER NOT NULL DEFAULT 50;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='proctored') THEN
        ALTER TABLE public.exams ADD COLUMN proctored BOOLEAN DEFAULT true;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='scoring') THEN
        ALTER TABLE public.exams ADD COLUMN scoring JSONB NOT NULL DEFAULT '{"correct": 1, "incorrect": 0, "skipped": 0}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='sections') THEN
        ALTER TABLE public.exams ADD COLUMN sections JSONB NOT NULL DEFAULT '[]';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='syllabus') THEN
        ALTER TABLE public.exams ADD COLUMN syllabus JSONB NOT NULL DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='is_live') THEN
        ALTER TABLE public.exams ADD COLUMN is_live BOOLEAN DEFAULT true;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='is_soon') THEN
        ALTER TABLE public.exams ADD COLUMN is_soon BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='bg_gradient') THEN
        ALTER TABLE public.exams ADD COLUMN bg_gradient TEXT DEFAULT 'from-indigo-600 to-blue-600';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='exams' AND column_name='updated_at') THEN
        ALTER TABLE public.exams ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exams' AND policyname = 'Allow public read access to exams') THEN
        CREATE POLICY "Allow public read access to exams" ON public.exams FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exams' AND policyname = 'Allow authenticated full access to exams') THEN
        CREATE POLICY "Allow authenticated full access to exams" ON public.exams FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Seed Data (Migrated from Hardcoded EXAMS)
INSERT INTO public.exams (slug, name, duration_minutes, total_questions, proctored, scoring, sections, syllabus, is_live, bg_gradient)
VALUES 
(
    'cent-s-prep', 
    'CENT-S Entrance Exam', 
    110, 
    55, 
    true, 
    '{"correct": 1, "incorrect": -0.25, "skipped": 0}',
    '[
        {"id": "maths", "name": "Mathematics", "questionCount": 15, "durationMinutes": 30, "icon": "🔢", "color": "blue"},
        {"id": "reasoning", "name": "Reasoning on texts and data", "questionCount": 15, "durationMinutes": 30, "icon": "💡", "color": "purple"},
        {"id": "biology", "name": "Biology", "questionCount": 10, "durationMinutes": 20, "icon": "🧬", "color": "green"},
        {"id": "chemistry", "name": "Chemistry", "questionCount": 10, "durationMinutes": 20, "icon": "🧪", "color": "orange"},
        {"id": "physics", "name": "Physics", "questionCount": 5, "durationMinutes": 10, "icon": "⚡", "color": "red"}
    ]',
    '{
        "Reasoning on texts and data": [
            {"id": "logic_deduction", "name": "Logic and deductive reasoning", "subtopics": ["Connectives", "Quantifiers", "Compatibility/Equivalence", "Negation", "Necessary/Sufficient conditions"]},
            {"id": "data_interpretation", "name": "Interpretation and manipulation of data", "subtopics": ["Language conversion", "Numerical extraction", "Data sorting", "Process recognition"]},
            {"id": "problem_solving", "name": "Problem solving", "subtopics": ["Algebraic modelling", "Result estimation", "Ratio/Proportionality", "Mean estimation"]}
        ],
        "Mathematics": [
            {"id": "math_numbers", "name": "Numbers", "subtopics": ["Factorisation", "Remainders", "Powers & Roots", "Percentage change"]},
            {"id": "math_algebra", "name": "Algebra", "subtopics": ["Literal expressions", "Polynomial roots", "Equations & Inequalities", "Linear systems"]},
            {"id": "math_geometry", "name": "Geometry", "subtopics": ["Plane & Space figures", "Similar figures", "Cartesian coordinates", "Lines & Circles"]},
            {"id": "math_functions", "name": "Functions", "subtopics": ["Composition & Inverses", "Transformations", "Elementary functions", "Power/Polynomial functions"]},
            {"id": "math_explog", "name": "Exponential and logarithms", "subtopics": ["Logarithm properties", "Exponential equations", "Logarithmic inequalities"]},
            {"id": "math_prob", "name": "Combinatorics and probability", "subtopics": ["Combinations", "Permutations", "Event probability", "Disjoint/Independent events"]},
            {"id": "math_stats", "name": "Basic Statistics", "subtopics": ["Representation", "Frequencies", "Central tendency (Mean, Median, Mode)"]}
        ],
        "Biology": [
            {"id": "bio_molecules", "name": "Biological molecules", "subtopics": ["Properties of water", "Carbohydrates & Lipids", "Proteins & Nucleic acids"]},
            {"id": "bio_cell", "name": "Cell biology", "subtopics": ["Organelles", "Endomembrane system", "Plant vs Animal cell", "Cell wall & Chloroplasts"]},
            {"id": "bio_inheritance", "name": "Cell cycle, division, inheritance", "subtopics": ["Genome structure", "Replication/Transcription/Translation", "Mitosis & Meiosis", "Mendelian inheritance"]},
            {"id": "bio_plant_ecology", "name": "Plant biology and ecology", "subtopics": ["Plant anatomy", "Energy flows", "Food chains", "Biotic interactions"]},
            {"id": "bio_animal", "name": "Animal anatomy and physiology", "subtopics": ["Tissues", "Musculoskeletal apparatus", "Body systems (Digestive, Respiratory, etc.)"]}
        ],
        "Chemistry": [
            {"id": "chem_macro", "name": "Macroscopic Properties of Matter", "subtopics": ["Physical/Chemical changes", "Separation methods", "Fundamental laws"]},
            {"id": "chem_micro", "name": "Microscopic Properties of Matter", "subtopics": ["Atomic structure", "Lewis structures", "VSEPR theory", "Intermolecular forces"]},
            {"id": "chem_periodic", "name": "Periodic Trends", "subtopics": ["Groups & Periods", "Quantum numbers", "Isotopes", "Periodic properties"]},
            {"id": "chem_reactions", "name": "Chemical Reactions & Stoichiometry", "subtopics": ["Balancing equations", "Mole concept", "Limiting reactant", "Concentration units"]},
            {"id": "chem_thermo_kinetics", "name": "Thermodynamics and Kinetics", "subtopics": ["Gas laws", "Entropy & Enthalpy", "Equilibrium constant", "Reaction rate"]},
            {"id": "chem_nomenclature", "name": "Compounds and Solutions", "subtopics": ["IUPAC/Traditional nomenclature", "Solubility", "Metal properties"]},
            {"id": "chem_acids_bases", "name": "Acids and Bases", "subtopics": ["pH indicators", "Salt formation", "Neutralisation", "Buffers"]},
            {"id": "chem_redox", "name": "Oxidation and Reduction", "subtopics": ["Oxidation numbers", "Oxidants/Reductants", "Redox balancing"]},
            {"id": "chem_organic", "name": "Organic Chemistry", "subtopics": ["Carbon hybridisation", "Isomerism", "Functional groups", "Combustion"]},
            {"id": "chem_applied", "name": "Applied Chemistry", "subtopics": ["Experimental uncertainties", "Label reading", "Environmental issues"]}
        ],
        "Physics": [
            {"id": "phys_measurement", "name": "Physical quantities and measurement", "subtopics": ["SI units", "Vector calculus", "Scientific notation", "Functional models"]},
            {"id": "phys_kinematics", "name": "Point particle kinematics", "subtopics": ["Velocity & Acceleration", "Uniform motion", "Falling motion", "Circular motion"]},
            {"id": "phys_dynamics", "name": "Point particle dynamics, energy and work", "subtopics": ["Second Law", "Mechanical energy", "Conservation principles", "Work & Power"]},
            {"id": "phys_fluids_thermo", "name": "Fluid mechanics and thermodynamics", "subtopics": ["Hydrostatics (Pascal/Archimedes)", "Bernoulli principle", "Ideal gas laws", "Laws of thermodynamics"]},
            {"id": "phys_electro", "name": "Electromagnetism principles", "subtopics": ["Coulomb law", "Electric field", "Ohm laws", "Waves (Light & Sound)"]}
        ]
    }',
    true,
    'from-emerald-600 to-teal-600'
),
(
    'imat-prep', 
    'IMAT (International Medical Admissions Test)', 
    100, 
    60, 
    true, 
    '{"correct": 1.5, "incorrect": -0.4, "skipped": 0}',
    '[
        {"id": "logic_gk", "name": "Logical Reasoning & General Knowledge", "questionCount": 22, "durationMinutes": 37, "icon": "💡", "color": "indigo"},
        {"id": "biology", "name": "Biology", "questionCount": 18, "durationMinutes": 30, "icon": "🧬", "color": "green"},
        {"id": "chemistry", "name": "Chemistry", "questionCount": 12, "durationMinutes": 20, "icon": "🧪", "color": "orange"},
        {"id": "physics_maths", "name": "Physics & Mathematics", "questionCount": 8, "durationMinutes": 13, "icon": "⚡", "color": "red"}
    ]',
    '{
        "Logical Reasoning & General Knowledge": [
            {"id": "logic", "name": "Logical Reasoning", "subtopics": ["Critical Thinking", "Problem Solving", "Data Analysis"]},
            {"id": "gk", "name": "Reading and General Knowledge", "subtopics": ["Current Affairs", "History", "Constitution", "Literary History"]}
        ],
        "Biology": [
            {"id": "bio_chem", "name": "Chemistry of the Living", "subtopics": ["Weak interactions", "Organic molecules", "Enzymes"]},
            {"id": "bio_cell", "name": "Cell as Basis of Life", "subtopics": ["Cell theory", "Prokaryotic vs Eukaryotic", "Membrane structure"]},
            {"id": "bio_genetics", "name": "Genetics", "subtopics": ["Mendel laws", "Molecular genetics", "DNA structure", "Mutations"]},
            {"id": "bio_physio", "name": "Anatomy & Physiology", "subtopics": ["Animal tissues", "Homeostasis", "Systems and apparatuses"]},
            {"id": "bio_energetics", "name": "Bioenergetics", "subtopics": ["ATP", "Photosynthesis", "Glycolysis", "Aerobic respiration"]}
        ],
        "Chemistry": [
            {"id": "chem_matter", "name": "Constitution of Matter", "subtopics": ["States of aggregation", "Ideal gas laws"]},
            {"id": "chem_atom", "name": "Structure of the Atom", "subtopics": ["Atomic number", "Mass number", "Electronic structure"]},
            {"id": "chem_periodic", "name": "Periodic System", "subtopics": ["Periodic properties", "Ionization potential"]},
            {"id": "chem_bond", "name": "Chemical Bond", "subtopics": ["Ionic/Covalent", "Polarity", "Electronegativity"]},
            {"id": "chem_reactions", "name": "Reactions & Stoichiometry", "subtopics": ["Atomic mass", "Mole concept", "Balancing"]},
            {"id": "chem_acids", "name": "Acids & Bases", "subtopics": ["pH concept", "Hydrolysis", "Buffers"]},
            {"id": "chem_organic", "name": "Organic Chemistry", "subtopics": ["Functional groups", "Isomerism", "Hydrocarbons"]}
        ],
        "Physics & Mathematics": [
            {"id": "phys_measurement", "name": "Measurement", "subtopics": ["Fundamental quantities", "Scientific notation"]},
            {"id": "phys_kinematics", "name": "Kinematics", "subtopics": ["Velocity", "Acceleration", "Uniform motion"]},
            {"id": "phys_dynamics", "name": "Dynamics", "subtopics": ["Inertia", "Work", "Kinetic energy", "Power"]},
            {"id": "phys_fluids", "name": "Fluid Mechanics", "subtopics": ["Pressure", "Archimedes", "Bernoulli"]},
            {"id": "phys_thermo", "name": "Thermodynamics", "subtopics": ["Temperature scales", "Laws of thermodynamics"]},
            {"id": "phys_electro", "name": "Electromagnetism", "subtopics": ["Coulomb law", "Capacitance", "Ohm law"]},
            {"id": "math_algebra", "name": "Algebra & Numbers", "subtopics": ["Rational/Real numbers", "Logarithms", "Equations"]},
            {"id": "math_functions", "name": "Functions", "subtopics": ["Graphical representation", "Exponential", "Goniometric"]},
            {"id": "math_geometry", "name": "Geometry", "subtopics": ["Polygons", "Cartesian plane", "Triangles"]},
            {"id": "math_prob", "name": "Probability & Statistics", "subtopics": ["Random events", "Frequency distributions"]}
        ]
    }',
    true,
    'from-indigo-600 to-blue-600'
),
(
    'sat-prep', 
    'SAT (Scholastic Assessment Test)', 
    180, 
    154, 
    true, 
    '{"correct": 1, "incorrect": 0, "skipped": 0}',
    '[
        {"id": "reading_writing", "name": "Reading & Writing", "questionCount": 54, "durationMinutes": 64, "icon": "📝", "color": "blue"},
        {"id": "math", "name": "Mathematics", "questionCount": 44, "durationMinutes": 70, "icon": "🔢", "color": "indigo"}
    ]',
    '{
        "Reading & Writing": [
            {"id": "craft_structure", "name": "Craft and Structure", "subtopics": ["Words in Context", "Text Structure and Purpose", "Cross-Text Connections"]},
            {"id": "information_ideas", "name": "Information and Ideas", "subtopics": ["Central Ideas and Details", "Inferences", "Command of Evidence"]},
            {"id": "standard_english", "name": "Standard English Conventions", "subtopics": ["Boundaries", "Form, Structure, and Sense"]},
            {"id": "expression_ideas", "name": "Expression of Ideas", "subtopics": ["Rhetorical Synthesis", "Transitions"]}
        ],
        "Mathematics": [
            {"id": "algebra", "name": "Algebra", "subtopics": ["Linear Equations", "Linear Functions", "Systems of Two Linear Equations"]},
            {"id": "advanced_math", "name": "Advanced Math", "subtopics": ["Equivalent Expressions", "Nonlinear Equations", "Nonlinear Functions"]},
            {"id": "problem_solving", "name": "Problem Solving and Data Analysis", "subtopics": ["Ratios, Rates, Proportions", "One-Variable Data", "Two-Variable Data"]},
            {"id": "geometry_trig", "name": "Geometry and Trigonometry", "subtopics": ["Area and Volume", "Lines, Angles, and Triangles", "Right Triangles and Trigonometry"]}
        ]
    }',
    true,
    'from-indigo-600 to-blue-600'
),
(
    'ielts-academic', 
    'IELTS Academic', 
    165, 
    40, 
    false, 
    '{"correct": 1, "incorrect": 0, "skipped": 0}',
    '[
        {"id": "listening", "name": "Listening", "questionCount": 40, "durationMinutes": 30, "icon": "🎧", "color": "purple"},
        {"id": "reading", "name": "Academic Reading", "questionCount": 40, "durationMinutes": 60, "icon": "📚", "color": "blue"},
        {"id": "writing", "name": "Academic Writing", "questionCount": 2, "durationMinutes": 60, "icon": "✍️", "color": "green"},
        {"id": "speaking", "name": "Speaking", "questionCount": 3, "durationMinutes": 15, "icon": "💬", "color": "orange"}
    ]',
    '{
        "Listening": [
            {"id": "social_context", "name": "Social Context", "subtopics": ["Conversation between two people", "Everyday social context"]},
            {"id": "monologue", "name": "Monologue", "subtopics": ["Speech on everyday topics", "Public announcements"]},
            {"id": "academic_conversation", "name": "Academic Conversation", "subtopics": ["Discussion between multiple speakers", "Educational context"]},
            {"id": "academic_monologue", "name": "Academic Monologue", "subtopics": ["Lecture or talk", "Academic subject"]}
        ],
        "Academic Reading": [
            {"id": "reading_comp", "name": "Reading Comprehension", "subtopics": ["Main ideas", "Detailed information", "Logical argument"]},
            {"id": "scanning", "name": "Scanning Skills", "subtopics": ["Specific information", "Data interpretation"]},
            {"id": "skimming", "name": "Skimming Skills", "subtopics": ["General overview", "Topic identification"]},
            {"id": "vocabulary", "name": "Vocabulary in Context", "subtopics": ["Meaning from context", "Paraphrasing", "Synonyms"]}
        ],
        "Academic Writing": [
            {"id": "task1", "name": "Task 1 - Data Description", "subtopics": ["Graphs and charts", "Tables", "Diagrams", "Processes"]},
            {"id": "task2", "name": "Task 2 - Essay Writing", "subtopics": ["Opinion essays", "Discussion essays", "Advantage/Disadvantage", "Problem/Solution"]},
            {"id": "coherence", "name": "Coherence and Cohesion", "subtopics": ["Paragraphing", "Linking words", "Referencing"]},
            {"id": "lexical", "name": "Lexical Resource", "subtopics": ["Vocabulary range", "Collocation", "Word formation"]},
            {"id": "grammar", "name": "Grammatical Range", "subtopics": ["Complex sentences", "Tense usage", "Accuracy"]}
        ],
        "Speaking": [
            {"id": "part1", "name": "Part 1 - Introduction", "subtopics": ["Personal information", "Familiar topics", "General questions"]},
            {"id": "part2", "name": "Part 2 - Long Turn", "subtopics": ["Describe a topic", "2-minute speech", "Cue card"]},
            {"id": "part3", "name": "Part 3 - Discussion", "subtopics": ["Abstract ideas", "In-depth discussion", "Topic expansion"]},
            {"id": "fluency", "name": "Fluency and Coherence", "subtopics": ["Speaking rate", "Pauses", "Connectives"]},
            {"id": "pronunciation", "name": "Pronunciation", "subtopics": ["Individual sounds", "Word stress", "Intonation"]}
        ]
    }',
    true,
    'from-indigo-600 to-blue-600'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    duration_minutes = EXCLUDED.duration_minutes,
    total_questions = EXCLUDED.total_questions,
    proctored = EXCLUDED.proctored,
    scoring = EXCLUDED.scoring,
    sections = EXCLUDED.sections,
    syllabus = EXCLUDED.syllabus,
    is_live = EXCLUDED.is_live,
    bg_gradient = EXCLUDED.bg_gradient,
    updated_at = now();
