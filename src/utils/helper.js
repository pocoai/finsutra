const socialDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "yandex.com",
  "protonmail.com",
  "zoho.com",
];

export const isWorkEmail = (email) => {
  const domain = email.split("@")[1];

  return !socialDomains.includes(domain);
};

export const getDomainFromMail = (email) => {
  const domain = email.split("@")[1];

  if (socialDomains.includes(domain)) {
    return null;
  } else {
    return domain;
  }
};

export const whitelistedDomains = ["dfmail.org", "playwise.gg"];

export const getCreditLimitByEmail = (email) => {
  const domain = email.split("@")[1];

  if (domain === "favcy.in") {
    return 1000;
  } else if (whitelistedDomains.includes(domain)) {
    return 100;
  } else {
    return 20;
  }
};
