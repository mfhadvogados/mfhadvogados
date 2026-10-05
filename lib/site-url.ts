// O domínio não consta dos materiais. Configure somente o endereço confirmado.
function getSiteUrl(): string | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export const siteUrl = getSiteUrl();
