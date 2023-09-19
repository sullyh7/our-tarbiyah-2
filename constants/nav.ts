import { Information, NavBarLink, Quality } from "./types";

export const ABOUT_US = "/about-us";
export const PAYMENTS = "/payments";
export const BOOK_A_LESSON_NOW = "/book-now";
export const BE_A_TUTOR = "/be-a-tutor";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const SIGN_UP_TUTOR = `${SIGN_UP}/tutor`;
export const SIGN_UP_STUDENT = `${SIGN_UP}/student`
export const STUDENT_DASHBOARD = "/dashboard/student"
export const TUTOR_DASHBOARD = "/dashboard/tutor"
export const DASHBOARD = "/dashboard"
export const NEWSLETTER = "/community"
export const PROFILE = "/profile"

export const navBarLinks: NavBarLink[] =  [
    {
        name: "About us",
        href: ABOUT_US,
    },
    {
        name: "Payments",
        href: PAYMENTS,
    },

    {
        name: "Book a lesson now",
        href: BOOK_A_LESSON_NOW,
    },
    {
        name: "Be a Tutor",
        href: BE_A_TUTOR,
    },
    {
        name: "The Jama'ah",
        href: NEWSLETTER,
    },
]

export const homePageCards: Information[] = [
    {
        title: "We ensure we carefully select the best Muslim tutors.",
        description: "All our tutors are Muslim and have been interviewed by our team. Students are allocated to tutors of the same gender in order to prevent free-mixing. ",
        image: "/images/home/find_tutors.svg",
    },
    {
        title: "Excellent prices for students, excellent payments to tutors.",
        description: "Tutors can expect plenty of students, and students can expect plenty of lessons available at the best prices.",
        image: "/images/home/card.svg",
    },
    {
        title: "Online, convenient, accessible - anytime and any place. ",
        description: "Our service is completely online and so you can book and access lessons from practically anywhere!",
        image: "/images/home/online.svg",
    },
]

export const qualities: Quality[] = [
    {
        number: "١",
        content: "No free mixing between tutors and students."
    },
    {
        number: "٢",
        content: "Promoting an Islamic community online"
    },
    {
        number: "٣",
        content: "Weekly community posts with Islamic reminders."
    },
]