const PASSWORD_RULES = {
  minimumLength: 12,
  strongLength: 16,
};

const SCORE_WEIGHTS = {
  length: {
    veryLong: 35,
    long: 25,
    medium: 15,
    short: 5,
  },
  characterType: 10,
  patternCheck: 25,
};

const COMMON_PATTERNS = [
  "password",
  "123456",
  "qwerty",
  "azerty",
  "admin",
  "welcome",
  "letmein",
];

const STRENGTH_LEVELS = [
  { minimumScore: 85, label: "Very Strong" },
  { minimumScore: 60, label: "Strong" },
  { minimumScore: 30, label: "Medium" },
  { minimumScore: 0, label: "Weak" },
];

const CHARACTER_REGEX = {
  uppercase: /\p{Lu}/u,
  lowercase: /\p{Ll}/u,
  number: /\p{N}/u,
  special: /[^\p{L}\p{N}]/u,
  repeated: /(.)\1{2,}/u,
};

function getPasswordLength(password) {
  return [...password].length;
}

function containsCommonPattern(password) {
  const normalizedPassword = password.normalize("NFKC").toLowerCase();

  return COMMON_PATTERNS.some((pattern) =>
    normalizedPassword.includes(pattern)
  );
}

function hasRepeatedCharacters(password) {
  return CHARACTER_REGEX.repeated.test(password);
}

function evaluateCriteria(password, length) {
  const hasUppercase = CHARACTER_REGEX.uppercase.test(password);
  const hasLowercase = CHARACTER_REGEX.lowercase.test(password);
  const hasNumber = CHARACTER_REGEX.number.test(password);
  const hasSpecial = CHARACTER_REGEX.special.test(password);

  const hasCommonPattern = containsCommonPattern(password);
  const hasRepeatedCharactersDetected =
    hasRepeatedCharacters(password);

  const noCommonPatterns =
    password.length > 0 &&
    !hasCommonPattern &&
    !hasRepeatedCharactersDetected;

  return [
    {
      id: 1,
      label: "Minimum length",
      passed: length >= PASSWORD_RULES.minimumLength,
    },
    {
      id: 2,
      label: "Uppercase",
      passed: hasUppercase,
    },
    {
      id: 3,
      label: "Lowercase",
      passed: hasLowercase,
    },
    {
      id: 4,
      label: "Numbers",
      passed: hasNumber,
    },
    {
      id: 5,
      label: "Special characters",
      passed: hasSpecial,
    },
    {
      id: 6,
      label: "No common patterns",
      passed: noCommonPatterns,
    },
  ];
}

function calculateScore(criteria, length) {
  let score = 0;

  if (length >= PASSWORD_RULES.strongLength) {
    score += SCORE_WEIGHTS.length.veryLong;
  } else if (length >= PASSWORD_RULES.minimumLength) {
    score += SCORE_WEIGHTS.length.long;
  } else if (length >= 8) {
    score += SCORE_WEIGHTS.length.medium;
  } else if (length > 0) {
    score += SCORE_WEIGHTS.length.short;
  }

  const characterTypeCriteria = criteria.slice(1, 5);

  score +=
    characterTypeCriteria.filter((criterion) => criterion.passed)
      .length * SCORE_WEIGHTS.characterType;

  if (criteria[5].passed) {
    score += SCORE_WEIGHTS.patternCheck;
  }

  return score;
}

function getStrength(score) {
  const level = STRENGTH_LEVELS.find(
    (strength) => score >= strength.minimumScore
  );

  return level.label;
}

function analyzePassword(password) {
  const safePassword =
    typeof password === "string" ? password : "";

  const length = getPasswordLength(safePassword);
  const criteria = evaluateCriteria(safePassword, length);
  const score = calculateScore(criteria, length);
  const strength = getStrength(score);

  return {
    score,
    strength,
    criteria,
  };
}

export default analyzePassword;