import { useEffect, useState } from "react";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../Common/SummaryApi";

export default function SeoAdmin() {
  const [page, setPage] = useState("home");
  const [seo, setSeo] = useState({ title: "", description: "" });

  useEffect(() => {
    ApiClient({ ...SummaryApi.getSeo, url: `/seo/${page}` })
      .then(res => setSeo(res.data.data || {}));
  }, [page]);

  const save = async () => {
    await ApiClient({ ...SummaryApi.updateSeo, url: `/seo/${page}`, data: seo });
    alert("SEO updated");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">SEO</h1>

      <select value={page} onChange={e => setPage(e.target.value)}>
        <option value="home">Home</option>
        <option value="projects">Projects</option>
        <option value="about">About</option>
      </select>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Title"
        value={seo.title || ""}
        onChange={(e) => setSeo({ ...seo, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mt-2"
        placeholder="Description"
        value={seo.description || ""}
        onChange={(e) => setSeo({ ...seo, description: e.target.value })}
      />

      <button className="mt-2" onClick={save}>Save</button>
    </div>
  );
}
