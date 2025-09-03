export const containsPhoneNumber = (text: string): boolean => {
  // Match various phone number formats
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  return phoneRegex.test(text);
};

export const containsWebsite = (text: string): boolean => {
  // Match URLs and website patterns
  const websiteRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?/;
  return websiteRegex.test(text);
};

export const containsLink = (text: string): boolean => {
  // Match HTML anchor tags and markdown links
  const linkRegex = /<a\b[^>]*>|\[([^\]]+)\]\(([^)]+)\)/;
  return linkRegex.test(text);
};

export const containsEmail = (text: string): boolean => {
  // Match email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(text);
};

export const containsSocialMedia = (text: string): boolean => {
  // Match social media handles and URLs
  const socialRegex = /(?:@[\w-]+|(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|twitter\.com|instagram\.com|linkedin\.com|tiktok\.com)\/[\w-]+)/i;
  return socialRegex.test(text);
};

export const containsProfanity = (text: string): boolean => {
  // Basic profanity check (you might want to use a more comprehensive list)
  const profanityRegex = /\b(?:fuck|shit|ass|bitch|damn|hell)\b/i;
  return profanityRegex.test(text);
};

export const containsExcessiveCaps = (text: string): boolean => {
  // Check if more than 70% of the text is in uppercase
  const words = text.split(/\s+/);
  const upperCaseWords = words.filter((word) => word === word.toUpperCase());
  return upperCaseWords.length / words.length > 0.7;
};

export const containsEmailLikePattern = (text: string): boolean => {
  // Match any text containing @ symbol, regardless of surrounding characters
  const emailLikeRegex = /@/;
  return emailLikeRegex.test(text);
};

export const isTooShort = (text: string): boolean => {
  return text.trim().length < 5; // Or any threshold
};

export const isGibberish = (text: string): boolean => {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  return letters.length / text.length < 0.3; // less than 30% alphabet
};

export const containsHiddenChars = (text: string): boolean => {
  return /[\u200B-\u200D\uFEFF]/.test(text); // Zero-width spaces and BOM
};
export const containsTooManySymbols = (text: string): boolean => {
  return /[^\w\s]{5,}/.test(text); // 5+ symbols (excluding emojis)
};

export const validateComment = (
  content: string
): { isValid: boolean; error: string } => {
  if (containsPhoneNumber(content)) {
    return {
      isValid: false,
      error: "Phone numbers are not allowed in comments",
    };
  }
  if (containsWebsite(content)) {
    return {
      isValid: false,
      error: "Website URLs are not allowed in comments",
    };
  }
  if (containsLink(content)) {
    return { isValid: false, error: "Links are not allowed in comments" };
  }
  if (containsEmail(content)) {
    return {
      isValid: false,
      error: "Email addresses are not allowed in comments",
    };
  }
  if (containsEmailLikePattern(content)) {
    return { isValid: false, error: "The @ symbol is not allowed in comments" };
  }
  if (containsSocialMedia(content)) {
    return {
      isValid: false,
      error: "Social media handles and links are not allowed in comments",
    };
  }
  if (containsProfanity(content)) {
    return {
      isValid: false,
      error: "Please keep the discussion professional and respectful",
    };
  }
  if (containsExcessiveCaps(content)) {
    return {
      isValid: false,
      error: "Please avoid excessive use of capital letters",
    };
  }
  if (isTooShort(content)) {
    return { isValid: false, error: "Comment is too short to be meaningful" };
  }
  if (isGibberish(content)) {
    return {
      isValid: false,
      error: "Comment appears to be gibberish or nonsensical",
    };
  }
  if (containsHiddenChars(content)) {
    return {
      isValid: false,
      error: "Comment contains hidden or invisible characters",
    };
  }
  if (containsTooManySymbols(content)) {
    return { isValid: false, error: "Please avoid using too many symbols" };
  }
  return { isValid: true, error: "" };
};
