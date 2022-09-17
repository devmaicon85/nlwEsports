/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/public/faq",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "PUT, POST, PATCH, DELETE, GET",
                    },
                ],
            },
        ];
    },
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "res.cloudinary.com",
            "abs.twimg.com",
            "pbs.twimg.com",
            "avatars.githubusercontent.com",
            "static-cdn.jtvnw.net",
            "cdn.discordapp.com",
        ],
    },
};

module.exports = nextConfig;
