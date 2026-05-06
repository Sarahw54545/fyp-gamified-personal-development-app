export function getPasswordStrength(password) {
  if (!password) return { label: "", value: 0 };

  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (password.length < 8) return { label: "Weak", value: 25 };

  if (!hasNumber) return { label: "Medium", value: 50 };

  if (!hasSymbol) return { label: "Strong", value: 75 };
  
  return { label: "Very strong", value: 100 };
}