'use client'
import React, {useEffect, useState} from 'react';
import {faCopy, faFile, faDownload} from "@fortawesome/free-solid-svg-icons";
import ReactCodeMirror from "@uiw/react-codemirror";
import Container from "@/app/_components/Container";
import ShowMore from "@/app/_components/ShowMore";
import {Button, Description, Field, Input, Label, Select} from "@headlessui/react";
import {clsx} from "clsx";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {copyToClipboard, downloadStringAsFile, getDataContentFromFile} from "tsutilbox/dist/helpers/dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {githubDark} from "@uiw/codemirror-theme-github";
import {csvStringToArray} from "tsutilbox/dist/helpers/formats";

class InvalidCsvFileException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidCsvFileException.prototype);

        this.name = 'InvalidCsvFileException';
    }
}

const RedirectGenerator = () => {
    const [generatorType, setGeneratorType] = useState('nginx-simple-rewrite')
    const [delimiter, setDelimiter] = useState(',')
    const [tabIndex, setTabIndex] = useState('1')
    const [input, setInput] = useState('/oldUrl1,https://newDomain.tld/newUrl1\n/oldUrl2,https://newDomain.tld/newUrl2')
    const [output, setOutput] = useState('')

    const generatorTypes = [
        {
            value: "NGINX - Simple rewrite",
            key: "nginx-simple-rewrite"
        },
        {
            value: "NGINX - Location rewrite",
            key: "nginx-location-rewrite"
        },
        {
            value: "Apache - Htaccess rewrite",
            key: "apache-htaccess-rewrite"
        }
    ]


    useEffect( () => {
        let data = []
        try {
            if(delimiter.trim() === ''){
                setOutput('Please set a delimiter');
                return
            }

            data = csvStringToArray(input, delimiter)
            data.map(function (item, index) {
                if(item[0] === undefined || item[0] === null || item[0] === '' || item[1] === undefined || item[1] === null || item[1] === ''){
                    throw new InvalidCsvFileException('Error in line ' + (index + 1).toString())
                }
            })
        } catch (e) {
            if(e instanceof InvalidCsvFileException){
                setOutput("Invalid CSV Input. " + e.message)
            } else {
                setOutput("An unknown error occurred");
                console.log(e)
            }
            return
        }

        if(generatorType === "nginx-simple-rewrite"){
            let generatedCode = '';
            data.map(function (item) {
                generatedCode += 'rewrite ^'+item[0]+'$ ' + item[1] + ' permanent;\n'
            })
            setOutput(generatedCode)
        }

        if(generatorType === "nginx-location-rewrite"){
            let generatedCode = '';
            data.map(function (item) {
                generatedCode += "location ~ ^" + item[0] + '$ {\n' + '\t'.repeat(parseInt(tabIndex)) + "return 301 " + item[1]+";\n}\n\n"
            })
            setOutput(generatedCode)
        }

        if(generatorType === "apache-htaccess-rewrite"){
            let generatedCode = '';
            generatedCode += 'RewriteEngine On\n\n';
            data.map(function (item) {
                generatedCode += "RewriteRule ^"+item[0]+'$ ' + item[1] + " [R=301,L]\n"
            })
            setOutput(generatedCode)
        }
    }, [generatorType, input, delimiter, tabIndex]);

    return (
        <Container>
            <h1>Redirect Generator</h1>
            <ShowMore>
                <p>
                    Effortlessly manage URL redirections with our Redirect Generator Tool, a versatile solution
                    supporting both Nginx and Apache web servers. Whether you&apos;re restructuring your website,
                    optimizing SEO, or handling domain changes, this tool simplifies the process of creating and
                    implementing redirects with precision.
                </p>
                <p>
                    <strong>How that works? </strong>
                    Please upload a simple csv file or put the content direct in the input code editor. That schema is
                    very easy
                    <strong> OLD URL, NEW URL</strong>
                </p>
            </ShowMore>
            <div className="border border-black p-2">
                <span className={"border-b-4 border-b-black "}>Settings</span>
                <div className={"grid grid-cols-3 gap-4 items-end"}>
                    <Field>
                        <Label className="text-sm/6 font-medium text-white">Generator Type</Label>
                        <Description className="text-sm/6 text-white/50">Select a generator type for more
                            choice.</Description>
                        <div className="relative">
                            <Select
                                value={generatorType}
                                onChange={(e) => setGeneratorType(e.target.value)}
                                className={clsx(
                                    'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                    '*:text-black'
                                )}
                            >
                                {generatorTypes.map((item, index) =>
                                    <option key={index} value={item.key}>{item.value}</option>
                                )}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <Label className="text-sm/6 font-medium text-white">Delimiter</Label>
                        <Description className="text-sm/6 text-white/50">Please choice a delimiter.</Description>
                        <Input
                            value={delimiter}
                            onChange={(e) => setDelimiter(e.target.value)}
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />
                    </Field>
                    {generatorType !== 'apache-htaccess-rewrite' && (
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">Tab-Index</Label>
                            <Description className="text-sm/6 text-white/50">Please choice a amount of tab
                                index.</Description>
                            <Input
                                value={tabIndex}
                                onChange={(e) => setTabIndex(e.target.value)}
                                className={clsx(
                                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                            />
                        </Field>
                    )}
                </div>

            </div>
            <div className={"grid grid-cols-2 gap-4"}>
                <div>
                    <div className={"flex justify-between items-center"}>
                        <h2>Input</h2>
                        {/*<SSCIconButton icon={faFile} label={"Load from File"}
                                       onClick={async () => await getDataContentFromFile(setInput, {allowedFileTypes: ['.csv']})}/>*/}
                    </div>
                    <ReactCodeMirror theme={githubDark} height={"300px"} id={"input"} value={input} onChange={setInput}/>
                    <div className="py-3 flex flex-col gap-2">
                        <Button className="btn"
                                onClick={async () => await getDataContentFromFile(setInput, {allowedFileTypes: ['.csv']})}>
                            <FontAwesomeIcon icon={faFile} className="h-5 w-5 text-white"/>
                            <span>Load from File</span>
                        </Button>
                        <Button className="btn"
                                onClick={() => copyToClipboard(input)}>
                            <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-white"/>
                            <span>Copy to clipboard</span>
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={"flex justify-between items-center"}>
                        <h2>Output</h2>
                    </div>
                    <ReactCodeMirror theme={githubDark} height={"300px"} id={"output"} value={output} readOnly={true}/>
                    <div className="py-3 flex flex-col gap-2">
                        <Button className="btn"
                                onClick={async () => await downloadStringAsFile(output)}>
                            <FontAwesomeIcon icon={faDownload} className="h-5 w-5 text-white"/>
                            <span>Download</span>
                        </Button>
                        <Button className="btn"
                                onClick={() => copyToClipboard(output)}>
                            <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-white"/>
                            <span>Copy to clipboard</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RedirectGenerator;