export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  bitrix24WebhookUrl: process.env.BITRIX24_WEBHOOK_URL,
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
};

export function hasTelegramConfig() {
  return Boolean(env.telegramBotToken && env.telegramChatId);
}

export function hasBitrixConfig() {
  return Boolean(env.bitrix24WebhookUrl);
}
