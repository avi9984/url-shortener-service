import { Request, Response } from 'express';
import Url from '../models/url';
import { generateShortUrl, isSpam } from '../utils/validator';


export const createShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { originalUrl, expirationDate } = req.body;
        if (!originalUrl) {
            res.status(400).json({ message: 'Original URL is required.' });
            return;
        }

        if (isSpam(originalUrl)) {
            res.status(400).json({ message: 'URL detected as spam or malicious.' });
            return;
        }

        const shortUrlCode = generateShortUrl(originalUrl).toLowerCase();
        const url = `http://localhost:${process.env.PORT}/${shortUrlCode}`;
        await Url.create({
            originalUrl,
            shortUrl: url,
            urlCode: shortUrlCode,
            expirationDate,
        });
        res.status(201).json({
            status: true,
            message: 'URL create successfully',
            shortUrl: url,
            shortUrlCode,
            originalUrl,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

export const redirectLink = async (req: Request, res: Response) => {
    try {
        const urlCode = req.params.urlCode;

        const url = await Url.findOne({ urlCode });
        // process.exit(0);

        if (!url) {
            res.status(404).json({ status: false, message: 'URL not found' });
            return;
        }

        if (url.expirationDate && new Date() > url.expirationDate) {
            res.status(410).json({ status: false, message: 'URL has expired' });
            return;
        }

        // Increment the click count
        url.clicks++;

        url.clickData.push({
            timestamp: new Date(),
            ip: req.ip || '',
        });
        await url.save();
        // redirecting to the original url
        return res.status(307).redirect(url.originalUrl);

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        return;
    }
};