"use client"
import Panel from "@/components/onboarding/Panel";
import { SignIn } from "@clerk/nextjs";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function Page() {



    return (<div className="bg-brand md:bg-white grid grid-cols-1 md:grid-cols-2 place-items-center w-full ">
        <div className="order-last lg:order-first flex flex-col items-center justify-center gap-6 m-auto w-full bg-white rounded-t-3xl">
            <Image
                src="/images/logo.png"
                height={58}
                width={210}
                alt="logo"
                style={{ objectFit: 'contain' }}
                className="mt-8 md:mt-0"
            />
            <div className="join bg-[#F1F2F4] rounded-md p-1 text-sm">
                <Link href={"/sign-in"}>
                    <p
                        className={classNames({
                            "rounded-lg bg-white join-item px-6": true,
                        })}
                    >
                        Sign in{" "}
                    </p>
                </Link>
                <Link href={"/sign-up"}>
                    <p
                        className={classNames({
                            "rounded-md  join-item px-6": true,
                        })}
                    >
                        Sign up{" "}
                    </p>
                </Link>
            </div>
            <SignIn

                afterSignInUrl="/"
                redirectUrl="/"
                afterSignUpUrl="/"
                appearance={{
                    elements: {
                        formButtonPrimary:
                            "bg-brand hover:bg-[#EC8007]",
                        footerAction: "hidden",
                        header: "hidden",
                        card: "shadow-none",
                        main: "flex-col-reverse",

                    },



                }} />
        </div>

        <Panel />
    </div>)
}