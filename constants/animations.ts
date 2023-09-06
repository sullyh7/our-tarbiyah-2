export const rightAnimation = {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        ease: "easeOut",
      },
    },
  };
  
  export const leftAnimation = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        ease: "easeOut",
      },
    },
  };

  export const leftAnimationFast = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        ease: "easeOut",
      },
    },
  };

  export const bottomAnimation = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      }
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        ease: "easeOut",
      },
    },
  };

  