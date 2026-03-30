import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const { code, email } = body;

  if (!code || typeof code !== "string") {
    return Response.json({ valid: false, error: "Code is required" }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: invite, error } = await supabaseAdmin
    .from("invites")
    .select("id, code, used_at")
    .eq("code", code.trim())
    .single();

  if (error || !invite) {
    return Response.json({ valid: false, error: "Invalid invite code" });
  }

  if (invite.used_at) {
    return Response.json({ valid: false, error: "This invite code has already been used" });
  }

  // Mark invite as used
  await supabaseAdmin
    .from("invites")
    .update({
      used_at: new Date().toISOString(),
      ...(email ? { email } : {}),
    })
    .eq("id", invite.id);

  return Response.json({ valid: true });
}
