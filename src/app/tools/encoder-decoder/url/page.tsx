import UrlEncoderDecoder from "@/app/tools/encoder-decoder/url/UrlEncoderDecoder";
import {Metadata} from "next";
import {Route} from "@/app/_utils/routes";

export const metadata: Metadata = {
    title: "URL Encoder / Decoder | En-/Decoder Tools | DevToys.BIZ",
    description: "Effortlessly manipulate URLs with our versatile URL encoder decoder tool. Encode and decode web addresses quickly and accurately, making it a breeze to handle URL parameters and ensure data integrity in your web development projects. Our user-friendly online converter simplifies the encoding and decoding process, providing a seamless experience for web developers and data enthusiasts alike. Take control of URL manipulation with our efficient and reliable URL encoder decoder tool.",
    keywords: "url encoder, url decoder, encode url, decode url, web tool, online converter, encoding utility, decoding tool, url manipulation, web development, data encoding, data decoding",
    alternates: {
        canonical: process.env.APP_URL + Route.Tool_Encoder_Decoder_Url
    },
};
const EncoderDecoderUrlPage = () => {
    return (<UrlEncoderDecoder />)
};

export default EncoderDecoderUrlPage;