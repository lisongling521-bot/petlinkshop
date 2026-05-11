"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);
    if (!response.ok) {
      setError("ログインできませんでした。");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card mx-auto max-w-md p-6">
      <h1 className="text-2xl font-black">管理后台ログイン</h1>
      <label className="label mt-6">
        パスワード
        <input
          className="field"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error && <p className="mt-3 text-sm font-bold text-coral">{error}</p>}
      <button disabled={loading} className="btn-primary mt-6 w-full" type="submit">
        {loading ? "確認中..." : "ログイン"}
      </button>
      <p className="mt-4 text-xs leading-5 text-muted">初期パスワードは .env の ADMIN_PASSWORD で変更してください。</p>
    </form>
  );
}
