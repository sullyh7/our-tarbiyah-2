export interface QualificationDto {
    id: number;
    name: string;
    subject: { id: number; name: string; }[];
    grade: { id: number; name: string; }[];
}

/*



npx supabase gen types typescript --project-id "jvifkuyyvnufbuksubly" --schema public > lib/database.types.ts
*/
