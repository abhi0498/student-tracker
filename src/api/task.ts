import { supabase } from "@/utils/supabase/client";

export const getTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from("tasks")
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

export const createTask = async (task: any) => {
  const { data, error } = await supabase.from("tasks").insert(task);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};
export const updateTask = async (task: any) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", task.id);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};
export const deleteTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return;
};

export const fetchTasksByStudentId = async (id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("student_id", id);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};