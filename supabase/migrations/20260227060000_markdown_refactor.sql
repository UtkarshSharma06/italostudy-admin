-- Refine Study in Italy 2026 Cluster with Markdown for better readability
-- Updates existing page_content with proper formatting (bold, lists, tables)

-- 1. Study in Italy Guide 2026
UPDATE page_content SET content = '
### 2026 Admissions Overview
Choosing Italy for your higher education in 2026 offers a unique blend of **historic academic excellence** and **modern innovation**. 

**Why choose Italy in 2026?**
*   **Low Tuition**: Public universities range from €156 to €4,000 per year.
*   **DSU Scholarships**: Regional grants covering nearly all living expenses.
*   **Post-Study Rights**: 1-year search-for-work permit after graduation.
*   **European Mobility**: Easy access to internships across the EU.

Italy is currently ranking as the **top destination** for value-to-quality ratio in higher education for international students.
' WHERE slug = 'study-italy-guide' AND field_key = 'section_overview_body';

UPDATE page_content SET content = '
### Academic & Legal Prerequisites
To apply for an Italian degree, you must meet several core criteria. It is essential to start your document preparation at least **8 months in advance**.

**Minimum Requirements:**
1.  **High School Diploma**: Must represent at least 12 years of total schooling.
2.  **Entry Exams**: Required for all restricted-access courses (IMAT, TOLC, TIL).
3.  **DOV or CIMEA**: Verification of your academic credentials by Italian authorities.
4.  **Language Proficiency**: B2 level in English or Italian (depending on the course).

> [!IMPORTANT]
> Students with only 10 or 11 years of schooling MUST complete a Foundation Year program in Italy to bridge the gap.
' WHERE slug = 'study-italy-guide' AND field_key = 'section_requirements_body';

-- 2. Universities in Italy for International Students
UPDATE page_content SET content = '
### Public vs. Private: A Decision Framework for 2026

Which should you choose? Consider the following table based on our 2026 internal admission data:

| Feature | Public Universities | Private Universities |
|---------|---------------------|----------------------|
| **Tuition** | €156 - €4,000 | €8,000 - €25,000 |
| **Class Size** | Large (100 - 300) | Small (20 - 50) |
| **Admission** | Entrance Exam (IMAT/CEnT-S) | School-Specific Exam |
| **Industry Links**| Standard | Integrated |
| **Facilities** | Historic/Traditional | Modern/Hospital-Linked |
| **Scholarships** | Regional (DSU) | Merit-Based (Internal) |

**Key 2026 Recommendation:**
If you are aiming for **Medicine**, Public Universities are vastly superior due to clinical exposure and residency placements. For **Business**, private schools like Bocconi offer stronger networking.
' WHERE slug = 'study-italy-universities' AND field_key = 'section_types_body';

UPDATE page_content SET content = '
### Highest Ranking Public Institutions (2026)

The following public universities represent the "Gold Standard" for international students:

1.  **University of Bologna (UNIBO)**: 
    *   *Strengths*: Europe oldest university, top-tier Law and Medicine.
    *   *Vibe*: Vibrant student city, very high international density.
2.  **University of Milan (Statale/Bicocca)**: 
    *   *Strengths*: Clinical excellence, high industry links.
3.  **Sapienza University of Rome**: 
    *   *Strengths*: Massive research output, Classics and Physics.
4.  **University of Padova**: 
    *   *Strengths*: Science and Medicine historic leaders.
5.  **Politecnico di Milano/Torino**: 
    *   *Strengths*: Unrivaled Engineering and Architecture ranking.

**Note on Ranking:** While overall rankings matter, in Italy, the **Subject Ranking** is more important. A lower-ranked city might have the best specific faculty for your major.
' WHERE slug = 'study-italy-universities' AND field_key = 'section_top_list_body';

-- 3. Study in Italy Without IELTS
UPDATE page_content SET content = '
### Common Language Exemptions (No IELTS Needed)

