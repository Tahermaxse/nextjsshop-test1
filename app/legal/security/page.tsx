"use client";

import Header from "@/components/Terms/Header";
import {Section} from '@/types/sections'
import Content from "@/components/Terms/Content";
import OnThisPage from "@/components/Terms/OnThisPage";
import LastUpdate from "@/components/Terms/LastUpdate";

const sections: Section[] = [
  {
    id: 'security-of-data',
    title: 'Security of Data',
    content: (
      <>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          The security of your data is a top priority at Nextjsshop. We are committed to protecting your Personal Data using industry-standard practices, but please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to safeguard your Personal Data, we cannot guarantee its absolute security.
        </p>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          To protect your data, we implement the following security measures:
        </p>
        <ul className="list-disc text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out" style={{ listStylePosition: 'outside', paddingLeft: '2rem' }}>
          <li>
            <strong>Encryption</strong>: We use Transport Layer Security (TLS) to encrypt data transmitted between your device and our servers. Sensitive data, such as Personal Data stored in our databases, is encrypted at rest using strong encryption algorithms (e.g., AES-256).
          </li>
          <li>
            <strong>Access Controls</strong>: Access to Personal Data is restricted to authorized personnel only, based on the principle of least privilege. We enforce strong authentication mechanisms, including multi-factor authentication (MFA), for all internal systems.
          </li>
          <li>
            <strong>Monitoring and Auditing</strong>: Our systems are continuously monitored for suspicious activity. We conduct regular security audits and vulnerability assessments to identify and address potential risks.
          </li>
          <li>
            <strong>Incident Response</strong>: We maintain a comprehensive incident response plan to address potential security breaches promptly. In the unlikely event of a data breach, we will notify affected users and relevant authorities in accordance with applicable laws.
          </li>
          <li>
            <strong>Secure Development Practices</strong>: Our development team follows secure coding guidelines, including regular code reviews and static analysis, to minimize vulnerabilities in our Services.
          </li>
        </ul>
       
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          To further enhance your data security, we recommend that you:
        </p>
        <ul className="list-disc text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out" style={{ listStylePosition: 'outside', paddingLeft: '2rem' }}>
          <li>Use strong, unique passwords for your Nextjsshop account.</li>
          <li>Enable multi-factor authentication (MFA) where available.</li>
          <li>Regularly review your account activity and contact us immediately at <a href="/contact/support" className="text-neutral-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-300 ease-in-out">support@nextjsshop.com</a> if you suspect unauthorized access.</li>
        </ul>
        <p className="text-gray-700 dark:text-zinc-200 transition-colors duration-300 ease-in-out">
          If you have any questions or concerns about our security practices, please contact us at <a href="/contact/support" className="text-neutral-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-300 ease-in-out">support@nextjsshop.com</a>.
        </p>
      </>
    ),
  },
];



export default function Security() {
  return (
     <div className="max-w-[1240px] mx-auto ">
      <div className="relative z-10">
        <Header title="Security" />
      </div>
      <div className="grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-y">
        <div className="relative z-0 mx-auto max-w-grid-width border-grid-border border-x">
          <div className="relative grid grid-cols-4 gap-10 bg-white dark:bg-[#09090B] p-8 sm:p-12 lg:gap-20">
           <Content sections={sections} />
            <div className="hidden md:block">
              <OnThisPage sections={sections} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1208px] mx-auto ">
      <LastUpdate />
      </div>
    </div>
  );
} 