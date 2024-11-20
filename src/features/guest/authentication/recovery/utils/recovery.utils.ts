

export const asterizeEmail = (email: string) => {
  const [first, second] = email.split("@")
  const asterized = first.slice(0, 2) + "****" + first.slice(-2)
  return `${asterized}@${second}`

}

export const isPasswordStrong = (password: string)=> {
  // Minimum length for a strong password
  const minLength = 12;

  if (!password) {
    return "";
  }

  // Regular expressions for different character types
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasNumbers = /\d/;
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;

  // Check for password length
  const isLongEnough = password.length >= minLength;

  // Count different character types
  const lowerCount = hasLowerCase.test(password);
  const upperCount = hasUpperCase.test(password);
  const numberCount = hasNumbers.test(password);
  const specialCount = hasSpecialChars.test(password);

  // Password strength evaluation
  let strength = "weak";

  // Check length first
  if (isLongEnough) {
    // Count number of different character types present
    const charTypeCount = [lowerCount, upperCount, numberCount, specialCount].filter(Boolean).length;

    // Strength scoring based on conditions
    if (charTypeCount === 4) {
      strength = "strong"; // Has all 4 types of characters (lowercase, uppercase, number, special character)
    } else if (charTypeCount === 3) {
      strength = "medium"; // Has 3 types of characters
    }
  }

  // Additional checks for weak password cases
  if (password.length < 6) {
    return "weak"; // Too short to be considered secure
  }

  // Return the final strength value
  return strength;
};
