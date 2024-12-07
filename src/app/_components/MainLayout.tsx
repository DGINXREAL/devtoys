'use client'
import React, {useState} from 'react';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid';
import Image from "next/image";
import OwnIpInfoWidget from "@/app/_components/OwnIpInfoWidget";
import {Route} from "@/app/_utils/routes";

interface NavigationItem {
    name: string;
    href: string;
    icon?: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>
    description?: string;
    items?: NavigationItem[] | null | undefined
}

const navigation: NavigationItem[] = [
    {
        name: 'Text',
        href: '#',
        items: [
            {
                name: 'Lorem Ipsum',
                description: 'Use our Lorum Ipsum generator to make beautiful text examples',
                href: Route.Tool_Text_Lorem_Ipsum,
                icon: ChatBubbleBottomCenterTextIcon,
            }
        ]
    },
]

function MainLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="relative isolate z-10 bg-gray-900">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">DevToys</span>
                            <Image
                                className="h-8 w-auto"
                                src="/images/devtoys_logo_big.svg"
                                alt="DevToys Logo"
                                width={200}
                                height={38}
                                priority
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((navigationItem) => (
                            <div key={navigationItem.name}>
                                {navigationItem.items &&
                                    <Popover>
                                        <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold  text-white">
                                            {navigationItem.name}
                                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400"/>
                                        </PopoverButton>

                                        <PopoverPanel
                                            transition
                                            className="absolute inset-x-0 top-0 -z-10 bg-gray-900 pt-14 ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <div
                                                className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                                {navigationItem.items.map((subItem) => (
                                                    <div key={subItem.name}
                                                         className="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-800">
                                                        <div
                                                            className="flex size-11 items-center justify-center rounded-lg bg-gray-700 group-hover:bg-white">
                                                            {subItem.icon && <subItem.icon aria-hidden="true"
                                                                           className="size-6  text-white group-hover:text-indigo-600"/>}
                                                        </div>
                                                        <a href={subItem.href} className="mt-6 block font-semibold text-white">
                                                            {subItem.name}
                                                            <span className="absolute inset-0"/>
                                                        </a>
                                                        <p className="mt-1 text-gray-600">{subItem.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                }

                                {!navigationItem.items &&
                                    <a href={navigationItem.href} className="text-sm/6 font-semibold text-white">
                                        {navigationItem.name}
                                    </a>
                                }
                            </div>
                        ))}
                    </PopoverGroup>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10"/>
                    <DialogPanel
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">DevToys</span>
                                <Image
                                    className="h-8 w-auto"
                                    src="/images/devtoys_logo_big.svg"
                                    alt="DevToys Logo"
                                    width={150}
                                    height={38}
                                    priority
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5  text-white"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((navigationItem) => (
                                        <div key={navigationItem.name}>
                                            {navigationItem.items &&
                                                <Disclosure as="div" className="-mx-3">
                                                    <DisclosureButton
                                                        className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold  text-white hover:bg-gray-700">
                                                        {navigationItem.name}
                                                        <ChevronDownIcon aria-hidden="true"
                                                                         className="size-5 flex-none group-data-[open]:rotate-180"/>
                                                    </DisclosureButton>
                                                    <DisclosurePanel className="mt-2 space-y-2">
                                                        {navigationItem.items.map((subItem) => (
                                                            <DisclosureButton
                                                                key={subItem.name}
                                                                as="a"
                                                                href={subItem.href}
                                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold  text-white  hover:bg-gray-700"
                                                            >
                                                                {subItem.name}
                                                            </DisclosureButton>
                                                        ))}
                                                    </DisclosurePanel>
                                                </Disclosure>
                                            }

                                            {!navigationItem.items &&
                                                <a href={navigationItem.href}
                                                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-700">
                                                    {navigationItem.name}
                                                </a>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <main>{children}</main>

            <footer className="bg-gray-900 shadow-inner">
                <div className="mx-auto max-w-7xl px-3 md:px-6 pb-8 lg:px-8">
                    <div className="mt-16 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
                        <OwnIpInfoWidget />
                        <p className="text-xs text-gray-400">&copy; 2024 DevToys, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>

    )
}

export default MainLayout;