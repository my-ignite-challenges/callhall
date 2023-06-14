import { NextApiRequest, NextApiResponse } from "next";
import { Adapter } from "next-auth/adapters";
import { parseCookies, destroyCookie } from "nookies";

import { prisma } from "../prisma";

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user) {
      const { "@callhall:userId": userIdFromCookies } = parseCookies({ req });

      if (!userIdFromCookies) {
        throw new Error("User ID not found in cookies");
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userIdFromCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      destroyCookie({ res }, "@callhall:userId", {
        path: "/",
      });

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email!,
        emailVerified: null,
        avatar_url: updatedUser.avatar_url!,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email!,
        emailVerified: null,
        avatar_url: updatedUser.avatar_url!,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          token_type: account.token_type,
          expires_at: account.expires_at,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      });

      return {
        userId,
        sessionToken,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!session) {
        return null;
      }

      const { user, ...sessionData } = session;

      return {
        session: {
          userId: sessionData.user_id,
          expires: sessionData.expires,
          sessionToken: sessionData.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
        },
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      });

      return {
        sessionToken: updatedSession.session_token,
        userId: updatedSession.user_id,
        expires: updatedSession.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });
    },
  };
}
