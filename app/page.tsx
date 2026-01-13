"use client";

import { useState } from "react";
import {
  User, Briefcase, Code, FileText, Github, Mail, Globe, Twitter, Linkedin,
  Search, X, BarChart3, Check, Copy, Download, Eye, Code2, Loader2,
  RefreshCw, Quote, Palette, Zap, Instagram, Youtube, Facebook,
  Twitch, MessageSquare, Coffee, Globe2, ExternalLink, AtSign,
  Hammer, Sparkles, Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TECH_STACK, HOBBIES } from "@/constants/tech-stack";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    location: "",
    email: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    reddit: "",
    twitch: "",
    youtube: "",
    discord: "",
    facebook: "",
    medium: "",
    devto: "",
    stackoverflow: "",
    buyMeACoffee: "",
    currentProject: "",
    currentProjectLink: "",
    learning: "",
    collaboration: "",
    helpWith: "",
    funFact: "",
    selectedBanner: "none",
    kofi: "",
    terminalBio: "",
  });

  const [selectedTech, setSelectedTech] = useState<typeof TECH_STACK>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<typeof HOBBIES>([]);
  const [customHobby, setCustomHobby] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState({
    githubStats: false,
    topLangs: false,
    streakStats: false,
    snakeAnimation: false,
    pacmanGraph: false,
    typingSVG: false,
    trophies: false,
    activityGraph: false,
    showVisitorCounter: false,
    marqueeTech: false,
    floatingIcons: false,
    glitchTyping: false,
  });
  const [customization, setCustomization] = useState({
    theme: "tokyonight",
    titleColor: "4F46E5",
    showQuote: false,
    quoteTheme: "dark",
  });
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showCreatorSocials, setShowCreatorSocials] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewProfile = () => {
    setIsUnlocked(false);
    setFormData({
      name: "",
      title: "",
      bio: "",
      location: "",
      email: "",
      website: "",
      github: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      reddit: "",
      twitch: "",
      youtube: "",
      discord: "",
      facebook: "",
      medium: "",
      devto: "",
      stackoverflow: "",
      buyMeACoffee: "",
      currentProject: "",
      currentProjectLink: "",
      learning: "",
      collaboration: "",
      helpWith: "",
      funFact: "",
      selectedBanner: "none",
      kofi: "",
      terminalBio: "",
    });
    setSelectedTech([]);
    setSelectedHobbies([]);
    setShowStats({
      githubStats: false,
      topLangs: false,
      streakStats: false,
      snakeAnimation: false,
      pacmanGraph: false,
      typingSVG: false,
      trophies: false,
      activityGraph: false,
      showVisitorCounter: false,
      marqueeTech: false,
      floatingIcons: false,
      glitchTyping: false,
    });
  };

  const toggleTech = (tech: (typeof TECH_STACK)[0]) => {
    setSelectedTech((prev) =>
      prev.find((t) => t.name === tech.name)
        ? prev.filter((t) => t.name !== tech.name)
        : [...prev, tech]
    );
  };

  const filteredTech = TECH_STACK.filter((tech) =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchGithubData = async () => {
    if (!formData.github) return;

    setIsFetching(true);
    try {
      const response = await fetch(`https://api.github.com/users/${formData.github}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          name: data.name || prev.name,
          bio: data.bio || prev.bio,
        }));
        setIsUnlocked(true);
      } else {
        // Even if fetch fails, we can unlock if they just want to proceed with the username
        setIsUnlocked(true);
      }
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setIsUnlocked(true);
    } finally {
      setIsFetching(false);
    }
  };

  const toggleHobby = (hobby: (typeof HOBBIES)[0]) => {
    setSelectedHobbies((prev) =>
      prev.find((h) => h.name === hobby.name)
        ? prev.filter((h) => h.name !== hobby.name)
        : [...prev, hobby]
    );
  };

  const handleAddCustomHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHobby.trim()) return;

    const newHobby = { name: customHobby.trim(), icon: "✨" };
    if (!selectedHobbies.find(h => h.name.toLowerCase() === newHobby.name.toLowerCase())) {
      setSelectedHobbies(prev => [...prev, newHobby]);
    }
    setCustomHobby("");
  };


  const getIconUrl = (tech: (typeof TECH_STACK)[0]) => {
    // Priority 1: Skill Icons (Very reliable for dev tech)
    if (tech.skillicon) {
      return `https://skillicons.dev/icons?i=${tech.skillicon.toLowerCase()}`;
    }
    // Priority 2: Simple Icons via jsDelivr (More stable than the default proxy)
    return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.icon}.svg`;
  };

  const calculateHealth = () => {
    let score = 0;
    if (formData.name) score += 20;
    if (formData.github) score += 20;
    if (formData.bio) score += 15;
    if (selectedTech.length > 0) score += 15;
    if (formData.email || formData.website || formData.linkedin) score += 15;
    if (formData.terminalBio) score += 5;
    return score;
  };




  const applyTemplate = (type: "minimalist" | "creative" | "pro") => {
    if (type === "minimalist") {
      setShowStats({
        githubStats: false,
        topLangs: false,
        streakStats: false,
        snakeAnimation: false,
        pacmanGraph: false,
        typingSVG: false,
        trophies: false,
        activityGraph: false,
        showVisitorCounter: false,
        marqueeTech: false,
        floatingIcons: false,
        glitchTyping: false,
      });
      setCustomization(prev => ({ ...prev, selectedBanner: "none", showQuote: false }));
    } else if (type === "creative") {
      setShowStats(prev => ({ ...prev, snakeAnimation: true, typingSVG: true, showVisitorCounter: true }));
      setFormData(prev => ({ ...prev, selectedBanner: "wave" }));
    } else if (type === "pro") {
      setShowStats(prev => ({ ...prev, githubStats: true, topLangs: true, trophies: true }));
    }
  };

  const generateMarkdown = () => {
    const sections: string[] = [];

    // Headers and Banner
    if (formData.selectedBanner !== "none") {
      sections.push(`<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=${formData.selectedBanner}&color=auto&height=200&section=header&text=${encodeURIComponent(formData.name || "ReadMeForge")}&fontSize=90" />\n</p>`);
      sections.push(`---`);
    }

    sections.push(`Hi <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px">, I'm ${formData.name || "Your Name"}`);

    if (formData.bio) {
      sections.push(`> ${formData.bio}`);
    }

    if (formData.terminalBio) {
      sections.push(`<p align="center">\n<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=4F46E5&center=true&vCenter=true&width=700&lines=${encodeURIComponent(formData.terminalBio)}" />\n</p>`);
    }

    sections.push(`---`);

    // Typing effect (Animation)
    if (showStats.glitchTyping) {
      const lines = [formData.title || "Developer", formData.learning || "Learning New Tech", "Open Source Contributor"];
      sections.push(`<div align="center">\n  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=35&pause=1000&color=F0F&center=true&vCenter=true&width=600&lines=${lines.map(l => encodeURIComponent(l)).join(";")}" alt="Glitch Typing SVG" />\n</div>`);
      sections.push(`---`);
    } else if (showStats.typingSVG) {
      sections.push(`<div align="center">\n  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=4F46E5&center=true&vCenter=true&width=435&lines=${encodeURIComponent(formData.title || "Developer")};${encodeURIComponent(formData.learning || "Learning New Tech")};Open+Source+Contributor" alt="Typing SVG" />\n</div>`);
      sections.push(`---`);
    }

    // About Me
    sections.push(`💫 About Me:`);
    if (formData.currentProject) {
      sections.push(`🔭 I'm currently working on [${formData.currentProject}](${formData.currentProjectLink || "#"})`);
    }
    if (formData.collaboration) {
      sections.push(`👯 I'm looking to collaborate on ${formData.collaboration}`);
    }
    if (formData.helpWith) {
      sections.push(`🤝 I'm looking for help with ${formData.helpWith}`);
    }
    if (formData.learning) {
      sections.push(`🌱 I'm currently learning ${formData.learning}`);
    }
    if (formData.funFact) {
      sections.push(`⚡ Fun fact: ${formData.funFact}`);
    }
    sections.push(`---`);

    // Technology Stack & Visuals
    if (selectedTech.length > 0) {
      sections.push(`💻 Tech Stack:`);
      if (showStats.marqueeTech) {
        const skillSlugs = selectedTech
          .map(tech => tech.skillicon ? tech.skillicon.toLowerCase() : null)
          .filter(Boolean)
          .join(",");

        if (skillSlugs) {
          sections.push(`<p align="center">\n<img src="https://skillicons.dev/icons?i=${skillSlugs}" />\n</p>`);
        } else {
          const badges = selectedTech.map(tech =>
            `![${tech.name}](https://img.shields.io/badge/${tech.name.replace(/ /g, "%20")}-${tech.color}?style=for-the-badge&logo=${tech.icon}&logoColor=white)`
          ).join(" ");
          sections.push(badges);
        }
      } else if (showStats.floatingIcons) {
        const floatingIcons = selectedTech.map((tech) =>
          `<img src="${getIconUrl(tech)}" width="40" height="40" alt="${tech.name}"/>`
        ).join(" ");
        sections.push(`<p align="center">\n${floatingIcons}\n</p>`);
      } else {
        const badges = selectedTech.map(tech =>
          `![${tech.name}](https://img.shields.io/badge/${tech.name.replace(/ /g, "%20")}-${tech.color}?style=for-the-badge&logo=${tech.icon}&logoColor=white)`
        ).join(" ");
        sections.push(badges);
      }
      sections.push(`---`);
    }



    // Hobbies
    if (selectedHobbies.length > 0) {
      sections.push(`🎨 Hobbies:`);
      sections.push(selectedHobbies.map(h => `${h.icon} ${h.name}`).join(" • "));
      sections.push(`---`);
    }

    // Socials
    if (formData.github || formData.twitter || formData.linkedin || formData.instagram || formData.reddit || formData.twitch || formData.email || formData.youtube || formData.discord || formData.facebook || formData.medium || formData.devto || formData.stackoverflow || formData.buyMeACoffee) {
      sections.push(`🌐 Socials:`);
      const socials = [];
      if (formData.instagram) socials.push(`[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/${formData.instagram})`);
      if (formData.linkedin) socials.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/${formData.linkedin})`);
      if (formData.reddit) socials.push(`[![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?logo=Reddit&logoColor=white)](https://reddit.com/user/${formData.reddit})`);
      if (formData.twitch) socials.push(`[![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/${formData.twitch})`);
      if (formData.twitter) socials.push(`[![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/${formData.twitter})`);
      if (formData.youtube) socials.push(`[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@${formData.youtube})`);
      if (formData.discord) socials.push(`[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?logo=Discord&logoColor=white)](https://discord.com/users/${formData.discord})`);
      if (formData.facebook) socials.push(`[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/${formData.facebook})`);
      if (formData.medium) socials.push(`[![Medium](https://img.shields.io/badge/Medium-%2312100E.svg?logo=Medium&logoColor=white)](https://medium.com/@${formData.medium})`);
      if (formData.devto) socials.push(`[![Dev.to](https://img.shields.io/badge/dev.to-%230A0A0A.svg?logo=devdotto&logoColor=white)](https://dev.to/${formData.devto})`);
      if (formData.stackoverflow) socials.push(`[![StackOverflow](https://img.shields.io/badge/StackOverflow-%23F48024.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/${formData.stackoverflow})`);
      if (formData.email) socials.push(`[![email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:${formData.email})`);
      if (formData.buyMeACoffee) socials.push(`[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/${formData.buyMeACoffee})`);
      if (formData.kofi) socials.push(`[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/${formData.kofi})`);
      sections.push(socials.join(" "));
      sections.push(`---`);
    }

    // Visitor Counter
    if (showStats.showVisitorCounter && formData.github) {
      sections.push(`![Visitors](https://komarev.com/ghpvc/?username=${formData.github}&color=blue)`);
      sections.push(`---`);
    }

    // Snake Animation
    if (showStats.snakeAnimation) {
      sections.push(`<!-- Snake Game Repo View -->\n\n<div align="center">\n  <img src="https://profile-readme-generator.com/assets/snake.svg" alt="Snake animation" />\n</div>`);
      sections.push(`---`);
    }

    // Pacman Graph
    if (formData.github && showStats.pacmanGraph) {
      sections.push(`![](https://github-readme-activity-graph.vercel.app/graph?username=${formData.github}&theme=pacman)`);
      sections.push(`---`);
    }

    // Modern Activity Graph
    if (formData.github && showStats.activityGraph) {
      sections.push(`### 📈 Activity Graph:\n\n![](https://github-readme-activity-graph.vercel.app/graph?username=${formData.github}&theme=react-dark)`);
      sections.push(`---`);
    }

    // GitHub Stats & Trophies
    if (formData.github && (showStats.githubStats || showStats.topLangs || showStats.streakStats || showStats.trophies)) {
      sections.push(`📊 GitHub Stats:`);

      const theme = customization.theme;

      if (showStats.trophies) {
        sections.push(`![Trophies](https://github-profile-trophy-mirror.vercel.app/?username=${formData.github}&theme=${theme})`);
      }

      if (showStats.githubStats) {
        sections.push(`![GitHub Stats](https://github-readme-stats-sigma-five.vercel.app/api?username=${formData.github}&show_icons=true&theme=${theme}&include_all_commits=true&count_private=true)`);
      }

      if (showStats.streakStats) {
        sections.push(`![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${formData.github}&theme=${theme})`);
      }

      if (showStats.topLangs) {
        sections.push(`![Top Languages](https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${formData.github}&theme=${theme}&show_icons=true&include_all_commits=true&count_private=true&layout=compact)`);
      }

      sections.push(`---`);
    }

    return sections.join("\n\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateMarkdown());
    setCopySuccess(true);
    setShowCopyModal(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generateMarkdown()], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Copy Success Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Markdown Copied!</h3>
              <p className="text-slate-600 mb-8">
                Your README is ready to be pasted into your GitHub profile. If you enjoyed using this tool, please consider supporting the creator!
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.buymeacoffee.com/ayush_wg218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#FFDD00] text-black font-bold py-3 rounded-xl hover:bg-[#FFCC00] transition-all border border-[#e2c601]"
                >
                  <Coffee className="w-5 h-5" />
                  Buy Me a Coffee
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/AyushPandey218"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://x.com/ayushwh_182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white font-medium py-3 rounded-xl hover:bg-[#1a91da] transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowCopyModal(false)}
                className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-700">
              ReadMeForge
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border",
                copySuccess
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Markdown
                </>
              )}
            </button>
            <div className="flex items-center gap-2">
              <a
                href="https://www.buymeacoffee.com/ayush_wg218"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex bg-[#FFDD00] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FFCC00] transition-colors items-center gap-2 border border-[#e2c601]"
              >
                <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" className="w-4 h-4" />
                Buy me a coffee
              </a>
              <a
                href="https://github.com/AyushPandey218"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Visit Creator
              </a>

              <div className="relative">
                <button
                  onClick={() => setShowCreatorSocials(!showCreatorSocials)}
                  className="bg-white border border-slate-200 text-slate-700 p-2 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center"
                  title="Connect with Creator"
                >
                  <Globe2 className="w-5 h-5" />
                </button>

                {showCreatorSocials && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowCreatorSocials(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                      <a
                        href="https://x.com/ayushwh_182"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                        Twitter / X
                      </a>
                      <a
                        href="https://www.linkedin.com/in/ayushpandey0618/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                      <a
                        href="https://www.instagram.com/ayush_wg218/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                      <div className="border-t border-slate-100 my-1" />
                      <a
                        href="mailto:ayushpandey0618@gmail.com"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email Me
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-2xl border-2 border-indigo-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Github className="w-24 h-24 text-indigo-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Get Started</h2>
                    <p className="text-sm text-slate-500">Enter your GitHub username to start crafting</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          onKeyDown={(e) => e.key === 'Enter' && !isUnlocked && fetchGithubData()}
                          placeholder="your-github-username"
                          disabled={isUnlocked}
                          className={cn(
                            "w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg font-medium",
                            isUnlocked && "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
                          )}
                        />
                      </div>
                      <div className="flex gap-2">
                        {!isUnlocked ? (
                          <button
                            onClick={fetchGithubData}
                            disabled={isFetching || !formData.github}
                            className="flex-1 sm:flex-none bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                          >
                            {isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                            Unlock Generator
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={fetchGithubData}
                              disabled={isFetching}
                              className="flex-1 sm:flex-none bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                            >
                              {isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                              Sync Data
                            </button>
                            <button
                              onClick={handleNewProfile}
                              className="flex-1 sm:flex-none bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                            >
                              <User className="w-5 h-5" />
                              New Profile
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {!isUnlocked ? (
              <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white p-4 rounded-full shadow-sm">
                  <Zap className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Customization Locked</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Please enter your GitHub username above to start building your profile README.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Profile Health */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-slate-900">Profile Health</h3>
                    </div>
                    <span className={cn(
                      "text-sm font-bold px-3 py-1 rounded-full",
                      calculateHealth() < 50 ? "bg-amber-100 text-amber-700" :
                        calculateHealth() < 80 ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                    )}>
                      {calculateHealth()}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-500 rounded-full",
                        calculateHealth() < 50 ? "bg-amber-500" :
                          calculateHealth() < 80 ? "bg-blue-500" :
                            "bg-green-500"
                      )}
                      style={{ width: `${calculateHealth()}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {calculateHealth() < 100
                      ? "Complete more sections to improve your profile's professional score."
                      : "Outstanding! Your profile is fully optimized."}
                  </p>
                </div>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Start with a Template</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "minimalist", label: "Minimalist", icon: User, desc: "Clean & Text" },
                      { id: "creative", label: "Creative", icon: Sparkles, desc: "Visual & Fun" },
                      { id: "pro", label: "Professional", icon: Briefcase, desc: "Data & Projects" },
                    ].map((template) => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template.id as any)}
                        className="group flex flex-col items-center p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-center"
                      >
                        <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                          <template.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 mb-1">{template.label}</span>
                        <span className="text-[10px] text-slate-500">{template.desc}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Personal Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Full Stack Developer"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-slate-700">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell the world about yourself..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">About Me Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Working on</label>
                        <input
                          type="text"
                          name="currentProject"
                          value={formData.currentProject}
                          onChange={handleChange}
                          placeholder="Project name"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Project Link</label>
                        <input
                          type="text"
                          name="currentProjectLink"
                          value={formData.currentProjectLink}
                          onChange={handleChange}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Looking to collaborate on</label>
                      <input
                        type="text"
                        name="collaboration"
                        value={formData.collaboration}
                        onChange={handleChange}
                        placeholder="Open-source web apps, etc."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Looking for help with</label>
                      <input
                        type="text"
                        name="helpWith"
                        value={formData.helpWith}
                        onChange={handleChange}
                        placeholder="Optimizing backend structure"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Learning</label>
                      <input
                        type="text"
                        name="learning"
                        value={formData.learning}
                        onChange={handleChange}
                        placeholder="Next.js, Rust, etc."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Fun Fact</label>
                      <input
                        type="text"
                        name="funFact"
                        value={formData.funFact}
                        onChange={handleChange}
                        placeholder="I break my projects 10 times a day..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Code className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Tech Stack</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search technologies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                      {filteredTech.map((tech) => {
                        const isSelected = selectedTech.find((t) => t.name === tech.name);
                        return (
                          <button
                            key={tech.name}
                            onClick={() => toggleTech(tech)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all",
                              isSelected
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            )}
                          >
                            <img
                              src={getIconUrl(tech)}
                              alt={tech.name}
                              className="w-4 h-4"
                            />
                            {tech.name}
                          </button>
                        );
                      })}
                    </div>

                    {selectedTech.length > 0 && (
                      <div className="pt-4 border-t space-y-4">
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                            Selected ({selectedTech.length})
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {selectedTech.map((tech) => (
                              <div
                                key={tech.name}
                                className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700"
                              >
                                <img
                                  src={getIconUrl(tech)}
                                  alt={tech.name}
                                  className="w-3 h-3"
                                />
                                {tech.name}
                                <button
                                  onClick={() => toggleTech(tech)}
                                  className="hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Tech Stack Visuals</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "marqueeTech", label: "Marquee", description: "Infinite Scroll" },
                              { id: "floatingIcons", label: "Floating", description: "3D Animation" },
                            ].map((anim) => (
                              <button
                                key={anim.id}
                                onClick={() => {
                                  if (anim.id === "marqueeTech") {
                                    setShowStats(prev => ({ ...prev, marqueeTech: !prev.marqueeTech, floatingIcons: false }));
                                  } else {
                                    setShowStats(prev => ({ ...prev, floatingIcons: !prev.floatingIcons, marqueeTech: false }));
                                  }
                                }}
                                className={cn(
                                  "flex flex-col items-start p-2 rounded-lg border text-left transition-all",
                                  showStats[anim.id as keyof typeof showStats]
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                )}
                              >
                                <span className="font-bold text-[10px] leading-tight">{anim.label}</span>
                                <span className={cn("text-[8px] leading-tight", showStats[anim.id as keyof typeof showStats] ? "text-indigo-100" : "text-slate-400")}>{anim.description}</span>
                              </button>
                            ))}
                          </div>
                          <p className="text-[9px] text-slate-400 italic mt-1">Select icons above to see animation</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Hobbies</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {HOBBIES.map((hobby) => {
                        const isSelected = selectedHobbies.find((h) => h.name === hobby.name);
                        return (
                          <button
                            key={hobby.name}
                            onClick={() => toggleHobby(hobby)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all",
                              isSelected
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            )}
                          >
                            <span>{hobby.icon}</span>
                            {hobby.name}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t">
                      <label className="text-sm font-medium text-slate-700 mb-3 block">Add Custom Hobby</label>
                      <form onSubmit={handleAddCustomHobby} className="flex gap-2">
                        <div className="relative flex-1">
                          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={customHobby}
                            onChange={(e) => setCustomHobby(e.target.value)}
                            placeholder="e.g. Skydiving, Chess, etc."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!customHobby.trim()}
                          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </form>
                    </div>

                    {selectedHobbies.filter(h => !HOBBIES.find(oh => oh.name === h.name)).length > 0 && (
                      <div className="pt-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                          Custom Added
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedHobbies
                            .filter(h => !HOBBIES.find(oh => oh.name === h.name))
                            .map((hobby) => (
                              <div
                                key={hobby.name}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-sm font-medium text-indigo-700"
                              >
                                <span>{hobby.icon}</span>
                                {hobby.name}
                                <button
                                  onClick={() => toggleHobby(hobby)}
                                  className="hover:text-red-500 transition-colors ml-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>



                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Customization</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Title Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={`#${customization.titleColor}`}
                          onChange={(e) => setCustomization(prev => ({ ...prev, titleColor: e.target.value.replace("#", "") }))}
                          className="h-10 w-20 rounded border border-slate-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customization.titleColor}
                          onChange={(e) => setCustomization(prev => ({ ...prev, titleColor: e.target.value }))}
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Stats Theme</label>
                      <select
                        value={customization.theme}
                        onChange={(e) => setCustomization(prev => ({ ...prev, theme: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      >
                        <option value="tokyonight">Tokyo Night</option>
                        <option value="dark">Dark</option>
                        <option value="radical">Radical</option>
                        <option value="merko">Merko</option>
                        <option value="gruvbox">Gruvbox</option>
                        <option value="onedark">One Dark</option>
                        <option value="cobalt">Cobalt</option>
                        <option value="synthwave">Synthwave</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Quote className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium">Random Dev Quote</p>
                          <p className="text-xs text-slate-500">Show a random programming quote in your README</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCustomization(prev => ({ ...prev, showQuote: !prev.showQuote }))}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                          customization.showQuote ? "bg-indigo-600" : "bg-slate-200"
                        )}
                      >
                        <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", customization.showQuote ? "translate-x-6" : "translate-x-1")} />
                      </button>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-slate-700 font-bold flex items-center gap-2">
                        <Palette className="w-4 h-4 text-indigo-600" />
                        Header Banner
                      </label>
                      <select
                        value={formData.selectedBanner}
                        onChange={(e) => setFormData(prev => ({ ...prev, selectedBanner: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-sm"
                      >
                        <option value="none">None</option>
                        <option value="wave">Wave</option>
                        <option value="rect">Rectangle</option>
                        <option value="soft">Soft Corners</option>
                        <option value="slice">Slice</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Animations & Visuals</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2 pb-6 border-b border-slate-100">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-indigo-500" />
                        Terminal Bio (Animation)
                      </label>
                      <textarea
                        name="terminalBio"
                        value={formData.terminalBio}
                        onChange={handleChange}
                        placeholder="echo 'Hello World! I am a full-stack developer based in...'"
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "glitchTyping", label: "Glitch Typing SVG", description: "Cyberpunk digital text effect" },
                        { id: "snakeAnimation", label: "Snake Animation", description: "Classic contribution snake game" },
                        { id: "pacmanGraph", label: "Pacman Graph", description: "Retro pacman activity graph" },
                        { id: "activityGraph", label: "Modern Activity Graph", description: "Sleek contribution line graph" },
                        { id: "typingSVG", label: "Typing Effect", description: "Simple animated typing text" },
                      ].map((anim) => (
                        <button
                          key={anim.id}
                          onClick={() => setShowStats(prev => ({ ...prev, [anim.id]: !prev[anim.id as keyof typeof showStats] }))}
                          className={cn(
                            "flex flex-col items-start p-4 rounded-xl border text-left transition-all",
                            showStats[anim.id as keyof typeof showStats]
                              ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-medium text-sm">{anim.label}</span>
                            {showStats[anim.id as keyof typeof showStats] && (
                              <Check className="w-4 h-4 text-indigo-600" />
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{anim.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">GitHub Metrics</h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm text-slate-500">
                      Display your GitHub activity and statistics using dynamic cards.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "githubStats", label: "GitHub Stats Card", description: "Overall stars, commits, and PRs" },
                        { id: "topLangs", label: "Top Languages", description: "Most used programming languages" },
                        { id: "streakStats", label: "GitHub Streak", description: "Your contribution streak" },
                        { id: "trophies", label: "GitHub Trophies", description: "Visual achievement trophies" },
                        { id: "showVisitorCounter", label: "Visitor Counter", description: "Live profile view count" },
                      ].map((stat) => (
                        <button
                          key={stat.id}
                          onClick={() => setShowStats(prev => ({ ...prev, [stat.id]: !prev[stat.id as keyof typeof showStats] }))}
                          className={cn(
                            "flex flex-col items-start p-4 rounded-xl border text-left transition-all",
                            showStats[stat.id as keyof typeof showStats]
                              ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-medium text-sm">{stat.label}</span>
                            {showStats[stat.id as keyof typeof showStats] && (
                              <Check className="w-4 h-4 text-indigo-600" />
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{stat.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Socials & Contact</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "github", icon: Github, label: "GitHub Username" },
                      { name: "twitter", icon: Twitter, label: "Twitter/X Username" },
                      { name: "linkedin", icon: Linkedin, label: "LinkedIn Username" },
                      { name: "buyMeACoffee", icon: Coffee, label: "Buy Me a Coffee Username" },
                      { name: "instagram", icon: Instagram, label: "Instagram Username" },
                      { name: "youtube", icon: Youtube, label: "YouTube Channel" },
                      { name: "discord", icon: MessageSquare, label: "Discord ID" },
                      { name: "reddit", icon: MessageSquare, label: "Reddit Username" },
                      { name: "twitch", icon: Twitch, label: "Twitch Username" },
                      { name: "facebook", icon: Facebook, label: "Facebook Username" },
                      { name: "medium", icon: FileText, label: "Medium Username" },
                      { name: "devto", icon: Code2, label: "Dev.to Username" },
                      { name: "stackoverflow", icon: Code, label: "StackOverflow ID" },
                      { name: "kofi", icon: Coffee, label: "Ko-fi Username" },
                      { name: "email", icon: Mail, label: "Email Address" },
                      { name: "website", icon: Globe2, label: "Portfolio Website" },
                    ].map((social) => (
                      <div key={social.name} className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <social.icon className="w-4 h-4 text-slate-500" />
                          {social.label}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name={social.name}
                            value={(formData as any)[social.name]}
                            onChange={handleChange}
                            placeholder={social.name === "email" ? "hello@example.com" : "username"}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={cn("text-xs font-medium flex items-center gap-1.5 transition-colors", activeTab === "preview" ? "text-white" : "text-slate-400 hover:text-slate-200")}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={cn("text-xs font-medium flex items-center gap-1.5 transition-colors", activeTab === "code" ? "text-white" : "text-slate-400 hover:text-slate-200")}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      Markdown
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-400 hover:text-white transition-all rounded-md hover:bg-slate-700 text-xs font-semibold group"
                      title="Download README.md"
                    >
                      <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      Download
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-400 hover:text-white transition-all rounded-md hover:bg-slate-700 text-xs font-semibold group"
                      title="Copy Markdown"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6 text-slate-300 font-mono text-sm min-h-[500px] max-h-[70vh] overflow-y-auto">
                  {activeTab === "preview" ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {/* Header Banner Preview */}
                        {formData.selectedBanner !== "none" && (
                          <div className="w-full mb-8">
                            <img
                              src={`https://capsule-render.vercel.app/api?type=${formData.selectedBanner}&color=auto&height=200&section=header&text=${encodeURIComponent(formData.name || "ReadMeForge")}&fontSize=90`}
                              alt="Banner Preview"
                              className="w-full"
                            />
                          </div>
                        )}

                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                          Hi <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px" alt="wave" />, I'm {formData.name || "Your Name"}
                        </div>
                        {formData.bio && (
                          <div className="text-slate-400 italic border-l-4 border-indigo-500 pl-4 py-1 my-2">
                            {formData.bio}
                          </div>
                        )}

                        {formData.terminalBio && (
                          <div className="bg-[#1e1e1e] rounded-lg border border-slate-700 overflow-hidden shadow-2xl my-4 font-mono">
                            <div className="bg-[#323232] px-3 py-1.5 flex items-center gap-1.5 border-b border-white/5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                              <div className="flex-1 text-center text-[10px] text-slate-400 font-sans tracking-wide">zsh — bio</div>
                            </div>
                            <div className="p-4 text-sm">
                              <div className="flex gap-2">
                                <span className="text-emerald-400">➜</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-white">whoami</span>
                              </div>
                              <div className="mt-1 text-slate-300">
                                {formData.name || "user"}
                              </div>
                              <div className="mt-3 flex gap-2">
                                <span className="text-emerald-400">➜</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-white italic">echo "{formData.terminalBio}"</span>
                              </div>
                              <div className="mt-1 text-indigo-300 leading-relaxed border-l-2 border-indigo-500/30 pl-3">
                                {formData.terminalBio}
                                <span className="inline-block w-2 h-4 bg-indigo-500 ml-1 animate-pulse align-middle" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="border-b border-slate-800" />

                        {(showStats.glitchTyping || showStats.typingSVG) && (
                          <>
                            <div className="flex justify-center py-2">
                              {showStats.glitchTyping ? (
                                <img src={`https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=35&pause=1000&color=F0F&center=true&vCenter=true&width=600&lines=${[formData.title || "Developer", formData.learning || "Learning New Tech", "Open Source Contributor"].map(l => encodeURIComponent(l)).join(";")}`} alt="Glitch Typing SVG" />
                              ) : (
                                <img src={`https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=4F46E5&center=true&vCenter=true&width=435&lines=${encodeURIComponent(formData.title || "Developer")};${encodeURIComponent(formData.learning || "Learning New Tech")};Open+Source+Contributor`} alt="Typing SVG" />
                              )}
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-indigo-400">💫 About Me:</div>
                          <div className="space-y-1 text-slate-300">
                            {formData.currentProject && <div>🔭 I'm currently working on <span className="text-indigo-400">[{formData.currentProject}]</span></div>}
                            {formData.collaboration && <div>👯 I'm looking to collaborate on {formData.collaboration}</div>}
                            {formData.helpWith && <div>🤝 I'm looking for help with {formData.helpWith}</div>}
                            {formData.learning && <div>🌱 I'm currently learning {formData.learning}</div>}
                            {formData.funFact && <div>⚡ Fun fact: {formData.funFact}</div>}
                          </div>
                        </div>
                        <div className="border-b border-slate-800" />

                        {selectedHobbies.length > 0 && (
                          <>
                            <div className="space-y-2">
                              <div className="text-lg font-bold text-indigo-400">🎨 Hobbies:</div>
                              <div className="text-slate-300">
                                {selectedHobbies.map(h => `${h.icon} ${h.name}`).join(" • ")}
                              </div>
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {(formData.github || formData.twitter || formData.linkedin || formData.instagram || formData.reddit || formData.twitch || formData.email || formData.youtube || formData.discord || formData.facebook || formData.medium || formData.devto || formData.stackoverflow || formData.buyMeACoffee) && (
                          <>
                            <div className="space-y-2">
                              <div className="text-lg font-bold text-indigo-400">🌐 Socials:</div>
                              <div className="flex flex-wrap gap-2">
                                {formData.instagram && <img src={`https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white`} alt="Instagram" />}
                                {formData.linkedin && <img src={`https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white`} alt="LinkedIn" />}
                                {formData.reddit && <img src={`https://img.shields.io/badge/Reddit-%23FF4500.svg?logo=Reddit&logoColor=white`} alt="Reddit" />}
                                {formData.twitch && <img src={`https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white`} alt="Twitch" />}
                                {formData.twitter && <img src={`https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white`} alt="X" />}
                                {formData.youtube && <img src={`https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white`} alt="YouTube" />}
                                {formData.discord && <img src={`https://img.shields.io/badge/Discord-%235865F2.svg?logo=Discord&logoColor=white`} alt="Discord" />}
                                {formData.facebook && <img src={`https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white`} alt="Facebook" />}
                                {formData.medium && <img src={`https://img.shields.io/badge/Medium-%2312100E.svg?logo=Medium&logoColor=white`} alt="Medium" />}
                                {formData.devto && <img src={`https://img.shields.io/badge/dev.to-%230A0A0A.svg?logo=devdotto&logoColor=white`} alt="Dev.to" />}
                                {formData.stackoverflow && <img src={`https://img.shields.io/badge/StackOverflow-%23F48024.svg?logo=stackoverflow&logoColor=white`} alt="StackOverflow" />}
                                {formData.email && <img src={`https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white`} alt="Email" />}
                                {formData.buyMeACoffee && <img src={`https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black`} alt="Buy Me a Coffee" />}
                                {formData.kofi && <img src={`https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white`} alt="Ko-fi" />}
                              </div>
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {showStats.showVisitorCounter && formData.github && (
                          <>
                            <div className="py-2">
                              <img src={`https://komarev.com/ghpvc/?username=${formData.github}&color=blue`} alt="Visitors" />
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {showStats.snakeAnimation && (
                          <>
                            <div className="py-4 flex justify-center">
                              <img src="https://profile-readme-generator.com/assets/snake.svg" alt="Snake animation" className="max-w-full" />
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {formData.github && showStats.pacmanGraph && (
                          <>
                            <div className="py-2">
                              <img src={`https://github-readme-activity-graph.vercel.app/graph?username=${formData.github}&theme=pacman`} alt="Pacman Graph" className="w-full" />
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {formData.github && showStats.activityGraph && (
                          <>
                            <div className="space-y-2">
                              <div className="text-lg font-bold text-indigo-400">📈 Activity Graph:</div>
                              <img src={`https://github-readme-activity-graph.vercel.app/graph?username=${formData.github}&theme=react-dark`} alt="Activity Graph" className="w-full" />
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {selectedTech.length > 0 && (
                          <>
                            <div className="space-y-4">
                              <div className="text-lg font-bold text-indigo-400">💻 Tech Stack:</div>
                              {showStats.marqueeTech ? (
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group">
                                  <div className="flex gap-8 animate-marquee whitespace-nowrap">
                                    {[...selectedTech, ...selectedTech].map((tech, i) => (
                                      <img key={`${tech.name}-${i}`} src={getIconUrl(tech)} alt={tech.name} className="h-8 w-8 transition-transform hover:scale-110" />
                                    ))}
                                  </div>
                                  <style jsx>{`
                                    @keyframes marquee {
                                      0% { transform: translateX(0); }
                                      100% { transform: translateX(-50%); }
                                    }
                                    .animate-marquee {
                                      animation: marquee 20s linear infinite;
                                    }
                                  `}</style>
                                </div>
                              ) : showStats.floatingIcons ? (
                                <div className="flex flex-wrap justify-center gap-6 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                                  {selectedTech.map((tech, i) => (
                                    <div key={tech.name} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}>
                                      <img src={getIconUrl(tech)} alt={tech.name} className="w-10 h-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {selectedTech.map((tech) => (
                                    <img key={tech.name} src={`https://img.shields.io/badge/${tech.name.replace(/ /g, "%20")}-${tech.color}?style=for-the-badge&logo=${tech.icon}&logoColor=white`} alt={tech.name} className="h-6" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}



                        {formData.github && (showStats.githubStats || showStats.topLangs || showStats.streakStats || showStats.trophies) && (
                          <>
                            <div className="space-y-4">
                              <div className="text-lg font-bold text-indigo-400">
                                📊 GitHub Stats:
                              </div>
                              <div className="space-y-2">
                                {showStats.trophies && (
                                  <img src={`https://github-profile-trophy-mirror.vercel.app/?username=${formData.github}&theme=${customization.theme}`} alt="Trophies" className="w-full" />
                                )}
                                {showStats.githubStats && (
                                  <img
                                    src={`https://github-readme-stats-sigma-five.vercel.app/api?username=${formData.github}&show_icons=true&theme=${customization.theme}&include_all_commits=true&count_private=true`}
                                    alt="GitHub Stats"
                                    className="w-full max-w-md"
                                  />
                                )}
                                {showStats.streakStats && (
                                  <img src={`https://github-readme-streak-stats.herokuapp.com/?user=${formData.github}&theme=${customization.theme}`} alt="GitHub Streak" className="w-full max-w-md" />
                                )}
                                {showStats.topLangs && (
                                  <img
                                    src={`https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${formData.github}&theme=${customization.theme}&show_icons=true&include_all_commits=true&count_private=true&layout=compact`}
                                    alt="Top Languages"
                                    className="w-full max-w-md"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="border-b border-slate-800" />
                          </>
                        )}

                        {customization.showQuote && (
                          <div className="space-y-2">
                            <div className="text-lg font-bold text-indigo-400">✍️ Random Dev Quote</div>
                            <img
                              src={`https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${customization.theme}`}
                              alt="Dev Quote"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap break-all text-slate-400 selection:bg-indigo-500/30">
                      {generateMarkdown()}
                    </pre>
                  )}
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-slate-500">
                {activeTab === "preview" ? "Visual preview of your README." : "Raw markdown code ready for GitHub."}
              </p>
            </div>
          </div>
        </div>

        {/* Future Updates Banner */}
        <div className="mt-16 mb-8 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-indigo-700/80 backdrop-blur-sm">
            <div className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </div>
            <p className="text-sm font-medium tracking-wide">
              More customizations, themes, and dynamic widgets are coming in the next update!
            </p>
          </div>

          <a
            href="mailto:ayushpandey0618@gmail.com?subject=ReadMeForge Suggestion"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all shadow-sm group"
          >
            <Lightbulb className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">Have a suggestion? Email me</span>
          </a>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Github className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">Profile README Generator</span>
          </div>

          <p className="text-slate-500 text-center max-w-md text-sm">
            The easiest way to create a professional and eye-catching GitHub profile README in minutes.
            Completely free and open source.
          </p>

          <div className="flex items-center gap-6">
            <a href="https://github.com/AyushPandey218" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://x.com/ayushwh_182" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" title="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/ayush_wg218/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" title="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:ayushpandey0618@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors" title="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>Developed with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>by</span>
              <a
                href="https://github.com/AyushPandey218"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Ayush Pandey
              </a>
            </div>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
