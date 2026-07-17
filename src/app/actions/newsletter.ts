"use server";

export async function subscribeToNewsletter(email: string) {
  // Validate email
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  try {
    // Make a direct request to the Resend API to add the contact to your Audience
    // We use standard fetch here so we don't even need to install the resend npm package!
    const res = await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        unsubscribed: false,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Resend API Error:", errorData);
      
      // Handle case where user is already subscribed
      if (errorData?.statusCode === 409 || errorData?.message?.includes("already exists")) {
        return { success: true }; // Treat as success so the user sees "Done"
      }
      
      return { success: false, error: "Failed to join the newsletter." };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Internal server error." };
  }
}
