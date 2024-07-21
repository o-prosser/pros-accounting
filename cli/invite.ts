import GettingStartedEmail from '@/emails/getting-started'
import inquirer from 'inquirer'
import { Resend } from 'resend';
import 'dotenv/config'

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the email?",
  }
]

// @ts-ignore
inquirer.prompt(questions).then(async (answers) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const data = await resend.emails.send({
    from: "ProsAccounting <prosaccounting@prossermedia.co.uk>",
    to: answers.email,
    subject: `${answers.name}, you've been invited to join ProsAccounting`,
    react: GettingStartedEmail({name: answers.name}),
    reply_to: "accounting@owenprosser.co.uk"
  })

  if (data.error) console.error(data.error);

  console.log(data.data?.id);
})

