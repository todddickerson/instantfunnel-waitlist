import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabaseAdmin
    .from("app_config")
    .select("value")
    .eq("key", "signup_open")
    .single();

  if (error || !data) {
    // Default to closed if we can't read config
    return Response.json({ open: false });
  }

  return Response.json({ open: data.value === "true" });
}

export async function POST() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Close signup after the first user
  await supabaseAdmin
    .from("app_config")
    .update({ value: "false" })
    .eq("key", "signup_open");

  return Response.json({ ok: true });
}
