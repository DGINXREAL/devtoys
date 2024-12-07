import React from 'react';
import {Metadata} from "next";
import LoremIpsumGenerator from "@/app/tools/text/lorem-ipsum/LoremIpsumGenerator";
import {Route} from "@/app/_utils/routes";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator | Text Tools | DevToys.BIZ",
    description: "Elevate your design process with our Lorem Ipsum generator. Perfect for web designers, graphic artists, and content creators, this tool provides customizable placeholder text to enhance your layout without the distraction of meaningful content. Generate random, Latin-inspired text seamlessly and streamline your creative workflow. Whether you're working on a website, brochure, or any design project, our Lorem Ipsum generator is your go-to solution for adding realistic-looking filler text that preserves the focus on design aesthetics.",
    keywords: "lorem ipsum, placeholder text, dummy text, web design, content layout, random text, filler text, latin-inspired, ipsum generator, text tool, pseudo-latin text, random text generator, content placeholder",
    alternates: {
        canonical: process.env.APP_URL + Route.Tool_Text_Lorem_Ipsum
    },
};

const TextLoremIpsumPage = () => {
    return (<LoremIpsumGenerator/>)
};

export default TextLoremIpsumPage;