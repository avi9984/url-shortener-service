import mongoose, { Document, Schema } from 'mongoose';

interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    urlCode: string;
    clicks: number;
    clickData: { timestamp: Date; ip: string }[];
    expirationDate?: Date; // Optional, if you have expiration logic
    createdAt: Date;
}

const urlSchema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    urlCode: { type: String },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    clickData: [
        {
            timestamp: { type: Date, default: Date.now },
            ip: { type: String, required: true },
        },
    ],
}, { versionKey: false });

const Url = mongoose.model<IUrl>('Url', urlSchema);

export default Url;