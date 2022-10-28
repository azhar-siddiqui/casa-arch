import React from 'react'
import TermsContent from '../../components/TermsContent/TermsContent'
import TermsHeader from '../../components/TermsHeader/termsHeader'
import TermsTitle from '../../components/TermsTitle/TermsTitle'

const data =[
   {
      header: 'Return',
      contents: [
         'Product must be returned to us within ------- days from the date it has been delivered to the customer. Product must be returned with all tags attached in its original condition along with all packing material, courier receipt, invoice & other papers.'
      ]
   },
   {
      header: 'Refund',
      contents: [
         'Once the Product is received to the company successfully, ----Company Name---will instantly initiate the refund to your source account or chosen method of refund within --- working days.'
      ]
   },
   {
      header: 'Cancellation Policy',
      contents:[
         'Please note an order can only be canceled within 24 hours of placing the order. Once the order is processed after 24 hours, no cancellation request will be entertained.However return is possible for all orders/products. '
      ]
   },
   {
      header: 'Shipping & Delivery Policies -',
      contents:[
         `Company Name- ships its products to almost all parts of India. Orders placed will be shipped within 24* hrs. We ship on all days except Sunday and National Holidays.
         
         For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days of shipping (business days exclude Sundays and other holidays). For other areas the products will be shipped through --------------- and may take 1-2 weeks depending on location. At times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which --Company Name--is not liable and would request its users to cooperate as --Company Name-- continuously tries to nought such instances. Also, ---Company Name-- reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.`
      ]
   },
   {
      header: '',
      contents:[
         ''
      ]
   }
]

export default function RefundPolicy() {

   return (
      <div>
         <TermsHeader text='Refund & Return' />
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
