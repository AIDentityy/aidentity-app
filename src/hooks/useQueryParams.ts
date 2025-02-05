"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type QueryParams = {
  success: string | null;
  type: string | null;
  id: string | null;
  username: string | null;
  name: string | null;
  pfp: string | null;
  bio: string | null;
};

const useQueryParams = () => {
  const { setUser } = useUser();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    success: null,
    type: null,
    id: null,
    username: null,
    name: null,
    pfp: null,
    bio: null,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

    const params: QueryParams = {
      success: url.searchParams.get("success"),
      type: url.searchParams.get("type"),
      id: url.searchParams.get("id"),
      username: url.searchParams.get("username"),
      name: url.searchParams.get("name"),
      pfp: url.searchParams.get("pfp"),
      bio: url.searchParams.get("bio"),
    };

    setQueryParams(params);

    if (params.success && params.id && params.username && params.name) {
      setUser({
        id: params.id,
        username: params.username,
        name: params.name,
        pfp: params.pfp ? decodeURIComponent(params.pfp) : undefined,
        bio: params.bio ? decodeURIComponent(params.bio) : undefined,
      });

      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    }

    setIsReady(true);
  }, [setUser]);

  if (!isReady) {
    return { success: null, type: null, id: null, username: null, name: null, pfp: null };
  }

  return queryParams;
};

export default useQueryParams;
