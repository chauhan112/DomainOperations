import React from 'react'
import { motion } from 'framer-motion';

export default function AppLogo() {
    const icon = {
        hidden: {
            pathLength: 0,
            fill: "rgba(20,184,166, 0)"
        },
        visible: {
            pathLength: 1,
            fill: "rgba(0, 0, 0, 1)"
        }
    }

    return (

        <motion.svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 203 203" fill="none" strokeWidth={3} stroke="currentColor" className="w-full h-full">
            <motion.path
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                    default: { duration: 3, ease: "anticipate" }
                }}
                strokeLinecap="round" strokeLinejoin="round"
                d="M113.34 91.847c-23.945 56.074-32.813 77.85-31.913 78.361 9.883 5.616 39.269 7.242 54.005 2.988 54.358-15.691 78.492-76.563 49.779-125.554-6.777-11.562-24.309-27.456-35.357-32.052l-3.354-1.396-33.16 77.653M75.342 30.41c-63.956 12.23-91.364 85.565-51.009 136.483 7.889 9.955 28.713 25.394 31.071 23.037.29-.291 15.827-34.931 34.525-76.979L123.926 36.5l-3.213-1.394c-11.637-5.049-32.328-7.191-45.371-4.696"
            />
        </motion.svg>
    )
}
