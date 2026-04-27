-- Sample Practice Questions for Mathematics (CEN-S)
-- This seed file populates the practice_questions table with sample questions

INSERT INTO public.practice_questions (exam_type, subject, topic, question_text, options, correct_index, explanation, difficulty) VALUES
-- Algebra Questions
('CEN-S', 'Mathematics', 'Algebra', 'Solve for x: 2x + 5 = 13', 
 '["x = 2", "x = 4", "x = 6", "x = 8", "x = 10"]'::jsonb, 
 1, 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4', 'easy'),

('CEN-S', 'Mathematics', 'Algebra', 'If f(x) = 3x² - 2x + 1, what is f(2)?',
 '["7", "9", "11", "13", "15"]'::jsonb,
 1, 'f(2) = 3(2)² - 2(2) + 1 = 3(4) - 4 + 1 = 12 - 4 + 1 = 9', 'medium'),

('CEN-S', 'Mathematics', 'Algebra', 'Simplify: (x + 3)(x - 3)',
 '["x² - 9", "x² + 9", "x² - 6x + 9", "x² + 6x - 9", "2x"]'::jsonb,
 0, 'Using difference of squares: (a + b)(a - b) = a² - b²', 'medium'),

-- Geometry Questions
('CEN-S', 'Mathematics', 'Geometry', 'What is the area of a circle with radius 5?',
 '["25π", "10π", "5π", "50π", "100π"]'::jsonb,
 0, 'Area = πr² = π(5)² = 25π', 'easy'),

('CEN-S', 'Mathematics', 'Geometry', 'In a right triangle, if one leg is 3 and the other is 4, what is the hypotenuse?',
 '["5", "6", "7", "8", "9"]'::jsonb,
 0, 'Using Pythagorean theorem: c² = 3² + 4² = 9 + 16 = 25, so c = 5', 'easy'),

-- Calculus Questions
('CEN-S', 'Mathematics', 'Calculus', 'What is the derivative of x³?',
 '["3x²", "x²", "3x", "x³", "3x³"]'::jsonb,
 0, 'Using power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²', 'medium'),

('CEN-S', 'Mathematics', 'Calculus', 'Evaluate: ∫ 2x dx',
 '["x² + C", "2x² + C", "x²/2 + C", "2x + C", "x³ + C"]'::jsonb,
 0, 'Using power rule for integration: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', 'medium'),

-- Trigonometry Questions
('CEN-S', 'Mathematics', 'Trigonometry', 'What is sin(30°)?',
 '["1/2", "√3/2", "1", "0", "√2/2"]'::jsonb,
 0, 'sin(30°) = 1/2 is a standard trigonometric value', 'easy'),

('CEN-S', 'Mathematics', 'Trigonometry', 'If cos(θ) = 3/5 and θ is in the first quadrant, what is sin(θ)?',
 '["4/5", "3/5", "5/4", "2/5", "1/5"]'::jsonb,
 0, 'Using Pythagorean identity: sin²(θ) + cos²(θ) = 1, so sin(θ) = 4/5', 'medium'),

-- Statistics Questions
('CEN-S', 'Mathematics', 'Statistics', 'What is the mean of: 2, 4, 6, 8, 10?',
 '["6", "5", "7", "8", "4"]'::jsonb,
 0, 'Mean = (2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6', 'easy');

-- Physics Sample Questions
INSERT INTO public.practice_questions (exam_type, subject, topic, question_text, options, correct_index, explanation, difficulty) VALUES
('CEN-S', 'Physics', 'Mechanics', 'What is the SI unit of force?',
 '["Newton", "Joule", "Watt", "Pascal", "Hertz"]'::jsonb,
 0, 'The Newton (N) is the SI unit of force, defined as kg⋅m/s²', 'easy'),

('CEN-S', 'Physics', 'Mechanics', 'If an object has a mass of 5 kg and accelerates at 2 m/s², what is the net force?',
 '["10 N", "7 N", "3 N", "2.5 N", "5 N"]'::jsonb,
 0, 'Using F = ma: F = 5 kg × 2 m/s² = 10 N', 'easy'),

('CEN-S', 'Physics', 'Electromagnetism', 'What is the charge of an electron?',
 '["-1.6 × 10⁻¹⁹ C", "+1.6 × 10⁻¹⁹ C", "-1.6 × 10⁻²⁰ C", "0 C", "-3.2 × 10⁻¹⁹ C"]'::jsonb,
 0, 'The elementary charge of an electron is -1.6 × 10⁻¹⁹ coulombs', 'medium'),

('CEN-S', 'Physics', 'Thermodynamics', 'What is absolute zero in Celsius?',
 '["-273.15°C", "-100°C", "0°C", "-459.67°C", "-200°C"]'::jsonb,
 0, 'Absolute zero is 0 Kelvin, which equals -273.15°C', 'easy');

-- Chemistry Sample Questions
INSERT INTO public.practice_questions (exam_type, subject, topic, question_text, options, correct_index, explanation, difficulty) VALUES
('CEN-S', 'Chemistry', 'Atomic Structure', 'What is the atomic number of Carbon?',
 '["6", "12", "8", "14", "4"]'::jsonb,
 0, 'Carbon has 6 protons, giving it an atomic number of 6', 'easy'),

('CEN-S', 'Chemistry', 'Chemical Bonding', 'What type of bond is formed between Na and Cl in NaCl?',
 '["Ionic", "Covalent", "Metallic", "Hydrogen", "Van der Waals"]'::jsonb,
 0, 'Sodium (Na) transfers an electron to Chlorine (Cl), forming an ionic bond', 'easy'),

('CEN-S', 'Chemistry', 'Stoichiometry', 'How many moles are in 44g of CO₂? (Molar mass = 44 g/mol)',
 '["1 mol", "2 mol", "0.5 mol", "44 mol", "22 mol"]'::jsonb,
 0, 'Moles = mass / molar mass = 44g / 44 g/mol = 1 mol', 'medium');

-- Biology Sample Questions
INSERT INTO public.practice_questions (exam_type, subject, topic, question_text, options, correct_index, explanation, difficulty) VALUES
('CEN-S', 'Biology', 'Cell Biology', 'What is the powerhouse of the cell?',
 '["Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus", "Endoplasmic reticulum"]'::jsonb,
 0, 'Mitochondria produce ATP through cellular respiration, earning the nickname "powerhouse of the cell"', 'easy'),

('CEN-S', 'Biology', 'Genetics', 'What does DNA stand for?',
 '["Deoxyribonucleic Acid", "Deoxyribose Nucleic Acid", "Diribonucleic Acid", "Dynamic Nuclear Acid", "Dextrose Nucleic Acid"]'::jsonb,
 0, 'DNA is Deoxyribonucleic Acid, the molecule that carries genetic information', 'easy'),

('CEN-S', 'Biology', 'Ecology', 'What is the primary source of energy for most ecosystems?',
 '["The Sun", "Geothermal heat", "Chemical energy", "Nuclear energy", "Wind"]'::jsonb,
 0, 'The Sun provides energy for photosynthesis, which forms the base of most food chains', 'easy');
