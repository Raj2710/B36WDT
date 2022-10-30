const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY=undefined


const sendGridService = async(toEmail,subject,body)=>{
   try {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to: `${toEmail}`, // Change to your recipient
        from: 'nagarajansai2727@gmail.com', // Change to your verified sender
        subject: `${subject}`,
        html: `${body}`,
      }
      await sgMail.send(msg)
    } catch (error) {
    console.log(error)
   }
}
module.exports={sendGridService}