You do **not** necessarily need an IELTS score if you fall into one of these categories:

*   **Native English Speakers**: Students from the USA, UK, Canada, Australia, etc.
*   **Medium of Instruction (MOI)**: If your high school or undergraduate degree was taught 100% in English.
*   **Specific Qualifications**: IB Diploma (English A), IGCSE, or SAT scores with high EBRW components.
*   **Institutional Interviews**: Some universities (like Sapienza) may accept a Skype interview as proof of level.

**Verification Tip:** Always request an **Official MOI Certificate** from your school registrar on stamped letterhead.
' WHERE slug = 'study-italy-no-ielts' AND field_key = 'section_moe_body';

UPDATE page_content SET content = '
### The MOI Certificate: Your Secret Weapon
The **Medium of Instruction (MOI)** certificate is the most common way to bypass IELTS for Italy.

**What the MOI MUST include:**
1.  **Explicit Statement**: "All coursework, exams, and thesis were conducted in the English language."
2.  **Student Details**: Full name, Date of birth, and Roll number.
3.  **Degree Details**: Specific years of study.
4.  **Official Seal**: Must be signed and stamped by the Principal or Controller of Exams.

> [!WARNING]
> While universities may accept MOI, the **Italian Embassy** in your home country might still request a formal test record. Always check both!
' WHERE slug = 'study-italy-no-ielts' AND field_key = 'section_moi_body';

-- 4. Tuition Fees 2026
UPDATE page_content SET content = '
### Decoding the ISEE (Economic Indicator)
Public university fees in Italy are **income-based**. This is calculated using the ISEE Parificato.

*   **Low ISEE (< €25,000)**: You usually pay only the regional tax (~€156).
*   **Medium ISEE (€25k - €50k)**: Fees range from €500 to €1,800.
*   **High ISEE (> €50k)**: You pay the maximum fee (rarely above €4,000).

**Why this is good for you:** Most international students with average family incomes qualify for the lower brackets, often paying **under €1,000 per year**.
' WHERE slug = 'study-italy-tuition' AND field_key = 'section_calculation_body';

-- 5. How to Apply (Steps)
UPDATE page_content SET content = '
### Step 1: Pre-Assessment & Portal Signup
Before the formal window opens, you must secure an admission offer.

**Action Checklist:**
- [ ] Select 2-3 target universities.
- [ ] Upload Transcript of Records (ToR).
- [ ] Submit CV and Letter of Motivation.
- [ ] Pay the application fee (if applicable, usually €30 - €100).

Once you receive your **Admission Letter**, you move to the official UniversItaly portal.
' WHERE slug = 'study-italy-apply' AND field_key = 'section_preparation_body';

UPDATE page_content SET content = '
### Step 2: The UniversItaly Pre-Enrollment
This is the **mandatory** government step for all non-EU students.

**Required Steps:**
1.  **Account Creation**: Register on universitaly.it.
2.  **Course Selection**: Select the exact course and university from your offer letter.
3.  **Document Upload**: Passport, Diploma, and Admission Offer.
4.  **Embassy Selection**: Choose the Italian consulate where you will apply for the visa.

The university will review your request online and forward it to the Embassy.
' WHERE slug = 'study-italy-apply' AND field_key = 'section_universitaly_body';

UPDATE page_content SET content = '
### Step 3: Legalization & DOV
Your documents must be "translated" into the Italian system.

**Two main paths:**
*   **Declaration of Value (DOV)**: Issued by the Italian Embassy. Free for students in many regions.
*   **CIMEA Statement of Comparability**: A fast, online paid service (€150).

**Which to choose?** Check your university preference. Most medical schools now prefer **CIMEA** for faster processing during the September rush.
' WHERE slug = 'study-italy-apply' AND field_key = 'section_legalization_body';
" WHERE slug = 'study-italy-apply' AND field_key = 'section_legalization_body';
-- End of migration
