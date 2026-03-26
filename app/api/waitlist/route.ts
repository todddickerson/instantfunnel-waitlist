import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, referredBy } = body;

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from("waitlist_entries")
      .select("email, referral_code, position")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      // Return existing entry info
      const { count } = await supabaseAdmin
        .from("waitlist_entries")
        .select("*", { count: "exact", head: true })
        .eq("referred_by", existing.referral_code);

      return Response.json({
        position: existing.position,
        referral_code: existing.referral_code,
        referral_count: count ?? 0,
        already_registered: true,
      });
    }

    const referralCode = nanoid(8);

    // Insert the new entry
    const { data: newEntry, error: insertError } = await supabaseAdmin
      .from("waitlist_entries")
      .insert({
        email: normalizedEmail,
        referral_code: referralCode,
        referred_by: referredBy || null,
      })
      .select("position, referral_code")
      .single();

    if (insertError) {
      // Handle unique constraint violation (race condition)
      if (insertError.code === "23505") {
        return Response.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      console.error("Insert error:", insertError);
      return Response.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    return Response.json({
      position: newEntry.position,
      referral_code: newEntry.referral_code,
      referral_count: 0,
      already_registered: false,
    });
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: entry, error } = await supabaseAdmin
      .from("waitlist_entries")
      .select("email, referral_code, position")
      .eq("email", normalizedEmail)
      .single();

    if (error || !entry) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const { count } = await supabaseAdmin
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true })
      .eq("referred_by", entry.referral_code);

    return Response.json({
      position: entry.position,
      referral_code: entry.referral_code,
      referral_count: count ?? 0,
    });
  } catch (err) {
    console.error("Waitlist GET error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
