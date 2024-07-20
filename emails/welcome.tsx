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

interface WelcomeEmailProps {
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: string[];
  name?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const PropDefaults: WelcomeEmailProps = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Add your categories.</strong>{" "}
          Start by adding transaction categories and sub categories to begin organising your transactions.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Add transactions.</strong> The foundations of the app are transactions. Add all the information you need; this includes the date, category and income/expense.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Generate your first report.</strong> Quickly create informative and professional PDF reports with a summary of all the information you require.
        </li>
      ),
    },
  ],
};

export const WelcomeEmail = ({
  steps = PropDefaults.steps,
  name
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ProsAccounting. Here's how to get started.</Preview>
      <Tailwind
        config={{
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
            <Heading className="text-center my-0 leading-8">
              Welcome to ProsAccounting
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for joining ProsAccounting{name ? ", " : ""}{name}!
                </Text>

                <Text className="text-base">Here's how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button className="bg-brand text-white rounded-lg py-3 px-[18px]">
                Go to your dashboard
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

export default WelcomeEmail;
