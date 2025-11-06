"use client";
import { useCallback, useState } from "react";

export function useHelloWorld() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);

  const sayHello = useCallback(async (to: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hello-world", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setGreeting(data.greeting as string);
      return data.greeting as string;
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      setGreeting(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, greeting, sayHello };
}


