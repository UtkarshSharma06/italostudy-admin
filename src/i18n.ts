import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            settings: {
                title: "Settings",
                account: "Account",
                account_sub: "Security notifications, change number",
                privacy: "Privacy",
                privacy_sub: "Block contacts, disappearing messages",
                subscription: "Subscription",
                notifications: "Notifications",
                notifications_sub: "Message, group & call tones",
                language: "App Language",
                language_sub: "English (device's language)",
                appearance: "Appearance",
                appearance_sub: "Theme, wallpapers",
                help: "Help",
                help_sub: "Help center, contact us, privacy policy",
                invite: "Invite a Friend",
                logout: "Log Out",
                status: "Available • Study Mode",
                account_edit: "Edit Profile",
                display_name: "Display Name",
                username: "Username",
                save_profile: "Save Profile",
                avatar_updated: "Profile picture updated!",
                profile_updated: "Profile updated successfully.",
                privacy_options: {
                    last_seen: "Last Seen",
                    profile_photo: "Profile Photo",
                    about: "About",
                    status: "Status",
                    read_receipts: "Read Receipts",
                    everyone: "Everyone",
                    contacts: "My Contacts",
                    nobody: "Nobody"
                },
                security: {
                    mfa: "Two-Factor Auth",
                    change_password: "Change Password",
                    google_managed: "Managed by Google",
                    mfa_sub: "Extra layer of security"
                }
            },
            menu: {
                main: "Main Menu",
                history: "Practice History",
                mock: "Mock Exams",
                bookmarks: "Saved Questions",
                labs: "3D Virtual Labs",
                apply: "Apply University",
                community: "Study Community",
                admin: "Admin Terminal",
                settings: "App Settings",
                logout: "Log Out",
                restricted: "Restricted Access",
                online: "Status: Online",
                exam_change: "Change Exam",
                active_course: "Active Course",
                dashboard: "Dashboard"
            },
            dashboard: {
                daily_stats: "Daily Stats",
                solved: "Solved",
                accuracy: "Accuracy",
                streak: "Day Streak",
                total_q: "Total Questions",
                recent_activity: "Recent Activity",
                continue: "Continue",
                score: "Points",
                champions_league: "Champions League",
                top_students: "Top Students",
                mastery: "Subject Mastery",
                mastery_sub: "Your strength analysis",
                weak: "Needs Work",
                strong: "Strong",
                average: "Average",
                no_data: "No data available",
                start_practicing: "Start Practicing"
            },
            common: {
                save: "Save",
                cancel: "Cancel",
                back: "Back",
                loading: "Loading...",
                resources: "Resources",
                login: "Log In",
                start_free: "Start FREE Practice",
                numbers: {
                    first: "First",
                    second: "Second",
                    third: "Third",
                    last: "Last"
                },
                logo_alt: "ItaloStudy Logo - University Entrance Exam Preparation"
            },
            nav: {
                method: "Method",
                exams: "Exams",
                resources: "Resources",
                pricing: "Pricing",
                blog: "Blog",
                contact: "Contact",
                login: "Log In",
                dashboard: "Dashboard",
                exam_items: {
                    cents: "CEnT-S 2026",
                    imat: "Prep IMAT",
                    tolce: "TOLC-E",
                    tili: "TIL-I"
                }
            },
            footer: {
                links: {
                    method: "Method",
                    pricing: "Pricing",
                    blog: "Blog",
                    contact: "Contact"
                },
                cta_title: "Ready to Secure Your Spot in Italy?",
                cta_desc: "The most precise admission strategy for 2026."
            },
            method: {
                badge: "The ItaloStudy Standard",
                hero_title_prefix: "Designed for Academic",
                hero_title_highlight: "Excellence.",
                hero_desc: "Our multi-layered cognitive framework meticulously engineered to accelerate mastery in medical and scientific disciplines.",
                steps: {
                    diagnostic_title: "Diagnostic Phase",
                    diagnostic_desc: "We identify your cognitive profile across all scientific domains with a comprehensive initial diagnostic assessment.",
                    training_title: "Intelligent Training",
                    training_desc: "Our proprietary learning engine generates personalized question sets targeting your specific knowledge gaps.",
                    retention_title: "Knowledge Retention",
                    retention_desc: "Questions reappear at mathematically optimal intervals to ensure permanent knowledge integration and mastery.",
                    mock_title: "Mock Exams",
                    mock_desc: "Execute high-pressure practice sessions under official exam conditions with live proctoring systems."
                },
                features: {
                    adaptive: "Adaptive Difficulty",
                    adaptive_desc: "Our algorithms dynamically adjust question complexity based on your performance data, second by second.",
                    benchmarking: "Global Benchmarking",
                    benchmarking_desc: "Compare your retention speed and accuracy against 12,000+ students worldwide in real-time.",
                    pattern: "Pattern Recognition",
                    pattern_desc: "We don't just teach facts; we train your brain to recognize the architectural logic behind exam questions."
                },
                cta: {
                    title_prefix: "Ready to Master the",
                    title_highlight: "ItaloStudy Experience?",
                    subtitle: "Join the ranks of elite students worldwide.",
                    button: "Start Practice"
                }
            },
            landing: {
                header: {
                    beta_free: "BETA FREE"
                },
                hero: {
                    badge: "NEW GEN ITALOSTUDY TEAM",
                    title_prefix: "Ace Your CENT-S & IMAT PREP",
                    title_highlight: "with ItaloStudy",
                    title_sub: "The Smartest Way to Pass Your Italian Entrance Exam",
                    description: "<0>Everything you need to prepare for </0><1/><2> — practice, analysis, and guidance designed to help you perform at your best.</2>",
                    exam_placeholder: "Entrance Exams",
                    cta_start: "Start FREE",
                    cta_blog: "Read Blog",
                    explore_blog: "Explore Blog",
                    stats: {
                        pass_rate: "98%",
                        pass_rate_label: "Pass Rate",
                        students: "5,000+",
                        students_label: "Students",
                        mock_exams: "Expert-Led",
                        mock_exams_label: "Mock Exams",
                        prep_rank: "#1",
                        prep_rank_label: "CEnT-S Prep"
                    }
                },
                features: {
                    adaptive_title: "Adaptive Learning",
                    adaptive_desc: "Questions adjust to your knowledge level in real-time, targeting your weak areas for rapid improvement.",
                    simulation_title: "Real Exam Simulation",
                    simulation_desc: "Practice under the exact conditions and timing you'll face in the actual exam.",
                    ranked_title: "Global Leaderboards",
                    ranked_desc: "Compete with students worldwide and track your ranking across different subjects."
                },
                testimonials: {
                    badge: "Success Stories",
                    title: "Trusted by",
                    title_highlight: "12K+ Students",
                    subtitle: "Students from over 30 countries use ItaloStudy to prepare for their dream universities.",
                    john_text: "ItaloStudy was crucial to my IMAT success. The unlimited mocks and detailed analytics helped me understand exactly where I needed to improve.",
                    john_role: "Medical Student, Italy",
                    anna_text: "The practice questions and real-time feedback system made all the difference in my SAT preparation. Highly recommend!",
                    anna_role: "Engineering Student, Germany"
                },
                faq: {
                    title: "Frequently Asked Questions",
                    subtitle: "Everything you need to know about ItaloStudy",
                    description: "Everything you need to know about the 2026 admissions cycle and ItaloStudy.",
                    q1: "How does ItaloStudy help me prepare for the CENT-S 2026 medical exam?",
                    a1: "ItaloStudy provides the world's most advanced study simulator specifically built for the 2026 Italian medical entrance exams. Our platform offers unlimited realistic mock exams, a comprehensive database of past papers, and detailed AI-driven analytics.",
                    q2: "Is the ItaloStudy simulator really free for international students?",
                    a2: "Yes! We are currently in our Global Beta phase, which means access to our core CENT-S and IMAT study simulators is completely free for all users.",
                    q3: "How accurate are the ItaloStudy mock exams compared to the real 2026 test?",
                    a3: "Our mock exams are meticulously crafted by medical education experts to mirror the exact difficulty levels, topic distribution, and timing of the real 2026 exams.",
                    q4: "What are the requirements for international students to study in Italy in 2026?",
                    a4: "For 2026, you generally need 12 years of total education, English proficiency (IELTS/TOEFL), and passing required entrance exams like CENT-S or IMAT.",
                    q5: "Is it possible to study in Italy for free or with a scholarship in 2026?",
                    a5: "Yes! Most international students qualify for the DSU scholarship, which can provide a full tuition waiver and a cash stipend of up to €7,000 per year.",
                    q6: "What is the ISEE and how does it reduce my tuition fees in Italy?",
                    a6: "The ISEE is a financial document used by Italian universities to assess your economic situation and qualify you for the lowest tuition fee brackets.",
                    q7: "How do I apply for a student visa for Italy in 2026?",
                    a7: "The process begins with pre-enrollment on UniversItaly. After validation, you apply for a Type D Student Visa at the Italian Consulate in your country.",
                    q8: "Are there English-taught degrees in Italy for international students?",
                    a8: "Yes, Italy offers over 500 English-taught programs for 2026, including Medicine, Engineering, Architecture, and Humanities.",
                    q9: "Can I work part-time while studying in Italy in 2026?",
                    a9: "Yes, international students on a student visa are legally permitted to work up to 20 hours per week during the academic year.",
                    q10: "When do applications open for Italian universities in 2026?",
                    a10: "Most universities start their first call for applications for the 2026 intake between February and April 2026."
                },
                cents_marketing: {
                    badge: "Official-style preparation",
                    title: "CEnT-S 2026",
                    subtitle: "Prepare with the most realistic CEnT-S simulator available. Built for international students aiming for top medical schools in Italy.",
                    feature1: "Real exam-style questions & structure",
                    feature2: "Unlimited mock tests with instant results",
                    feature3: "Detailed performance stats to track progress",
                    cta: "Explore the Ultimate Guide"
                },
                exam_marketing_hub: {
                    badge: "Select Your Path",
                    title: "EXAMS",
                    description: "Master the competitive exams with our specialized training modules designed for success."
                },
                imat_marketing: {
                    badge: "Elite Medical Training",
                    title: "IMAT 2026",
                    subtitle: "Join thousands of students using Europe's most advanced simulator for the IMAT 2026. Experience high-fidelity testing with detailed diagnostics.",
                    feature1: "2026 Curriculum Aligned Content",
                    feature2: "Proctored Mock Exam Environment",
                    feature3: "Global Ranking & Benchmarking",
                    cta_title: "Ace Your CENT-S & IMAT PREP with ItaloStudy",
                    cta_desc: "To excel in the CENT-S 2026 exam, students need more than textbooks — they need realistic mock tests, structured guidance, and exam-level simulations built around the official CENT-S pattern.",
                    cta: "Read the IMAT Guide"
                },
                about_cents: {
                    badge: "Global Authority Cluster",
                    title: "Ultimate Guide to the CENT-S Exam 2026",
                    p1: "Navigating the landscape of medical entrance preparation Europe can be daunting, but for students aiming for Italian public universities, the CENT-S exam 2026 stands as the most critical milestone. Organized by CISIA, the CENT-S (CEnT-S) is the standard entrance qualification for international medical programs taught in English across Italy's most prestigious institutions, including Sapienza University of Rome and the University of Milan.",
                    struct_title: "Exam Structure & Scoring",
                    struct_p1: "The 2026 session of the CEnT-S follows a rigorous 90-minute format containing 60 multiple-choice questions. Understanding the weight of each section is key to your IMAT practice test strategy:",
                    stat_bio_label: "Biology",
                    stat_bio_val: "23 Questions",
                    stat_chem_label: "Chemistry",
                    stat_chem_val: "15 Questions",
                    stat_phys_label: "Physics & Math",
                    stat_phys_val: "13 Questions",
                    stat_logic_label: "Logic & General Culture",
                    stat_logic_val: "9 Questions",
                    scoring_note: "Scoring System: +1 point for correct answers, -0.25 points for incorrect answers, and 0 points for skipped questions.",
                    p2: "At ItaloStudy, we provide a free mock exams suite specifically calibrated to the 2026 difficulty level. Unlike generic resources, our test engine mirrors the exact pressure and cognitive load of the official CISIA environment. Our database of over 10,000 practice questions ensures that no topic—from molecular biology to complex reasoning on texts—is left untouched.",
                    p3: "Preparing for the CENT-S exam 2026 requires more than just memorization; it demands strategic speed and precise accuracy. Our simulator's internal data shows that the 'Reasoning on Texts and Data' section remains the primary bottleneck for 85% of candidates. By integrating detailed analytics and adaptive difficulty, we help you master the nuances of the CISIA curriculum before you even walk into the test center.",
                    duration: "90 Minutes Duration",
                    questions: "60 Multiple Choice Qs",
                    strat_title: "Section-Wise Strategy",
                    strat_1: "Logic: 1.5 mins per question. Focus on pattern recognition.",
                    strat_2: "Biology: 45 seconds per question. Quick recall is key.",
                    strat_3: "Chemistry: 1.2 mins per question. Calculations first.",
                    score_title: "Safe Score Analysis",
                    score_desc: "Historical data for 2024/2025 indicates:",
                    score_uni1_label: "Sapienza/Milan",
                    score_uni1_val: "52+ Points",
                    score_uni2_label: "Bologna/Pavia",
                    score_uni2_val: "48+ Points",
                    score_uni3_label: "Other Public Unis",
                    score_uni3_val: "42+ Points",
                    fail_title: "Why Students Fail the CENT-S Exam",
                    fail_p1: "Statistically, failure on the CENT-S exam 2026 is rarely due to a lack of scientific knowledge. Our analytics from 45,000+ mock attempts show that 68% of lost points come from 'Blind Guessing' and 'Time Fatigue.' Students often spend too long on a single logic puzzle, leaving them with less than 30 seconds for critical biology questions at the end of the paper.",
                    skip_title: "The 'Aggressive Skipping' Method",
                    skip_p1: "Our simulator trains you to identify and skip 'Time Vampire' questions instantly. In a penalty-based scoring system (-0.25), skipping a question is often more profitable than guessing.",
                    comp_title: "CENT-S vs IMAT: A Difficulty Comparison",
                    comp_p1: "Many candidates ask: Is the CENT-S harder than the IMAT? While the syllabus is nearly identical, the CEnT-S (CISIA) format places a higher emphasis on Reasoning on Texts and Data. The IMAT traditionally featured more complex General Knowledge questions, whereas the 2026 CEnT-S focuses on the application of scientific principles in a time-sensitive environment.",
                    cta1: "Explore the 2026 Syllabus",
                    cta2: "Access Free Study Resources"
                },
                authority: {
                    badge: "Proven Track Record",
                    title_prefix: "The Most Trusted Platform for ",
                    title_highlight: "International Med Students",
                    description: "Securing a spot in Italy's prestigious medical programs requires more than individual effort — it requires a platform built on real exam intelligence.",
                    stats: {
                        mocks: "45,000+",
                        mocks_label: "Mocks Completed",
                        mocks_sub: "In the last 12 months",
                        countries: "120+",
                        countries_label: "Countries Served",
                        countries_sub: "Global student base",
                        students: "15,000+",
                        students_label: "Active Students",
                        students_sub: "Preparing right now",
                        rating: "4.9/5 Trustpilot Rating",
                        reviews: "Based on 2,100+ verified reviews",
                        top_rated: "Top Rated 2025"
                    },
                    placement: {
                        title: "Placement Statistics",
                        cluster: "2026 Admissions Cycle",
                        live: "Live Tracking",
                        success: "Placement Success",
                        first_choice: "94%",
                        first_choice_label: "First Choice University",
                        cycle: "2026",
                        cycle_label: "Admissions Year",
                        started: "50,000+",
                        started_label: "Mocks Started",
                        universities: {
                            sapienza: "Sapienza University of Rome",
                            milan: "University of Milan",
                            bologna: "University of Bologna",
                            pavia: "University of Pavia"
                        }
                    }
                },
                why_us: {
                    badge: "The Preferred Choice for",
                    title: "Why Top Students Choose ItaloStudy",
                    title_highlight: "",
                    benefits: {
                        calibration_title: "2026 Session Calibration",
                        calibration_desc: "Every question in our database is strictly aligned with the latest 2026 CISIA and IMAT session specifications, ensuring no surprises on exam day.",
                        adaptive_title: "Adaptive Learning Suite",
                        adaptive_desc: "Our diagnostic engine moves as you do. As you improve, the difficulty scales, pinpointing your weak areas for targeted rehabilitation.",
                        bank_title: "10,000+ Practice Question Bank",
                        bank_desc: "Master every concept with the world's largest curriculum-aligned question bank. Every answer includes detailed step-by-step logic and formula breakdowns.",
                        simulation_title: "True Mock Simulation",
                        simulation_desc: "Experience real test pressure with our proctored mock environment, featuring webcam monitoring and official section-timed constraints.",
                        videos_title: "Concept Video Lessons",
                        videos_desc: "Learn from top medical mentors with high-definition video modules covering the entire syllabus—from Organic Chemistry to Logical Fallacies.",
                        free_title: "Free High-Quality Education",
                        free_desc: "We believe in equal opportunity. Our core preparation suite, including mock exams and syllabus breakdowns, remains free for all students."
                    },
                    cta: "Read Our Admission Strategy Blog"
                },
                trustpilot: {
                    avg_rating: "Average Rating: {{rating}}",
                    review_count: "{{count}} Reviews",
                    show_less: "Show Less",
                    read_more: "Read More"
                },
                how_it_works: {
                    badge: "How Our Technology Works",
                    title_prefix: "One Ecosystem. ",
                    title_highlight: "Total Mastery.",
                    description: "We bridge the gap between learning and performance with the only unified suite for medical admissions.",
                    steps: {
                        registration_title: "Registration",
                        registration_desc: "Create your ItaloStudy account and select your target exam (CENT-S, IMAT, or SAT) to calibrate your personalized dashboard.",
                        diagnostic_title: "AI Diagnostic",
                        diagnostic_desc: "Our diagnostic engine identifies your unique knowledge gaps across 5 subjects, creating a data-driven study roadmap.",
                        mastery_title: "Concept Mastery",
                        mastery_desc: "Watch high-definition video modules led by medical experts to master complex Biology, Chemistry, and Logic concepts.",
                        bank_title: "Practice Bank",
                        bank_desc: "Sharpen your intuition with 10,000+ practice questions featuring math-rendered formulas and in-depth logic explanations.",
                        mocks_title: "Proctored Mocks",
                        mocks_desc: "Simulate the real test day with our official proctored environment, featuring strict timers and the genuine exam interface.",
                        precision_title: "Final Precision",
                        precision_desc: "Analyze your 'time-per-question' metrics and heatmaps to optimize your strategy for maximum admissions probability."
                    }
                },
                insights: {
                    badge: "Data-Driven Insight",
                    title_prefix: "85% of Students Struggle with ",
                    title_highlight: "Logic & Reasoning",
                    description: "Based on 3,000+ mock attempts, we’ve identified that the primary bottleneck for non-native medical candidates is Critical Thinking. Our adaptive engine dynamically prioritizes these high-yield weak areas.",
                    stat_value: "85%",
                    stat_label: "Failure Rate in Logic Sections",
                    source: "Source: ItaloStudy Internal Data 2025"
                },
                seo_hub: {
                    title: "CENT-S 2026 Resource Pilar",
                    description: "Comprehensive guides and data-driven insights for Italian Medical school admissions.",
                    links: {
                        syllabus: "CENT-S Syllabus 2026",
                        pattern: "CENT-S Exam Pattern",
                        cutoff: "CENT-S Cutoff 2026",
                        strategy: "Preparation Strategy",
                        past_papers: "Previous Year Questions",
                        resources: "Free Study Resources"
                    }
                },
                global_challenge: {
                    badge: "Live Competition",
                    title: "Join the ",
                    title_highlight: "Global League",
                    description: "Compete with ambitious students worldwide in real-time. Test your skills, earn badges, and climb the leaderboard.",
                    quiz: {
                        live_badge: "Live Challenge",
                        question_count: "Question {{current}} of {{total}}",
                        subject_label: "Subject",
                        check_answer: "Check Answer",
                        outstanding: "Outstanding! You got it right.",
                        nice_try: "Nice try! Keep going.",
                        next_challenge: "Next Challenge",
                        see_results: "See Results",
                        complete_title: "Challenge Complete!",
                        score_summary: "You scored {{score}} out of {{total}} correct answers.",
                        try_again: "Try Again",
                        practice_more: "Practice More",
                        top_percent: "Top 10% of global participants today",
                        simulation_hint: "Try the live simulation",
                        subjects: {
                            logic: "Logic & Reasoning",
                            math: "Mathematics",
                            biology: "Biology",
                            physics: "Physics",
                            chemistry: "Chemistry"
                        },
                        badges: {
                            rank_match: "Rank Match",
                            speed_round: "Speed Round",
                            daily_challenge: "Daily Challenge",
                            concept_core: "Concept Core",
                            lab_sprint: "Lab Sprint"
                        },
                        questions: {
                            logic: "If you are running a race and you pass the person in second place, what place are you in?",
                            math: "If 2x + 5 = 15, what is the value of 3x - 1?",
                            biology: "Which organelle is known as the powerhouse of the cell?",
                            physics: "What is the SI unit of Force?",
                            chemistry: "What is the pH value of pure water at 25°C?"
                        }
                    }
                },
                italy_cluster: {
                    badge: "The Ultimate Strategy",
                    title: "Your Roadmap to Study in Italy",
                    desc: "The most precise, data-backed admission strategy for international students aiming for Italian excellence in 2026.",
                    pillar1_title: "Admissions Strategy",
                    pillar1_desc: "Master the UniversItaly portal and the mandatory DOV/CIMEA legalization process for 2026.",
                    pillar2_title: "University Selection",
                    pillar2_desc: "Compare 90+ public and private institutions across Italy's top student cities like Milan, Rome, and Pavia.",
                    pillar3_title: "Financial Planning",
                    pillar3_desc: "Unlock DSU scholarships up to €7,000/year and understand income-based public university tuition.",
                    pillar4_title: "Visa Protocol",
                    pillar4_desc: "Navigate the Type D Student Visa requirements and embassy interview strategies with precision.",
                    cta: "Read Complete Academic Guide"
                },
                video_review: {
                    badge: "Student Success Story",
                    title: "Real results from our 2026 students",
                    description: "Join thousands of successful candidates who used our expert-led strategy to master their exams.",
                    quote: "The ItaloStudy method transformed my preparation. I went from being uncertain to a top-tier candidate.",
                    role: "Part of the University of Padua",
                    verified: "Verified Success",
                    metric_label: "CEnT-S Score"
                },

            },
            syllabus: {
                badge: "Master Your Syllabus",
                title_prefix: "",
                title_highlight: "Blueprint.",
                back_home: "Return Home",
                exams: {
                    imat: {
                        title: "IMAT",
                        subtitle: "Medicine Entrance (International)",
                        topic1: "Biology & Chemistry",
                        desc1: "Core medical foundations and molecular logic.",
                        topic2: "Mathematics & Physics",
                        desc2: "Quantitative reasoning and mechanical principles.",
                        topic3: "Critical Thinking",
                        desc3: "Logical reasoning and general knowledge modules."
                    },
                    sat: {
                        title: "SAT",
                        subtitle: "College Board Standard",
                        topic1: "Reading & Writing",
                        desc1: "Evidence-based reading and grammar mastery.",
                        topic2: "Math Foundation",
                        desc2: "Algebra, geometry, and advanced quantitative tools.",
                        topic3: "Composition Analysis",
                        desc3: "Rhetorical strategies and textual evaluation."
                    },
                    ielts: {
                        title: "IELTS",
                        subtitle: "English Proficiency Protocol",
                        topic1: "Listening & Reading",
                        desc1: "Advanced comprehension in academic contexts.",
                        topic2: "Writing Mastery",
                        desc2: "Data interpretation and argumentative argumentation.",
                        topic3: "Speaking Fluency",
                        desc3: "Coherent communication and vocabulary range."
                    },
                    cents: {
                        title: "CEnT-S",
                        subtitle: "Technical & Industrial Excellence",
                        topic1: "Engineering Logic",
                        desc1: "Problem-solving for modern technical challenges.",
                        topic2: "Applied Sciences",
                        desc2: "Physics and materials for industrial certification.",
                        topic3: "Methodology",
                        desc3: "Structural analysis and exam-specific protocols."
                    },
                    'tolc-e': {
                        title: "TOLC-E",
                        subtitle: "Economics Entrance Exam",
                        topic1: "Logic",
                        desc1: "Analytical reasoning and problem solving.",
                        topic2: "Reading",
                        desc2: "Critical reading and text analysis.",
                        topic3: "Mathematics",
                        desc3: "Quantitative skills and algebraic foundations."
                    },
                    'til-i': {
                        title: "TIL-I",
                        subtitle: "Engineering Entrance Exam",
                        topic1: "Mathematics",
                        desc1: "Advanced geometry, algebra, and calculus.",
                        topic2: "Physics",
                        desc2: "Classical mechanics and electromagnetism.",
                        topic3: "Logic & Reading",
                        desc3: "Technical reasoning and comprehensive analysis."
                    }
                }
            },
            contact: {
                return: "Return to Base",
                hub: "Communication Hub v1.0",
                title_prefix: "Get in",
                title_highlight: "Touch.",
                desc: "Our expert mission support team is ready to assist you with admissions, technical support, or program details.",
                support: {
                    title: "Direct Support",
                    text: "Reach us via our central communication channel for all inquiries from technical assistance to partnership offers:",
                    label: "Central Email"
                },
                protocol: {
                    title: "Response Protocol",
                    text: "We operate with high-precision response capability to ensure no student is left behind.",
                    target: "TARGET",
                    time: "Response Within 24 Hours",
                    note: "Note: Our global team processes inquiries 7 days a week to support students across all time zones."
                },
                global: {
                    title: "Global Operations",
                    text: "ItaloStudy is a decentralized academic ecosystem supporting students in 30+ countries. Our digital-first infrastructure ensures you have access to elite admission insights regardless of your geographic location.",
                    locs: {
                        milan: "Milan",
                        london: "London",
                        berlin: "Berlin",
                        global: "Global Support"
                    }
                },
                footer: "BUILT FOR THE FUTURE OF EDUCATION"
            },
            resources: {
                badge: "Study Vault",
                title_prefix: "Knowledge",
                title_highlight: "Resources",
                desc: "<0>Dive into study materials, guides, and official documents for </0><1>{{exam}}</1><2>.</2>",
                search_placeholder: "Search guides, PDFs, or materials...",
                empty: {
                    title: "No resources found",
                    desc: "Try selecting a different exam section or search query.",
                    clear: "Clear Search"
                },
                card: {
                    type: "MATERIAL",
                    default_desc: "Grab your study buddy and dive into this essential material for your exam prep!",
                    download: "Download File",
                    view_resource: "View Resource"
                },
                load_more: "Load More",
                share: {
                    title: "Found this useful? 🎒",
                    subtitle: "Share the magic with your study mates!",
                    copied: "Link Copied! ✨",
                    copied_desc: "Paste in your bio or DM your friends!"
                }
            },
            about: {
                title: "About Us",
                mission_title: "Our Mission",
                mission_desc1: "ItaloStudy was founded with a clear objective: to democratize high-quality preparation for global entrance exams. We believe that every student, regardless of their background, deserves access to world-class resources that help them succeed in competitive exams like IMAT, SAT, CEnT-S, and IELTS.",
                mission_desc2: "Our platform provides a state-of-the-art simulation environment that mirrors real exam conditions, allowing students to build confidence and refine their strategies through unlimited practice and data-driven insights.",
                do_title: "What We Do",
                do_desc: "We specialize in creating comprehensive study ecosystems for international students. Our services include:",
                do_item1: "Advanced Exam Simulators",
                do_item1_desc: "Realistic mock exams for IMAT, SAT, and more.",
                do_item2: "Adaptive Learning",
                do_item2_desc: "Tailored question banks that evolve with your performance.",
                do_item3: "University Admissions Support",
                do_item3_desc: "Personalized guidance for university applications in Italy and beyond.",
                do_item4: "Global Student Community",
                do_item4_desc: "A collaborative space for students to share resources and success.",
                leadership_title: "The Leadership",
                leadership_desc1: "ItaloStudy is owned and operated by Utkarsh Kumar Sharma.",
                leadership_desc2: "Driven by a passion for education and technology, Utkarsh envisioned a platform that bridges the gap between ambitious students and their goal of studying in prestigious international universities. With a focus on transparency, credibility, and excellence, he leads the platform's vision to be the most trusted academic partner for students globally.",
                office_title: "Registered Office",
                office_address: "Sahyog Nagar, near shiva talkies, Ward No-19, Bharatpur, Rajasthan - 321001, India",
                contact_title: "Contact Information",
                contact_desc: "For inquiries, support, or business partnerships, please reach out to us:",
                commitment_title: "Our Commitment",
                commitment_desc: "We are committed to maintaining the highest standards of academic integrity and student support. ItaloStudy is not just a preparation tool; it is a partner in your career journey. We continuously update our content to reflect the latest exam patterns and admissions policies, ensuring our students stay ahead of the curve.",
                faq: {
                    title: "Frequently Asked Questions",
                    description: "Everything you need to know about the 2026 admissions cycle and ItaloStudy.",
                    q1: "When are the 2026 exam dates?",
                    a1: "The official dates are usually released early in the year. Check our guide for the most up-to-date schedule.",
                    q2: "Can I prepare for multiple exams?",
                    a2: "Yes, our platform supports multi-exam preparation with specialized modules for each.",
                    q3: "Is the simulator updated for 2026?",
                    a3: "Yes, all content and simulation environments are fully aligned with the 2026 curriculum.",
                    q4: "What is a DSU scholarship?",
                    a4: "A government scholarship in Italy that can cover tuition and provide a living stipend.",
                    q5: "How do I choose the right university?",
                    a5: "Use our University Selection tool to compare institutions based on your goals.",
                    q6: "Do I need to speak Italian?",
                    a6: "For English-taught programs like IMAT, you only need English proficiency.",
                    q7: "What is the pre-enrollment deadline?",
                    a7: "Deadlines vary by institution but typically fall between April and July.",
                    q8: "How does the adaptive system work?",
                    a8: "It analyzes your performance and focuses on your weaker areas to maximize improvement.",
                    q9: "Can I access the platform on mobile?",
                    a9: "Yes, ItaloStudy is fully responsive and works great on all devices.",
                    q10: "Is there a free trial?",
                    a10: "Yes, you can start practicing for FREE with our basic modules."
                },

            }
        }
    },
    it: {
        translation: {
            settings: {
                title: "Impostazioni",
                account: "Account",
                account_sub: "Notifiche di sicurezza, cambia numero",
                privacy: "Privacy",
                privacy_sub: "Blocca contatti, messaggi effimeri",
                subscription: "Abbonamento",
                notifications: "Notifiche",
                notifications_sub: "Toni per messaggi, gruppi e chiamate",
                language: "Lingua App",
                language_sub: "Italiano (lingua del dispositivo)",
                appearance: "Aspetto",
                appearance_sub: "Tema, sfondi",
                help: "Aiuto",
                help_sub: "Centro assistenza, contattaci, privacy",
                invite: "Invita un amico",
                logout: "Disconnettiti",
                status: "Disponibile • Modalità Studio",
                account_edit: "Modifica Profilo",
                display_name: "Nome Visualizzato",
                username: "Nome Utente",
                save_profile: "Salva Profilo",
                avatar_updated: "Immagine del profilo aggiornata!",
                profile_updated: "Profilo aggiornato con successo.",
                privacy_options: {
                    last_seen: "Ultimo accesso",
                    profile_photo: "Immagine del profilo",
                    about: "Info",
                    status: "Stato",
                    read_receipts: "Conferme di lettura",
                    everyone: "Tutti",
                    contacts: "I miei contatti",
                    nobody: "Nessuno"
                },
                security: {
                    mfa: "Autenticazione a due fattori",
                    change_password: "Cambia password",
                    google_managed: "Gestito da Google",
                    mfa_sub: "Livello extra di sicurezza"
                }
            },
            menu: {
                main: "Menu Principale",
                history: "Cronologia Pratica",
                mock: "Esami Simulati",
                bookmarks: "Domande Salvate",
                labs: "Laboratori 3D",
                apply: "Candidatura Università",
                community: "Community di Studio",
                admin: "Terminale Admin",
                settings: "Impostazioni App",
                logout: "Disconnettiti",
                restricted: "Accesso Riservato",
                online: "Stato: Online",
                exam_change: "Cambia Esame",
                active_course: "Corso Attivo",
                dashboard: "Dashboard"
            },
            dashboard: {
                daily_stats: "Statistiche Giornaliere",
                solved: "Domande Risolte",
                accuracy: "Precisione",
                streak: "Giorni consecutivi",
                total_q: "Domande Totali",
                recent_activity: "Attività Recente",
                continue: "Continua",
                score: "Punteggio",
                champions_league: "Champions League",
                top_students: "Studenti Migliori",
                mastery: "Padronanza Materie",
                mastery_sub: "Analisi dei tuoi punti di forza",
                weak: "Da Migliorare",
                strong: "Forte",
                average: "Media",
                no_data: "Nessun dato disponibile",
                start_practicing: "Inizia a Esercitarti"
            },
            common: {
                save: "Salva",
                cancel: "Annulla",
                back: "Indietro",
                loading: "Caricamento...",
                resources: "Risorse",
                login: "Accedi",
                start_free: "Inizia la Pratica Gratuita",
                numbers: {
                    first: "Primo",
                    second: "Secondo",
                    third: "Terzo",
                    last: "Ultimo"
                },
                logo_alt: "Logo ItaloStudy - Preparazione Esami di Ammissione"
            },
            nav: {
                method: "Metodo",
                exams: "Esami",
                resources: "Risorse",
                pricing: "Prezzi",
                blog: "Blog",
                contact: "Contatto",
                login: "Accedi",
                dashboard: "Dashboard",
                exam_items: {
                    cents: "CEnT-S 2026",
                    imat: "Prep IMAT",
                    tolce: "TOLC-E",
                    tili: "TIL-I"
                }
            },
            footer: {
                links: {
                    method: "Metodo",
                    pricing: "Prezzi",
                    blog: "Blog",
                    contact: "Contatto"
                },
                cta_title: "Pronto a Assicurarti il Tuo Posto in Italia?",
                cta_desc: "La strategia di ammissione più precisa per il 2026."
            },
            method: {
                badge: "Lo Standard ItaloStudy",
                hero_title_prefix: "Progettato per l'Eccellenza",
                hero_title_highlight: "Accademica.",
                hero_desc: "Il nostro framework cognitivo multi-livello meticolosamente ingegnerizzato per accelerare la padronanza nelle discipline mediche e scientifiche.",
                steps: {
                    diagnostic_title: "Fase Diagnostica",
                    diagnostic_desc: "Identifichiamo il tuo profilo cognitivo su tutti i domini scientifici con una valutazione diagnostica iniziale completa.",
                    training_title: "Formazione Intelligente",
                    training_desc: "Il nostro motore di apprendimento proprietario genera set di domande personalizzati mirati alle tue lacune di conoscenza specifiche.",
                    retention_title: "Ritenzione della Conoscenza",
                    retention_desc: "Le domande riappaiono a intervalli matematicamente ottimali per garantire l'integrazione permanente della conoscenza e la padronanza.",
                    mock_title: "Esami Simulati",
                    mock_desc: "Esegui sessioni di pratica ad alta pressione in condizioni d'esame ufficiali con sistemi di sorveglianza dal vivo."
                },
                features: {
                    adaptive: "Difficoltà Adattiva",
                    adaptive_desc: "I nostri algoritmi regolano dinamicamente la complessità delle domande in base ai tuoi dati di prestazione, secondo per secondo.",
                    benchmarking: "Global Benchmarking",
                    benchmarking_desc: "Confronta la tua velocità di ritenzione e precisione con oltre 12.000 studenti in tutto il mondo in tempo reale.",
                    pattern: "Riconoscimento dei Pattern",
                    pattern_desc: "Non insegniamo solo i fatti; addestriamo il tuo cervello a riconoscere la logica architettonica dietro le domande d'esame."
                },
                cta: {
                    title_prefix: "Pronto a Dominare l'",
                    title_highlight: "Esperienza ItaloStudy?",
                    subtitle: "Unisciti ai ranghi degli studenti d'élite in tutto il mondo.",
                    button: "Inizia la Pratica"
                }
            },
            landing: {
                header: {
                    beta_free: "BETA GRATIS"
                },
                hero: {
                    badge: "NUOVO TEAM ITALOSTUDY",
                    title_prefix: "Supera la tua PREP CENT-S & IMAT ",
                    title_highlight: "con ItaloStudy",
                    title_sub: "La via più intelligente per superare il tuo test d'ingresso in Italia",
                    description: "<0>Tutto ciò di cui hai bisogno per prepararti a </0><1/><2> — pratica, analisi e guida progettate per aiutarti a dare il meglio di te.</2>",
                    exam_placeholder: "gli esami di ammissione",
                    cta_start: "Inizia GRATIS",
                    cta_blog: "Leggi il Blog",
                    explore_blog: "Esplora il Blog",
                    stats: {
                        pass_rate: "98%",
                        pass_rate_label: "Tasso di Successo",
                        students: "5.000+",
                        students_label: "Studenti",
                        mock_exams: "Guidati da Esperti",
                        mock_exams_label: "Simulazioni",
                        prep_rank: "#1",
                        prep_rank_label: "Prep CEnT-S"
                    }
                },
                features: {
                    adaptive_title: "Apprendimento Adattivo",
                    adaptive_desc: "Le domande si adattano al tuo livello di conoscenza in tempo reale, puntando sulle tue aree deboli per un miglioramento rapido.",
                    simulation_title: "Simulazione Esame Reale",
                    simulation_desc: "Esercitati nelle esatte condizioni e tempistiche che affronterai nell'esame vero e proprio.",
                    ranked_title: "Leaderboard Globali",
                    ranked_desc: "Competi con studenti di tutto il mondo e monitora la tua classifica in diverse materie."
                },
                testimonials: {
                    badge: "Storie di Successo",
                    title: "Scelto da",
                    title_highlight: "12K+ Studenti",
                    subtitle: "Studenti da oltre 30 paesi usano ItaloStudy per prepararsi alle loro università da sogno.",
                    john_text: "ItaloStudy è stato fondamentale per il mio successo all'IMAT. Le simulazioni illimitate e le analisi dettagliate mi hanno aiutato a capire esattamente dove dovevo migliorare.",
                    john_role: "Studente di Medicina, Italia",
                    anna_text: "Le domande di pratica e il sistema di feedback in tempo reale hanno fatto la differenza nella mia preparazione SAT. Lo consiglio vivamente!",
                    anna_role: "Studentessa di Ingegneria, Germania"
                },
                faq: {
                    title: "Domande Frequenti",
                    subtitle: "Tutto ciò che devi sapere su ItaloStudy",
                    description: "Tutto ciò che devi sapere sul ciclo di ammissioni 2026 e ItaloStudy.",
                    q1: "In che modo ItaloStudy mi aiuta a prepararmi per l'esame di medicina CENT-S 2026?",
                    a1: "ItaloStudy fornisce il simulatore di studio più avanzato al mondo, costruito appositamente per gli esami di ammissione di medicina in Italia per il 2026. La nostra piattaforma offre simulazioni realistiche illimitate, un database completo di prove del passato e analisi dettagliate guidate dall'IA.",
                    q2: "Il simulatore ItaloStudy è davvero gratuito per gli studenti internazionali?",
                    a2: "Sì! Siamo attualmente nella nostra fase Global Beta, il che significa che l'accesso ai nostri simulatori di studio CENT-S e IMAT è completamente gratuito per tutti gli utenti.",
                    q3: "Quanto sono accurate le simulazioni d'esame ItaloStudy rispetto al test reale del 2026?",
                    a3: "Le nostre simulazioni sono create meticolosamente da esperti di educazione medica per rispecchiare gli esatti livelli di difficoltà, la distribuzione degli argomenti e le tempistiche degli esami reali del 2026.",
                    q4: "Quali sono i requisiti per gli studenti internazionali per studiare in Italia nel 2026?",
                    a4: "Per il 2026, generalmente sono necessari 12 anni di istruzione totale, competenza nella lingua inglese (IELTS/TOEFL) e il superamento degli esami di ammissione richiesti come CENT-S o IMAT.",
                    q5: "È possibile studiare in Italia gratuitamente o con una borsa di studio nel 2026?",
                    a5: "Sì! La maggior parte degli studenti internazionali si qualifica per la borsa di studio DSU, che può fornire l'esonero totale dalle tasse e un sussidio in contanti fino a €7.000 all'anno.",
                    q6: "Cos'è l'ISEE e in che modo riduce le mie tasse universitarie in Italia?",
                    a6: "L'ISEE è un documento finanziario utilizzato dalle università italiane per valutare la tua situazione economica e qualificarti per le fasce di contribuzione più basse.",
                    q7: "Come posso richiedere un visto per studenti per l'Italia nel 2026?",
                    a7: "Il processo inizia con la pre-iscrizione sul portale ufficiale UniversItaly. Dopo la convalida, richiedi un visto per studenti di tipo D presso il consolato italiano nel tuo paese.",
                    q8: "Esistono lauree insegnate in inglese in Italia per studenti internazionali?",
                    a8: "Sì, l'Italia offre oltre 500 programmi in lingua inglese per l'anno accademico 2026, tra cui Medicina, Ingegneria, Architettura e Scienze Umanistiche.",
                    q9: "Posso lavorare part-time mentre studio in Italia nel 2026?",
                    a9: "Sì, agli studenti internazionali con visto per studenti è legalmente consentito lavorare fino a 20 ore a settimana durante l'anno accademico.",
                    q10: "Quando aprono le iscrizioni per le università italiane nel 2026?",
                    a10: "La maggior parte delle università avvia la prima sessione di candidatura per il 2026 tra febbraio e aprile 2026."
                },
                cents_marketing: {
                    badge: "Preparazione in stile ufficiale",
                    title: "CEnT-S 2026",
                    subtitle: "Preparati con il simulatore CEnT-S più realistico disponibile. Costruito per studenti internazionali che mirano alle migliori scuole di medicina in Italia.",
                    feature1: "Domande e struttura in stile esame reale",
                    feature2: "Simulazioni illimitate con risultati istantanei",
                    feature3: "Statistiche dettagliate per tracciare i progressi",
                    cta: "Esplora la Guida Definitiva"
                },
                exam_marketing_hub: {
                    badge: "Scegli il Tuo Percorso",
                    title: "ESAMI",
                    description: "Domina gli esami competitivi con i nostri moduli di formazione specializzati progettati per il successo."
                },
                imat_marketing: {
                    badge: "Formazione Medica d'Élite",
                    title: "IMAT 2026",
                    subtitle: "Unisciti alle migliaia di studenti che utilizzano il simulatore più avanzato d'Europa per l'IMAT 2026. Vivi test ad alta fedeltà con diagnostica dettagliata.",
                    feature1: "Contenuti Allineati al Curriculum 2026",
                    feature2: "Ambiente di Simulazione d'Esame Monitorato",
                    feature3: "Classifica e Benchmarking Globale",
                    cta_title: "Supera la tua PREP CENT-S & IMAT con ItaloStudy",
                    cta_desc: "Per eccellere nell'esame CENT-S 2026, gli studenti hanno bisogno di qualcosa di più dei semplici libri di testo: hanno bisogno di simulazioni realistiche, guida strutturata e simulazioni d'esame basate sul modello ufficiale CENT-S.",
                    cta: "Leggi la Guida IMAT"
                },
                about_cents: {
                    badge: "Cluster di Autorità Globale",
                    title: "Guida Definitiva all'Esame CENT-S 2026",
                    p1: "Navigare nel panorama della preparazione agli ingressi medici in Europa può scoraggiare, ma per gli studenti che mirano alle università pubbliche italiane, l'esame CENT-S 2026 rappresenta la pietra miliare più critica. Organizzato dal CISIA, il CENT-S (CEnT-S) è la qualifica di ingresso standard per i programmi medici internazionali insegnati in inglese nelle istituzioni più prestigiose d'Italia, tra cui l'Università Sapienza di Roma e l'Università di Milano.",
                    struct_title: "Struttura dell'Esame e Punteggio",
                    struct_p1: "La sessione 2026 del CEnT-S segue un rigoroso formato di 90 minuti contenente 60 domande a scelta multipla. Comprendere il peso di ogni sezione è fondamentale per la tua strategia di test pratico IMAT:",
                    stat_bio_label: "Biologia",
                    stat_bio_val: "23 Domande",
                    stat_chem_label: "Chimica",
                    stat_chem_val: "15 Domande",
                    stat_phys_label: "Fisica e Matematica",
                    stat_phys_val: "13 Domande",
                    stat_logic_label: "Logica e Cultura Generale",
                    stat_logic_val: "9 Domande",
                    scoring_note: "Sistema di Punteggio: +1 punto per le risposte corrette, -0.25 punti per le risposte errate e 0 punti per le domande saltate.",
                    p2: "Su ItaloStudy, forniamo una suite di simulazioni d'esame gratuite specificamente calibrate sul livello di difficoltà del 2026. A differenza delle risorse generiche, il nostro motore di test rispecchia l'esatta pressione e il carico cognitivo dell'ambiente ufficiale CISIA. Il nostro database di oltre 10.000 domande di pratica garantisce che nessun argomento, dalla biologia molecolare al ragionamento complesso sui testi, venga tralasciato.",
                    p3: "La preparazione per l'esame CENT-S 2026 richiede più della semplice memorizzazione; richiede velocità strategica e precisione accurata. I dati interni del nostro simulatore mostrano che la sezione 'Ragionamento su Testi e Dati' rimane il principale ostacolo per l'85% dei candidati. Integrando analisi dettagliate e difficoltà adattiva, ti aiutiamo a padroneggiare le sfumature del curriculum CISIA prima ancora di entrare nel centro d'esame.",
                    duration: "90 Minuti di Durata",
                    questions: "60 Domande a Scelta Multipla",
                    strat_title: "Strategia per Sezione",
                    strat_1: "Logica: 1,5 minuti per domanda. Focus sul riconoscimento dei pattern.",
                    strat_2: "Biologia: 45 secondi per domanda. Il richiamo rapido è fondamentale.",
                    strat_3: "Chimica: 1,2 minuti per domanda. Prima i calcoli.",
                    score_title: "Analisi del Punteggio Sicuro",
                    score_desc: "I dati storici per il 2024/2025 indicano:",
                    score_uni1_label: "Sapienza/Milano",
                    score_uni1_val: "52+ Punti",
                    score_uni2_label: "Bologna/Pavia",
                    score_uni2_val: "48+ Punti",
                    score_uni3_label: "Altre Università Pubbliche",
                    score_uni3_val: "42+ Punti",
                    fail_title: "Perché gli Studenti Falliscono l'Esame CENT-S",
                    fail_p1: "Statisticamente, il fallimento all'esame CENT-S 2026 è raramente dovuto a una mancanza di conoscenze scientifiche. Le nostre analisi su oltre 45.000 tentativi di simulazione mostrano che il 68% dei punti persi deriva da 'Indovinare alla cieca' e 'Stanchezza temporale'. Gli studenti spesso passano troppo tempo su un singolo puzzle logico, rimanendo con meno di 30 secondi per le domande critiche di biologia alla fine del foglio.",
                    skip_title: "Il Metodo del 'Salto Aggressivo'",
                    skip_p1: "Il nostro simulatore ti addestra a identificare e saltare istantaneamente le domande 'Vampiro del tempo'. In un sistema di punteggio basato sulle penalità (-0,25), saltare una domanda è spesso più vantaggioso che indovinare.",
                    comp_title: "CENT-S vs IMAT: Un Confronto della Difficoltà",
                    comp_p1: "Molti candidati chiedono: l'esame CENT-S è più difficile dell'IMAT? Sebbene il programma sia quasi identico, il formato CEnT-S (CISIA) pone una maggiore enfasi sul Ragionamento su Testi e Dati. L'IMAT presentava tradizionalmente domande di Cultura Generale più complesse, mentre il CEnT-S 2026 si concentra sull'applicazione dei principi scientifici in un ambiente sensibile al tempo.",
                    cta1: "Esplora il Programma 2026",
                    cta2: "Accedi alle Risorse di Studio Gratuite"
                },
                authority: {
                    badge: "Successo comprovato",
                    title_prefix: "La piattaforma più affidabile per gli ",
                    title_highlight: "studenti di medicina internazionali",
                    description: "Assicurarsi un posto nei prestigiosi programmi di medicina in Italia richiede più di un impegno individuale: richiede una piattaforma costruita sulla reale intelligenza degli esami.",
                    stats: {
                        mocks: "45.000+",
                        mocks_label: "Simulazioni Completate",
                        mocks_sub: "Negli ultimi 12 mesi",
                        countries: "120+",
                        countries_label: "Paesi Serviti",
                        countries_sub: "Base studentesca globale",
                        students: "15.000+",
                        students_label: "Studenti Attivi",
                        students_sub: "In preparazione ora",
                        rating: "4.9/5 Valutazione Trustpilot",
                        reviews: "Basato su oltre 2.100 recensioni verificate",
                        top_rated: "Top Rated 2025"
                    },
                    placement: {
                        title: "Statistiche di Collocamento",
                        cluster: "Ciclo di Ammissioni 2026",
                        live: "Tracciamento in Tempo Reale",
                        success: "Successo nel Collocamento",
                        first_choice: "94%",
                        first_choice_label: "Università di Prima Scelta",
                        cycle: "2026",
                        cycle_label: "Anno di Ammissione",
                        started: "50.000+",
                        started_label: "Simulazioni Iniziate",
                        universities: {
                            sapienza: "Università Sapienza di Roma",
                            milan: "Università di Milano",
                            bologna: "Università di Bologna",
                            pavia: "Università di Pavia"
                        }
                    }
                },
                why_us: {
                    badge: "La scelta preferita per",
                    title: "Perché i Migliori Studenti Scelgono ItaloStudy",
                    title_highlight: "",
                    benefits: {
                        calibration_title: "Calibrazione Sessione 2026",
                        calibration_desc: "Ogni domanda nel nostro database è rigorosamente allineata con le ultime specifiche delle sessioni CISIA e IMAT 2026, garantendo nessuna sorpresa il giorno dell'esame.",
                        adaptive_title: "Suite di Apprendimento Adattivo",
                        adaptive_desc: "Il nostro motore diagnostico si muove come te. Man mano che migliori, la difficoltà aumenta, individuando le tue aree deboli per una riabilitazione mirata.",
                        bank_title: "Banca di oltre 10.000 Domande di Pratica",
                        bank_desc: "Domina ogni concetto con la banca dati di domande allineata al curriculum più grande del mondo. Ogni risposta include logica dettagliata passo dopo passo e suddivisioni delle formule.",
                        simulation_title: "Vera Simulazione d'Esame",
                        simulation_desc: "Sperimenta la reale pressione del test con il nostro ambiente simulato monitorato, dotato di monitoraggio tramite webcam e vincoli temporali ufficiali per sezione.",
                        videos_title: "Lezioni Video sui Concetti",
                        videos_desc: "Impara dai migliori mentori medici con moduli video ad alta definizione che coprono l'intero programma, dalla Chimica Organica alle Fallacie Logiche.",
                        free_title: "Istruzione di Alta Qualità Gratuita",
                        free_desc: "Crediamo nelle pari opportunità. La nostra suite di preparazione principale, comprensiva di simulazioni d'esame e suddivisioni del programma, rimane gratuita per tutti gli studenti."
                    },
                    cta: "Leggi il Nostro Blog sulla Strategia di Ammissione"
                },
                trustpilot: {
                    avg_rating: "Valutazione Media: {{rating}}",
                    review_count: "{{count}} Recensioni",
                    show_less: "Mostra Meno",
                    read_more: "Leggi Tutto"
                },
                how_it_works: {
                    badge: "Come Funziona la Nostra Tecnologia",
                    title_prefix: "Un Unico Ecosistema. ",
                    title_highlight: "Padronanza Totale.",
                    description: "Colmiamo il divario tra apprendimento e prestazione con l'unica suite unificata per le ammissioni mediche.",
                    steps: {
                        registration_title: "Registrazione",
                        registration_desc: "Crea il tuo account ItaloStudy e seleziona il tuo esame target (CENT-S, IMAT o SAT) per calibrare la tua dashboard personalizzata.",
                        diagnostic_title: "Diagnosi AI",
                        diagnostic_desc: "Il nostro motore diagnostico identifica le tue lacune di conoscenza uniche in 5 materie, creando una tabella di marcia per lo studio basata sui dati.",
                        mastery_title: "Padronanza dei Concetti",
                        mastery_desc: "Guarda moduli video ad alta definizione guidati da esperti medici per padroneggiare concetti complessi di Biologia, Chimica e Logica.",
                        bank_title: "Banca di Pratica",
                        bank_desc: "Affina il tuo intuito con oltre 10.000 domande di pratica dotate di formule renderizzate matematicamente e spiegazioni logiche approfondite.",
                        mocks_title: "Simulazioni Monitorate",
                        mocks_desc: "Simula il vero giorno del test con il nostro ambiente monitorato ufficiale, dotato di timer rigorosi e dell'interfaccia d'esame autentica.",
                        precision_title: "Precisione Finale",
                        precision_desc: "Analizza le tue metriche 'tempo per domanda' e le mappe di calore per ottimizzare la tua strategia per la massima probabilità di ammissione."
                    }
                },
                insights: {
                    badge: "Insight Basato sui Dati",
                    title_prefix: "L'85% degli Studenti ha Difficoltà con ",
                    title_highlight: "Logica e Ragionamento",
                    description: "Sulla base di oltre 3.000 tentativi di simulazione, abbiamo identificato che il principale collo di bottiglia per i candidati medici non madrelingua è il Pensiero Critico. Il nostro motore adattivo prioritizza dinamicamente queste aree deboli ad alto rendimento.",
                    stat_value: "85%",
                    stat_label: "Tasso di Insuccesso nelle Sezioni di Logica",
                    source: "Fonte: Dati Interni ItaloStudy 2025"
                },
                seo_hub: {
                    title: "Pilastro delle Risorse CENT-S 2026",
                    description: "Guide complete e insight basati sui dati per le ammissioni alle scuole di medicina italiane.",
                    links: {
                        syllabus: "Programma CENT-S 2026",
                        pattern: "Modello d'Esame CENT-S",
                        cutoff: "Cutoff CENT-S 2026",
                        strategy: "Strategia di Preparazione",
                        past_papers: "Domande degli Anni Precedenti",
                        resources: "Risorse di Studio Gratuite"
                    }
                },
                global_challenge: {
                    badge: "Competizione dal Vivo",
                    title: "Unisciti alla ",
                    title_highlight: "Lega Globale",
                    description: "Competi con studenti ambiziosi di tutto il mondo in tempo reale. Metti alla prova le tue abilità, guadagna badge e scala la classifica.",
                    quiz: {
                        live_badge: "Sfida dal Vivo",
                        question_count: "Domanda {{current}} di {{total}}",
                        subject_label: "Materia",
                        check_answer: "Verifica Risposta",
                        outstanding: "Eccezionale! Hai indovinato.",
                        nice_try: "Bel tentativo! Continua così.",
                        next_challenge: "Prossima Sfida",
                        see_results: "Vedi Risultati",
                        complete_title: "Sfida Completata!",
                        score_summary: "Hai totalizzato {{score}} risposte corrette su {{total}}.",
                        try_again: "Riprova",
                        practice_more: "Esercitati di Più",
                        top_percent: "Incluso nel miglior 10% dei partecipanti globali oggi",
                        simulation_hint: "Prova la simulazione dal vivo",
                        subjects: {
                            logic: "Logica e Ragionamento",
                            math: "Matematica",
                            biology: "Biologia",
                            physics: "Fisica",
                            chemistry: "Chimica"
                        },
                        badges: {
                            rank_match: "Sfida di Grado",
                            speed_round: "Round Veloce",
                            daily_challenge: "Sfida Quotidiana",
                            concept_core: "Nucleo del Concetto",
                            lab_sprint: "Sprint di Laboratorio"
                        },
                        questions: {
                            logic: "Se stai correndo una gara e superi la persona in seconda posizione, in quale posizione ti trovi?",
                            math: "Se 2x + 5 = 15, qual è il valore di 3x - 1?",
                            biology: "Quale organello è noto come la centrale energetica della cellula?",
                            physics: "Qual è l'unità di misura della Forza nel SI?",
                            chemistry: "Qual è il valore del pH dell'acqua pura a 25°C?"
                        }
                    }
                },
                italy_cluster: {
                    badge: "La Strategia Definitiva",
                    title: "La Tua Roadmap per Studiare in Italia",
                    desc: "La strategia di ammissione più precisa e basata sui dati per gli studenti internazionali che mirano all'eccellenza italiana nel 2026.",
                    pillar1_title: "Strategia di Ammissione",
                    pillar1_desc: "Padroneggia il portale UniversItaly e il processo di legalizzazione obbligatorio DOV/CIMEA per il 2026.",
                    pillar2_title: "Selezione dell'Università",
                    pillar2_desc: "Confronta oltre 90 istituzioni pubbliche e private nelle principali città universitarie italiane come Milano, Roma e Pavia.",
                    pillar3_title: "Pianificazione Finanziaria",
                    pillar3_desc: "Sblocca le borse di studio DSU fino a 7.000 €/anno e comprendi le tasse delle università pubbliche in base al reddito.",
                    pillar4_title: "Protocollo Visto",
                    pillar4_desc: "Naviga tra i requisiti del visto per studenti di tipo D e le strategie di intervista in ambasciata con precisione.",
                    cta: "Leggi la Guida Accademica Completa"
                },
                video_review: {
                    badge: "Success Story degli Studenti",
                    title: "Risultati reali dai nostri studenti del 2026",
                    description: "Unisciti alle migliaia di candidati di successo che hanno utilizzato la nostra strategia guidata da esperti per dominare i loro esami.",
                    quote: "Il metodo ItaloStudy ha trasformato la mia preparazione. Sono passato dall'incertezza ad essere un candidato di alto livello.",
                    role: "Parte dell'Università di Padova",
                    verified: "Successo Verificato",
                    metric_label: "Punteggio CEnT-S"
                },

            },
            syllabus: {
                badge: "Padroneggia il Tuo Programma",
                title_prefix: "",
                title_highlight: "Progetto.",
                back_home: "Torna a Casa",
                exams: {
                    imat: {
                        title: "IMAT",
                        subtitle: "Ingresso Medicina (Internazionale)",
                        topic1: "Biologia e Chimica",
                        desc1: "Fondamenti medici di base e logica molecolare.",
                        topic2: "Matematica e Fisica",
                        desc2: "Ragionamento quantitativo e principi meccanici.",
                        topic3: "Pensiero Critico",
                        desc3: "Ragionamento logico e moduli di cultura generale."
                    },
                    sat: {
                        title: "SAT",
                        subtitle: "Standard College Board",
                        topic1: "Lettura e Scrittura",
                        desc1: "Lettura basata su prove e padronanza grammaticale.",
                        topic2: "Fondamenti Matematici",
                        desc2: "Algebra, geometria e strumenti quantitativi avanzati.",
                        topic3: "Analisi della Composizione",
                        desc3: "Strategie retoriche e valutazione testuale."
                    },
                    ielts: {
                        title: "IELTS",
                        subtitle: "Protocollo di Competenza Inglese",
                        topic1: "Ascolto e Lettura",
                        desc1: "Comprensione avanzata in contesti accademici.",
                        topic2: "Padronanza della Scrittura",
                        desc2: "Interpretazione dei dati e argomentazione.",
                        topic3: "Fluidità nel Parlato",
                        desc3: "Comunicazione coerente e ampiezza del vocabolario."
                    },
                    cents: {
                        title: "CEnT-S",
                        subtitle: "Eccellenza Tecnica e Industriale",
                        topic1: "Logica Ingegneristica",
                        desc1: "Risoluzione dei problemi per sfide tecniche moderne.",
                        topic2: "Scienze Applicate",
                        desc2: "Fisica e materiali per la certificazione industriale.",
                        topic3: "Metodologia",
                        desc3: "Analisi strutturale e protocolli specifici per l'esame."
                    },
                    'tolc-e': {
                        title: "TOLC-E",
                        subtitle: "Test di Ingresso Economia",
                        topic1: "Logica",
                        desc1: "Ragionamento analitico e risoluzione di problemi.",
                        topic2: "Lettura",
                        desc2: "Lettura critica e analisi del testo.",
                        topic3: "Matematica",
                        desc3: "Competenze quantitative e basi algebriche."
                    },
                    'til-i': {
                        title: "TIL-I",
                        subtitle: "Test di Ingresso Ingegneria",
                        topic1: "Matematica",
                        desc1: "Geometria avanzata, algebra e calcolo.",
                        topic2: "Fisica",
                        desc2: "Meccanica classica ed elettromagnetismo.",
                        topic3: "Logica e Lettura",
                        desc3: "Ragionamento tecnico e analisi completa."
                    }
                }
            },
            contact: {
                return: "Ritorna alla Base",
                hub: "Hub di Comunicazione v1.0",
                title_prefix: "Mettiti in",
                title_highlight: "Contatto.",
                desc: "Il nostro team di supporto esperto è pronto ad assisterti con ammissioni, supporto tecnico o dettagli sul programma.",
                support: {
                    title: "Supporto Diretto",
                    text: "Raggiungici tramite il nostro canale di comunicazione centrale per tutte le richieste dall'assistenza tecnica alle offerte di partnership:",
                    label: "Email Centrale"
                },
                protocol: {
                    title: "Protocollo di Risposta",
                    text: "Operiamo con capacità di risposta ad alta precisione per garantire che nessuno studente venga lasciato indietro.",
                    target: "OBIETTIVO",
                    time: "Risposta Entro 24 Ore",
                    note: "Nota: Il nostro team globale elabora le richieste 7 giorni su 7 per supportare gli studenti in tutti i fusi orari."
                },
                global: {
                    title: "Operazioni Globali",
                    text: "ItaloStudy è un ecosistema accademico decentralizzato che supporta studenti in oltre 30 paesi. La nostra infrastruttura digital-first garantisce l'accesso a insights di ammissione d'élite indipendentemente dalla tua posizione geografica.",
                    locs: {
                        milan: "Milano",
                        london: "Londra",
                        berlin: "Berlino",
                        global: "Supporto Globale"
                    }
                },
                footer: "COSTRUITO PER IL FUTURO DELL'ISTRUZIONE"
            },
            resources: {
                badge: "Archivio di Studio",
                title_prefix: "Risorse di",
                title_highlight: "Conoscenza",
                desc: "<0>Immergiti in materiali di studio, guide e documenti ufficiali per </0><1>{{exam}}</1><2>.</2>",
                search_placeholder: "Cerca guide, PDF o materiali...",
                empty: {
                    title: "Nessuna risorsa trovata",
                    desc: "Prova a selezionare una sezione d'esame diversa o una query di ricerca.",
                    clear: "Cancella Ricerca"
                },
                card: {
                    type: "MATERIALE",
                    default_desc: "Prendi il tuo compagno di studio e immergiti in questo materiale essenziale per la tua preparazione all'esame!",
                    download: "Scarica File",
                    view_resource: "Visualizza Risorsa"
                },
                load_more: "Carica Altro",
                share: {
                    title: "L'hai trovato utile? 🎒",
                    subtitle: "Condividi la magia con i tuoi compagni di studio!",
                    copied: "Link Copiato! ✨",
                    copied_desc: "Incollalo nella tua bio o invia un DM ai tuoi amici!"
                }
            },
            about: {
                title: "Chi Siamo",
                mission_title: "La Nostra Missione",
                mission_desc1: "ItaloStudy è stata fondata con un obiettivo chiaro: democratizzare la preparazione di alta qualità per gli esami di ammissione globali. Crediamo che ogni studente, indipendentemente dal proprio background, meriti l'accesso a risorse di livello mondiale che lo aiutino a eccellere in esami competitivi come IMAT, SAT, CEnT-S e IELTS.",
                mission_desc2: "La nostra piattaforma offre un ambiente di simulazione all'avanguardia che rispecchia le reali condizioni d'esame, consentendo agli studenti di acquisire sicurezza e affinare le proprie strategie attraverso una pratica illimitata e approfondimenti basati sui dati.",
                do_title: "Cosa Facciamo",
                do_desc: "Siamo specializzati nella creazione di ecosistemi di studio completi per studenti internazionali. I nostri servizi includono:",
                do_item1: "Simulatori d'Esame Avanzati",
                do_item1_desc: "Simulazioni realistiche per IMAT, SAT e altri.",
                do_item2: "Apprendimento Adattivo",
                do_item2_desc: "Banche dati di domande su misura che si evolvono con le tue prestazioni.",
                do_item3: "Supporto alle Ammissioni Universitarie",
                do_item3_desc: "Guida personalizzata per le domande universitarie in Italia e all'estero.",
                do_item4: "Community Globale di Studenti",
                do_item4_desc: "Uno spazio collaborativo per gli studenti per condividere risorse e successi.",
                leadership_title: "La Leadership",
                leadership_desc1: "ItaloStudy è di proprietà e gestita da Utkarsh Kumar Sharma.",
                leadership_desc2: "Spinto da una passione per l'istruzione e la tecnologia, Utkarsh ha immaginato una piattaforma che colmasse il divario tra studenti ambiziosi e il loro obiettivo di studiare in prestigiose università internazionali. Con un focus su trasparenza, credibilità ed eccellenza, guida la visione della piattaforma per essere il partner accademico più affidabile per gli studenti a livello globale.",
                office_title: "Sede Legale",
                office_address: "Sahyog Nagar, near shiva talkies, Ward No-19, Bharatpur, Rajasthan - 321001, India",
                contact_title: "Informazioni di Contatto",
                contact_desc: "Per richieste, supporto o partnership commerciali, contattaci:",
                commitment_title: "Il Nostro Impegno",
                commitment_desc: "Ci impegniamo a mantenere i più alti standard di integrità accademica e supporto agli studenti. ItaloStudy non è solo uno strumento di preparazione; è un partner nel tuo percorso di carriera. Aggiorniamo continuamente i nostri contenuti per riflettere i più recenti modelli d'esame e politiche di ammissione, assicurando che i nostri studenti rimangano all'avanguardia.",
                faq: {
                    title: "Domande Frequenti",
                    description: "Tutto quello che devi sapere sul ciclo di ammissioni 2026 e ItaloStudy.",
                    q1: "Quando sono le date degli esami 2026?",
                    a1: "Le date ufficiali vengono solitamente rilasciate all'inizio dell'anno. Consulta la nostra guida per il calendario più aggiornato.",
                    q2: "Posso prepararmi per più esami?",
                    a2: "Sì, la nostra piattaforma supporta la preparazione per più esami con moduli specializzati per ciascuno.",
                    q3: "Il simulatore è aggiornato per il 2026?",
                    a3: "Sì, tutti i contenuti e gli ambienti di simulazione sono completamente allineati al curriculum 2026.",
                    q4: "Cos'è una borsa di studio DSU?",
                    a4: "Una borsa di studio governativa in Italia che può coprire le tasse e fornire un sussidio per il mantenimento.",
                    q5: "Come scelgo l'università giusta?",
                    a5: "Usa il nostro strumento di selezione universitaria per confrontare gli istituti in base ai tuoi obiettivi.",
                    q6: "Devo parlare italiano?",
                    a6: "Per i programmi insegnati in inglese come l'IMAT, è sufficiente la conoscenza dell'inglese.",
                    q7: "Qual è il termine ultimo per la pre-iscrizione?",
                    a7: "Le scadenze variano a seconda dell'istituto, ma solitamente cadono tra aprile e luglio.",
                    q8: "Come funziona il sistema adattivo?",
                    a8: "Analizza le tue prestazioni e si concentra sulle tue aree più deboli per massimizzare il miglioramento.",
                    q9: "Posso accedere alla piattaforma da mobile?",
                    a9: "Sì, ItaloStudy è completamente responsive e funziona benissimo su tutti i dispositivi.",
                    q10: "C'è una prova gratuita?",
                    a10: "Sì, puoi iniziare a fare pratica GRATUITAMENTE con i nostri moduli base."
                },

            }
        }
    },
    tr: {
        translation: {
            settings: {
                title: "Ayarlar",
                account: "Hesap",
                account_sub: "Güvenlik bildirimleri, numara değiştir",
                privacy: "Gizlilik",
                privacy_sub: "Kişileri engelle, kaybolan mesajlar",
                subscription: "Abonelik",
                notifications: "Bildirimler",
                notifications_sub: "Mesaj, grup ve arama sesleri",
                language: "Uygulama Dili",
                language_sub: "Türkçe (cihaz dili)",
                appearance: "Görünüm",
                appearance_sub: "Tema, duvar kağıtları",
                help: "Yardım",
                help_sub: "Yardım merkezi, bize ulaşın, gizlilik politikası",
                invite: "Bir Arkadaşını Davet Et",
                logout: "Çıkış Yap",
                status: "Müsait • Çalışma Modu",
                account_edit: "Profili Düzenle",
                display_name: "Görünen Ad",
                username: "Kullanıcı Adı",
                save_profile: "Profili Kaydet",
                avatar_updated: "Profil resmi güncellendi!",
                profile_updated: "Profil başarıyla güncellendi.",
                privacy_options: {
                    last_seen: "Son Görülme",
                    profile_photo: "Profil Fotoğrafı",
                    about: "Hakkında",
                    status: "Durum",
                    read_receipts: "Okundu Bilgisi",
                    everyone: "Herkes",
                    contacts: "Kişilerim",
                    nobody: "Hiç kimse"
                },
                security: {
                    mfa: "İki Faktörlü Doğrulama",
                    change_password: "Şifre Değiştir",
                    google_managed: "Google tarafından yönetiliyor",
                    mfa_sub: "Ekstra güvenlik katmanı"
                }
            },
            menu: {
                main: "Ana Menü",
                history: "Çalışma Geçmişi",
                mock: "Deneme Sınavları",
                bookmarks: "Kaydedilen Sorular",
                labs: "3D Sanal Laboratuvarlar",
                apply: "Üniversite Başvurusu",
                community: "Çalışma Topluluğu",
                admin: "Yönetici Paneli",
                settings: "Uygulama Ayarları",
                logout: "Çıkış Yap",
                restricted: "Kısıtlı Erişim",
                online: "Durum: Çevrimiçi",
                exam_change: "Sınavı Değiştir",
                active_course: "Aktif Kurs",
                dashboard: "Panel"
            },
            dashboard: {
                daily_stats: "Günlük İstatistikler",
                solved: "Çözülen",
                accuracy: "Doğruluk",
                streak: "Gün Serisi",
                total_q: "Toplam Soru",
                recent_activity: "Son Hareketler",
                continue: "Devam Et",
                score: "Puan",
                champions_league: "Şampiyonlar Ligi",
                top_students: "En İyi Öğrenciler",
                mastery: "Konu Hakimiyeti",
                mastery_sub: "Güçlü yönlerinin analizi",
                weak: "Geliştirilmeli",
                strong: "Güçlü",
                average: "Ortalama",
                no_data: "Veri yok",
                start_practicing: "Pratiğe Başla"
            },
            common: {
                save: "Kaydet",
                cancel: "İptal",
                back: "Geri",
                loading: "Yükleniyor...",
                resources: "Kaynaklar",
                login: "Giriş Yap",
                start_free: "Ücretsiz Başlayın",
                numbers: {
                    first: "Birinci",
                    second: "İkinci",
                    third: "Üçüncü",
                    last: "Son"
                },
                logo_alt: "ItaloStudy Logosu - Üniversite Giriş Sınavı Hazırlığı"
            },
            nav: {
                method: "Metod",
                exams: "Sınavlar",
                resources: "Kaynaklar",
                pricing: "Fiyatlandırma",
                blog: "Blog",
                contact: "İletişim",
                login: "Giriş Yap",
                dashboard: "Panel",
                exam_items: {
                    cents: "CEnT-S",
                    imat: "IMAT",
                    tolce: "TOLC-E",
                    tili: "TIL-I"
                }
            },
            footer: {
                links: {
                    method: "Metod",
                    pricing: "Fiyatlandırma",
                    blog: "Blog",
                    contact: "İletişim"
                },
                cta_title: "İtalya'daki Yerinizi Ayırtmaya Hazır mısınız?",
                cta_desc: "2026 için en kesin kabul stratejisi."
            },
            method: {
                badge: "ItaloStudy Standardı",
                hero_title_prefix: "Akademik Mükemmellik için",
                hero_title_highlight: "Tasarlandı.",
                hero_desc: "Tıp ve bilim dallarında uzmanlaşmayı hızlandırmak için titizlikle tasarlanmış çok katmanlı bilişsel çerçevemiz.",
                steps: {
                    diagnostic_title: "Teşhis Aşaması",
                    diagnostic_desc: "Kapsamlı bir başlangıç teşhis değerlendirmesi ile tüm bilimsel alanlardaki bilişsel profilinizi belirliyoruz.",
                    training_title: "Akıllı Eğitim",
                    training_desc: "Özel öğrenme motorumuz, belirli bilgi açıklarınızı hedefleyen kişiselleştirilmiş soru setleri oluşturur.",
                    retention_title: "Bilgi Kalıcılığı",
                    retention_desc: "Sorular, kalıcı bilgi entegrasyonu ve uzmanlık sağlamak için matematiksel olarak en uygun aralıklarla tekrar karşınıza çıkar.",
                    mock_title: "Deneme Sınavları",
                    mock_desc: "Canlı gözetmen sistemleri ile resmi sınav koşullarında yüksek basınçlı pratik seansları yapın."
                },
                features: {
                    adaptive: "Uyarlanabilir Zorluk",
                    adaptive_desc: "Algoritmalarımız, performans verilerinize dayanarak soru karmaşıklığını saniye saniye dinamik olarak ayarlar.",
                    benchmarking: "Küresel Kıyaslama",
                    benchmarking_desc: "Bilgi kalıcılığı hızınızı ve doğruluğunuzu dünya çapındaki 12.000'den fazla öğrenciyle gerçek zamanlı olarak karşılaştırın.",
                    pattern: "Örüntü Tanıma",
                    pattern_desc: "Sadece gerçekleri öğretmiyoruz; beyninizi sınav sorularının arkasındaki mimari mantığı tanıyacak şekilde eğitiyoruz."
                },
                cta: {
                    title_prefix: "Hazır mısınız?",
                    title_highlight: "ItaloStudy Deneyimi",
                    subtitle: "Dünya çapındaki elit öğrencilerin saflarına katılın.",
                    button: "Pratiğe Başla"
                }
            },
            landing: {
                header: {
                    beta_free: "BETA ÜCRETSİZ"
                },
                hero: {
                    badge: "Yeni Nesil ITALOSTUDY EKİBİ",
                    title_prefix: "CENT-S ve IMAT Hazırlığını ",
                    title_highlight: "ItaloStudy ile Tamamla",
                    title_sub: "İtalya Giriş Sınavını Geçmenin En Akıllı Yolu",
                    description: "<0>Her zaman en iyi performansınızı sergilemeniz için tasarlanmış, </0><1/><2> hazırlığı için ihtiyacınız olan her şey — pratik, analiz ve rehberlik.</2>",
                    exam_placeholder: "Giriş Sınavlarına",
                    cta_start: "ÜCRETSİZ Başla",
                    cta_blog: "Blog Oku",
                    explore_blog: "Blogu Keşfet",
                    stats: {
                        pass_rate: "%98",
                        pass_rate_label: "Başarı Oranı",
                        students: "5.000+",
                        students_label: "Öğrenci",
                        mock_exams: "Uzman Rehberliğinde",
                        mock_exams_label: "Denemeler",
                        prep_rank: "#1",
                        prep_rank_label: "CEnT-S Hazırlık"
                    }
                },
                features: {
                    adaptive_title: "Uyarlanabilir Çalışma",
                    adaptive_desc: "Sistemimiz bilgi boşluklarınızı belirler ve herhangi bir sınav için özel bir yol oluşturur.",
                    simulation_title: "Sınav Simülasyonu",
                    simulation_desc: "Gerçek test ile birebir aynı ortamda pratik yapın. Sınav gününde sürpriz yok.",
                    ranked_title: "Öğrenci Sıralaması",
                    ranked_desc: "Performansınızı binlerce küresel aday ile gerçek zamanlı olarak karşılaştırın."
                },
                testimonials: {
                    badge: "Öğrenci Başarı Hikayeleri",
                    title: "Seçkinlere",
                    title_highlight: "Katılın.",
                    subtitle: "12.000'den fazla öğrenci ITALOSTUDY ile geleceklerini dönüştürdü. Akademik mükemmellik yolculuğunuz burada başlıyor.",
                    john_text: "Uyarlanabilir testler çalışma rutinimi değiştirdi. Tam olarak bilmediğim konulara odaklandım.",
                    john_role: "Tıp Öğrencisi",
                    anna_text: "Sınav simülasyonları inanılmaz derecede gerçekçi. Hazırlıklı ve kendinden emin hissettim.",
                    anna_role: "MBA Adayı"
                },
                faq: {
                    title: "Sıkça Sorulan Sorular",
                    subtitle: "Yaygın öğrenci sorularına hızlı cevaplar.",
                    description: "2026 kabul dönemi ve ItaloStudy hakkında bilmeniz gereken her şey.",
                    q1: "ItaloStudy, 2026 CENT-S tıp sınavına hazırlanmama nasıl yardımcı olur?",
                    a1: "ItaloStudy, 2026 İtalyan tıp giriş sınavları için özel olarak oluşturulmuş dünyanın en gelişmiş çalışma simülatörünü sunar. Platformumuz sınırsız gerçekçi deneme sınavları, kapsamlı geçmiş sınav kağıtları veritabanı ve detaylı yapay zeka destekli analizler sunar.",
                    q2: "ItaloStudy simülatörü uluslararası öğrenciler için gerçekten ücretsiz mi?",
                    a2: "Evet! Şu anda Küresel Beta aşamasındayız, bu da temel CENT-S ve IMAT çalışma simülatörlerimize erişimin tüm kullanıcılar için tamamen ücretsiz olduğu anlamına gelir.",
                    q3: "ItaloStudy deneme sınavları gerçek 2026 testiyle karşılaştırıldığında ne kadar doğrudur?",
                    a3: "Deneme sınavlarımız, tıp eğitimi uzmanları tarafından gerçek 2026 sınavlarının tam zorluk seviyelerini, konu dağılımını ve zamanlamasını yansıtacak şekilde titizlikle hazırlanmıştır.",
                    q4: "2026'da İtalya'da eğitim görmek için uluslararası öğrenciler için gereksinimler nelerdir?",
                    a4: "2026 için genellikle toplam 12 yıllık eğitim, İngilizce yeterliliği (IELTS/TOEFL) ve CENT-S veya IMAT gibi gerekli giriş sınavlarını geçmeniz gerekmektedir.",
                    q5: "2026'da İtalya'da ücretsiz veya burslu okumak mümkün mü?",
                    a5: "Evet! Çoğu uluslararası öğrenci, tam eğitim ücreti muafiyeti ve yılda 7.000 €'ya kadar nakit burs sağlayabilen DSU bursuna hak kazanır.",
                    q6: "ISEE nedir ve İtalya'daki eğitim ücretlerimi nasıl düşürür?",
                    a6: "ISEE, İtalyan üniversiteleri tarafından ekonomik durumunuzu değerlendirmek ve sizi en düşük eğitim ücreti dilimlerine dahil etmek için kullanılan finansal bir belgedir.",
                    q7: "2026'da İtalya için öğrenci vizesine nasıl başvurabilirim?",
                    a7: "Süreç, resmi UniversItaly portalında ön kayıtla başlar. Onaydan sonra, ülkenizdeki İtalyan Konsolosluğu'na Tip D Öğrenci Vizesi için başvurursunuz.",
                    q8: "İtalya'da uluslararası öğrenciler için İngilizce eğitim veren bölümler var mı?",
                    a8: "Evet, İtalya 2026 akademik yılı için Tıp, Mühendislik, Mimarlık ve Beşeri Bilimler dahil olmak üzere 500'den fazla İngilizce eğitim veren program sunmaktadır.",
                    q9: "2026'da İtalya'da okurken yarı zamanlı çalışabilir miyim?",
                    a9: "Evet, öğrenci vizesine sahip uluslararası öğrencilerin akademik yıl boyunca haftada 20 saate kadar çalışmasına yasal olarak izin verilir.",
                    q10: "2026'da İtalyan üniversiteleri için başvurular ne zaman açılıyor?",
                    a10: "Çoğu üniversite, 2026 alımı için ilk başvuru çağrısını Şubat ve Nisan 2026 arasında başlatır."
                },
                cents_marketing: {
                    badge: "Resmi tarzda hazırlık",
                    title: " <br/> <span>CEnT-S Sınavında</span> Uzmanlaşın",
                    subtitle: "Mevcut en gerçekçi CEnT-S simülatörüyle hazırlanın. İtalya'daki en iyi tıp fakültelerini hedefleyen uluslararası öğrenciler için tasarlandı.",
                    feature1: "Gerçek sınav tarzı sorular ve yapı",
                    feature2: "Anlık sonuçlarla sınırsız deneme testleri",
                    feature3: "İlerlemeyi izlemek için detaylı performans istatistikleri",
                    cta: "Nihai Kılavuzu Keşfedin"
                },
                exam_marketing_hub: {
                    badge: "Yolunuzu Seçin",
                    title: "SINAVLAR",
                    description: "Başarı için tasarlanmış özel eğitim modüllerimizle rekabetçi sınavlarda uzmanlaşın."
                },
                imat_marketing: {
                    badge: "Seçkin Tıp Eğitimi",
                    title: " <br/> <span>IMAT Sınavında</span> Uzmanlaşın",
                    subtitle: "IMAT 2026 için Avrupa'nın en gelişmiş simülatörünü kullanan binlerce öğrenciye katılın. Detaylı teşhislerle yüksek doğrulukta testi deneyimleyin.",
                    feature1: "2026 Müfredatına Uygun İçerik",
                    feature2: "Gözetimli Deneme Sınavı Ortamı",
                    feature3: "Küresel Sıralama ve Kıyaslama",
                    cta_title: "CENT-S & IMAT Hazırlığını ItaloStudy ile Tamamla",
                    cta_desc: "2026 CENT-S sınavında başarılı olmak için öğrencilerin ders kitaplarından daha fazlasına ihtiyacı var; gerçekçi deneme sınavlarına, yapılandırılmış rehberliğe ve resmi CENT-S modeline göre oluşturulmuş sınav düzeyinde simülasyonlara ihtiyaçları var.",
                    cta: "IMAT Kılavuzunu Oku"
                },
                about_cents: {
                    badge: "Küresel Yetki Kümesi",
                    title: "2026 CENT-S Sınavı İçin Nihai Kılavuz",
                    p1: "Avrupa'daki tıbbi giriş hazırlığı ortamında gezinmek göz korkutucu olabilir, ancak İtalyan devlet üniversitelerini hedefleyen öğrenciler için 2026 CENT-S sınavı en kritik kilometre taşıdır. CISIA tarafından düzenlenen CENT-S (CEnT-S), Roma Sapienza Üniversitesi ve Milano Üniversitesi dahil olmak üzere İtalya'nın en prestijli kurumlarında İngilizce olarak verilen uluslararası tıp programları için standart giriş niteliğidir.",
                    struct_title: "Sınav Yapısı ve Puanlama",
                    struct_p1: "CENT-S'nin 2026 oturumu, 60 çoktan seçmeli soru içeren 90 dakikalık katı bir formatı takip eder. Her bölümün ağırlığını anlamak, IMAT pratik testi stratejiniz için anahtardır:",
                    stat_bio_label: "Biyoloji",
                    stat_bio_val: "23 Soru",
                    stat_chem_label: "Kimya",
                    stat_chem_val: "15 Soru",
                    stat_phys_label: "Fisik ve Matematik",
                    stat_phys_val: "13 Soru",
                    stat_logic_label: "Mantık ve Genel Kültür",
                    stat_logic_val: "9 Soru",
                    scoring_note: "Puanlama Sistemi: Doğru cevaplar için +1 puan, yanlış cevaplar için -0,25 puan ve atlanan sorular için 0 puan.",
                    p2: "ItaloStudy'de, özellikle 2026 zorluk seviyesine göre kalibre edilmiş ücretsiz bir deneme sınavı paketi sunuyoruz. Genel kaynakların aksine, test motorumuz resmi CISIA ortamının tam baskısını ve bilişsel yükünü yansıtır. 10.000'den fazla pratik sorudan oluşan veritabanımız, moleküler biyolojiden metinler üzerindeki karmaşık akıl yürütmeye kadar hiçbir konunun dokunulmadan kalmamasını sağlar.",
                    p3: "2026 CENT-S sınavına hazırlanmak sadece ezberlemekten fazlasını gerektirir; stratejik hız ve kesin doğruluk gerektirir. Simülatörümüzün dahili verileri, 'Metinler ve Veriler Üzerinde Akıl Yürütme' bölümünün adayların %85'i için temel dar boğaz olmaya devam ettiğini göstermektedir. Detaylı analizleri ve uyarlanabilir zorluğu entegre ederek, sınav merkezine girmeden önce CISIA müfredatının inceliklerine hakim olmanıza yardımcı oluyoruz.",
                    duration: "90 Dakika Süre",
                    questions: "60 Çoktan Seçmeli Soru",
                    strat_title: "Bölüm Bazlı Strateji",
                    strat_1: "Mantık: Soru başına 1,5 dakika. Kalıp tanımaya odaklanın.",
                    strat_2: "Biyoloji: Soru başına 45 saniye. Hızlı hatırlama anahtardır.",
                    strat_3: "Kimya: Soru başına 1,2 dakika. Önce hesaplamalar.",
                    score_title: "Güvenli Puan Analizi",
                    score_desc: "2024/2025 için tarihsel veriler şunu göstermektedir:",
                    score_uni1_label: "Sapienza/Milano",
                    score_uni1_val: "52+ Puan",
                    score_uni2_label: "Bologna/Pavia",
                    score_uni2_val: "48+ Puan",
                    score_uni3_label: "Diğer Devlet Üniversiteleri",
                    score_uni3_val: "42+ Puan",
                    fail_title: "Öğrenciler Neden CENT-S Sınavında Başarısız Olur?",
                    fail_p1: "İstatistiksel olarak, 2026 CENT-S sınavındaki başarısızlık nadiren bilimsel bilgi eksikliğinden kaynaklanır. 45.000'den fazla deneme girişiminden elde ettiğimiz analizler, kayıp puanların %68'inin 'Kör Tahmin' ve 'Zaman Yorgunluğu'ndan kaynaklandığını gösteriyor. Öğrenciler genellikle tek bir mantık bulmacası üzerinde çok uzun zaman harcıyor ve kağıdın sonundaki kritik biyoloji soruları için 30 saniyeden daha az zamanları kalıyor.",
                    skip_title: "'Agresif Atlama' Yöntemi",
                    skip_p1: "Simülatörümüz sizi 'Zaman Vampiri' sorularını anında belirlemeniz ve atlamanız için eğitir. Ceza tabanlı bir puanlama sisteminde (-0,25), bir soruyu atlamak genellikle tahmin yürütmekten daha karlıdır.",
                    comp_title: "CENT-S vs IMAT: Zorluk Karşılaştırması",
                    comp_p1: "Birçok aday soruyor: CENT-S, IMAT'tan daha mı zor? Müfredat neredeyse aynı olsa da, CEnT-S (CISIA) formatı Metinler ve Veriler Üzerinde Akıl Yürütme konusuna daha fazla vurgu yapar. IMAT geleneksel olarak daha karmaşık Genel Kültür soruları içerirken, 2026 CEnT-S zamana duyarlı bir ortamda bilimsel ilkelerin uygulanmasına odaklanır.",
                    cta1: "2026 Müfredatını Keşfedin",
                    cta2: "Ücretsiz Çalışma Kaynaklarına Erişin"
                },
                authority: {
                    badge: "Kanıtlanmış Başarı",
                    title_prefix: "Uluslararası Tıp Öğrencileri İçin ",
                    title_highlight: "En Güvenilir Platform",
                    description: "İtalya'nın prestijli tıp programlarında bir yer edinmek bireysel çabadan daha fazlasını gerektirir — gerçek sınav zekası üzerine kurulu bir platform gerektirir.",
                    stats: {
                        mocks: "45.000+",
                        mocks_label: "Tamamlanan Denemeler",
                        mocks_sub: "Son 12 ayda",
                        countries: "120+",
                        countries_label: "Hizmet Verilen Ülke",
                        countries_sub: "Küresel öğrenci tabanı",
                        students: "15.000+",
                        students_label: "Aktif Öğrenciler",
                        students_sub: "Şu anda hazırlanan",
                        rating: "4.9/5 Trustpilot Puanı",
                        reviews: "2.100'den fazla doğrulanmış incelemeye dayanmaktadır",
                        top_rated: "En İyi 2025"
                    },
                    placement: {
                        title: "Yerleştirme İstatistikleri",
                        cluster: "2026 Kabul Dönemi",
                        live: "Canlı Takip",
                        success: "Yerleştirme Başarısı",
                        first_choice: "%94",
                        first_choice_label: "İlk Tercih Üniversite",
                        cycle: "2026",
                        cycle_label: "Kabul Yılı",
                        started: "50.000+",
                        started_label: "Başlatılan Denemeler",
                        universities: {
                            sapienza: "Roma Sapienza Üniversitesi",
                            milan: "Milano Üniversitesi",
                            bologna: "Bologna Üniversitesi",
                            pavia: "Pavia Üniversitesi"
                        }
                    }
                },
                why_us: {
                    badge: "Tercih Edilen Seçenek",
                    title: "En İyi Öğrenciler Neden ItaloStudy'yi Seçiyor?",
                    title_highlight: "",
                    benefits: {
                        calibration_title: "2026 Oturumu Kalibrasyonu",
                        calibration_desc: "Veritabanımızdaki her soru, en son 2026 CISIA ve IMAT oturum nitelikleriyle kesinlikle uyumludur ve sınav gününde sürpriz yaşanmamasını sağlar.",
                        adaptive_title: "Uyarlanabilir Öğrenme Paketi",
                        adaptive_desc: "Teşhis motorumuz sizinle birlikte hareket eder. Geliştikçe zorluk seviyesi artar ve hedefe yönelik rehabilitasyon için zayıf alanlarınızı belirler.",
                        bank_title: "10.000'den Fazla Pratik Soru Bankası",
                        bank_desc: "Dünyanın en büyük müfredat uyumlu soru bankasıyla her kavramda uzmanlaşın. Her cevap, detaylı adım adım mantık ve formül dökümlerini içerir.",
                        simulation_title: "Gerçek Deneme Simülasyonu",
                        simulation_desc: "Web kamerası izleme ve resmi bölüm süreli kısıtlamaları içeren gözetimli deneme ortamımızla gerçek test baskısını deneyimleyin.",
                        videos_title: "Kavram Video Dersleri",
                        videos_desc: "Organik Kimya'dan Mantıksal Hatalar'a kadar tüm müfredatı kapsayan yüksek çözünürlüklü video modülleriyle en iyi tıp mentorlarından öğrenin.",
                        free_title: "Ücretsiz Yüksek Kaliteli Eğitim",
                        free_desc: "Fırsat eşitliğine inanıyoruz. Deneme sınavları ve müfredat dökümleri dahil olmak üzere temel hazırlık paketimiz tüm öğrenciler için ücretsiz kalmaya devam ediyor."
                    },
                    cta: "Kabul Stratejisi Blogumuzu Oku"
                },
                trustpilot: {
                    avg_rating: "Ortalama Puan: {{rating}}",
                    review_count: "{{count}} Değerlendirme",
                    show_less: "Daha Az Göster",
                    read_more: "Devamını Oku"
                },
                how_it_works: {
                    badge: "Teknolojimiz Nasıl Çalışır?",
                    title_prefix: "Tek Ekosistem. ",
                    title_highlight: "Tam Hakimiyet.",
                    description: "Tıp kabulleri için tek birleşik paketle öğrenme ve performans arasındaki boşluğu dolduruyoruz.",
                    steps: {
                        registration_title: "Kayıt",
                        registration_desc: "ItaloStudy hesabınızı oluşturun ve kişiselleştirilmiş panelinizi kalibre etmek için hedef sınavınızı (CENT-S, IMAT veya SAT) seçin.",
                        diagnostic_title: "Yapay Zeka Teşhisi",
                        diagnostic_desc: "Teşhis motorumuz 5 dersteki benzersiz bilgi boşluklarınızı belirleyerek veri odaklı bir çalışma yol haritası oluşturur.",
                        mastery_title: "Kavram Hakimiyeti",
                        mastery_desc: "Karmaşık Biyoloji, Kimya ve Mantık kavramlarında uzmanlaşmak için tıp uzmanları tarafından yönetilen yüksek çözünürlüklü video modüllerini izleyin.",
                        bank_title: "Pratik Bankası",
                        bank_desc: "Matematiksel olarak işlenmiş formüller ve derinlemesine mantık açıklamaları içeren 10.000'den fazla pratik soruyla sezginizi keskinleştirin.",
                        mocks_title: "Gözetimli Denemeler",
                        mocks_desc: "Sıkı zamanlayıcılar ve gerçek sınav arayüzünü içeren resmi gözetimli ortamımızla gerçek test gününü simüle edin.",
                        precision_title: "Final Hassasiyeti",
                        precision_desc: "Maksimum kabul olasılığı için stratejinizi optimize etmek üzere 'soru başına süre' metriklerinizi ve ısı haritalarınızı analiz edin."
                    }
                },
                insights: {
                    badge: "Veri Odaklı İçgörü",
                    title_prefix: "Öğrencilerin %85'i ",
                    title_highlight: "Mantık ve Akıl Yürütmede Zorlanıyor",
                    description: "3.000'den fazla deneme girişimine dayanarak, ana dili İngilizce olmayan tıp adayları için birincil tıkanıklığın Eleştirel Düşünme olduğunu belirledik. Uyarlanabilir motorumuz bu yüksek verimli zayıf alanlara dinamik olarak öncelik verir.",
                    stat_value: "%85",
                    stat_label: "Mantık Bölümlerindeki Başarısızlık Oranı",
                    source: "Kaynak: ItaloStudy Dahili Verileri 2025"
                },
                seo_hub: {
                    title: "CENT-S 2026 Kaynak Sütunu",
                    description: "İtalyan Tıp fakültesi kabulleri için kapsamlı kılavuzlar ve veri odaklı içgörüler.",
                    links: {
                        syllabus: "CENT-S Müfredatı 2026",
                        pattern: "CENT-S Sınav Modeli",
                        cutoff: "CENT-S Baraj Puanı 2026",
                        strategy: "Hazırlık Stratejisi",
                        past_papers: "Geçmiş Yıl Soruları",
                        resources: "Ücretsiz Çalışma Kaynakları"
                    }
                },
                global_challenge: {
                    badge: "Canlı Yarışma",
                    title: "Küresel Lige",
                    title_highlight: "Katılın",
                    description: "Dünya çapındaki hırslı öğrencilerle gerçek zamanlı olarak yarışın. Becerilerinizi test edin, rozetler kazanın ve liderlik tablosunda yükselin.",
                    quiz: {
                        live_badge: "Canlı Meydan Okuma",
                        question_count: "Soru {{current}} / {{total}}",
                        subject_label: "Ders",
                        check_answer: "Cevabı Kontrol Et",
                        outstanding: "Harika! Doğru bildiniz.",
                        nice_try: "İyi deneme! Devam edin.",
                        next_challenge: "Sonraki Meydan Okuma",
                        see_results: "Sonuçları Gör",
                        complete_title: "Meydan Okuma Tamamlandı!",
                        score_summary: "{{total}} sorudan {{score}} doğru cevap verdiniz.",
                        try_again: "Tekrar Dene",
                        practice_more: "Daha Fazla Pratik Yap",
                        top_percent: "Bugün küresel katılımcıların en iyi %10'undasınız",
                        simulation_hint: "Canlı simülasyonu deneyin",
                        subjects: {
                            logic: "Mantık ve Akıl Yürütme",
                            math: "Matematik",
                            biology: "Biyoloji",
                            physics: "Fizik",
                            chemistry: "Kimya"
                        },
                        badges: {
                            rank_match: "Sıralama Maçı",
                            speed_round: "Hız Turu",
                            daily_challenge: "Günlük Meydan Okuma",
                            concept_core: "Kavram Çekirdeği",
                            lab_sprint: "Laboratuvar Sprinti"
                        },
                        questions: {
                            logic: "Bir yarışta koşuyorsanız ve ikinci sıradaki kişiyi geçerseniz, kaçıncı olursunuz?",
                            math: "Eğer 2x + 5 = 15 ise, 3x - 1'in değeri nedir?",
                            biology: "Hangi organel hücrenin enerji santrali olarak bilinir?",
                            physics: "Kuvvetin SI birimi nedir?",
                            chemistry: "25°C'de saf suyun pH değeri nedir?"
                        }
                    }
                },
                italy_cluster: {
                    badge: "Nihai Strateji",
                    title: "İtalya'da Eğitim Yol Haritanız",
                    desc: "2026 için İtalyan mükemmelliğini hedefleyen uluslararası öğrenciler için en hassas, veri destekli kabul stratejisi.",
                    pillar1_title: "Başvuru Stratejisi",
                    pillar1_desc: "2026 için UniversItaly portalı ve zorunlu DOV/CIMEA yasallaştırma sürecinde uzmanlaşın.",
                    pillar2_title: "Üniversite Seçimi",
                    pillar2_desc: "Milano, Roma ve Pavia gibi İtalya'nın en iyi öğrenci şehirlerindeki 90'dan fazla kurumu karşılaştırın.",
                    pillar3_title: "Finansal Planlama",
                    pillar3_desc: "Yıllık 7.000 €'ya varan DSU burslarının kilidini açın ve devlet üniversitesi harçlarını anlayın.",
                    pillar4_title: "Vize Protokolü",
                    pillar4_desc: "Tip D Öğrenci Vizesi gereksinimlerini ve elçilik mülakat stratejilerini hassasiyetle yönetin.",
                    cta: "Akademik Kılavuzun Tamamını Oku"
                },
                video_review: {
                    badge: "Öğrenci Başarı Hikayesi",
                    title: "2026 öğrencilerimizden gerçek sonuçlar",
                    description: "Sınavlarında uzmanlaşmak için uzman liderliğindeki stratejimizi kullanan binlerce başarılı adaya katılın.",
                    quote: "ItaloStudy yöntemi hazırlığımı dönüştürdü. Belirsizlikten üst düzey bir aday olmaya geçtim.",
                    role: "Padova Üniversitesi Üyesi",
                    verified: "Doğrulanmış Başarı",
                    metric_label: "CEnT-S Puanı"
                },
                method: {
                    badge: "ItaloStudy Standardı",
                    hero_title_prefix: "Akademik Mükemmellik İçin",
                    hero_title_highlight: "Tasarlandı.",
                    hero_desc: "Tıbbi ve bilimsel alanlarda uzmanlığı hızlandırmak için titizlikle tasarlanmış çok katmanlı bilişsel çerçevemiz.",
                    steps: {
                        diagnostic_title: "Tanısal Aşama",
                        diagnostic_desc: "Kapsamlı bir ilk tanısal değerlendirme ile tüm bilimsel alanlardaki bilişsel profilinizi belirliyoruz.",
                        training_title: "Akıllı Eğitim",
                        training_desc: "Özel öğrenme motorumuz, belirli bilgi boşluklarınızı hedefleyen kişiselleştirilmiş soru setleri oluşturur.",
                        retention_title: "Bilgi Kalıcılığı",
                        retention_desc: "Sorular, kalıcı bilgi entegrasyonu ve ustalığı sağlamak için matematiksel olarak en uygun aralıklarla yeniden görünür.",
                        mock_title: "Deneme Sınavları",
                        mock_desc: "Canlı gözetim sistemleri ile resmi sınav koşulları altında yüksek baskılı deneme oturumları gerçekleştirin."
                    },
                    features: {
                        adaptive: "Uyarlanabilir Yoğunluk",
                        adaptive_desc: "Algoritmalarımız, saniye saniye performans verilerinize dayanarak soru karmaşıklığını dinamik olarak ayarlar.",
                        benchmarking: "Küresel Kıyaslama",
                        benchmarking_desc: "Kalıcılık hızınızı ve doğruluğunuzu dünya çapında 12.000'den fazla öğrenciyle gerçek zamanlı olarak karşılaştırın.",
                        pattern: "Desen Tanıma",
                        pattern_desc: "Sadece gerçekleri öğretmiyoruz; beyninizi sınav sorularının mimari mantığını tanıması için eğitiyoruz."
                    },
                    cta: {
                        title_prefix: "Ustalaşmaya Hazır mısınız",
                        title_highlight: "ItaloStudy Deneyimi?",
                        subtitle: "Dünya çapındaki elit öğrenci seviyesine katılın.",
                        button: "Pratiği Başlat"
                    }
                }
            },
            syllabus: {
                badge: "Müfredatına Hakim Ol",
                title_prefix: "",
                title_highlight: "Taslak.",
                back_home: "Ana Sayfaya Dön",
                exams: {
                    imat: {
                        title: "IMAT",
                        subtitle: "Tıp Giriş (Uluslararası)",
                        topic1: "Biyoloji & Kimya",
                        desc1: "Temel tıbbi temeller ve moleküler mantık.",
                        topic2: "Matematica & Fizik",
                        desc2: "Nicel akıl yürütme ve mekanik prensipler.",
                        topic3: "Eleştirel Düşünme",
                        desc3: "Mantıksal akıl yürütme ve genel kültür modülleri."
                    },
                    sat: {
                        title: "SAT",
                        subtitle: "College Board Standardı",
                        topic1: "Okuma & Yazma",
                        desc1: "Kanıta dayalı okuma ve dilbilgisi ustalığı.",
                        topic2: "Matematik Temeli",
                        desc2: "Cebir, geometri ve ileri düzey nicel araçlar.",
                        topic3: "Kompozisyon Analizi",
                        desc3: "Retorik stratejiler ve metinsel değerlendirme."
                    },
                    ielts: {
                        title: "IELTS",
                        subtitle: "İngilizce Yeterlilik Protokolü",
                        topic1: "Dinleme & Okuma",
                        desc1: "Akademik bağlamlarda ileri düzey kavrama.",
                        topic2: "Yazma Ustalığı",
                        desc2: "Veri yorumlama ve argümantasyon.",
                        topic3: "Konuşma Akıcılığı",
                        desc3: "Tutarlı iletişim ve kelime dağarcığı aralığı."
                    },
                    cents: {
                        title: "CEnT-S",
                        subtitle: "Teknik & Endüstriyel Mükemmellik",
                        topic1: "Mühendislik Mantığı",
                        desc1: "Modern teknik zorluklar için problem çözme.",
                        topic2: "Uygulamalı Bilimler",
                        desc2: "Endüstriyel sertifikasyon için fizik ve malzemeler.",
                        topic3: "Metodoloji",
                        desc3: "Yapısal analiz ve sınava özel protokoller."
                    },
                    'tolc-e': {
                        title: "TOLC-E",
                        subtitle: "Ekonomi Giriş Sınavı",
                        topic1: "Mantık",
                        desc1: "Analitik akıl yürütme ve problem çözme.",
                        topic2: "Okuma",
                        desc2: "Eleştirel okuma ve metin analizi.",
                        topic3: "Matematik",
                        desc3: "Nicel beceriler ve cebirsel temeller."
                    },
                    'til-i': {
                        title: "TIL-I",
                        subtitle: "Mühendislik Giriş Sınavı",
                        topic1: "Matematik",
                        desc1: "İleri geometri, cebir ve kalkülüs.",
                        topic2: "Fizik",
                        desc2: "Klasik mekanik ve elektromanyetizma.",
                        topic3: "Mantık ve Okuma",
                        desc3: "Teknik akıl yürütme ve kapsamlı analiz."
                    }
                }
            },
            contact: {
                return: "Üsse Dön",
                hub: "İletişim Hub v1.0",
                title_prefix: "Bize",
                title_highlight: "Ulaşın.",
                desc: "Uzman destek ekibimiz kabuller, teknik destek veya program detayları konusunda size yardımcı olmaya hazır.",
                support: {
                    title: "Doğrudan Destek",
                    text: "Teknik yardımdan ortaklık tekliflerine kadar tüm sorularınız için merkezi iletişim kanalımız üzerinden bize ulaşın:",
                    label: "Merkezi E-posta"
                },
                protocol: {
                    title: "Yanıt Protokolü",
                    text: "Hiçbir öğrencinin geride kalmamasını sağlamak için yüksek hassasiyetli yanıt kapasitesiyle çalışıyoruz.",
                    target: "HEDEF",
                    time: "24 Saat İçinde Yanıt",
                    note: "Not: Küresel ekibimiz, tüm zaman dilimlerindeki öğrencileri desteklemek için haftanın 7 günü başvuruları işleme alır."
                },
                global: {
                    title: "Küresel Operasyonlar",
                    text: "ItaloStudy, 30'dan fazla ülkedeki öğrencileri destekleyen merkezi olmayan bir akademik ekosistemdir. Dijital öncelikli altyapımız, coğrafi konumunuz ne olursa olsun elit kabul bilgilerine erişmenizi sağlar.",
                    locs: {
                        milan: "Milano",
                        london: "Londra",
                        berlin: "Berlino",
                        global: "Küresel Destek"
                    }
                },
                footer: "EĞİTİMİN GELECEĞİ İÇİN İNŞA EDİLDİ"
            },
            resources: {
                badge: "Çalışma Kasası",
                title_prefix: "Bilgi",
                title_highlight: "Kaynakları",
                desc: "<1>{{exam}}</1><2> için çalışma materyallerine, kılavuzlara ve resmi belgelere göz atın.</2>",
                search_placeholder: "Kılavuz, PDF veya materyal ara...",
                empty: {
                    title: "Kaynak bulunamadı",
                    desc: "Farklı bir sınav bölümü seçmeyi veya arama terimini değiştirmeyi deneyin.",
                    clear: "Aramayı Temizle"
                },
                card: {
                    type: "MATERYAL",
                    default_desc: "Çalışma arkadaşını kap ve sınav hazırlığın için bu temel materyale dal!",
                    download: "Dosyayı İndir",
                    view_resource: "Kaynağı Görüntüle"
                },
                load_more: "Daha Fazla Yükle",
                share: {
                    title: "Bunu yararlı buldun mu? 🎒",
                    subtitle: "Sihri çalışma arkadaşlarınla paylaş!",
                    copied: "Bağlantı Kopyalandı! ✨",
                    copied_desc: "Biona yapıştır veya arkadaşlarına DM at!"
                }
            },
            about: {
                title: "Hakkımızda",
                mission_title: "Misyonumuz",
                mission_desc1: "ItaloStudy, küresel giriş sınavları için yüksek kaliteli hazırlığı demokratikleştirmek amacıyla net bir hedefle kurulmuştur. Geçmişi ne olursa olsun her öğrencinin IMAT, SAT, CEnT-S ve IELTS gibi rekabetçi sınavlarda başarılı olmalarına yardımcı olacak dünya standartlarında kaynaklara erişimi hak ettiğine inanıyoruz.",
                mission_desc2: "Platformumuz, gerçek sınav koşullarını yansıtan son teknoloji bir simülasyon ortamı sunarak öğrencilerin sınırsız uygulama ve veri odaklı içgörüler aracılığıyla özgüven kazanmalarına ve stratejilerini geliştirmelerine olanak tanır.",
                do_title: "Neler Yapıyoruz",
                do_desc: "Uluslararası öğrenciler için kapsamlı çalışma ekosistemleri oluşturma konusunda uzmanız. Hizmetlerimiz şunları içerir:",
                do_item1: "Gelişmiş Sınav Simülatörleri",
                do_item1_desc: "IMAT, SAT ve daha fazlası için gerçekçi deneme sınavları.",
                do_item2: "Uyarlanabilir Öğrenme",
                do_item2_desc: "Performansınızla birlikte gelişen kişiselleştirilmiş soru bankaları.",
                do_item3: "Üniversite Kabul Desteği",
                do_item3_desc: "İtalya ve ötesindeki üniversite başvuruları için kişiselleştirilmiş rehberlik.",
                do_item4: "Küresel Öğrenci Topluluğu",
                do_item4_desc: "Öğrencilerin kaynakları ve başarıları paylaşmaları için ortak bir alan.",
                leadership_title: "Liderlik",
                leadership_desc1: "ItaloStudy, Utkarsh Kumar Sharma tarafından kurulmuştur ve işletilmektedir.",
                leadership_desc2: "Eğitim ve teknolojiye olan tutkusuyla Utkarsh, hırslı öğrenciler ile onların prestijli uluslararası üniversitelerde eğitim görme hedefleri arasındaki köprü olacak bir platform hayal etti. Şeffaflık, güvenilirlik ve mükemmelliğe odaklanarak platformun küresel çapta öğrenciler için en güvenilir akademik ortak olma vizyonuna liderlik ediyor.",
                office_title: "Kayıtlı Ofis",
                office_address: "Sahyog Nagar, near shiva talkies, Ward No-19, Bharatpur, Rajasthan - 321001, Hindistan",
                contact_title: "İletişim Bilgileri",
                contact_desc: "Sorularınız, destek veya iş ortaklıkları için lütfen bize ulaşın:",
                commitment_title: "Taahhüdümüz",
                commitment_desc: "En yüksek akademik dürüstlük ve öğrenci desteği standartlarını sürdürmeye kararlıyız. ItaloStudy sadece bir hazırlık aracı değil; kariyer yolculuğunuzda bir ortaktır. Öğrencilerimizin her zaman önde olmalarını sağlamak için içeriklerimizi en son sınav modellerini ve kabul politikalarını yansıtacak şekilde sürekli güncelliyoruz.",
                faq: {
                    title: "Sıkça Sorulan Sorular",
                    description: "2026 kabul döngüsü ve ItaloStudy hakkında bilmeniz gereken her şey.",
                    q1: "2026 sınav tarihleri ne zaman?",
                    a1: "Resmi tarihler genellikle yılın başında açıklanır. En güncel program için rehberimize göz atın.",
                    q2: "Birden fazla sınava hazırlanabilir miyim?",
                    a2: "Evet, platformumuz her biri için özelleştirilmiş modüllerle çoklu sınav hazırlığını destekler.",
                    q3: "Simülatör 2026 için güncellendi mi?",
                    a3: "Evet, tüm içerik ve simülasyon ortamları 2026 müfredatıyla tam uyumludur.",
                    q4: "DSU bursu nedir?",
                    a4: "İtalya'da eğitim ücretini karşılayabilen ve yaşam giderleri için destek sağlayan bir devlet bursudur.",
                    q5: "Doğru üniversiteyi nasıl seçerim?",
                    a5: "Hedeflerinize göre kurumları karşılaştırmak için Üniversite Seçim aracımızı kullanın.",
                    q6: "İtalyanca konuşmam gerekiyor mu?",
                    a6: "IMAT gibi İngilizce eğitim veren programlar için sadece İngilizce yeterliliği gereklidir.",
                    q7: "Ön kayıt son tarihi nedir?",
                    a7: "Süreler kuruma göre değişmekle birlikte genellikle Nisan ve Temmuz ayları arasındadır.",
                    q8: "Uyarlanabilir sistem nasıl çalışır?",
                    a8: "Performansınızı analiz eder ve gelişimi en üst düzeye çıkarmak için zayıf alanlarınıza odaklanır.",
                    q9: "Platforma mobilden erişebilir miyim?",
                    a9: "Evet, ItaloStudy tamamen duyarlıdır ve tüm cihazlarda harika çalışır.",
                    q10: "Ücretsiz deneme var mı?",
                    a10: "Evet, temel modüllerimizle ÜCRETSİZ olarak pratiğe başlayabilirsiniz."
                },

            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            // order and from where user language should be detected
            order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupSessionStorage: 'i18nextLng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,
            // cache user language on
            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
