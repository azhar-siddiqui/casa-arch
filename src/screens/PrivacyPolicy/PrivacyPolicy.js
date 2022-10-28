import React from 'react'
import TermsContent from '../../components/TermsContent/TermsContent'
import TermsHeader from '../../components/TermsHeader/termsHeader'
import TermsTitle from '../../components/TermsTitle/TermsTitle'

const data = [
   {
      header: null,
      contents: [
         'We respect and are committed towards protecting your privacy. Publishing, selling or renting any personal data or information to any third party, without your consent, is against our ethics.',
         'The privacy practices of this statement apply to our services available under the domain and subdomains of the Site.By visiting this Site you agree to be bound by the terms and conditions of this privacy policy.If you do not agree, please do not use or access our site.',
         'This privacy policy does not apply to sites maintained by other companies or organizations to which we link and we are not responsible for any personal information you submit to third parties via our website. Please ensure that you read the privacy policy of such other companies or organizations before submitting your details.',
         'This privacy policy describes the information, as part of the normal operation of our services, we collect from you and what may happen to that information. This policy is inter alia formulated and displayed, to inform you about our information collection/retention policies and practices so that you can make an informed decision, in relation to the sharing of your personal information with us. By accepting the privacy policy and the user agreement or the use of the site in general, you give your consent to our use and disclosure of your personal information in accordance with this privacy policy. This Privacy Policy is incorporated into and subject to the terms of the User Agreement. This privacy policy is effective upon acceptance of access by you to the site.'
      ]
   },
   {
      header: 'Privacy Guarantee',
      contents: [
         'We agree that we will not sell or rent your personal information to third parties for their marketing purposes without your explicit consent. From time to time, we may reveal general statistical information about our Site and visitors, such as number of visitors, number and type of goods and services purchased, etc. Only those of our employees who need access to your information in order to perform their duties, are allowed such access. Any employee who violates our privacy and/or security policies is subjected to disciplinary action, including possible termination and civil and/or criminal prosecution.',
      ]
   },
   {
      header: 'Cookies are grouped into the following categories:',
      contents: [
         'Essential - these are cookies that are required for the regular operation of our websites.',
         'Functional - these remember your preferences, and are intended to make your experience on our websites better for you.',
         'Analytics – these cookies are used for performance measurement to understand things including how many people visit our websites, how they navigate our sites, and what content is popular. This allows us to improve your experience with us. Additionally, you can see how Google Analytics (one of our analytics tools) uses cookie information when you use our partners sites by visiting www.google.com / policies / privacy / partners, or any other URL Google may provide from time to time.',
         'Advertising - these cookies enable us and our advertising partners to serve you with relevant advertisements that we think will interest you. You might see these advertisements on our sites on other sites you visit. These cookies record your visit to our website and the content you interact with. They may be placed by us, or by advertising partners with our permission.',
         'To ensure compliance with our policies, we restrict the use of third-party cookies to trusted partners.',
         'We also use third party information from third party sources to enable us deliver advertising. These sources are validated by Third party, and not by us.',
         'To delete cookies from your browser, please note the following simple steps. The following steps are indicative for Google chrome and might vary of the different browsers that you may use. Please refer Settings on your browser for further details.',
         'To ensure compliance with our policies, we restrict the use of third-party cookies to trusted partners',
         'You may also change other setting related to Privacy and Security under the same section.',
      ]
   }
]
export default function PrivacyPolicy() {

   return (
      <div>
         <TermsHeader text='Privacy Policy' />
         <div className='px-4'>

            {data.map(({ header, contents }) => {
               return <>
                  <TermsTitle text={header} />
                  <TermsContent
                     body={contents.map(content => {
                        return <p className='content'>
                           {content}
                        </p>
                     })}
                  />
               </>
            })}

         </div>
      </div>
   )
}
