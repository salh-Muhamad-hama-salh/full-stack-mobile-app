import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
  { id: "sync/user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();
      
      const data = event?.data;
      if (!data || !data.id) {
        throw new Error("Invalid event data");
      }

      // Handle email_addresses array properly
      const emailAddresses = data.email_addresses || [];
      const primaryEmailObj = emailAddresses.find(
        (e) => e?.id === data.primary_email_address_id
      );
      const email = primaryEmailObj?.email_address || emailAddresses[0]?.email_address || "";

      const newUser = {
        clerkId: data.id,
        email: email,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
        imageURL: data.image_url || "",
        address: [],
      };

      // Use upsert to avoid duplicate errors
      await User.findOneAndUpdate(
        { clerkId: data.id },
        newUser,
        { upsert: true, new: true }
      );

      console.log(`✅ User synced via Inngest: ${email}`);
      return { success: true, userId: data.id };
    } catch (error) {
      console.error("❌ Inngest sync error:", error.message);
      throw error;
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();
      const id = event?.data?.id;
      
      if (!id) {
        throw new Error("Missing user ID");
      }
      
      await User.deleteOne({ clerkId: id });
      console.log(`✅ User deleted via Inngest: ${id}`);
      return { success: true };
    } catch (error) {
      console.error("❌ Inngest delete error:", error.message);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];
