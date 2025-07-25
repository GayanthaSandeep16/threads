import {internalMutation, query} from "@/convex/_generated/server";
import {v} from "convex/values";
import {async} from "rxjs";

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('users').collect();
    }
});

export const createUser = internalMutation({

    args:{
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.optional(v.string()),
        first_name: v.optional(v.string()),
        last_name: v.optional(v.string()),
        username: v.union(v.string(), v.null()),
        bio: v.optional(v.string()),
        location: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        followersCount: v.number(),
    },
    handler: async(ctx,args) =>{
        const userId = await ctx.db.insert('users',{
            ...args,
            username: args.username || `${args.first_name || 'user'}_${args.last_name}`,
        });
        return userId;
    },

});
export const getUserById = query({
    args: {
        userId: v.optional(v.id('users')),
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return null;
        }

        const user = await ctx.db.get(args.userId);



        // const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);

        return {
            ...user
        };
    },
});

export const getUserByClerkId = query({
    args: {
        clerkId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
            .unique();

        if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
            return user;
        }

        // const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);

        return {
            ...user
        };
    },
});

