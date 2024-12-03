'use client'
import React from "react";
import { motion } from "framer-motion";

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2
        }
    },
    end: {
        transition:{
            staggerChildren: 0.2
        }
    }
}

const loadingCircleVariants = {
    start: {
        y: "50%"
    },
    end: {
        y: "150%"
    }
}

const loadingCircleTransition = {
	duration: 0.5,
	repeat: Infinity,
    repeatType: "reverse",
	ease: "easeInOut",
};


const Loading = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<motion.div
				className="flex justify-around w-8 h-8"
				variants={loadingContainerVariants}
				initial="start"
				animate="end"
			>
				<motion.span
					className="block w-2 h-2 bg-white rounded-full"
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
				<motion.span
					className="block w-2 h-2 bg-white rounded-full"
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
				<motion.span
					className="block w-2 h-2 bg-white rounded-full"
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
			</motion.div>
		</div>
	);
};

export default Loading;
