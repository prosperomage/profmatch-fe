import { exportToCSV, exportToJSON } from "@/lib/export";
import type { MatchResult } from "@/types";

const mockMatches: MatchResult[] = [
  {
    professor: {
      id: "1",
      name: "Dr. Jane Smith",
      title: "Associate Professor",
      department: "Computer Science",
      university: "MIT",
      email: "jsmith@mit.edu",
      research_areas: ["Machine Learning", "AI"],
      publications: [],
      citation_metrics: {
        h_index: 25,
        total_citations: 3000,
      },
      last_updated: "2024-01-01",
    },
    match_score: 92,
    alignment_reasons: ["Strong ML background"],
    relevant_publications: [],
    shared_keywords: ["machine learning"],
    recommendation_text: "Great match for ML research.",
  },
];

describe("exportToCSV", () => {
  it("generates valid CSV with headers", () => {
    const csv = exportToCSV(mockMatches);
    const lines = csv.split("\n");

    expect(lines[0]).toContain("Rank");
    expect(lines[0]).toContain("Name");
    expect(lines[0]).toContain("Match Score");
  });

  it("includes professor data in rows", () => {
    const csv = exportToCSV(mockMatches);

    expect(csv).toContain("Dr. Jane Smith");
    expect(csv).toContain("92%");
    expect(csv).toContain("MIT");
  });

  it("handles empty email gracefully", () => {
    const matchesNoEmail = [
      {
        ...mockMatches[0],
        professor: { ...mockMatches[0].professor, email: undefined },
      },
    ];
    const csv = exportToCSV(matchesNoEmail);
    expect(csv).toBeDefined();
  });
});

describe("exportToJSON", () => {
  it("generates valid JSON", () => {
    const json = exportToJSON(mockMatches);
    const parsed = JSON.parse(json);

    expect(parsed).toHaveLength(1);
    expect(parsed[0].professor.name).toBe("Dr. Jane Smith");
  });

  it("preserves all match data", () => {
    const json = exportToJSON(mockMatches);
    const parsed = JSON.parse(json);

    expect(parsed[0].match_score).toBe(92);
    expect(parsed[0].recommendation_text).toBe("Great match for ML research.");
  });
});
