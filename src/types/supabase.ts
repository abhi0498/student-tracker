export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          is_sent: boolean
          notify_on: string
          sent_on: string | null
          task_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          is_sent?: boolean
          notify_on: string
          sent_on?: string | null
          task_id?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          is_sent?: boolean
          notify_on?: string
          sent_on?: string | null
          task_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_alerts_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_alerts_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks_student"
            referencedColumns: ["id"]
          }
        ]
      }
      student: {
        Row: {
          age: string | null
          batch: string | null
          created_at: string
          created_by: string
          email: string | null
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          age?: string | null
          batch?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
        }
        Update: {
          age?: string | null
          batch?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_student_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          due_date: string
          id: number
          status: string | null
          student_id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          due_date: string
          id?: number
          status?: string | null
          student_id: number
          title?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string
          id?: number
          status?: string | null
          student_id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_tasks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      tasks_student: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: number | null
          status: string | null
          student_age: string | null
          student_batch: string | null
          student_email: string | null
          student_id: number | null
          student_name: string | null
          student_phone: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_tasks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
