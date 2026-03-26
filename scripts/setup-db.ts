import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setup() {
  console.log("Creating waitlist_entries table...");

  const { error } = await supabase.rpc("exec_sql", {
    query: `
      CREATE TABLE IF NOT EXISTS waitlist_entries (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email text UNIQUE NOT NULL,
        referral_code text UNIQUE NOT NULL,
        referred_by text,
        position serial,
        created_at timestamptz DEFAULT now()
      );

      ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies
          WHERE tablename = 'waitlist_entries'
            AND policyname = 'Service role full access'
        ) THEN
          CREATE POLICY "Service role full access"
            ON waitlist_entries
            FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
        END IF;
      END
      $$;
    `,
  });

  if (error) {
    // If rpc doesn't exist, fall back to using the REST API to create the table
    console.log("rpc exec_sql not available, using Supabase REST approach...");
    console.log("Attempting direct table operations...");

    // Try inserting a dummy row to check if table exists
    const { error: checkError } = await supabase
      .from("waitlist_entries")
      .select("id")
      .limit(1);

    if (checkError && checkError.code === "42P01") {
      console.error(
        "Table does not exist. Please create it using the Supabase SQL editor:\n\n" +
          "CREATE TABLE IF NOT EXISTS waitlist_entries (\n" +
          "  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n" +
          "  email text UNIQUE NOT NULL,\n" +
          "  referral_code text UNIQUE NOT NULL,\n" +
          "  referred_by text,\n" +
          "  position serial,\n" +
          "  created_at timestamptz DEFAULT now()\n" +
          ");\n\n" +
          "ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;\n\n" +
          "CREATE POLICY \"Service role full access\" ON waitlist_entries FOR ALL TO service_role USING (true) WITH CHECK (true);"
      );
      process.exit(1);
    } else if (checkError) {
      console.error("Unexpected error:", checkError.message);
      process.exit(1);
    } else {
      console.log("Table already exists!");
    }
  } else {
    console.log("Table created successfully!");
  }
}

setup();
