'use client'

import React, {useEffect, useState} from 'react';
import {faCopy, faFile, faPaste} from "@fortawesome/free-solid-svg-icons";
import Container from "@/app/_components/Container";
import {Button} from "@headlessui/react";
import {copyToClipboard, getDataContentFromFile, getTextFromClipboard} from "tsutilbox/dist/helpers/dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactCodeMirror from "@uiw/react-codemirror";
import {githubDark} from "@uiw/codemirror-theme-github";

const UrlEncoderDecoder = () => {
    const [decodedCode, setDecodedCode] = useState('https://example.tld/folderA/folderZwei/?queryStringA=1&queryStringB=zwei#fragemnt=1:Zwei')
    const [encodedCode, setEncodedCode] = useState('')

    const changeDecodedCode = (event: string) => {
        setDecodedCode(event)
        setEncodedCode(encodeURIComponent(event))
    }

    const changeEncodedCode = (event: string) => {
        setEncodedCode(event)
        setDecodedCode(decodeURIComponent(event))
    }

    useEffect(() => {
        setEncodedCode(encodeURIComponent(decodedCode))
    }, []);

    return (
        <Container>
            <h1>URL Encoder / Decoder</h1>
            <div className="flex justify-between items-center align-middle py-2">
                <h5>Decoded</h5>
                <div className="flex justify-between self-center gap-2">
                    <Button className="btn"
                            onClick={async () => setDecodedCode(await getTextFromClipboard())}>
                        <FontAwesomeIcon icon={faPaste} className="h-5 w-5 text-white"/>
                        <span>Paste from clipboard</span>
                    </Button>
                    <Button className="btn"
                            onClick={() => copyToClipboard(decodedCode)}>
                        <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-white"/>
                        <span>Copy to clipboard</span>
                    </Button>
                    <Button className="btn"
                            onClick={async () => await getDataContentFromFile(setDecodedCode, {allowedFileTypes: ['.txt', '.json', '.xml', '.php']})}>
                        <FontAwesomeIcon icon={faFile} className="h-5 w-5 text-white"/>
                        <span>Load from File</span>
                    </Button>
                </div>
            </div>
            <ReactCodeMirror theme={githubDark} height={"300px"} id={"input"}  onChange={(event) => changeDecodedCode(event)} value={decodedCode}  />
            <div className="flex justify-between items-center align-middle py-2">
                <h5>Encoded</h5>
                <div className="flex justify-between self-center gap-2">
                    <Button className="btn"
                            onClick={async () => setEncodedCode(await getTextFromClipboard())}>
                        <FontAwesomeIcon icon={faPaste} className="h-5 w-5 text-white"/>
                        <span>Paste from clipboard</span>
                    </Button>
                    <Button className="btn"
                            onClick={() => copyToClipboard(encodedCode)}>
                        <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-white"/>
                        <span>Copy to clipboard</span>
                    </Button>
                    <Button className="btn"
                            onClick={async () => await getDataContentFromFile(setEncodedCode, {allowedFileTypes: ['.txt', '.json', '.xml', '.php']})}>
                        <FontAwesomeIcon icon={faFile} className="h-5 w-5 text-white"/>
                        <span>Load from File</span>
                    </Button>
                </div>
            </div>
            <ReactCodeMirror theme={githubDark} height={"300px"} id={"output"} onChange={(event) => changeEncodedCode(event)} value={encodedCode}/>
        </Container>
    );
};

export default UrlEncoderDecoder;