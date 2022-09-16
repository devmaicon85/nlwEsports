import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function gameAds(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { search, id } = req.query;

        if (Array.isArray(search)) {
            return res.status(400).end("Busca inválida");
        }

        const data = await prismaClient.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: {
                gameId: String(id),
            },
            orderBy: {
                createAt: "desc",
            },
        });

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
