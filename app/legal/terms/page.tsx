"use client";

import Header from "@/components/Terms/Header";
import {Section,Main, Footer} from '@/types/sections'
import Content from "@/components/Terms/Content";
import OnThisPage from "@/components/Terms/OnThisPage";

const sections: Section[] = [
  {
    id: 'acceptance-of-terms',
    title: 'Acceptance of Terms',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        By signing up and using the services provided by Nextjsshop (referred to as the "Service"), you are agreeing to be bound by the following terms and conditions ("Terms of Service"). The Service is owned and operated by Nextjsshop ("Us", "We", or "Our").
      </p>
    ),
  },
  {
    id: 'description-of-service',
    title: 'Description of Service',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        Nextjsshop is a premium UI template and components platform designed for developers and designers. The Product is accessible at{' '}
        <a href="/" className="text-neutral-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-300 ease-in-out">nextjsshop.com</a>{' '}
        and other domains and subdomains controlled by Us (collectively, "the Website").
      </p>
    ),
  },
  {
    id: 'fair-use',
    title: 'Fair Use',
    content: (
      <>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          You are responsible for your use of the Service and for any content that you post or transmit through the Service. You may not use the Service for any malicious purpose, including but not limited to:
        </p>
        <ul className="list-disc text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out" style={{ listStylePosition: 'outside', paddingLeft: '2rem' }}>
          <li>Phishing or scam websites</li>
          <li>Pornography or adult content</li>
          <li>Illegal betting or gambling</li>
          <li>Copyright infringement</li>
          <li>Redistributing our templates without permission</li>
        </ul>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          We reserve the right to suspend or terminate your access to the Service if we determine, in our sole discretion, that you have violated these Terms of Service.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property-rights',
    title: 'Intellectual Property Rights',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        All templates, components, assets, and content available through the Service are the intellectual property of Nextjsshop or its licensors. By using the Service, you agree not to copy, resell, or redistribute any part of the Service without explicit permission. We reserve the right to feature your company name and logo in our showcase or promotional material.
      </p>
    ),
  },
  {
    id: 'template-usage',
    title: 'Template Usage and Licensing',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        When you purchase or download a template or component, you are granted a non-exclusive, non-transferable license to use it for personal or commercial projects under the terms of your selected license. Redistribution or resale is strictly prohibited unless otherwise stated.
      </p>
    ),
  },
  {
    id: 'payments-and-refunds',
    title: 'Payments and Refunds',
    content: (
      <>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          All payments must be completed through approved payment providers such as Razorpay in the name of <span className="font-semibold">Hathi Taher Hushenbhai.</span> Prices may be subject to applicable taxes.
        </p>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          If you are located outside of India, payments can also be made securely via PayPal.
        </p>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          Due to the nature of digital products, all sales are final. However, if you experience technical issues or mistakenly purchased the wrong product, please reach out to our support team for assistance.
        </p>
      </>
    ),
  },
  {
  id: 'asset-notice',
  title: 'Asset Notice',
  content: (
    <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
      All source code in our templates and components is original and included in your license. However, some demo assets such as icons, fonts, or images may be sourced from third-party providers and are included for preview purposes only. You are responsible for ensuring proper licensing of any such assets before using them in your own or client projects. These third-party assets are not covered under our license and remain the property of their respective owners.
    </p>
  ),
},
  {
    id: 'changes-to-terms',
    title: 'Changes to These Terms',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        We reserve the right to modify or update these Terms of Service at any time. Changes are effective immediately upon posting. Continued use of the Service implies acceptance of the updated Terms.
      </p>
    ),
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        For any questions or support inquiries, please contact us at{' '}
        <a href="/contact" className="text-neutral-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-300 ease-in-out">
          support@nextjsshop.com
        </a>.
      </p>
    ),
  },
  {
    id: 'disclaimer-of-warranties',
    title: 'Disclaimer of Warranties',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        THE SERVICE AND ALL MATERIALS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        IN NO EVENT SHALL NEXTJSSHOP OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE USE OF THE SERVICE OR PRODUCTS.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law and Jurisdiction',
    content: (
      <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be resolved exclusively in the courts located in Gujarat, India.
      </p>
    ),
  },
];

const mainparagraph: Main['mainparagraph'] = (
  <>
  <p className="text-gray-700 dark:text-zinc-200">
  Subject to these Terms of Service (this "Agreement"), <a href="/">Nextjsshop</a> ("Nextjsshop", "we", "us" and/or "our") provides access to its templates, components, and related services (collectively, the "Services"). By using or accessing the Services, you acknowledge that you have read, understood, and agree to be bound by this Agreement.
</p>
<p className="text-gray-700 dark:text-zinc-200">
  If you are entering into this Agreement on behalf of a company, business, or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the term "you" shall refer to such entity. If you do not have such authority, or if you do not agree with this Agreement, you must not accept it and may not use the Services.
</p>

  </>
)

const footer: Footer['footer'] = (
  <>
  <p className="text-gray-700 dark:text-zinc-200">
  By using Nextjsshop, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them. If you do not agree to these Terms of Service, you are not authorized to use the Service. We reserve the right to update or modify these Terms of Service at any time, so please review them periodically.
</p>
<p className="text-gray-700 dark:text-zinc-200">
  Thank you for choosing Nextjsshop!
</p>

  </>
)

export default function TermsOfService() {
  return (
    <div className="max-w-[1240px] mx-auto ">
      <div className="relative z-10">
        <Header title="Terms of Service" />
      </div>
      <div className="grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-y">
        <div className="relative z-0 mx-auto max-w-grid-width border-grid-border border-x">
          <div className="relative grid grid-cols-4 gap-10 bg-white dark:bg-[#09090B] p-8 sm:p-12 lg:gap-20">
           <Content sections={sections} mainparagraph={mainparagraph} footer={footer} />
            <div className="hidden md:block">
              <OnThisPage sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
