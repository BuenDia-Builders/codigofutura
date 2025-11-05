"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  Provider,
  Session,
  SupabaseClient,
  User,
  AuthChangeEvent,
  RealtimePostgresChangesPayload,
  RealtimeChannel,
} from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthHelpers = {
  signInWithPassword: (
    credentials: Parameters<SupabaseClient["auth"]["signInWithPassword"]>[0]
  ) => ReturnType<SupabaseClient["auth"]["signInWithPassword"]>;
  signInWithOtp: (
    credentials: Parameters<SupabaseClient["auth"]["signInWithOtp"]>[0]
  ) => ReturnType<SupabaseClient["auth"]["signInWithOtp"]>;
  signInWithOAuth: (
    provider: Provider,
    options?: Parameters<SupabaseClient["auth"]["signInWithOAuth"]>[0]["options"]
  ) => ReturnType<SupabaseClient["auth"]["signInWithOAuth"]>;
  signUp: (
    credentials: Parameters<SupabaseClient["auth"]["signUp"]>[0]
  ) => ReturnType<SupabaseClient["auth"]["signUp"]>;
  signOut: () => ReturnType<SupabaseClient["auth"]["signOut"]>;
  resetPasswordForEmail: (
    email: string,
    options?: Parameters<SupabaseClient["auth"]["resetPasswordForEmail"]>[1]
  ) => ReturnType<SupabaseClient["auth"]["resetPasswordForEmail"]>;
  updateUser: (
    attributes: Parameters<SupabaseClient["auth"]["updateUser"]>[0]
  ) => ReturnType<SupabaseClient["auth"]["updateUser"]>;
  getSession: () => Promise<Session | null>;
  getUser: () => Promise<User | null>;
};

type StorageHelpers = {
  uploadPublic: (
    bucket: string,
    path: string,
    file: File | Blob,
    options?: Parameters<ReturnType<SupabaseClient["storage"]["from"]>["upload"]>[2]
  ) => ReturnType<ReturnType<SupabaseClient["storage"]["from"]>["upload"]>;
  getPublicUrl: (
    bucket: string,
    path: string
  ) => string;
  download: (
    bucket: string,
    path: string
  ) => ReturnType<ReturnType<SupabaseClient["storage"]["from"]>["download"]>;
  remove: (
    bucket: string,
    paths: string[]
  ) => ReturnType<ReturnType<SupabaseClient["storage"]["from"]>["remove"]>;
};

type RealtimeHelpers = {
  subscribeToTable: (args: {
    schema?: string;
    table: string;
    event?: "INSERT" | "UPDATE" | "DELETE" | "*";
    filter?: string;
    callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void;
  }) => () => void;
};

type Profile = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

type ProfileHelpers = {
  getProfile: (userId: string) => Promise<Profile>;
  upsertProfile: (
    userId: string,
    updates: Record<string, unknown>
  ) => Promise<Profile>;
};

type SupabaseContextValue = {
  client: SupabaseClient;
  session: Session | null;
  user: User | null;
  isAuthReady: boolean;
  auth: AuthHelpers;
  storage: StorageHelpers;
  realtime: RealtimeHelpers;
  profile: ProfileHelpers;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getSupabaseBrowserClient(), []);

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await client.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setIsAuthReady(true);
    })();

    const { data: sub } = client.auth.onAuthStateChange((_event: AuthChangeEvent, currentSession: Session | null) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, [client]);

  const auth: AuthHelpers = useMemo(() => ({
    signInWithPassword: (credentials) => client.auth.signInWithPassword(credentials),
    signInWithOtp: (credentials) => client.auth.signInWithOtp(credentials),
    signInWithOAuth: (provider, options) => client.auth.signInWithOAuth({ provider, options }),
    signUp: (credentials) => client.auth.signUp(credentials),
    signOut: () => client.auth.signOut(),
    resetPasswordForEmail: (email, options) => client.auth.resetPasswordForEmail(email, options),
    updateUser: (attributes) => client.auth.updateUser(attributes),
    getSession: async () => (await client.auth.getSession()).data.session ?? null,
    getUser: async () => (await client.auth.getUser()).data.user ?? null,
  }), [client]);

  const storage: StorageHelpers = useMemo(() => ({
    uploadPublic: (bucket, path, file, options) => client.storage.from(bucket).upload(path, file, options),
    getPublicUrl: (bucket, path) => client.storage.from(bucket).getPublicUrl(path).data.publicUrl,
    download: (bucket, path) => client.storage.from(bucket).download(path),
    remove: (bucket, paths) => client.storage.from(bucket).remove(paths),
  }), [client]);

  const realtime: RealtimeHelpers = useMemo(() => ({
    subscribeToTable: ({ schema = "public", table, event = "*", filter, callback }) => {
      const channelName = `table:${schema}.${table}:${Math.random().toString(36).slice(2)}`;
      const ch: RealtimeChannel = client.channel(channelName);
      type ChannelWithPostgres = RealtimeChannel & {
        on: (
          event: "postgres_changes",
          opts: { event: "INSERT" | "UPDATE" | "DELETE" | "*"; schema: string; table: string; filter?: string },
          callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
        ) => RealtimeChannel;
      };
      const channel = (ch as unknown as ChannelWithPostgres)
        .on(
          "postgres_changes",
          { event, schema, table, filter },
          (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => callback(payload)
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    },
  }), [client]);

  const profile: ProfileHelpers = useMemo(() => ({
    async getProfile(userId: string) {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      return data as Profile;
    },
    async upsertProfile(userId: string, updates: Record<string, unknown>) {
      const payload = { id: userId, updated_at: new Date().toISOString(), ...updates };
      const { data, error } = await client.from("profiles").upsert(payload).select().single();
      if (error) throw error;
      return data as Profile;
    },
  }), [client]);

  const value = useMemo(() => ({
    client,
    session,
    user,
    isAuthReady,
    auth,
    storage,
    realtime,
    profile,
  }), [client, session, user, isAuthReady, auth, storage, realtime, profile]);

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabaseContext(): SupabaseContextValue {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabaseContext must be used within SupabaseProvider");
  return ctx;
}


