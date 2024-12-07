'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import ReactCodeMirror from "@uiw/react-codemirror";
import {EditorView} from "@codemirror/view";
import {Button, Description, Field, Input, Label, Select} from "@headlessui/react";
import {clsx} from "clsx";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {copyToClipboard} from "tsutilbox/dist/helpers/dom";
import Container from "@/app/_components/Container";
import ShowMore from "@/app/_components/ShowMore";
import {githubDark} from "@uiw/codemirror-theme-github";

const LoremIpsumGenerator = () => {
    const [numbers, setNumbers] = useState('20')
    const [generatedText, setGeneratedText] = useState('')
    const [generatorType, setGeneratorType] = useState('lorem')
    const [generatorMode, setGeneratorMode] = useState('characters')

    const generatorTypes = [
        {
            value: "Lorem Ipsum",
            key: "lorem"
        },
        {
            value: "Swiss Ipsum",
            key: "swiss"
        },
        {
            value: "German Impsum",
            key: "german"
        }
    ]

    const generatorModes = [
        {
            value: "Characters",
            key: "characters"
        },
        {
            value: "Words",
            key: "words"
        },
        {
            value: "Paragraphs",
            key: "paragraphs"
        }
    ]


    const LoremIpsum = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.';
    const SwissIpsum = 'Hoi zäme! Grüezi und willkomme zue mim zufällige Wörter-Orchis. Ich schwöre, es isch so, als ob d´Murmeli im Alpe Roschti mit eme yodelnde Kuh tanzet. Doch irgendwie schmeckt de Schoggi so guet, wie wenn mer es Fondue am Ufer vom Zürisee geniesst. S´isch zwar wie es Chäschüechli ohni de Käs, aber s´Lebe gaht witer wie en rassige Töffligfahrt dur d´Emmental.  S´isch eifach so, alles tanzt wie biem Sechstagerennen im Hallenstadion, und s´chügelt über d´Berge wie wenn d´Schweizer Uhr plötzlich e Hängebaan wär. Doch kei Panik, es isch eifach es wilds Rösti-Fäscht, und mir schwinged die Fähnli wie d´Luftbälbli am Bundesfeier.  Es goht da und dort, geng eifach durch d´Wölt wie es fröhlichs Jodelkonzärt uf em Stanserhorn. Und im Schuss gseht mer d´Sterni am Himmel wie inere sternenklare Nacht über de Mätthorn. Es isch eifach so, kei Plan, kei Ziel, aber s´Glacé schmeckt wie nach emene Gipfelsturm, und s´Toblerone schmilzt im Sunneuntergang wie inere warme Chäs-Fondue.  Meh passiert eigentlich nid, aber es isch eifach ächt und hert guet a. Kei Stress, kei Druck, eifach en Berg voll Zufriedeheit und es Fondue-Chinoise am Lagerfeuer. Und wemmer ganz still isch, chönd mer sogar d´Berge singe ghöre, wie sie sech zue eine "Juhui" verabrede.  Also, gnüssemer s´Läbe wie e frische Schoggi-Gipfel und lauft em Träffpunkt vo de Glückseligkeit entgäge, wo d´Sonne immer scheint und s´Läbe ewig währ. Denn s´isch eifach so, wie wenn d´Alpe vo de Chuehörnli yodelnd grüesst und die Zitronen im Glacé nie bitter schmecked.  Hopp zäme! Mir sy do, um über s´Lebe z´philosophiere wie en Schwarm vo Lütli, wo im Emmental en Kuhflade-Wettbewerb gewünne händ. S´isch so, als ob d´Chuehörnli en Polka tanze und d´Sunne am Himmel en Jodler singt. Geng wie eis vo de Züri-Hochhüsli, wo im Gegenwärtige stoh, aber mit em Charme vo eim Holzchüächli ufem Rütli.  S´isch wie wenn d´Chrüter-Frou i de Bärgwald verlore gaht, aber kei Angscht het, denn jede Gmüesstaud chunt am End zum wunderschöne Alpeland. De Bär isch es huere Glöckli umeghängt, und s´isch wie en Berggipfel im Mitti vom Früelig. Doch kei Stress, kei Hektik, nur en Rucksack voll mit Schoggi und e Flasche Ovomaltine.  D´Murmeli mache Party in de Stube vo de Chäs-Vroni und d´Hornusser schiessed Buttergipfeli statt Hornusse. Es isch so, als ob d´Rösti vo de Pfanne hüpft und s´Älpler-Chilbi nie endet. S´isch eifach es Dörfli, wo alli Chindli im Brunne plonsche und d´Glocke z´Bärg ruft.  S´isch wie es Märli vo de Heidi, aber ohni d´Hansi und s´Geissepeter sitzt im Gartehüsli mit em Gartenzwerg. De Schnee schmilzt im Früelig wie Zucker im Kafi, und s´Glacé chlöpft in de Sunne wie e Jasskarte ufem Tisch. Kei Sorge, kei Gedanke, eifach s´Läbe gniesse wie wenn jede Tag e Chuchichäschtli voll Überraschige isch.  Und so gähts immer witer, wie en endlosi Töfflifahrt durchs Emmental, und am End landemer alli im Wöltwunderland. S´isch eifach so, wie wenn d´Schwiiz em ganze Universum e Jodelliedli singt und jede Berg es Gipfeli am Himmel isch. Also hocked eu hi, nähmed en Schluck vo de frische Bergluft und geniesset s´Läbe, wie en Wurst-Chäschüechli ufem Grill. Hopp Schwiiz!';
    const GermanIpsum = 'Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können. Um ein triviales Beispiel zu nehmen, wer von uns unterzieht sich je anstrengender körperlicher Betätigung, außer um Vorteile daraus zu ziehen? Aber wer hat irgend ein Recht, einen Menschen zu tadeln, der die Entscheidung trifft, eine Freude zu genießen, die keine unangenehmen Folgen hat, oder einen, der Schmerz vermeidet, welcher keine daraus resultierende Freude nach sich zieht?  S´isch eifach so, alles tanzt wie biem Sechstagerennen im Hallenstadion, und s´chügelt über d´Berge wie wenn d´Schweizer Uhr plötzlich e Hängebaan wär. Doch kei Panik, es isch eifach es wilds Rösti-Fäscht, und mir schwinged die Fähnli wie d´Luftbälbli am Bundesfeier.  Es goht da und dort, geng eifach durch d´Wölt wie es fröhlichs Jodelkonzärt uf em Stanserhorn. Und im Schuss gseht mer d´Sterni am Himmel wie inere sternenklare Nacht über de Mätthorn. Es isch eifach so, kei Plan, kei Ziel, aber s´Glacé schmeckt wie nach emene Gipfelsturm, und s´Toblerone schmilzt im Sunneuntergang wie inere warme Chäs-Fondue.  Meh passiert eigentlich nid, aber es isch eifach ächt und hert guet a. Kei Stress, kei Druck, eifach en Berg voll Zufriedeheit und es Fondue-Chinoise am Lagerfeuer. Und wemmer ganz still isch, chönd mer sogar d´Berge singe ghöre, wie sie sech zue eine "Juhui" verabrede.  Also, gnüssemer s´Läbe wie e frische Schoggi-Gipfel und lauft em Träffpunkt vo de Glückseligkeit entgäge, wo d´Sonne immer scheint und s´Läbe ewig währ. Denn s´isch eifach so, wie wenn d´Alpe vo de Chuehörnli yodelnd grüesst und die Zitronen im Glacé nie bitter schmecked.  Hopp zäme! Mir sy do, um über s´Lebe z´philosophiere wie en Schwarm vo Lütli, wo im Emmental en Kuhflade-Wettbewerb gewünne händ. S´isch so, als ob d´Chuehörnli en Polka tanze und d´Sunne am Himmel en Jodler singt. Geng wie eis vo de Züri-Hochhüsli, wo im Gegenwärtige stoh, aber mit em Charme vo eim Holzchüächli ufem Rütli.  S´isch wie wenn d´Chrüter-Frou i de Bärgwald verlore gaht, aber kei Angscht het, denn jede Gmüesstaud chunt am End zum wunderschöne Alpeland. De Bär isch es huere Glöckli umeghängt, und s´isch wie en Berggipfel im Mitti vom Früelig. Doch kei Stress, kei Hektik, nur en Rucksack voll mit Schoggi und e Flasche Ovomaltine.  D´Murmeli mache Party in de Stube vo de Chäs-Vroni und d´Hornusser schiessed Buttergipfeli statt Hornusse. Es isch so, als ob d´Rösti vo de Pfanne hüpft und s´Älpler-Chilbi nie endet. S´isch eifach es Dörfli, wo alli Chindli im Brunne plonsche und d´Glocke z´Bärg ruft.  S´isch wie es Märli vo de Heidi, aber ohni d´Hansi und s´Geissepeter sitzt im Gartehüsli mit em Gartenzwerg. De Schnee schmilzt im Früelig wie Zucker im Kafi, und s´Glacé chlöpft in de Sunne wie e Jasskarte ufem Tisch. Kei Sorge, kei Gedanke, eifach s´Läbe gniesse wie wenn jede Tag e Chuchichäschtli voll Überraschige isch.  Und so gähts immer witer, wie en endlosi Töfflifahrt durchs Emmental, und am End landemer alli im Wöltwunderland. S´isch eifach so, wie wenn d´Schwiiz em ganze Universum e Jodelliedli singt und jede Berg es Gipfeli am Himmel isch. Also hocked eu hi, nähmed en Schluck vo de frische Bergluft und geniesset s´Läbe, wie en Wurst-Chäschüechli ufem Grill. Hopp Schwiiz!';


    useEffect(() => {
        let generatorText = '';
        if(generatorType === "lorem"){
            generatorText = LoremIpsum;
        }
        if(generatorType === "swiss"){
            generatorText = SwissIpsum;
        }
        if(generatorType === "german"){
            generatorText = GermanIpsum;
        }

        let outputString = generatorText
        try {
            if(generatorMode === "characters"){
                const numberOfChars = parseInt(numbers);
                while(outputString.length < numberOfChars){
                    outputString += generatorText
                }
                setGeneratedText(outputString.substring(0, numberOfChars));
            }
            if(generatorMode === "words"){
                const numberOfWords = parseInt(numbers);
                while(outputString.split(/\s+/).length < numberOfWords){
                    outputString += " " + generatorText
                }
                setGeneratedText(outputString.split(/\s+/).slice(0,numberOfWords).join(" "));
            }
            if(generatorMode === "paragraphs"){
                const numberOfParagraphs = parseInt(numbers);
                const paragraphArray = []

                while(paragraphArray.length < numberOfParagraphs){

                    paragraphArray.push(generatorText)
                }
                setGeneratedText(paragraphArray.join("\n\n"));
            }
        } catch (e) {
            if(e instanceof RangeError){
                setGeneratedText("Error. Please use a lower number. Your browser cannot handle a text with this size.")
            }
        }


    }, [generatorType, numbers, generatorMode]);

    return (
        <Container>
            <h1>Lorem Ipsum Generator</h1>
            <ShowMore>
                Your ultimate Lorem Ipsum generator tool designed to elevate your placeholder
                text experience. Say goodbye to bland and generic filler content – DevToys crafts text that not only
                serves its purpose but also adds a touch of creativity to your design projects.
                <br/>
                <br/>
                With DevToys, you have the power to customize your Lorem Ipsum like never before. Choose from a
                diverse range of styles and word lengths to match the tone and feel of your project. Whether
                you need traditional Latin-inspired lorem ipsum or want to inject a hint of humor, DevToys has you
                covered.
                <br/>
                <br/>
                Our user-friendly interface makes generating Lorem Ipsum a breeze. Simply select your preferences, click
                generate, and watch as DevToys crafts coherent and meaningful placeholder text tailored to your
                specifications. No more settling for random strings of letters – our tool ensures that your placeholder
                content aligns seamlessly with your design vision.
                <br/>
                <br/>
                But DevToys goes beyond the basics. We understand the importance of realistic-looking text, so our
                algorithm creates paragraphs that mimic the structure of natural language. This means your clients,
                colleagues, or stakeholders can get a genuine feel for the visual appeal of your designs.
                <br/>
                <br/>
                Stay ahead of the curve in design and presentation with LoremGenius. It&apos;s not just Lorem Ipsum; it&apos;s
                DevToys – where placeholder text meets creativity and customization. Experience the future of filler
                content today!
            </ShowMore>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-9">
                            <h2 className="font-bold text-2xl mb-4">Configuration</h2>

                            <div className={"grid grid-cols-3 gap-4 items-end"}>
                                <Field>
                                    <Label className="text-sm/6 font-medium text-white">Generator Type</Label>
                                    <Description className="text-sm/6 text-white/50">Select a generator type for more choice.</Description>
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
                                    <Label className="text-sm/6 font-medium text-white">Generator Mode</Label>
                                    <Description className="text-sm/6 text-white/50">Please choose a generator mode type.</Description>
                                    <div className="relative">
                                        <Select
                                            value={generatorMode}
                                            onChange={(e) => setGeneratorMode(e.target.value)}
                                            className={clsx(
                                                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                                // Make the text of each option black on Windows
                                                '*:text-black'
                                            )}
                                        >
                                            {generatorModes.map((item, index) =>
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
                                    <Label className="text-sm/6 font-medium text-white">Amount</Label>
                                    <Description className="text-sm/6 text-white/50">Please select a number, how much you want to create.</Description>
                                    <Input
                                        value={numbers}
                                        onChange={(e) => setNumbers(e.target.value)}
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                    />
                                </Field>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <h2 className="font-bold text-2xl mb-4">Actions</h2>
                            <div className="col-span-12 md:col-span-6">

                                <div className="flex flex-col gap-2">
                                    <Button className="btn"
                                            onClick={async () => copyToClipboard(generatedText)}>
                                        <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-white"/>
                                        <span>Copy to Clipboard</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <ReactCodeMirror theme={githubDark} height={"300px"} value={generatedText} readOnly={true} extensions={[EditorView.lineWrapping]}/>
                </div>
            </div>
        </Container>
    );
};

export default LoremIpsumGenerator;