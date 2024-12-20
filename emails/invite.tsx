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

interface InviteEmailProps {
  organisationName: string
  name: string
  link: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const InviteEmail = ({
  organisationName,
  name,
  link
}: InviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been invited to join the organisation &apos;{organisationName}&apos;</Preview>
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
            <Heading className="text-center my-0 leading-8">
              Organisation invite
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Hello {name}
                </Text>
                
                <Text className="text-base">
                  You&apos;ve been invited to join the organisation &apos;{organisationName}&apos;. Click the link below to join the organisation and get started.
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button href={link} className="bg-brand text-white rounded-lg py-3 px-[18px]">
                Join organisation
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

export default InviteEmail;
