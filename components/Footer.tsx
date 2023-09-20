import { ABOUT_US, PAYMENTS } from "@/constants/nav"
import Link from "next/link"
import Image from "next/image"
import { SiFacebook, SiInstagram, SiTiktok, SiTwitter } from "react-icons/si";

const Footer = () => {
    return (
      <div className='flex sm:flex-row bottom-0 flex-col items-center gap-y-5 justify-between w-full p-10 bg-zinc-50'>
          <Image src={"/images/logo-nobg.png"} className='object-contain' width={140} height={10} alt='Our Tarbiyah' />
          <div className='flex flex-col gap-y-10'>
              <div className='flex gap-x-10 justify-between'>
                  <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold'>Need more?</h1>
                      <Link  href={ABOUT_US}>Who we are</Link>
                      <Link href={`${ABOUT_US}#faqs`}>FAQs</Link>
                      <Link href={PAYMENTS}>Pricing</Link>
                  </div>
                  <div>
                  {/* find us at */}
                      <h1 className='text-2xl font-bold'>Find us at:</h1>
                      <div className='flex gap-x-5'>
                          <div className='flex flex-col gap-y-5'>
                              <Link className='flex gap-x-2' href={ABOUT_US}><SiTwitter size="30"/></Link>
                              <Link className='flex gap-x-2' href={ABOUT_US}><SiInstagram size="30"/></Link>
                          </div>
                          <div className='flex flex-col gap-y-5'>
                              <Link className='flex gap-x-2' href={ABOUT_US}><SiFacebook  size="30"/></Link>
                              <Link className='flex gap-x-2' href={ABOUT_US}><SiTiktok size="30"/></Link>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='text-sm flex  items-center gap-y-2 flex-col sm:flex-row gap-x-10 content-between w-full'>
                <Link href={""}>Privacy Policy</Link>
                <Link href={""}>Terms and conditions</Link>
                <Link href={""}>Safegaurding policy</Link>
                <Link href={""}>Islamic Terms and Conditions.</Link>
                <h1></h1>
          </div> 
          </div>
      </div>
    )
  }
  
  export default Footer