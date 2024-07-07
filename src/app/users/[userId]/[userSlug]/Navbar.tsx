"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const { userId, userSlug } = useParams();
    const pathname = usePathname();

    const items = [
        {
            name: "Summary",
            href: `/users/${userId}/${userSlug}`,
        },
        {
            name: "Questions",
            href: `/users/${userId}/${userSlug}/questions`,
        },
        {
            name: "Answers",
            href: `/users/${userId}/${userSlug}/answers`,
        },
        {
            name: "Votes",
            href: `/users/${userId}/${userSlug}/votes`,
        },
    ];

    return (
        <ul className="flex w-full shrink-0 gap-1 overflow-auto sm:w-40 sm:flex-col">
            {items.map(item => (
                <li key={item.name}>
                    <Link
                        href={item.href}
                        className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                            pathname === item.href ? "bg-white/20" : "hover:bg-white/20"
                        }`}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;
