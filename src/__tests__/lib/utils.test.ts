import {
  cn,
  formatMatchScore,
  formatCitationCount,
  truncateText,
  validateFileType,
  validateFileSize,
  formatFileSize,
} from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatMatchScore", () => {
  it("formats score as percentage", () => {
    expect(formatMatchScore(92.5)).toBe("93%");
    expect(formatMatchScore(100)).toBe("100%");
    expect(formatMatchScore(0)).toBe("0%");
  });
});

describe("formatCitationCount", () => {
  it("formats numbers under 1000", () => {
    expect(formatCitationCount(500)).toBe("500");
    expect(formatCitationCount(999)).toBe("999");
  });

  it("formats thousands with K suffix", () => {
    expect(formatCitationCount(1000)).toBe("1.0K");
    expect(formatCitationCount(4520)).toBe("4.5K");
    expect(formatCitationCount(12340)).toBe("12.3K");
  });

  it("formats millions with M suffix", () => {
    expect(formatCitationCount(1000000)).toBe("1.0M");
    expect(formatCitationCount(2500000)).toBe("2.5M");
  });
});

describe("truncateText", () => {
  it("returns original text if under max length", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates and adds ellipsis", () => {
    expect(truncateText("Hello World", 8)).toBe("Hello Wo...");
  });
});

describe("validateFileType", () => {
  it("accepts PDF files", () => {
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    expect(validateFileType(file)).toBe(true);
  });

  it("accepts DOCX files", () => {
    const file = new File([""], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    expect(validateFileType(file)).toBe(true);
  });

  it("accepts TXT files", () => {
    const file = new File([""], "test.txt", { type: "text/plain" });
    expect(validateFileType(file)).toBe(true);
  });

  it("rejects other file types", () => {
    const file = new File([""], "test.jpg", { type: "image/jpeg" });
    expect(validateFileType(file)).toBe(false);
  });
});

describe("validateFileSize", () => {
  it("accepts files under max size", () => {
    const file = new File(["x".repeat(1024 * 1024)], "test.pdf"); // 1MB
    expect(validateFileSize(file, 10)).toBe(true);
  });

  it("rejects files over max size", () => {
    const file = new File(["x".repeat(11 * 1024 * 1024)], "test.pdf"); // 11MB
    expect(validateFileSize(file, 10)).toBe(false);
  });
});

describe("formatFileSize", () => {
  it("formats bytes", () => {
    expect(formatFileSize(500)).toBe("500 B");
  });

  it("formats kilobytes", () => {
    expect(formatFileSize(1024)).toBe("1.0 KB");
    expect(formatFileSize(2048)).toBe("2.0 KB");
  });

  it("formats megabytes", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.0 MB");
    expect(formatFileSize(5.5 * 1024 * 1024)).toBe("5.5 MB");
  });
});
