import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Footer = () => {
    const items = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Privacy Policy",
            href: "/privacy-policy",
        },
        {
            title: "Terms of Service",
            href: "/terms-of-service",
        },
        {
            title: "Questions",
            href: "/questions",
        },
    ];
    return (
        <footer className="relative block overflow-hidden border-t border-solid border-white/30 py-20">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap items-center justify-center gap-3">
                    {items.map(item => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-center">&copy; {new Date().getFullYear()} Riverpod</div>
            </div>
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.4}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(3000px_circle_at_center,white,transparent)]",
                    "inset-y-[-50%] h-[200%] skew-y-6"
                )}
            />
        </footer>
    );
};

export default Footer;
