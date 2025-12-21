// import { Webhook } from "svix";
// import { User } from "../models/user.model.js";
// import { ENV } from "../config/env.js";

// export const clerkWebhook = async (req, res) => {
//   try {
//     const WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET;

//     if (!WEBHOOK_SECRET) {
//       throw new Error("CLERK_WEBHOOK_SECRET is required");
//     }

//     // Get the headers
//     const svix_id = req.headers["svix-id"];
//     const svix_timestamp = req.headers["svix-timestamp"];
//     const svix_signature = req.headers["svix-signature"];

//     // If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return res.status(400).json({ error: "Missing svix headers" });
//     }

//     // Get the body
//     const payload = req.body;
//     const body = JSON.stringify(payload);

//     // Create a new Svix instance with your secret.
//     const wh = new Webhook(WEBHOOK_SECRET);

//     let evt;

//     // Verify the payload with the headers
//     try {
//       evt = wh.verify(body, {
//         "svix-id": svix_id,
//         "svix-timestamp": svix_timestamp,
//         "svix-signature": svix_signature,
//       });
//     } catch (err) {
//       console.error("Error verifying webhook:", err);
//       return res.status(400).json({ error: "Webhook verification failed" });
//     }

//     // Handle the webhook
//     const eventType = evt.type;
//     console.log(`📩 Webhook received: ${eventType}`);

//     if (eventType === "user.created") {
//       const { id, email_addresses, first_name, last_name, image_url } =
//         evt.data;

//       const email =
//         email_addresses?.find((e) => e.id === evt.data.primary_email_address_id)
//           ?.email_address ||
//         email_addresses?.[0]?.email_address ||
//         "";

//       const userData = {
//         clerkId: id,
//         email: email,
//         name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
//         imageURL: image_url || "",
//         address: [],
//       };

//       // Use findOneAndUpdate with upsert to avoid duplicates
//       await User.findOneAndUpdate({ clerkId: id }, userData, {
//         upsert: true,
//         new: true,
//       });

//       console.log(`✅ User created/updated: ${email}`);
//     }

//     if (eventType === "user.updated") {
//       const { id, email_addresses, first_name, last_name, image_url } =
//         evt.data;

//       const email =
//         email_addresses?.find((e) => e.id === evt.data.primary_email_address_id)
//           ?.email_address ||
//         email_addresses?.[0]?.email_address ||
//         "";

//       await User.findOneAndUpdate(
//         { clerkId: id },
//         {
//           email: email,
//           name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
//           imageURL: image_url || "",
//         }
//       );

//       console.log(`✅ User updated: ${email}`);
//     }

//     if (eventType === "user.deleted") {
//       const { id } = evt.data;
//       await User.deleteOne({ clerkId: id });
//       console.log(`✅ User deleted: ${id}`);
//     }

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Webhook error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };
