(() => {
  "use strict";
  const d = window.portfolioData || {};
  const $ = (id) => document.getElementById(id);
  const text = (id, value) => { const el = $(id); if (el) el.textContent = value ?? ""; };
  const safeURL = (u) => { try { const x = new URL(u); return ["https:", "http:"].includes(x.protocol) ? x.href : ""; } catch { return ""; } };
  function node(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = String(content);
    return el;
  }
  function link(label, url, className = "") {
    const href = safeURL(url);
    if (!href) return null;
    const a = node("a", className, label); a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer"; return a;
  }
  function addTag(parent, name) { parent.append(node("span", "tag", name)); }
  const name = d.name || "Your Name";
  document.title = `${name} | Portfolio`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = `${name} — ${d.role || "personal portfolio"}. Projects, skills, experience, and contact information.`;
  ["brand-name", "hero-name", "profile-name", "footer-name", "copyright-name"].forEach(id => text(id, name));
  text("hero-role", d.role);
  text("hero-tagline", d.tagline);
  text("availability", d.availability);
  text("profile-location", d.location);
  text("about-location", d.location);
  text("year", new Date().getFullYear());
  const initials = name.trim().split(/\s+/).slice(0,2).map(x => x.charAt(0).toUpperCase()).join("") || "YN";
  const avatar = $("profile-picture");
  if (safeURL(d.profilePhoto) || (typeof d.profilePhoto === "string" && /^assets\/[a-z0-9_.\-/]+$/i.test(d.profilePhoto))) {
    const img = document.createElement("img"); img.src = d.profilePhoto; img.alt = `Photo of ${name}`; img.onerror = () => { avatar.textContent = initials; }; avatar.replaceChildren(img);
  } else { avatar.textContent = initials; }
  if (typeof d.resumeFile === "string" && /^assets\/[a-z0-9_.\-/]+\.pdf$/i.test(d.resumeFile)) {
    const cv = $("resume-link"); cv.href = d.resumeFile; cv.classList.remove("hide");
  }
  const socials = [{label:"GitHub",url:d.github},{label:"LinkedIn",url:d.linkedin},{label:"Website",url:d.website}];
  socials.forEach(s => { const a = link(`${s.label} ↗`, s.url); if (a) $("hero-social").append(a); });
  (d.about || []).filter(Boolean).forEach(p => $("about-body").append(node("p", "", p)));
  const skills = d.skills || [];
  if (!skills.length) $("skills-grid").append(node("p", "empty-state", "Add skills to data.js"));
  skills.forEach((group, i) => {
    const card = node("article", "skill-card");
    card.append(node("span", "skill-number", `${String(i+1).padStart(2,"0")} / EXPERTISE`));
    card.append(node("h3", "", group.category || "Skills"));
    const tags = node("div", "tags"); (group.items || []).forEach(t => addTag(tags,t)); card.append(tags); $("skills-grid").append(card);
  });
  const projects = d.projects || [];
  if (!projects.length) $("projects-grid").append(node("p", "empty-state", "Add your projects to data.js"));
  projects.forEach((item, i) => {
    const card = node("article", "project-card");
    const top = node("div", "project-top"); top.append(node("span", "", item.type || "PROJECT")); top.append(node("span", "", item.number || String(i+1).padStart(2,"0"))); card.append(top);
    card.append(node("div", "project-mark", "✦")); card.append(node("h3", "", item.name || "Project")); card.append(node("p", "", item.description || ""));
    const tags = node("div", "tags"); (item.technologies || []).forEach(t => addTag(tags,t)); card.append(tags);
    const links = node("div", "project-links"); [{label:"Live demo ↗",url:item.live},{label:"Source code ↗",url:item.source}].forEach(s => { const a=link(s.label,s.url); if(a) links.append(a); }); card.append(links); $("projects-grid").append(card);
  });
  const experience = d.experience || [];
  if (!experience.length) $("experience-list").append(node("p", "empty-state", "Experience details can be added later."));
  experience.forEach(item => {
    const row = node("article", "timeline-item"); const body=node("div");
    body.append(node("h3", "", item.role || "")); body.append(node("p", "org", item.company || "")); body.append(node("p", "", item.description || ""));
    row.append(body,node("span", "period", item.period || "")); $("experience-list").append(row);
  });
  function eduItem(item, isCertificate=false) {
    const card=node("article", "education-item"); card.append(node("h4", "", isCertificate ? (item.title || "") : (item.degree || "")));
    card.append(node("p", "org", isCertificate ? (item.issuer || "") : (item.institution || "")));
    card.append(node("p", "edu-period", isCertificate ? (item.year || "") : (item.period || "")));
    if (item.description) card.append(node("p", "edu-desc", item.description));
    const a = link("View credential ↗",item.url); if(a) card.append(a);
    return card;
  }
  (d.education || []).forEach(item => $("education-list").append(eduItem(item)));
  if (!(d.education || []).length) $("education-list").append(node("p", "empty-state", "Add your education to data.js"));
  (d.certifications || []).forEach(item => $("cert-list").append(eduItem(item,true)));
  if (!(d.certifications || []).length) $("cert-wrap").classList.add("hide");
  const email = (d.email || "").trim();
  const emailEl = $("contact-email");
  if (email && email.includes("@")) { emailEl.href = `mailto:${email}`; emailEl.textContent = `${email} ↗`; }
  else { emailEl.classList.add("hide"); }
  if (email) $("contact-links").append(node("p", "", email));
  if (d.phone) $("contact-links").append(node("p", "", d.phone));
  socials.forEach(s => { const a=link(`${s.label} ↗`,s.url); if(a) $("contact-links").append(a); });
  const navButton = $("nav-toggle"), navLinks = $("nav-links");
  navButton.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");navButton.setAttribute("aria-expanded",String(open));navButton.setAttribute("aria-label",open?"Close menu":"Open menu");});
  navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");navButton.setAttribute("aria-expanded","false");}));
  const themeButton = $("theme-switch");
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light") document.documentElement.dataset.theme = "light";
  const updateThemeLabel = () => { const isLight=document.documentElement.dataset.theme === "light"; themeButton.textContent = isLight ? "☾" : "☀"; themeButton.setAttribute("aria-label",isLight?"Switch to dark theme":"Switch to light theme"); };
  updateThemeLabel();
  themeButton.addEventListener("click",()=>{ const next=document.documentElement.dataset.theme === "light" ? "dark":"light";document.documentElement.dataset.theme=next;localStorage.setItem("portfolio-theme",next);updateThemeLabel(); });
})();
