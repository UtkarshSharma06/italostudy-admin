-- Fix RLS policies to allow content creation for IELTS modules

-- Reading Module
CREATE POLICY "Enable insert for authenticated users only" ON "public"."reading_tests" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."reading_tests" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."reading_tests" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."reading_passages" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."reading_passages" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."reading_passages" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."reading_questions" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."reading_questions" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."reading_questions" FOR DELETE TO "authenticated" USING (true);

-- Listening Module
CREATE POLICY "Enable insert for authenticated users only" ON "public"."listening_tests" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."listening_tests" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."listening_tests" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."listening_parts" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."listening_parts" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."listening_parts" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."listening_questions" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."listening_questions" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."listening_questions" FOR DELETE TO "authenticated" USING (true);

-- Writing Module
CREATE POLICY "Enable insert for authenticated users only" ON "public"."writing_tasks" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."writing_tasks" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."writing_tasks" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."writing_feedback" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."writing_feedback" FOR UPDATE TO "authenticated" USING (true);
