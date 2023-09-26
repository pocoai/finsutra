export function getTitleFromUrl(url) {
  // Remove the protocol (http:// or https://) and www.
  const withoutProtocol = url.replace(/(https?:\/\/)?(www\.)?/i, "");

  // Extract subdomain along with domain, excluding specific TLDs
  const title = withoutProtocol.match(/(.*?)(\.[a-zA-Z]+(?!\.(com|in|edu)))/i);
  if (title && title.length > 0) {
    return title[0];
  } else {
    return "Click to view website";
  }
}
