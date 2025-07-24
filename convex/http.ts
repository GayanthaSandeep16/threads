import {ActionCtx, httpAction, internalMutation} from "@/convex/_generated/server";
import {GenericActionCtx, HttpRouter, httpRouter} from "convex/server";
import {internal} from "@/convex/_generated/api";

const http:HttpRouter = httpRouter();

export const doSomething = httpAction(async (ctx:GenericActionCtx<any>, request:Request) => {
    const {data,type} = await  request.json();
    console.log(data)
    switch (type) {
        case 'user.created':
            await ctx.runMutation(internal.users.createUser,{
                email: data.email_address // fallback if present
                    || (data.email_addresses && data.email_addresses[0]?.email_address) // from array
                    || (data.external_accounts && data.external_accounts[0]?.email_address) // from external
                    || '', // fallback to empty string if not found (optional: handle error instead)
                clerkId: data.id,
                imageUrl: data.image_url,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username || `${data.first_name || 'user'}_${data.last_name}`,
                bio: data.bio,
                location: data.location,
                websiteUrl: data.website_url,
                followersCount: 0,
            })
            console.log("User created event received", data);
            break;
        case 'user.updated':
            console.log("User updated event received", data);
            break;
    }

    console.log("do something called");

    return new Response(null,{status: 200, statusText: 'OK'});
});

http.route({
    path:'/clerk-user-webhook',
    method: 'POST',
    handler: doSomething
})


export default  http;