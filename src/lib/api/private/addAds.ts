import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { convertHourStringToMinutes } from "./../../../utils/convert-hour-string-to-minutes";

export async function addAds(req: NextApiRequest, res: NextApiResponse) {
    try {
        const gameId = String(req.query.id);
        const body: any = req.body;

        const ad = await prismaClient.ad.create({
            data: {
                gameId,
                name: body.name,
                yearsPlaying: body.yearsPlaying,
                discord: body.discord,
                weekDays: body.weekDays.join(","),
                hourStart: convertHourStringToMinutes(body.hourStart),
                hourEnd: convertHourStringToMinutes(body.hourEnd),
                useVoiceChannel: body.useVoiceChannel,
            },
        });

        return res.status(201).json(ad);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
