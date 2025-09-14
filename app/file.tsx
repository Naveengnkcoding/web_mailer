/ pages/index.tsx
import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const htmlDir = path.join(process.cwd(), "public", "static-pages");
  const files = fs.readdirSync(htmlDir).filter(f => f.endsWith(".html"));
  return { props: { files } };
}

export default function Home({ files }: { files: string[] }) {
  return (
    <ul>
      {files.map(file => (
        <li key={file}><a href={`/static-pages/${file}`}>{file}</a></li>
      ))}
    </ul>
  );
}