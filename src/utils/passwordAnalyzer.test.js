import { describe, it, expect } from "vitest";
import analyzePassword from "./analyzePassword.js";

describe("analyzePassword", () => {
  const getCriterion = (result, label) =>
    result.criteria.find((criterion) => criterion.label === label);

  describe("Input validation", () => {
    it("should handle an empty password", () => {
      const result = analyzePassword("");

      expect(result.score).toBe(0);
      expect(result.strength).toBe("Weak");
      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(false);
    });

    it("should handle non-string inputs", () => {
      const invalidInputs = [null, undefined, 12345, true, {}];

      invalidInputs.forEach((input) => {
        const result = analyzePassword(input);

        expect(result.score).toBe(0);
        expect(result.strength).toBe("Weak");
      });
    });
  });

  describe("Password length", () => {
    it("should reject passwords shorter than 12 characters", () => {
      const result = analyzePassword("Ab1!");

      expect(
        getCriterion(result, "Minimum length").passed
      ).toBe(false);
    });

    it("should accept passwords with at least 12 characters", () => {
      const result = analyzePassword("Abcdef12345!");

      expect(
        getCriterion(result, "Minimum length").passed
      ).toBe(true);
    });

    it("should correctly count Unicode characters", () => {
      const result = analyzePassword("😀😀😀😀😀😀😀😀😀😀😀😀");

      expect(
        getCriterion(result, "Minimum length").passed
      ).toBe(true);
    });
  });

  describe("Character types", () => {
    it("should detect uppercase characters", () => {
      const result = analyzePassword("ABCDEFGHIJKLM");

      expect(
        getCriterion(result, "Uppercase").passed
      ).toBe(true);
    });

    it("should detect lowercase characters", () => {
      const result = analyzePassword("abcdefghijkl");

      expect(
        getCriterion(result, "Lowercase").passed
      ).toBe(true);
    });

    it("should detect numbers", () => {
      const result = analyzePassword("987654321098");

      expect(
        getCriterion(result, "Numbers").passed
      ).toBe(true);
    });

    it("should detect special characters", () => {
      const result = analyzePassword("!!!!!!!!!!!!");

      expect(
        getCriterion(result, "Special characters").passed
      ).toBe(true);
    });

    it("should detect Unicode uppercase and lowercase letters", () => {
      const result = analyzePassword("ÉéÀàÇç");

      expect(
        getCriterion(result, "Uppercase").passed
      ).toBe(true);

      expect(
        getCriterion(result, "Lowercase").passed
      ).toBe(true);
    });
  });

  describe("Common patterns", () => {
    it("should detect common patterns", () => {
      const result = analyzePassword("MyPassword123456");

      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(false);
    });

    it("should detect repeated characters", () => {
      const result = analyzePassword("AAAabcdef123!");

      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(false);
    });

    it("should accept passwords without detected patterns", () => {
      const result = analyzePassword("R7!mQ2@vL9#xK4");

      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(true);
    });

    it("should reject an empty password for this criterion", () => {
      const result = analyzePassword("");

      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(false);
    });

    it("should detect common patterns regardless of case", () => {
      const result = analyzePassword("PASSWORD123456");

      expect(
        getCriterion(result, "No common patterns").passed
      ).toBe(false);
    });
  });

  describe("Score", () => {
    it("should never exceed 100", () => {
      const result = analyzePassword("Abcdefgh123456!XYZ");

      expect(result.score).toBeLessThanOrEqual(100);
    });

    it("should never be negative", () => {
      const result = analyzePassword("");

      expect(result.score).toBeGreaterThanOrEqual(0);
    });

    it("should calculate the score correctly", () => {
      const result = analyzePassword("R7!mQ2@vL9#xK4");

      expect(result.score).toBe(90);
    });

    it("should return Strong for a score of 75", () => {
      const result = analyzePassword("Abcdefgh123456!XYZ");

      expect(result.score).toBe(75);
      expect(result.strength).toBe("Strong");
    });

    it("should award more points for longer passwords", () => {
      const short = analyzePassword("Ab1!");
      const medium = analyzePassword("Abcdef12!");
      const long = analyzePassword("Abcdefgh1234!");

      expect(medium.score).toBeGreaterThan(short.score);
      expect(long.score).toBeGreaterThan(medium.score);
    });
  });

  describe("Strength levels", () => {
    it("should return Weak for an empty password", () => {
      expect(analyzePassword("").strength).toBe("Weak");
    });

    it("should return Medium for a score between 30 and 59", () => {
      const result = analyzePassword("Abcdef");

      expect(result.strength).toBe("Medium");
    });

    it("should return Strong for a score between 60 and 84", () => {
      const result = analyzePassword("Abcdefgh123456!XYZ");

      expect(result.strength).toBe("Strong");
    });

    it("should return Very Strong for a score of at least 85", () => {
      const result = analyzePassword("R7!mQ2@vL9#xK4");

      expect(result.strength).toBe("Very Strong");
    });
  });

  describe("Output structure", () => {
    it("should return the expected structure", () => {
      const result = analyzePassword("Abcdefgh123456!");

      expect(result).toHaveProperty("score");
      expect(result).toHaveProperty("strength");
      expect(result).toHaveProperty("criteria");

      expect(typeof result.score).toBe("number");
      expect(typeof result.strength).toBe("string");
      expect(Array.isArray(result.criteria)).toBe(true);
    });

    it("should contain exactly six criteria", () => {
      const result = analyzePassword("Abcdefgh123456!");

      expect(result.criteria).toHaveLength(6);
    });

    it("should return boolean values for every criterion", () => {
      const result = analyzePassword("Abcdefgh123456!");

      result.criteria.forEach((criterion) => {
        expect(typeof criterion.passed).toBe("boolean");
      });
    });

    it("should preserve criterion IDs and labels", () => {
      const result = analyzePassword("Abcdefgh123456!");

      expect(result.criteria.map((criterion) => criterion.id)).toEqual([
        1, 2, 3, 4, 5, 6,
      ]);

      expect(result.criteria.map((criterion) => criterion.label)).toEqual([
        "Minimum length",
        "Uppercase",
        "Lowercase",
        "Numbers",
        "Special characters",
        "No common patterns",
      ]);
    });
  });
});