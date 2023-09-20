export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          date_of_birth: string | null
          email: string
          firstname: string
          id: string
          lastname: string
          onboarded_student: boolean | null
          onboarded_tutor: boolean | null
          phone: string
          stripe_account_id: string | null
          updated_at: string | null
          user_gender: Database["public"]["Enums"]["gender"]
        }
        Insert: {
          date_of_birth?: string | null
          email: string
          firstname: string
          id: string
          lastname: string
          onboarded_student?: boolean | null
          onboarded_tutor?: boolean | null
          phone: string
          stripe_account_id?: string | null
          updated_at?: string | null
          user_gender: Database["public"]["Enums"]["gender"]
        }
        Update: {
          date_of_birth?: string | null
          email?: string
          firstname?: string
          id?: string
          lastname?: string
          onboarded_student?: boolean | null
          onboarded_tutor?: boolean | null
          phone?: string
          stripe_account_id?: string | null
          updated_at?: string | null
          user_gender?: Database["public"]["Enums"]["gender"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tutor_profile: {
        Row: {
          created_at: string
          cv_url: string
          dbs_url: string
          id: string
          qualifications: string[]
          status: Database["public"]["Enums"]["tutor_status"]
        }
        Insert: {
          created_at?: string
          cv_url: string
          dbs_url: string
          id: string
          qualifications: string[]
          status?: Database["public"]["Enums"]["tutor_status"]
        }
        Update: {
          created_at?: string
          cv_url?: string
          dbs_url?: string
          id?: string
          qualifications?: string[]
          status?: Database["public"]["Enums"]["tutor_status"]
        }
        Relationships: [
          {
            foreignKeyName: "tutor_profile_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender: "male" | "female"
      tutor_status: "approved" | "rejected" | "waiting"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
