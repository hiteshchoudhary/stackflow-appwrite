"use client";

import IconCloud from "@/components/magicui/icon-cloud";
import Particles from "@/components/magicui/particles";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];

const HeroSectionHeader = () => {
    const { session } = useAuthStore();

    return (
        <div className="container mx-auto px-4">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
                            RiverFlow
                        </h1>
                        <p className="text-center text-xl font-bold leading-none tracking-tighter">
                            Ask questions, share knowledge, and collaborate with developers
                            worldwide. Join our community and enhance your coding skills!
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            {session ? (
                                <Link href="/questions/ask">
                                    <ShimmerButton className="shadow-2xl">
                                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                            Ask a question
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <ShimmerButton className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                Sign up
                                            </span>
                                        </ShimmerButton>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="relative rounded-full border border-neutral-200 px-8 py-3 font-medium text-black dark:border-white/[0.2] dark:text-white"
                                    >
                                        <span>Login</span>
                                        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative max-w-[32rem] overflow-hidden">
                        <IconCloud iconSlugs={slugs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionHeader;
