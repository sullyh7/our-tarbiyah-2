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
          email: string | null
          firstname: string | null
          id: string
          lastname: string | null
          onboarded_student: boolean | null
          onboarded_tutor: boolean | null
          phone: string | null
          stripe_account_id: string | null
          updated_at: string | null
          user_gender: Database["public"]["Enums"]["gender"] | null
        }
        Insert: {
          date_of_birth?: string | null
          email?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          onboarded_student?: boolean | null
          onboarded_tutor?: boolean | null
          phone?: string | null
          stripe_account_id?: string | null
          updated_at?: string | null
          user_gender?: Database["public"]["Enums"]["gender"] | null
        }
        Update: {
          date_of_birth?: string | null
          email?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          onboarded_student?: boolean | null
          onboarded_tutor?: boolean | null
          phone?: string | null
          stripe_account_id?: string | null
          updated_at?: string | null
          user_gender?: Database["public"]["Enums"]["gender"] | null
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
          cv_url: string | null
          dbs_url: string | null
          id: string
          qualifications: string[] | null
          status: Database["public"]["Enums"]["tutor_status"] | null
        }
        Insert: {
          created_at?: string
          cv_url?: string | null
          dbs_url?: string | null
          id: string
          qualifications?: string[] | null
          status?: Database["public"]["Enums"]["tutor_status"] | null
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          dbs_url?: string | null
          id?: string
          qualifications?: string[] | null
          status?: Database["public"]["Enums"]["tutor_status"] | null
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
