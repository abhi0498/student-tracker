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

export const getAlertByTaskId = async (id: string) => {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("task_id", id)
    .eq("is_sent", false)
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

export const fetchPendingTasks = async (searchText: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("User not found");

  const { data, error } = await supabase
    .from("tasks_student")
    .select("*")
    .eq("created_by", user.id)
    .neq("status", "completed")
    .or(`title.ilike.%${searchText}%,student_name.ilike.%${searchText}%`)
    .order("due_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};

export const fetchCompletedTasks = async (searchText: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("User not found");

  const { data, error } = await supabase
    .from("tasks_student")
    .select("*")
    .eq("created_by", user.id)
    .eq("status", "completed")
    .or(`title.ilike.%${searchText}%,student_name.ilike.%${searchText}%`)
    .order("due_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return data;
  }
};
