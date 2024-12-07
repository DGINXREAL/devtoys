import {Metadata} from "next";
import HtmlEncoderDecoder from "@/app/tools/encoder-decoder/html/HtmlEncoderDecoder";
import {Route} from "@/app/_utils/routes";

export const metadata: Metadata = {
    title: "HTML Encoder / Decoder | En-/Decoder Tools | DevToys.BIZ",
    description: "Easily manipulate HTML code with our versatile HTML encoder decoder tool. Encode and decode HTML entities swiftly and accurately, facilitating the handling of special characters in your web development projects. Our user-friendly online converter simplifies the encoding and decoding process, providing a seamless experience for web developers and content creators. Take control of HTML manipulation with our efficient and reliable HTML encoder decoder tool, ensuring the integrity of your code and content.",
    keywords: "html encoder, html decoder, encode html, decode html, web tool, online converter, encoding utility, decoding tool, html manipulation, web development, data encoding, data decoding",
    alternates: {
        canonical: process.env.APP_URL + Route.Tool_Encoder_Decoder_Html
    },
};

const EncoderDecoderHtmlPage = () => {
    return (<HtmlEncoderDecoder />)
};

export default EncoderDecoderHtmlPage;