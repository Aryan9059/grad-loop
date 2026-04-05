"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_OPTIONS = ["STUDENT", "ALUMNI"] as const;
const DOMAIN_OPTIONS = ["Web", "App", "AI/ML", "CP", "Cybersecurity", "Cloud", "Data"] as const;

type Role = (typeof ROLE_OPTIONS)[number];

export default function OnboardingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");
  const [graduationYear, setGraduationYear] = useState("");
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [openToConnect, setOpenToConnect] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const addSkill = (value: string) => {
    const normalized = value.trim();
    if (!normalized) {
      return;
    }

    const exists = skills.some((item) => item.toLowerCase() === normalized.toLowerCase());
    if (exists) {
      setSkillInput("");
      setShowSkillDropdown(false);
      return;
    }

    setSkills([...skills, normalized]);
    setSkillInput("");
    setShowSkillDropdown(false);
  };

  const removeSkill = (value: string) => {
    setSkills(skills.filter((item) => item !== value));
  };

  useEffect(() => {
    const query = skillInput.trim();
    if (query.length < 1) {
      setSkillSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/skills?q=${encodeURIComponent(query)}`, { cache: "no-store" });
        if (!res.ok) {
          setSkillSuggestions([]);
          return;
        }

        const data = (await res.json()) as { skills?: string[] };
        const next = (data.skills ?? []).filter(
          (item) => !skills.some((selected) => selected.toLowerCase() === item.toLowerCase()),
        );
        setSkillSuggestions(next);
      } catch {
        setSkillSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [skillInput, skills]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !graduationYear || !domain) {
      setError("Please fill all required fields.");
      return;
    }

    if (skills.length === 0) {
      setError("Please select at least one skill.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        role,
        graduationYear: Number(graduationYear),
        domain,
        skills,
        company: company.trim() || null,
        roleTitle: roleTitle.trim() || null,
        openToConnect,
      }),
    });

    setIsSubmitting(false);

    if (!res.ok) {
      setError("Could not save onboarding details. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="rounded-md border p-2"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="rounded-md border p-2"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          className="rounded-md border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          className="rounded-md border p-2"
          placeholder="Graduation year"
          type="number"
          min={1990}
          max={2100}
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          required
        />
      </div>

      <select
        className="w-full rounded-md border p-2"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        required
      >
        <option value="">Select primary domain</option>
        {DOMAIN_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <fieldset className="space-y-2">
        <legend className="font-medium">Skills</legend>
        <div className="space-y-2">
          <div className="relative">
            <input
              className="w-full rounded-md border p-2"
              placeholder="Type a skill (e.g. C, React, Kubernetes)"
              value={skillInput}
              onFocus={() => setShowSkillDropdown(true)}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setShowSkillDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addSkill(skillInput);
                }
              }}
            />

            {showSkillDropdown && skillInput.trim() && (
              <div className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md border bg-white shadow">
                {skillSuggestions.length > 0 ? (
                  skillSuggestions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => addSkill(option)}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => addSkill(skillInput)}
                  >
                    Add "{skillInput.trim()}"
                  </button>
                )}
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                  {skill}
                  <button type="button" className="text-gray-600 hover:text-black" onClick={() => removeSkill(skill)}>
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="rounded-md border p-2"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="rounded-md border p-2"
          placeholder="Role/Title (optional)"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={openToConnect}
          onChange={(e) => setOpenToConnect(e.target.checked)}
        />
        <span>Open to connect</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Continue"}
      </button>
    </form>
  );
}