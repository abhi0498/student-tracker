import { supabase } from "@/utils/supabase/client";

export const fetchStudentById = async (id: string) => {
  const { data, error } = await supabase
    .from("student")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};
