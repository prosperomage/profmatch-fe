import type { MatchResult } from "@/types";

export function exportToCSV(matches: MatchResult[]): string {
  const headers = [
    "Rank",
    "Name",
    "Title",
    "Department",
    "University",
    "Email",
    "Match Score",
    "Research Areas",
    "h-index",
    "Citations",
    "Recommendation",
  ];

  const rows = matches.map((match, index) => [
    index + 1,
    match.professor.name,
    match.professor.title,
    match.professor.department,
    match.professor.university,
    match.professor.email || "",
    `${match.match_score}%`,
    match.professor.research_areas.join("; "),
    match.professor.citation_metrics?.h_index || "",
    match.professor.citation_metrics?.total_citations || "",
    match.recommendation_text.replace(/"/g, '""'),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell}"`).join(",")
    ),
  ].join("\n");

  return csvContent;
}

export function exportToJSON(matches: MatchResult[]): string {
  return JSON.stringify(matches, null, 2);
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportResults(matches: MatchResult[], format: "csv" | "json") {
  const timestamp = new Date().toISOString().split("T")[0];

  if (format === "csv") {
    const content = exportToCSV(matches);
    downloadFile(content, `profmatch-results-${timestamp}.csv`, "text/csv");
  } else {
    const content = exportToJSON(matches);
    downloadFile(
      content,
      `profmatch-results-${timestamp}.json`,
      "application/json"
    );
  }
}
