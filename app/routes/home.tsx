import type { Route } from "./+types/home";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  ChevronDown,
  Eye,
  FolderOpen,
  Cpu,
  Code,
  PenLine,
  FileSpreadsheet,
  ClipboardList,
  Users,
  Award,
  Briefcase,
  Calendar,
} from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Anuj Upadhyay — AI Tools Expert" },
    {
      name: "description",
      content:
        "Portfolio of Anuj Upadhyay — AI Tools Expert specializing in AI Frameworks, Big Data, Content Writing, and Python.",
    },
    { property: "og:title", content: "Anuj Upadhyay — AI Tools Expert" },
    {
      property: "og:description",
      content:
        "AI Tools Expert specializing in AI Frameworks, Big Data, Content Writing, and Python.",
    },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <MyWorks />
      <Contact />
      <Footer />
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const links = [
    "Experience",
    "Projects",
    "Skills",
    "Certifications",
    "Showcase",
    "Contact",
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold">
          <span className="text-foreground">A</span>
          <span className="text-primary">U</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── X/Twitter Icon ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}


function RedditIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.047.282.116.399.199-.012 1.63-1.897 2.954-4.238 2.954-2.34 0-4.226-1.323-4.238-2.954a1.63 1.63 0 0 1 .399-.199c.132-.044.273-.063.414-.058a1.89 1.89 0 0 1 1.116.43 4.535 4.535 0 0 0 2.31.615 4.535 4.535 0 0 0 2.309-.615 1.89 1.89 0 0 1 1.116-.43c.14-.005.282.014.413.058zM8.727 12.91c0-.617.5-1.117 1.117-1.117s1.117.5 1.117 1.117-.5 1.117-1.117 1.117-1.117-.5-1.117-1.117zm4.312 0c0-.617.5-1.117 1.117-1.117s1.117.5 1.117 1.117-.5 1.117-1.117 1.117-1.117-.5-1.117-1.117zm7.746-2.164c0 .854-.693 1.547-1.547 1.547a1.54 1.54 0 0 1-1.048-.414c-1.076.738-2.504 1.21-4.08 1.278l.79-2.478 1.86.42a1.094 1.094 0 1 0 .123-.542l-2.08-.469a.37.37 0 0 0-.43.258l-.893 2.804c-1.617-.05-3.084-.52-4.182-1.271a1.54 1.54 0 0 1-1.048.414c-.854 0-1.547-.693-1.547-1.547 0-.602.344-1.122.847-1.38a2.872 2.872 0 0 1-.037-.459c0-2.444 2.845-4.427 6.35-4.427s6.35 1.983 6.35 4.427c0 .156-.013.31-.037.459.503.258.847.778.847 1.38z" />
    </svg>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
          Anuj{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent">
            Upadhyay
          </span>
        </h1>

        {/* Title */}

[697 more lines in file. Use offset=151 to continue.]