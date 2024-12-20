import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface GettingStartedEmailProps {
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  name?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const PropDefaults: GettingStartedEmailProps = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Register your account.</strong>{" "}
          Start by creating on account on ProsAccounting using your email. Don't forget your password!
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Create an organisation.</strong> The organisation is where all of your transactions will be linked. Add the name of your organisation to create a new one, or ask an existing user to invite you.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Add some categories.</strong> From the categories link in the sidebar, add some categories and sub-categories which will allow you to organise and link your transactions to accounts.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Log a transaction.</strong> From the transactions page, add your first transaction by logging the details of it and connecting it to category and sub-category.
        </li>
      ),
    },
  ],
};

export const GettingStartedEmail = ({
  steps = PropDefaults.steps,
  name
}: GettingStartedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Start accounting today at ProsAccounting. Here's how to get started.</Preview>
      <Tailwind
        config={{
          separator: "-",
          safelist: "",
          experimental: "",
          corePlugins: "",
          theme: {
            extend: {
              colors: {
                brand: "#18181b",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src="https://prosaccounting.owenprosser.co.uk/pros-accounting-logo.png"
            width="241.9"
            height="30"
            alt="ProsAccounting"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-10">
              You've been invited to join ProsAccounting.
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Welcome to ProsAccounting, {name}! We've set out the first steps on how to set up your account and start logging your transactions.
                </Text>

                <Text className="text-base">Here's how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button href="https://prosaccounting.owenprosser.co.uk/register" className="bg-brand text-white rounded-lg py-3 px-[18px]">
                Create an account
              </Button>
            </Section>
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              &copy; Owen Prosser {new Date().getFullYear()}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default GettingStartedEmail;
