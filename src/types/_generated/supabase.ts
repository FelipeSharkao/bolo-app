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
        Relationships: [
          {
            foreignKeyName: "menu_entries_menu_id_fkey"
            columns: ["menu_id"]
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_entries_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "menu_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_entries_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "menus_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
