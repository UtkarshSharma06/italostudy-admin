-- Allow authenticated users to delete their own QA posts

-- Policy for questions
CREATE POLICY "Users can delete own questions" ON public.qa_questions 
FOR DELETE USING (auth.uid() = user_id);

-- Policy for answers
CREATE POLICY "Users can delete own answers" ON public.qa_answers 
FOR DELETE USING (auth.uid() = user_id);
