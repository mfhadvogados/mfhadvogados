// Domínio definitivo confirmado pelo responsável em 6 de outubro de 2026.
export const siteUrl = "https://www.mfhadvogados.com.br";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).href;
}
