import crypto from 'crypto';

export const generateShortUrl = (originalUrl: string): string => {
    return crypto.createHash('sha256').update(originalUrl + Date.now()).digest('base64url').slice(0, 8);
};

export const isSpam = (url: string): boolean => {
    const spamKeywords = ['phishing', 'malware', 'virus'];
    return spamKeywords.some((keyword) => url.toLowerCase().includes(keyword));
};
