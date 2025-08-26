// import { Inngest } from "inngest";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "pingup-app" });

// // Inngest Function to save user data to a database 

// const syncUserCreation = inngest.createFunction(
//     {id: 'sync-user-from-clerk'},
//     {event : 'clerk/user.created'},
//     async({event})=>{
//         const {id,first_name,last_name,email_addresses, image_url} = event.data
//         let username = email_addresses[0].email_addresses.split('@')[0]

//         // check availability of username 
// const user = await User.findOne({username})
// if(user) {
//     username = username + Math.floor(Math.random()*10000)
// }
// const userData = {
//     _id: id,
//     email: email_addresses[0].email_addresses,
//     full_name: first_name+ '' + last_name,
//     profile_picture: image_url,
//     username
// }

// await User.create(userData)
//     }
// )

// // Inngest Function to update user data in the database 

// const syncUserUpdation = inngest.createFunction(
//     {id: 'update-user-from-clerk'},
//     {event : 'clerk/user.updated'},
//     async({event})=>{
//         const {id,first_name,last_name,email_addresses, image_url} = event.data
//         let username = email_addresses[0].email_addresses.split('@')[0]

//        const updateUserData = {
//         email: email_addresses[0].email_addresses,
//         full_name: first_name + '' + last_name,
//         profile_picture: image_url
//        }
//        await User.findByIdAndUpdate(id,up)
//     }

// )


// // Inngest Function to delete user data in the database 

// const syncUserDeletion = inngest.createFunction(
//     {id: 'delete-user-from-clerk'},
//     {event : 'clerk/user.deleted'},
//     async({event})=>{
//         const {id} = event.data
//         let username = email_addresses[0].email_addresses.split('@')[0]

//       await User.findByIdAndDelete(id)
//     }

// )


// // Create an empty array where we'll export future Inngest functions
// export const functions = [
//     syncUserCreation, syncUserUpdation,syncUserDeletion
// ];



import { Inngest } from "inngest";
import { serve } from "inngest/next";
import User from "../models/User.js";

// ✅ Initialize Inngest client
export const inngest = new Inngest({ id: "pingup-app" });

// ✅ User creation sync
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!email_addresses || email_addresses.length === 0) {
        throw new Error("No email addresses found in event data");
      }

      let username = email_addresses[0].email_address.split("@")[0];

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        username = username + Math.floor(Math.random() * 10000);
      }

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        full_name: `${first_name} ${last_name}`,
        profile_picture: image_url,
        username,
      };

      await User.create(userData);
    } catch (error) {
      console.error("Error in syncUserCreation:", error);
      throw error;
    }
  }
);

// ✅ User update sync
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!email_addresses || email_addresses.length === 0) {
        throw new Error("No email addresses found in event data");
      }

      let username = email_addresses[0].email_address.split("@")[0];

      const updateUserData = {
        email: email_addresses[0].email_address,
        full_name: `${first_name} ${last_name}`,
        profile_picture: image_url,
        username,
      };

      await User.findByIdAndUpdate(id, updateUserData);
    } catch (error) {
      console.error("Error in syncUserUpdation:", error);
      throw error;
    }
  }
);

// ✅ User deletion sync
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;

      if (!id) {
        throw new Error("User id missing in delete event");
      }

      await User.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error in syncUserDeletion:", error);
      throw error;
    }
  }
);

// ✅ Export all functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];

// ✅ Correct way to export serve handler
export default serve({
  client: inngest,
  functions,
});
