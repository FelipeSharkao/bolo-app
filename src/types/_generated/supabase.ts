export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      menu_entries: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_section: boolean
          max: number | null
          menu_id: number
          min: number | null
          parent_id: number | null
          price: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_section: boolean
          max?: number | null
          menu_id: number
          min?: number | null
          parent_id?: number | null
          price?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_section?: boolean
          max?: number | null
          menu_id?: number
          min?: number | null
          parent_id?: number | null
          price?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
      }
      menus: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
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
