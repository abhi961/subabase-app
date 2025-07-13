import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://roigorgvifpnsnalslob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvaWdvcmd2aWZwbnNuYWxzbG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDUwMTUsImV4cCI6MjA2Nzg4MTAxNX0.jMAfDB2HNpnC5jv_B2oe9mQezQy6bFPtiaNLSOeBiSo';

export const supabase = createClient(supabaseUrl, supabaseKey);