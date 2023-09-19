"use client";

import { leftAnimation, leftAnimationFast, rightAnimation } from '@/constants/animations'
import { cn } from '@/lib/utils';
import {motion} from "framer-motion";

export interface AnimatedDivProps {
    direction: "left" | "right" | "leftfast",
    children: React.ReactNode,
    className?: string,
}

const AnimatedDiv = ({ direction, children, className}: AnimatedDivProps) => {
  return (
    <motion.div className={cn('flex flex-col', className)}
      variants={direction == "left" ? leftAnimation : (direction == "leftfast" ? leftAnimationFast : rightAnimation)}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      // viewport={{once: true}}
      >

        {children}
    </motion.div>
  )
}

export default AnimatedDiv