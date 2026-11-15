
function analyzePassword(password) {
  const length = [...password].length;
//utiliser la syntaxe spread pour compter correctement les caractères Unicode
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const commonPatterns = [
    "password",
    "123456",
    "qwerty",
    "azerty",
    "admin",
    "welcome",
    "letmein"
  ];
//utiliser la méthode some pour vérifier si le mot de passe contient des motifs communs
  const normalizedPassword = password.toLowerCase();

  const hasCommonPattern = commonPatterns.some(
    (pattern) => normalizedPassword.includes(pattern)
  );

  const hasRepeatedCharacters = /(.)\1{2,}/.test(password);

  const noCommonPatterns =
    !hasCommonPattern && !hasRepeatedCharacters;

  const criteria = [
    { id: 1, label: "Minimum length", passed: length >= 12 },
    { id: 2, label: "Uppercase", passed: hasUppercase },
    { id: 3, label: "Lowercase", passed: hasLowercase },
    { id: 4, label: "Numbers", passed: hasNumber },
    { id: 5, label: "Special characters", passed: hasSpecial },
    { id: 6, label: "No common patterns", passed: noCommonPatterns }
  ];

  let score = 0;

  if (length >= 16) score += 35;
  else if (length >= 12) score += 25;
  else if (length >= 8) score += 15;
  else if (length > 0) score += 5;

  if (hasUppercase) score += 10;
  if (hasLowercase) score += 10;
  if (hasNumber) score += 10;
  if (hasSpecial) score += 10;

  if (noCommonPatterns) score += 25;

  let strength = "Weak";

  if (score >= 85) strength = "Very Strong";
  else if (score >= 60) strength = "Strong";
  else if (score >= 30) strength = "Medium";

  return {
    score,
    strength,
    criteria
  };
}

export default analyzePassword;
