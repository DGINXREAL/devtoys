import React from 'react';
import RedirectGenerator from "@/app/tools/server/redirect-generator/RedirectGenerator";
import {Metadata} from "next";
import {Route} from "@/app/_utils/routes";

export const metadata: Metadata = {
    title: "Redirect Generator | Server Tools | DevToys.BIZ",
    description: "Effortlessly manage URL redirections with our Redirect Generator Tool, a versatile solution supporting both Nginx and Apache web servers. Whether you're restructuring your website, optimizing SEO, or handling domain changes, this tool simplifies the process of creating and implementing redirects with precision.",
    keywords: 'redirects, url redirection, nginx, apache, redirect generator, configuration tool, seo optimization, website restructuring, permanent redirects, temporary redirects, wildcard redirection, regular expressions, configuration snippets, server management, url management, web development, seo tools, version control, developer tool, system administration, website optimization, http redirection, rewrite rules, website restructure, redirect patterns, 301 redirects, 302 redirects, url structure, url mapping, redirect tool, cross-platform redirects, configuration export, live preview, website maintenance',
    alternates: {
        canonical: process.env.APP_URL + Route.Tool_Server_Redirect_Generator
    },
};
const ServerRedirectGeneratorPage = () => {
    return (<RedirectGenerator />);
};

export default ServerRedirectGeneratorPage;