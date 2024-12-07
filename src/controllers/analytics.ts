import { Request, Response } from 'express';
import Url from '../models/url';

export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const { urlCode } = req.params;
        const url = await Url.findOne({ urlCode });
        if (!url) {
            res.status(404).json({ message: 'URL not found.' });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'Get the clicks',
            clicks: url.clicks,
            originalUrl: url.originalUrl,
            clickData: url.clickData,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal server error.' });
        return;
    }
};